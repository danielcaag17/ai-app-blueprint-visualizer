from transformers import AutoTokenizer, AutoModelForTokenClassification
import json

'''
Toma la descripción de la aplicación + especificaciones (frameworks, arquitectura, base de 
datos…)
Devuelve un JSON con clases y atributos
'''
class EntityLLMExtractor:
    def __init__(self, model_path: str):
        # Clase que convierte el texto en tokens
        self.tokenizer = AutoTokenizer.from_pretrained(model_path)
        # Modelo de Hugging Face para trabajar token a token y clasificarlos con etiquetas
        # Luego con post-procesamiento se agrupan los tokens con mismas etiquetas para extraer
        # las entidades
        self.model = AutoModelForTokenClassification.from_pretrained(model_path)


    # Este método hace la inferencia del modelo
    def extract(self, description: str, specifications: dict):
        prompt = (
            f"Extrae las entidades y atributos de esta aplicación:\n"
            f"Descripción: {description}\n"
            f"Especificaciones: {json.dumps(specifications)}\n"
            f"Devuelve un JSON con clases y atributos."
        )
        inputs = self.tokenizer(prompt, return_tensors="pt", truncation=True)
        outputs = self.model.generate(**inputs, max_new_tokens=200)
        result = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        try:
            entities = json.loads(result)
        except json.JSONDecodeError:
            entities = []
        return entities
    
        # Debería tener un formato así
        # entities = [
        #     {"name": "Usuario", "attributes": ["nombre", "email", "password"]},
        #     {"name": "Post", "attributes": ["titulo", "contenido", "fecha"]}
        # ]
