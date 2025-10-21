from fastapi import FastAPI
from backend.routes.blueprint import router
from backend.routes.generate_structure import router as generate_structure

app = FastAPI(title="AI App Blueprint Visualizer API")

app.include_router(router, prefix="/blueprint", tags=["blueprint"])
app.include_router(generate_structure, prefix="/generate", tags=["generate_structure"])

@app.get("/")
async def root():
    return {"message": "AI App Blueprint Visualizer API is running"}
