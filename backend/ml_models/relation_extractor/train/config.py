from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
RANDOM_SEED = 42
TRAIN_RATIO = 0.8

BASE_MODEL_NAME = "google/flan-t5-base"
MODEL_NAME = "relation_extractor"

TEST_INPUT = {
    "descripcion": "Sistema de gestión de biblioteca donde los usuarios pueden prestar libros, devolverlos y consultar su historial.",
    "especificaciones": ["Lenguaje: Python", "Framework: Django", "Base de datos: PostgreSQL"],
    "entidades": [
      {"clase": "Libro", "atributos": ["idLibro", "titulo", "autor", "categoria", "disponibilidad"]},
      {"clase": "Usuario", "atributos": ["idUsuario", "nombre", "email", "fechaRegistro"]},
      {"clase": "Prestamo", "atributos": ["idPrestamo", "idUsuario", "idLibro", "fechaPrestamo", "fechaDevolucion"]}
    ],
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
