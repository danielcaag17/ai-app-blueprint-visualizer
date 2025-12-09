from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
RANDOM_SEED = 42
TRAIN_RATIO = 0.8

BASE_MODEL_NAME = "google/flan-t5-base"
MODEL_NAME = "entity_extractor"

TEST_INPUT = {
    "descripcion": "Sistema para gestionar pedidos de clientes y productos en una tienda online.",
    "especificaciones": ["Lenguaje: Python", "Framework: Django", "Base de datos: PostgreSQL"]
}

CONFIG = {
    # Prepare data
    "base_dir": BASE_DIR,
    "raondom_seed": RANDOM_SEED,
    "train_ratio": TRAIN_RATIO,

    # Train data
    "base_model_name": BASE_MODEL_NAME,
    "epochs": 10,
    "batch_size": 16,
    "model_name": MODEL_NAME,

    # Validation data
    "test_input": TEST_INPUT
}
