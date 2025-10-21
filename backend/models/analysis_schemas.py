from pydantic import BaseModel
from typing import List

class Analysis(BaseModel):
    app_type: str
    recommended_technologies: List[str]
    key_features: List[str]
