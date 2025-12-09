import random
import json
from pathlib import Path
from typing import List, Dict

# Clase base para cada modelo de machine learning
class BaseModel:
    def __init__(self, config):
        self.config = config
        self.base_dir = Path(config.get("base_dir", Path(__file__).parent))

        # Rutas
        self.full_dataset_path = self.base_dir / "dataset" / "full-datset.jsonl"
        self.train_path = self.base_dir / "dataset" / "train.jsonl"
        self.val_path = self.base_dir / "dataset" / "val.jsonl"

        self.random_seed = config.get("random_seed", 42)
        self.train_ratio = config.get("train_ratio", 0.8)

    # ----------------------
    # Funciones auxiliares
    # ----------------------
    def load_jsonl(self, file_path: Path) -> List[Dict]:
        with open(file_path, "r", encoding="utf-8") as f:
            return [json.loads(line.strip()) for line in f if line.strip()]

    def save_jsonl(self, data: List[Dict], file_path: Path):
        with open(file_path, "w", encoding="utf-8") as f:
            for example in data:
                f.write(json.dumps(example, ensure_ascii=False) + "\n")

    def split_dataset(self, data: List[Dict], train_ratio: float = 0.8):
        random.shuffle(data)
        split_idx = int(len(data) * train_ratio)
        return data[:split_idx], data[split_idx:]


    # ----------------------
    # Función principal
    # ----------------------
    def prepare_data(self):
        print("📦 Cargando dataset completo desde:", self.full_dataset_path)
        data = self.load_jsonl(self.full_dataset_path)
        print(f"   → {len(data)} ejemplos cargados.")

        print("🔀 Mezclando y dividiendo datos...")
        random.seed(self.random_seed)
        train_data, val_data = self.split_dataset(data, self.train_ratio)

        print(f"   → {len(train_data)} ejemplos para entrenamiento.")
        print(f"   → {len(val_data)} ejemplos para validación.")

        print("💾 Guardando datasets...")
        self.save_jsonl(train_data, self.train_path)
        self.save_jsonl(val_data, self.val_path)

        print("✅ Dataset preparado correctamente:")
        print("   -", self.train_path)
        print("   -", self.val_path)

        print("\n🧩 Ejemplo de training data:")
        if train_data:
            print(json.dumps(train_data[0], indent=2, ensure_ascii=False))

    def train(self):
        print(f"Entrenando modelo con {self.config}")
        # Aquí va la lógica común de entrenamiento

    def validate(self):
        print(f"Validando modelo con {self.config}")
        # Aquí va la lógica común de validación
