import numpy as np
import pandas as pd
from app.services.data_loader import load_battery_data, get_cycle_data

def professional_downsample(time_arr, data_arr, max_points=1000, violation_mask=None):
    """
    Extrema-Preserving Downsampling:
    Decimates the data but explicitly ensures the absolute MIN and MAX points
    are included. Also includes ALL violation points (if provided) so that 
    they are always visible on the chart.
    """
    if len(time_arr) <= max_points:
        return time_arr.tolist(), data_arr.tolist()
    
    # Indices of min and max points
    min_idx = np.argmin(data_arr)
    max_idx = np.argmax(data_arr)
    
    # Decimate
    step = len(time_arr) // max_points
    indices = np.arange(0, len(time_arr), step)
    
    # Include all violation indices (capped at a reasonable number to prevent bloat)
    v_indices = []
    if violation_mask is not None:
        v_indices = np.where(violation_mask)[0]
        if len(v_indices) > 500:
            v_indices = v_indices[::(len(v_indices) // 500)]
    
    # Merge indices
    final_indices = np.unique(np.concatenate([
        indices, 
        [min_idx, max_idx, len(time_arr)-1],
        v_indices
    ]))
    final_indices.sort()
    
    return time_arr[final_indices].tolist(), data_arr[final_indices].tolist()

def safe_float(val, default=0.0):
    if val is None:
        return default
    if isinstance(val, (list, np.ndarray)):
        if len(val) == 0:
            return default
        # For capacity/limits, the maximum value in the array is usually the representative one
        try:
            return float(np.nanmax(val))
        except:
            return default
    try:
        return float(val)
    except:
        return default

def analyze_voltage(filename: str, cycle_idx: int = 0):
    battery = load_battery_data(filename)
    
    # Get limits early (Global metadata)
    v_max = safe_float(battery.get("max_voltage_limit_in_V"), 4.2)
    v_min = safe_float(battery.get("min_voltage_limit_in_V"), 2.7)
    
    cycles_container = battery.get("cycle_data")
    total_cycles = len(cycles_container) if cycles_container else 0
    
    try:
        cycle = get_cycle_data(battery, cycle_idx)
    except Exception:
        return {
            "time": [], "voltage": [], "v_max": v_max, "v_min": v_min, 
            "violations_count": 0, "cycle_number": cycle_idx + 1,
            "total_cycles": total_cycles,
            "charge_capacity": 0.0, "discharge_capacity": 0.0
        }
    
    voltage = np.array(cycle.get("voltage_in_V", []))
    time = np.array(cycle.get("time_in_s", []))
    
    if len(voltage) == 0:
        return {"time": [], "voltage": [], "v_max": v_max, "v_min": v_min, "violations_count": 0, "cycle_number": cycle_idx + 1}

    # Calculate violations on raw data for 100% accuracy
    # LOGIC IMPROVEMENT: Count violation EVENTS (consecutive points = 1 event)
    violations_mask = (voltage > v_max) | (voltage < v_min)
    v_diff = np.diff(violations_mask.astype(int))
    violations_count = int(np.sum(v_diff > 0))
    if len(violations_mask) > 0 and violations_mask[0]:
        violations_count += 1
    
    # UI Improvement: Use relative time (0...N)
    rel_time = time - time[0]
    
    # Pro Downsample - Ensure violations are visible
    d_time, d_voltage = professional_downsample(rel_time, voltage, violation_mask=violations_mask)
    
    return {
        "time": d_time,
        "voltage": d_voltage,
        "v_max": v_max,
        "v_min": v_min,
        "violations_count": violations_count,
        "cycle_number": int(cycle.get("cycle_number", cycle_idx + 1)),
        "total_cycles": total_cycles,
        "charge_capacity": safe_float(cycle.get("charge_capacity_in_Ah")),
        "discharge_capacity": safe_float(cycle.get("discharge_capacity_in_Ah"))
    }

def analyze_current(filename: str, cycle_idx: int = 0):
    battery = load_battery_data(filename)
    
    # Global Limits
    I_max = safe_float(battery.get("max_current_limit_in_A"), 100.0)
    nominal_cap = safe_float(battery.get("nominal_capacity_in_Ah"), 1.0)
    
    cycles_container = battery.get("cycle_data")
    total_cycles = len(cycles_container) if cycles_container else 0

    try:
        cycle = get_cycle_data(battery, cycle_idx)
    except Exception:
        return {
            "time": [], "current": [], "c_rate": [], "over_current_events": 0, 
            "cycle_number": cycle_idx + 1, "total_cycles": total_cycles,
            "charge_capacity": 0.0, "discharge_capacity": 0.0
        }
    
    current = np.array(cycle.get("current_in_A", []))
    time = np.array(cycle.get("time_in_s", []))
    
    if len(current) == 0:
        return {"time": [], "current": [], "c_rate": [], "over_current_events": 0, "cycle_number": cycle_idx + 1}
    
    # Calculate violations (over-current events)
    oc_mask = np.abs(current) > I_max
    oc_diff = np.diff(oc_mask.astype(int))
    over_current_count = int(np.sum(oc_diff > 0))
    if len(oc_mask) > 0 and oc_mask[0]:
        over_current_count += 1
    
    rel_time = time - time[0]
    c_rate = current / nominal_cap
    
    d_time, d_current = professional_downsample(rel_time, current, violation_mask=oc_mask)
    _, d_crate = professional_downsample(rel_time, c_rate, violation_mask=oc_mask)
    
    return {
        "time": d_time,
        "current": d_current,
        "c_rate": d_crate,
        "over_current_events": over_current_count,
        "cycle_number": int(cycle.get("cycle_number", cycle_idx + 1)),
        "total_cycles": total_cycles,
        "charge_capacity": safe_float(cycle.get("charge_capacity_in_Ah")),
        "discharge_capacity": safe_float(cycle.get("discharge_capacity_in_Ah"))
    }

def analyze_resistance(filename: str):
    battery = load_battery_data(filename)
    
    cycle_indices = []
    resistances = []
    
    cycles_container = battery.get("cycle_data")
    if not cycles_container:
        return {"cycle": [], "resistance": [], "increase_percent": 0.0}

    # Unified iterator for List or Dict cycle_data
    if isinstance(cycles_container, list):
         iterator = enumerate(cycles_container)
    elif isinstance(cycles_container, dict):
         try:
             sorted_keys = sorted(cycles_container.keys(), key=lambda x: int(x) if str(x).isdigit() else x)
         except:
             sorted_keys = sorted(cycles_container.keys())
         iterator = [(k, cycles_container[k]) for k in sorted_keys]
    else:
        return {"cycle": [], "resistance": [], "increase_percent": 0.0}

    for idx, cycle_data in iterator:
        # 1. Capture Resistance (Core Metric)
        r_val = cycle_data.get("internal_resistance_in_ohm")
        
        # 2. Extract Cycle Number
        c_num_raw = cycle_data.get("cycle_number")
        if c_num_raw is not None:
             c_num = float(np.mean(c_num_raw)) if isinstance(c_num_raw, (list, np.ndarray)) else float(c_num_raw)
        else:
             c_num = float(idx + 1 if isinstance(idx, int) else 0)

        # 3. Fallback: Calculate DCIR if missing
        if r_val is None:
            v = np.array(cycle_data.get("voltage_in_V", []))
            i = np.array(cycle_data.get("current_in_A", []))
            if len(v) > 1 and len(i) > 1:
                di = np.diff(i)
                dv = np.diff(v)
                # Look for significant current steps (>0.5A) for reliable IR estimation
                mask = np.abs(di) > 0.5
                if np.any(mask):
                    calc_irs = np.abs(dv[mask] / di[mask])
                    # Filter out physically impossible values
                    valid_irs = calc_irs[(calc_irs > 0.0001) & (calc_irs < 5.0)]
                    if len(valid_irs) > 0:
                        r_val = float(np.median(valid_irs))

        # 4. Clean Resistance Value
        if isinstance(r_val, (list, np.ndarray)):
            val = float(np.mean(r_val)) if len(r_val) > 0 else None
        else:
            try:
                val = float(r_val) if r_val is not None else None
            except:
                val = None
        
        if val is not None:
            cycle_indices.append(int(c_num))
            resistances.append(val)
        
    if len(resistances) >= 2:
        r_start = np.median(resistances[:3]) # Use median of first few to avoid noise
        r_end = np.median(resistances[-3:])
        increase_percent = ((r_end - r_start) / r_start) * 100.0 if r_start > 0 else 0.0
    else:
        increase_percent = 0.0
        
    return {
        "cycle": cycle_indices,
        "resistance": resistances,
        "increase_percent": round(increase_percent, 2)
    }
