from fastapi import APIRouter, HTTPException
from backend.models.response_schemas import GenerateFullBlueprintResponse
from backend.models.request_schemas import BlueprintRequest
from backend.services.ai_model import AIModelService
from backend.services.structure_builder import StructureBuilderService
from backend.services.mermaid_generator import MermaidService

router = APIRouter()

ai_service = AIModelService()
mermaid_service = MermaidService()
structure_service = StructureBuilderService()


@router.post("/", response_model=GenerateFullBlueprintResponse)
async def generate_full_blueprint(request: BlueprintRequest):
    try:
        # Llamar al modelo de IA para generar el mermaid y el análisis
        # TODO: estas dos llamadas deben ser asíncronas y la de structure_service deberá esperar por eso
        analysis = ai_service.analyze_description(request.description)
        mermaid_code, title, overview, components = mermaid_service.generate_mermaid_and_metadata(analysis)
        blueprint = {
            "mermaidCode":mermaid_code,
            "description":{
                "title": title,
                "overview": overview,
                "components": components,
            },
            "analysis":analysis,
        }
        
        # Usar ese análisis para generar la estructura
        structure = structure_service.build_structure(blueprint["analysis"])

        # Devuelve todo junto
        return GenerateFullBlueprintResponse(
            structure=structure,
            mermaidCode=mermaid_code,
            description={
                "title": title,
                "overview": overview,
                "components": components,
            },
            analysis=analysis
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))