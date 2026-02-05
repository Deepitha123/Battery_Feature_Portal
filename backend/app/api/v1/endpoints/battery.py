from fastapi import APIRouter, HTTPException, Query
from app.services import electrical, health
from app.schemas import response

router = APIRouter()

@router.get("/voltage", response_model=response.VoltageResponse)
def get_voltage_profile(
    filename: str = Query(..., description="Battery filename e.g. CALB_0_B182.pkl"),
    cycle_idx: int = Query(0, description="Cycle index to analyze")
):
    """
    Get Voltage Profile with limit violations.
    """
    try:
        # Explicitly pass cycle_idx to ensure it's not defaulted inside analyze_voltage
        return electrical.analyze_voltage(filename, cycle_idx=cycle_idx)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/current", response_model=response.CurrentResponse)
def get_current_profile(
    filename: str = Query(..., description="Battery filename e.g. CALB_0_B182.pkl"),
    cycle_idx: int = Query(0, description="Cycle index to analyze")
):
    """
    Get Current Profile with C-rate calc and overcurrent events.
    """
    try:
        return electrical.analyze_current(filename, cycle_idx=cycle_idx)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/resistance", response_model=response.ResistanceResponse)
def get_resistance_trend(
    filename: str = Query(..., description="Battery filename e.g. CALB_0_B182.pkl")
):
    """
    Get Internal Resistance trend over all cycles.
    """
    try:
        return electrical.analyze_resistance(filename)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/soh", response_model=response.HealthResponse)
def get_state_of_health(
    filename: str = Query(..., description="Battery filename e.g. CALB_0_B182.pkl")
):
    """
    Get State of Health (SOH) trend across all cycles.
    """
    try:
        return health.analyze_health(filename)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
