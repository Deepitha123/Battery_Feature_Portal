import numpy as np
from app.services.data_loader import load_battery_data
from app.services.electrical import safe_float

def analyze_health(filename: str):
    battery = load_battery_data(filename)
    
    # 1. Get Reference Capacity (Nominal)
    ref_cap = safe_float(battery.get("nominal_capacity_in_Ah"), 1.0)
    
    cycles_container = battery.get("cycle_data")
    if not cycles_container:
        return {
            "feature": "state_of_health",
            "battery_id": filename.replace(".pkl", ""),
            "reference_capacity_Ah": ref_cap,
            "current_soh": 0.0,
            "health_status": "Unknown",
            "cycle": [],
            "soh": [],
            "eol_threshold": 80.0
        }

    cycle_indices = []
    soh_values = []
    
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
        return {
            "feature": "state_of_health",
            "battery_id": filename.replace(".pkl", ""),
            "reference_capacity_Ah": ref_cap,
            "current_soh": 0.0,
            "health_status": "Unknown",
            "cycle": [],
            "soh": [],
            "eol_threshold": 80.0
        }

    for idx, cycle_data in iterator:
        # 1. Extract Discharge Capacity
        d_cap = safe_float(cycle_data.get("discharge_capacity_in_Ah"))
        
        # 2. Extract Cycle Number
        c_num_raw = cycle_data.get("cycle_number")
        if c_num_raw is not None:
             c_num = float(np.mean(c_num_raw)) if isinstance(c_num_raw, (list, np.ndarray)) else float(c_num_raw)
        else:
             c_num = float(idx + 1 if isinstance(idx, int) else 0)

        # 3. Calculate SOH (%)
        if ref_cap > 0:
            soh = (d_cap / ref_cap) * 100.0
            # Clip SOH at 100% for fresh batteries, but allow lower
            soh = min(100.0, soh)
        else:
            soh = 0.0
            
        cycle_indices.append(int(c_num))
        soh_values.append(round(soh, 2))

    # Determine Current SOH (Last valid cycle)
    current_soh = soh_values[-1] if soh_values else 0.0
    
    # Calculate EOL Cycle (First cycle < 80% SOH)
    eol_cycle = None
    for i, val in enumerate(soh_values):
        if val < 80.0:
            eol_cycle = cycle_indices[i]
            break
            
    # Interpretation Note
    is_flat_100 = all(v >= 99.9 for v in soh_values) if soh_values else False
    note = "SOH clipped at 100%. No observable capacity fade in dataset." if is_flat_100 else None
    
    # Classify Health Status
    if current_soh >= 80.0:
        status = "Healthy"
    elif current_soh >= 60.0:
        status = "Warning"
    else:
        status = "Critical"
        
    return {
        "feature": "state_of_health",
        "battery_id": filename.replace(".pkl", ""),
        "reference_capacity_Ah": ref_cap,
        "current_soh": current_soh,
        "health_status": status,
        "cycle": cycle_indices,
        "soh": soh_values,
        "eol_threshold": 80.0,
        "eol_cycle": eol_cycle,
        "note": note
    }
