# AgroTwin AI

AgroTwin AI is a high-fidelity full-stack prototype SaaS application for demonstrating an **Agentic AI + Digital Twin based Smart Agricultural Storage Management System**.

The project is investor/demo ready and works offline with realistic mock data. It includes a React SaaS frontend, a FastAPI demo backend, an interactive Three.js / React Three Fiber digital twin, charts, simulated live IoT sensor data, prototype authentication and complete setup files.

## Included Features

- Premium dark futuristic agriculture UI
- Glassmorphism, neon green accents, gradient borders and responsive layouts
- Prototype authentication: Login, Signup and Forgot Password
- Collapsible sidebar and top navbar
- Warehouse selector, notifications, profile, theme toggle and search
- Dashboard with health/risk/sensor/alert widgets
- Real-time monitoring with simulated live sensor updates
- Digital Twin page using React Three Fiber, Three.js and a GLTF warehouse model
- AI Prediction with risk percentage, forecast charts and explanation panel
- Alert Center with tabs, search, badges and alert details modal
- Analytics charts for temperature, humidity, gas, spoilage, efficiency and prediction accuracy
- Multi-Warehouse map view, cards and comparison dashboard
- AI Assistant chatbot UI with rule-based demo responses
- Settings pages for theme, notifications, sensors, user and system controls
- Offline mock data fallback if backend is not running
- FastAPI backend with sample endpoints
- Production build included under `frontend/dist`

## Project Structure

```text
AgroTwin-AI/
├── frontend/              # React + TypeScript + Vite SaaS application
├── backend/               # FastAPI offline demo backend
├── docs/                  # Architecture and installation docs
├── assets/                # Brand assets
├── public/                # Root sample public files
├── components/            # Shared structure marker for future full-stack modules
├── hooks/                 # Shared structure marker for future full-stack modules
├── services/              # Shared structure marker for future full-stack modules
├── contexts/              # Shared structure marker for future full-stack modules
├── lib/                   # Shared structure marker for future full-stack modules
├── types/                 # Shared structure marker for future full-stack modules
├── data/                  # Sample offline data
├── three/                 # Digital twin notes
├── models/                # GLTF warehouse model copy
├── package.json           # Root helper scripts
├── requirements.txt       # Backend Python dependencies
├── .env.example           # Environment template
└── README.md
```

## Prerequisites

Install these first:

- Node.js 18+
- npm 9+
- Python 3.10+

## Quick Start

### 1. Extract the ZIP

```bash
unzip AgroTwin-AI-ready.zip
cd AgroTwin-AI
```

### 2. Start the backend

Create and activate a Python virtual environment.

#### Windows PowerShell

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

#### macOS / Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Backend runs at:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
```

### 3. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## Demo Login

Use the prefilled login credentials:

```text
Email: demo@agrotwin.ai
Password: agrotwin123
```

You can also enter any email/password because authentication is a local prototype flow.

## Production Build

From the frontend folder:

```bash
npm run build
npm run preview
```

Preview URL:

```text
http://localhost:4173
```

The production build is generated in:

```text
frontend/dist
```

## Backend API Endpoints

```text
GET  /api/health
GET  /api/dashboard
GET  /api/warehouses
GET  /api/sensors
GET  /api/alerts
GET  /api/forecast
POST /api/assistant
```

## Offline Mode

The frontend uses local mock data from `frontend/src/data/mockData.ts`. If the backend is not running, the frontend still works completely offline.

## Environment

Copy `.env.example` if you want to customize values:

```bash
cp .env.example .env
cp frontend/.env.example frontend/.env
```

Default frontend API value:

```text
VITE_API_BASE_URL=http://localhost:8000/api
```

## Notes

- The 3D Digital Twin uses a GLTF model stored in `frontend/public/models/agro-warehouse.glb`.
- The app is designed for prototype/demo use and does not require a real database.
- All sample data is included in the repository.
