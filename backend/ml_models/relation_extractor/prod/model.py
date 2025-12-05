from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import json

# Toma la descripción de la descripción + JSON de entidades generado por el EntityLLMExtractor
# Devuelve un JSON de relaciones con cardinalidad, herencias, asociaciones
class RelationLLMExtractor:
    def __init__(self, model_path: str):
        self.tokenizer = AutoTokenizer.from_pretrained(model_path)
        self.model = AutoModelForSeq2SeqLM.from_pretrained(model_path)

    def extract(self, description: str, entities: list, especificaciones: dict):
        prompt = (
            f"Con base en estas entidades {json.dumps(entities)} y la descripción: {description}\n"
            f"Incluye especificaciones: {json.dumps(especificaciones)}\n"
            f"Devuelve un JSON con relaciones entre clases, incluyendo cardinalidad y tipo de relación."
        )
        inputs = self.tokenizer(prompt, return_tensors="pt", truncation=True)
        outputs = self.model.generate(**inputs, max_new_tokens=200)
        result = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        try:
            relations = json.loads(result)
        except json.JSONDecodeError:
            relations = []
        return relations
