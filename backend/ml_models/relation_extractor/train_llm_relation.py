from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, Trainer, TrainingArguments
from datasets import load_dataset
import json

MODEL_NAME = "google/flan-t5-base"

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)

dataset = load_dataset("json", data_files={
    "train": "app/models/relation_llm_extractor/dataset/train.json",
    "validation": "app/models/relation_llm_extractor/dataset/val.json"
})

def preprocess_function(examples):
    inputs = examples["input_text"]
    targets = examples["output_text"]
    model_inputs = tokenizer(inputs, max_length=512, truncation=True)
    labels = tokenizer(text_target=targets, max_length=512, truncation=True)
    model_inputs["labels"] = labels["input_ids"]
    return model_inputs

tokenized_datasets = dataset.map(preprocess_function, batched=True)

training_args = TrainingArguments(
    output_dir="app/models/relation_llm_extractor/fine_tuned_model/",
    evaluation_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=2,
    per_device_eval_batch_size=2,
    num_train_epochs=3,
    weight_decay=0.01,
    save_total_limit=2,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets["train"],
    eval_dataset=tokenized_datasets["validation"],
)

trainer.train()

model.save_pretrained("app/models/relation_llm_extractor/fine_tuned_model/")
tokenizer.save_pretrained("app/models/relation_llm_extractor/fine_tuned_model/")
