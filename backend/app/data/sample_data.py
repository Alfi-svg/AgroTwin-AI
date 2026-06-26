from datetime import datetime, timedelta

WAREHOUSES = [
    {"id": "wh-001", "name": "Dhaka Cold Storage Alpha", "location": "Dhaka", "capacity": 86, "health": 94, "risk": 12, "status": "healthy", "lat": 23.8103, "lng": 90.4125},
    {"id": "wh-002", "name": "Chattogram Grain Hub", "location": "Chattogram", "capacity": 73, "health": 82, "risk": 28, "status": "warning", "lat": 22.3569, "lng": 91.7832},
    {"id": "wh-003", "name": "Rajshahi Mango Reserve", "location": "Rajshahi", "capacity": 69, "health": 76, "risk": 41, "status": "warning", "lat": 24.3745, "lng": 88.6042},
    {"id": "wh-004", "name": "Sylhet Tea Storage Node", "location": "Sylhet", "capacity": 91, "health": 97, "risk": 8, "status": "healthy", "lat": 24.8949, "lng": 91.8687}
]

SENSORS = [
    {"id": "TMP-A1", "label": "Temperature", "value": 18.4, "unit": "°C", "status": "healthy", "zone": "A1", "trend": "+0.3"},
    {"id": "HUM-A2", "label": "Humidity", "value": 68, "unit": "%", "status": "warning", "zone": "A2", "trend": "+4"},
    {"id": "GAS-B1", "label": "Gas Level", "value": 312, "unit": "ppm", "status": "healthy", "zone": "B1", "trend": "-12"},
    {"id": "MOI-B3", "label": "Moisture", "value": 13.8, "unit": "%", "status": "healthy", "zone": "B3", "trend": "-0.6"},
    {"id": "AIR-C2", "label": "Air Quality", "value": 91, "unit": "AQI", "status": "healthy", "zone": "C2", "trend": "+2"}
]

ALERTS = [
    {"id": "ALT-1001", "type": "critical", "title": "Humidity spike in Zone A2", "warehouse": "Dhaka Cold Storage Alpha", "zone": "A2", "message": "Humidity is above safe threshold for potato sacks for 14 minutes.", "createdAt": "2026-06-26T09:20:00", "status": "open"},
    {"id": "ALT-1002", "type": "warning", "title": "Gas sensor drift detected", "warehouse": "Chattogram Grain Hub", "zone": "B1", "message": "Ethylene reading is rising faster than the 24-hour baseline.", "createdAt": "2026-06-26T08:54:00", "status": "investigating"},
    {"id": "ALT-1003", "type": "info", "title": "Ventilation cycle completed", "warehouse": "Sylhet Tea Storage Node", "zone": "C4", "message": "Automated airflow optimization completed successfully.", "createdAt": "2026-06-26T07:30:00", "status": "resolved"}
]

def forecast():
    now = datetime.now().replace(minute=0, second=0, microsecond=0)
    points = []
    for i in range(24):
        points.append({
            "hour": (now + timedelta(hours=i)).strftime("%H:%M"),
            "temperature": round(18 + (i % 7) * 0.45, 2),
            "humidity": round(64 + (i % 5) * 2.6, 2),
            "spoilage": min(78, 12 + i * 1.8),
            "gas": 280 + (i % 6) * 14,
            "efficiency": max(72, 96 - i * 0.5)
        })
    return points
