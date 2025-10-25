from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.core.config import settings
from backend.router import router as api_router

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


# Evento al iniciar la aplicación (útil para precargar modelos)
# TODO: cambiar on_event
@app.on_event("startup")
async def startup_event():
    print("🚀 Inicializando API y cargando modelos...")
    # Podrías cargar tus modelos globales aquí si lo deseas

# Evento al apagar la aplicación (útil para limpiar recursos)
@app.on_event("shutdown")
async def shutdown_event():
    print("🛑 Cerrando API y liberando recursos...")


@app.get("/")
async def root():
    return {"message": "AI App Blueprint Visualizer API is running"}

