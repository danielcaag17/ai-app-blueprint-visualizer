from pydantic import BaseModel
from typing import List, Dict
from backend.models.analysis_schemas import Analysis

class Blueprint(BaseModel):
    mermaidCode: str
    description: Dict[str, str | List[str]]
    analysis: Analysis