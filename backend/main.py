from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.routes.api import router

app = FastAPI(
    title="AgroTwin AI Backend",
    version="1.0.0",
    description="Offline-ready demo backend for Smart Agricultural Storage Management."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")

@app.get("/")
def root():
    return {
        "name": "AgroTwin AI",
        "status": "online",
        "mode": "offline demo",
        "docs": "/docs",
        "api": "/api/health"
    }
