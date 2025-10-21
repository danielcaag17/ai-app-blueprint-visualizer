from pydantic import BaseModel

class BlueprintRequest(BaseModel):
    description: str

