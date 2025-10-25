from fastapi import APIRouter
from backend.routes.full_blueprint import router as full_blueprint
from backend.routes.blueprint import router as generate_blueprint
from backend.routes.generate_structure import router as generate_structure

router = APIRouter()

# Registrar subrouters
router.include_router(full_blueprint, prefix="/blueprint/full", tags=["generate_full_blueprint"])
router.include_router(generate_blueprint, prefix="/blueprint/analyze", tags=["generate_blueprint"])
router.include_router(generate_structure, prefix="/bluerprint/generate", tags=["generate_structure"])

