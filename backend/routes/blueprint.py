from fastapi import APIRouter, HTTPException
from backend.models.request_schemas import BlueprintRequest
from backend.models.blueprint_schemas import Blueprint
from backend.services.ai_model import AIModelService
from backend.services.mermaid_generator import MermaidService

router = APIRouter()

ai_service = AIModelService()
mermaid_service = MermaidService()

@router.post("/", response_model=Blueprint)
async def analyze_description(request: BlueprintRequest):
    try:
        analysis = ai_service.analyze_description(request.description)
        mermaid_code, title, overview, components = mermaid_service.generate_mermaid_and_metadata(analysis)

        return Blueprint(
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
