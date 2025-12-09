import random
import json
from pathlib import Path
from typing import List, Dict

from datasets import load_dataset
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, Trainer, TrainingArguments, DataCollatorForSeq2Seq


# Clase base para cada modelo de machine learning
class BaseModel:
    def __init__(self, config):
        self.config = config
        self.base_dir = Path(config.get("base_dir", Path(__file__).parent))

        # Rutas
        self.dataset_dir = self.base_dir / "dataset"
        self.full_dataset_path = self.dataset_dir / "full-datset.jsonl"
        self.train_path = self.dataset_dir / "train.jsonl"
        self.val_path = self.dataset_dir / "val.jsonl"
        self.output_dir = Path(config.get("output_dir", self.base_dir / "fine_tuned_model"))

        # Parámetros de configuración
        self.random_seed = config.get("random_seed", 42)
        self.train_ratio = config.get("train_ratio", 0.8)
        self.base_model_name = config.get("base_model_name", "google/flan-t5-base")
        self.model_name = config.get("model_name", "model_name")
        self.epochs = config.get("epcohs", 10)
        self.batch_size = config.get("batch_size", 16)

        self.tokenizer = None
        self.model = None

    # ----------------------
    # Funciones auxiliares para el manejo de datos
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
    # Función principal de preparación de datos
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

    # ----------------------
    # Funciones auxiliares para el entrenamieto
    # ----------------------
    def load_data(self):
        # Cargar dataset
        dataset = load_dataset(
            "json",
            data_files={
                "train": self.train_path,
                "validation": self.val_path,
            }
        )

        # Cargar modelo y tokenizer
        self.tokenizer = AutoTokenizer.from_pretrained(self.base_model_name)
        self.model = AutoModelForSeq2SeqLM.from_pretrained(self.base_model_name)

        return dataset
    
    def preprocess_function(self, examples):
        # Convertimos cada entrada/salida en cadena JSON si no lo son ya
        inputs = [json.dumps(x) if not isinstance(x, str) else x for x in examples["input"]]
        targets = [json.dumps(x) if not isinstance(x, str) else x for x in examples["output"]]

        model_inputs = self.tokenizer(inputs, max_length=512, truncation=True)
        labels = self.tokenizer(text_target=targets, max_length=512, truncation=True)
        model_inputs["labels"] = labels["input_ids"]
        return model_inputs

    # ----------------------
    # Función principal de entrenamiento
    # ----------------------
    def train(self):
        print(f"Entrenando modelo con {self.config}")
        dataset = self.load_data()

        tokenized_datasets = dataset.map(lambda batch: self.preprocess_function(batch), batched=True)
        
        training_args = TrainingArguments(
            output_dir=self.output_dir,
            save_strategy="epoch",
            learning_rate=2e-5,
            per_device_train_batch_size=self.batch_size,
            per_device_eval_batch_size=self.batch_size,
            num_train_epochs=self.epochs,
            weight_decay=0.01,
            save_total_limit=2,
            logging_steps=50,
            push_to_hub=False
        )

        data_collator = DataCollatorForSeq2Seq(self.tokenizer, model=self.model)

        trainer = Trainer(
            model=self.model,
            args=training_args,
            train_dataset=tokenized_datasets["train"],
            eval_dataset=tokenized_datasets["validation"],
            data_collator=data_collator,
        )

        trainer.train()

        self.model.save_pretrained(self.output_dir)
        self.tokenizer.save_pretrained(self.output_dir)
        print(f"✅ Modelo fine-tuneado y guardado en: {self.output_dir}")


    # ----------------------
    # Función principal de validación del modelo
    # ----------------------
    def validate(self):
        print(f"Validando modelo con {self.config}")
        # Aquí va la lógica común de validación
