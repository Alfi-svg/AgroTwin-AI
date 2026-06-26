# AgroTwin AI Installation Guide

AgroTwin AI is a full-stack offline-ready SaaS prototype. The frontend uses React, TypeScript, Vite, Recharts, Framer Motion, React Three Fiber and Three.js. The backend uses FastAPI and serves demo IoT, alert, warehouse and AI assistant data.

## Prerequisites

- Node.js 18 or newer
- Python 3.10 or newer
- npm

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## Backend

```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
python -m uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Backend docs open at `http://localhost:8000/docs`.
