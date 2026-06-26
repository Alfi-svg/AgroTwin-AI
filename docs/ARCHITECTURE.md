# AgroTwin AI Architecture

## System Concept

AgroTwin AI demonstrates an Agentic AI + Digital Twin based agricultural storage management platform. It combines IoT sensor telemetry, warehouse risk scoring, AI recommendations, alert workflows, analytics dashboards and an interactive 3D warehouse twin.

## Frontend

- React + TypeScript + Vite
- React Three Fiber + Three.js + GLTF digital twin
- Recharts for analytics
- Framer Motion for transitions and micro-interactions
- Offline mock data fallback
- Contexts for auth, warehouse selection and theme

## Backend

- FastAPI demo API
- CORS enabled for local frontend
- Offline sample data
- Endpoints for dashboard, sensors, alerts, forecast, warehouses and assistant responses

## Data Flow

1. Frontend requests backend demo APIs.
2. If backend is unavailable, frontend falls back to local mock data.
3. Live monitoring simulates sensor updates every few seconds.
4. Digital twin maps sensor states to 3D nodes and heatmap zones.
5. AI assistant provides rule-based demo responses for investor presentation.
