# app/core/model_manager.py
from typing import Optional
from backend.ml_models.entity_extractor.prod.model import EntityLLMExtractor
from backend.ml_models.relation_extractor.prod.model import RelationLLMExtractor

class ModelManager:
    def __init__(self):
        self.entity_model: Optional[EntityLLMExtractor] = None
        self.relation_model: Optional[RelationLLMExtractor] = None

    async def load_models(self):
        self.entity_model = EntityLLMExtractor("backend/ml_models/entity_extractor/prod/")
        # Not implemented yet
        # self.relation_model = RelationLLMExtractor("backend/ml_models/relation_extractor/prod/")

    async def unload_models(self):
        self.entity_model = None
        self.relation_model = None


# Instancia global que se puede importar desde cualquier módulo
model_manager = ModelManager()
