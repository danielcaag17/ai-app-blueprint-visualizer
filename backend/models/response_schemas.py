from pydantic import BaseModel
from typing import Any, Dict
from backend.models.blueprint_schemas import Blueprint 

class GenerateStructureResponse(BaseModel):
    structure: Dict[str, Any]

