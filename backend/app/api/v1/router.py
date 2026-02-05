from fastapi import APIRouter
from app.api.v1.endpoints import battery

api_router = APIRouter()

# Register the battery endpoints
api_router.include_router(battery.router, prefix="/battery", tags=["Battery Analysis"])
