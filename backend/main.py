from fastapi import FastAPI
from contextlib import asynccontextmanager

from backend.core.cors import setup_cors
from backend.core.config import settings
from backend.router import router as api_router
from backend.core.model_manager import model_manager


# ---------------------------------------------------------
# 🔄 Lifespan: Loading and unloading ML models when starting and closing the app
# ---------------------------------------------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🔄 Loading ML models...")
    await model_manager.load_models()
    print("✅ Models loaded!")

    yield  # ← the application runs here

    print("🧹 Unloading ML models...")
    await model_manager.unload_models()
    print("✅ Models unloaded!")


# ---------------------------------------------------------
# 🚀 Application Factory
# ---------------------------------------------------------
def create_application() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        description="API que genera diagramas UML en formato Mermaid a partir de descripciones en lenguaje natural.",
        version="0.1.0",
        lifespan=lifespan
    )

    # 🔐 Middleware - CORS
    setup_cors(app)

    # 🔌 Routers
    app.include_router(api_router, prefix="/api")

    return app


# ---------------------------------------------------------
# 🏁 Entry point de la app
# ---------------------------------------------------------
app = create_application()

import os

if os.getenv("ENV") == "development":
    print("✅ Running in development mode")
if os.getenv("ENV") == "production":
    print("✅ Running in production mode")


# Simple routes to check that the API is up
@app.get("/")
async def root():
    return {"message": "AI App Blueprint Visualizer API is running"}


@app.get("/health")
async def health():
    return {"status": "ok"}

