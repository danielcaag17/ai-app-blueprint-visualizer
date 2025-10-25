# app/core/model_manager.py
from typing import Optional
from backend.ml_models.entity_extractor.model import EntityExtractor
from backend.ml_models.relation_extractor.model import RelationExtractor

class ModelManager:
    def __init__(self):
        self.entity_model: Optional[EntityExtractor] = None
        self.relation_model: Optional[RelationExtractor] = None

    async def load_models(self):
        print("🚀 Cargando modelos NLP...")
        self.entity_model = EntityExtractor("backend/ml_models/entity_extractor/")
        self.relation_model = RelationExtractor("backend/ml_models/relation_extractor/")
        print("✅ Modelos cargados correctamente")

    async def unload_models(self):
        print("🧹 Liberando modelos NLP...")
        self.entity_model = None
        self.relation_model = None
        print("✅ Modelos liberados correctamente")


# Instancia global que se puede importar desde cualquier módulo
model_manager = ModelManager()

'''
Ejemplo de uso:
from app.core.model_manager import model_manager

def extract_entities(text: str):
    return model_manager.entity_model.extract(text)
'''