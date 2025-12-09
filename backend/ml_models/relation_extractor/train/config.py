from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
OUTPUT_DIR = BASE_DIR / "fine_tuned_model"
RANDOM_SEED = 42
TRAIN_RATIO = 0.8

CONFIG = {
    "base_dir": BASE_DIR,
    "output_dir": OUTPUT_DIR,
    "raondom_seed": RANDOM_SEED,
    "train_ratio": TRAIN_RATIO,
    "epochs": 10,
    "batch_size": 32,
    "model_name": "relation_extractor"
}
