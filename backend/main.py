from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from backend.core.config import settings
from backend.router import router as api_router
from backend.core import model_manager

app = FastAPI(
    title=settings.APP_NAME,
    description="API que genera diagramas UML en formato Mermaid a partir de descripciones en lenguaje natural.",
    version="0.1.0"
)

# Habilita CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas de la API
app.include_router(api_router, prefix="/api")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Al iniciar la app
    await model_manager.load_models()

    yield  # Aquí corre la app
    
    # Al cerrar la app
    await model_manager.unload_models()


@app.get("/")
async def root():
    return {"message": "AI App Blueprint Visualizer API is running"}


@app.get("/health")
async def health():
    return {"status": "ok"}