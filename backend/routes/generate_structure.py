from fastapi import APIRouter, HTTPException
from backend.models.blueprint_schemas import Blueprint
from backend.models.response_schemas import GenerateStructureResponse
from backend.services.structure_builder import StructureBuilderService

router = APIRouter()
structure_service = StructureBuilderService()

@router.post("/", response_model=GenerateStructureResponse)
async def generate_structure(request: Blueprint):
    try:
        structure = structure_service.build_structure(request.analysis)
        return GenerateStructureResponse(
            structure=structure,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# TODO: que luego en el frontend se pueda descargar un zip con la estructura generada