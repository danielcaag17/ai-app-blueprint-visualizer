from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes.full_blueprint import router as full_blueprint
from backend.routes.blueprint import router as generate_blueprint
from backend.routes.generate_structure import router as generate_structure

app = FastAPI(title="AI App Blueprint Visualizer API")

# Habilita CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:3000"],  # o ["*"] para permitir todo (no recomendado en producción)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(full_blueprint, prefix="/blueprint/full", tags=["generate_full_blueprint"])
app.include_router(generate_blueprint, prefix="/blueprint/analyze", tags=["generate_blueprint"])
app.include_router(generate_structure, prefix="/bluerprint/generate", tags=["generate_structure"])

@app.get("/")
async def root():
    return {"message": "AI App Blueprint Visualizer API is running"}
