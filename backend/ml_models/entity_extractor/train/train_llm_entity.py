from datasets import load_dataset
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, Trainer, TrainingArguments, DataCollatorForSeq2Seq
from pathlib import Path
import json

# =====================
# CONFIGURACIÓN INICIAL
# =====================

BASE_DIR = Path(__file__).resolve().parent
DATASET_DIR = BASE_DIR / "dataset"
OUTPUT_DIR = BASE_DIR / "fine_tuned_model"

MODEL_NAME = "google/flan-t5-base"  # Puedes cambiarlo por otro T5 compatible

# Cargar dataset
dataset = load_dataset(
    "json",
    data_files={
        "train": str(DATASET_DIR / "train.jsonl"),
        "validation": str(DATASET_DIR / "val.jsonl"),
    }
)

# Cargar modelo y tokenizer
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)


# =====================
# PREPROCESAMIENTO
# =====================

def preprocess_function(examples):
    # Convertimos cada entrada/salida en cadena JSON si no lo son ya
    inputs = [json.dumps(x) if not isinstance(x, str) else x for x in examples["input"]]
    targets = [json.dumps(x) if not isinstance(x, str) else x for x in examples["output"]]

    model_inputs = tokenizer(inputs, max_length=512, truncation=True)
    labels = tokenizer(text_target=targets, max_length=512, truncation=True)
    model_inputs["labels"] = labels["input_ids"]
    return model_inputs


tokenized_datasets = dataset.map(preprocess_function, batched=True)


# =====================
# ENTRENAMIENTO
# =====================

training_args = TrainingArguments(
    output_dir=str(OUTPUT_DIR),
    save_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=2,
    per_device_eval_batch_size=2,
    num_train_epochs=5,
    weight_decay=0.01,
    save_total_limit=2,
    logging_dir=str(OUTPUT_DIR / "logs"),
    logging_steps=50,
    push_to_hub=False
)

data_collator = DataCollatorForSeq2Seq(tokenizer, model=model)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets["train"],
    eval_dataset=tokenized_datasets["validation"],
    data_collator=data_collator,
)

trainer.train()


# =====================
# GUARDAR MODELO FINAL
# =====================

model.save_pretrained(OUTPUT_DIR)
tokenizer.save_pretrained(OUTPUT_DIR)

print(f"✅ Modelo fine-tuneado y guardado en: {OUTPUT_DIR}")
