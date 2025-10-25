from fastapi import APIRouter
from backend.routes.full_blueprint import router as full_blueprint
from backend.routes.blueprint import router as generate_blueprint
from backend.routes.structure import router as generate_structure

router = APIRouter()

# Registrar subrouters
router.include_router(full_blueprint, prefix="/full-blueprint", tags=["blueprint", "structure"])
router.include_router(generate_blueprint, prefix="/blueprint", tags=["blueprint"])
router.include_router(generate_structure, prefix="/structure", tags=["structure"])

