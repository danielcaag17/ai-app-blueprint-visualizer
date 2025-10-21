from pydantic import BaseModel
from typing import Any, Dict, List
from backend.models.analysis_schemas import Analysis 

class GenerateStructureResponse(BaseModel):
    structure: Dict[str, Any]


class GenerateFullBlueprintResponse(BaseModel):
    structure: Dict[str, Any]
    mermaidCode: str
    description: Dict[str, str | List[str]]
    analysis: Analysis
