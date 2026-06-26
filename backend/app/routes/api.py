from fastapi import APIRouter
from pydantic import BaseModel
from backend.app.data.sample_data import WAREHOUSES, SENSORS, ALERTS, forecast

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.get("/health")
def health():
    return {"status": "ok", "service": "AgroTwin AI Backend", "mode": "demo-offline"}

@router.get("/warehouses")
def warehouses():
    return WAREHOUSES

@router.get("/sensors")
def sensors():
    return SENSORS

@router.get("/alerts")
def alerts():
    return ALERTS

@router.get("/forecast")
def get_forecast():
    return forecast()

@router.get("/dashboard")
def dashboard():
    critical = len([a for a in ALERTS if a["type"] == "critical"])
    warnings = len([a for a in ALERTS if a["type"] == "warning"])
    return {
        "storageHealthScore": 94,
        "spoilageRiskScore": 18,
        "temperature": 18.4,
        "humidity": 68,
        "gasLevel": 312,
        "moisture": 13.8,
        "airQuality": 91,
        "activeAlerts": critical + warnings,
        "warehouses": WAREHOUSES,
        "sensors": SENSORS,
        "alerts": ALERTS,
        "forecast": forecast()
    }

@router.post("/assistant")
def assistant(payload: ChatRequest):
    text = payload.message.lower()
    if "risk" in text or "spoil" in text:
        answer = "Current spoilage risk is moderate-low at 18%. The main contributors are humidity rise in Zone A2 and ethylene trend in Zone B1. Run ventilation for 18 minutes and inspect pallet row A2-R3."
    elif "temperature" in text:
        answer = "Temperature is stable around 18.4°C. The cold corridor is operating within target range, but keeping humidity below 64% will improve shelf-life."
    elif "forecast" in text:
        answer = "The 24-hour forecast shows risk rising after hour 16 if humidity remains above 70%. The agent recommends preventive airflow balancing before the evening cycle."
    else:
        answer = "I can explain spoilage risk, recommend storage actions, summarize forecasts, and prioritize sensor maintenance for each warehouse."
    return {"reply": answer, "confidence": 0.92, "recommendedActions": ["Run ventilation cycle", "Inspect Zone A2", "Recalibrate GAS-B1", "Review humidity threshold"]}
