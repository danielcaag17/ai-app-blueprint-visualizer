import json
import random
from pathlib import Path
from typing import List, Dict

# ======================
# CONFIGURACIÓN INICIAL
# ======================

# Ruta base de tu modelo (ajústala según tu estructura)
BASE_DIR = Path(__file__).resolve().parent
DATASET_DIR = BASE_DIR / "dataset"

# Archivo de origen (dataset completo)
FULL_DATASET_PATH = DATASET_DIR / "full-dataset.jsonl"

# Archivos de destino
TRAIN_PATH = DATASET_DIR / "train.jsonl"
VAL_PATH = DATASET_DIR / "val.jsonl"

# Porcentaje de datos para entrenamiento
TRAIN_RATIO = 0.8

# Semilla para reproducibilidad
RANDOM_SEED = 42


# ======================
# FUNCIONES AUXILIARES
# ======================

def load_jsonl(file_path: Path) -> List[Dict]:
    """Lee un archivo .jsonl y devuelve una lista de diccionarios."""
    with open(file_path, "r", encoding="utf-8") as f:
        lines = [json.loads(line.strip()) for line in f if line.strip()]
    return lines


def save_jsonl(data: List[Dict], file_path: Path):
    """Guarda una lista de diccionarios en formato .jsonl."""
    with open(file_path, "w", encoding="utf-8") as f:
        for example in data:
            f.write(json.dumps(example, ensure_ascii=False) + "\n")


def split_dataset(data: List[Dict], train_ratio: float = 0.8):
    """Divide el dataset en conjuntos de entrenamiento y validación."""
    random.shuffle(data)
    split_idx = int(len(data) * train_ratio)
    train_data = data[:split_idx]
    val_data = data[split_idx:]
    return train_data, val_data


# ======================
# PROCESAMIENTO PRINCIPAL
# ======================

def main():
    print("📦 Cargando dataset completo desde:", FULL_DATASET_PATH)
    data = load_jsonl(FULL_DATASET_PATH)
    print(f"   → {len(data)} ejemplos cargados.")

    print("🔀 Mezclando y dividiendo datos...")
    random.seed(RANDOM_SEED)
    train_data, val_data = split_dataset(data, TRAIN_RATIO)

    print(f"   → {len(train_data)} ejemplos para entrenamiento.")
    print(f"   → {len(val_data)} ejemplos para validación.")

    print("💾 Guardando datasets...")
    save_jsonl(train_data, TRAIN_PATH)
    save_jsonl(val_data, VAL_PATH)

    print("✅ Dataset preparado correctamente:")
    print("   -", TRAIN_PATH)
    print("   -", VAL_PATH)
    print("\n🧩 Ejemplo de training data:")
    print(json.dumps(train_data[0], indent=2, ensure_ascii=False))



if __name__ == "__main__":
    main()
