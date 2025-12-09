import sys

from base_model import BaseModel

def load_config(model_name):
    if model_name == "entity_extractor":
        from entity_extractor.train.config import CONFIG
    elif model_name == "relation_extractor":
        from relation_extractor.train.config import CONFIG
    else:
        raise ValueError(f"Modelo desconocido: {model_name}")
    return CONFIG

def main():
    if len(sys.argv) < 3:
        print("Uso: python main.py <modelo> <acción>")
        print("Ejemplo: python main.py entity_extractor train")
        sys.exit(1)

    model_name = sys.argv[1]
    action = sys.argv[2]

    config = load_config(model_name)
    model = BaseModel(config)

    if action == "prepare":
        model.prepare_data()
    elif action == "train":
        model.train()
    elif action == "validate":
        model.validate()
    else:
        raise ValueError(f"Acción desconocida: {action}")

if __name__ == "__main__":
    main()
