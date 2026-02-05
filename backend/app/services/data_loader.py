import pickle
import os
import pandas as pd
from functools import lru_cache
from fastapi import HTTPException
from app.core.config import settings

@lru_cache(maxsize=4)  # Cache up to 4 battery files in memory
def load_battery_data(filename: str):
    """
    Loads specific battery .pkl file from the configured data directory.
    """
    filename = filename.strip()
    file_path = os.path.join(settings.DATA_DIR, filename)
    
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail=f"Battery file {filename} not found in {settings.DATA_DIR}")
        
    try:
        with open(file_path, "rb") as f:
            data = pickle.load(f)
            return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load battery data: {str(e)}")

def get_cycle_data(battery_data, cycle_idx: int = 0):
    """
    Helper to extract specific cycle data.
    Handles both list (index-based) and dict (key-based) cycle storage.
    """
    cycles = battery_data.get("cycle_data")
    
    if isinstance(cycles, list):
        if cycle_idx >= len(cycles):
            raise HTTPException(status_code=400, detail="Cycle index out of range")
        return cycles[cycle_idx]
    
    elif isinstance(cycles, dict):
        # Robust sorting: ensures '2' comes before '10' if keys are strings
        try:
            keys = sorted(cycles.keys(), key=lambda x: int(x) if str(x).isdigit() else x)
        except:
            keys = sorted(cycles.keys())
            
        if cycle_idx >= len(keys):
             raise HTTPException(status_code=400, detail="Cycle index out of range")
             
        target_key = keys[cycle_idx]
        return cycles[target_key]
        
    raise HTTPException(status_code=500, detail="Unknown cycle data structure")
