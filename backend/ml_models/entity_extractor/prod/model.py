from transformers import AutoTokenizer, AutoModelForTokenClassification
import json

'''
Toma la descripción de la aplicación + especificaciones (frameworks, arquitectura, base de 
datos…)
Devuelve un JSON con clases y atributos
'''
class EntityLLMExtractor:

    '''
    El train ha generado varios ficheros, pero al final los que interesan son:
        Para el tokenizer:
        - tokenizer.json
        - tokenizer_config.json
        - special_tokens_map.json
        - vocab.txt o merges.txt (si existen)
        
        Para el modelos:
        - config.json (arquitectura, nº de capas, hidden, size, etiquetas, etc.)
        - model_safetensors (pesos)
        - generation_config.json (solo modelos generativos)
        - archivos auxiliares si es que hay (optimizer.pt, etc.)
    '''

    def __init__(self, model_path: str):
        # Clase que convierte el texto en tokens
        # TODO: tal vez el model_path no es del todo necesario pues al final es el path del fichero actual
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
