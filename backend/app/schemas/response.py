from pydantic import BaseModel
from typing import List, Optional, Any, Union

class VoltageResponse(BaseModel):
    time: List[float]
    voltage: List[float]
    v_max: float
    v_min: float
    violations_count: int
    cycle_number: int
    total_cycles: int
    charge_capacity: Optional[float] = None
    discharge_capacity: Optional[float] = None

class CurrentResponse(BaseModel):
    time: List[float]
    current: List[float]
    c_rate: Optional[List[float]] = None
    over_current_events: int
    cycle_number: int
    total_cycles: int
    charge_capacity: Optional[float] = None
    discharge_capacity: Optional[float] = None

class ResistanceResponse(BaseModel):
    cycle: List[int]
    resistance: List[float]
    increase_percent: float

class HealthResponse(BaseModel):
    feature: str = "state_of_health"
    battery_id: str
    reference_capacity_Ah: float
    current_soh: float
    health_status: str
    cycle: List[int]
    soh: List[float]
    eol_threshold: float = 80.0
    eol_cycle: Optional[int] = None
    note: Optional[str] = None

class DegradationResponse(BaseModel):
    degradation_rate_Ah_per_cycle: float
    trend: str

class TemperatureResponse(BaseModel):
    time: List[float]
    temperature: List[float]
    max_temp: float
    events: int
    
class LifePredictionResponse(BaseModel):
    cycle_life_summary: Optional[Any] = None
    rul: Optional[Any] = None

class GenericResponse(BaseModel):
    status: str
    data: Any
