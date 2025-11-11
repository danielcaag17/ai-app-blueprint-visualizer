import os

# Carpeta raíz de tu proyecto
ROOT_DIR = ".."  # o la ruta a tu proyecto

# Archivo de salida
OUTPUT_FILE = "../docs/project_file_structure.md"

# Carpetas o archivos a ignorar
IGNORE = {".venv", ".env", ".git", "__pycache__", "node_modules"}

def tree_to_md(path, prefix=""):
    md = ""
    items = sorted(os.listdir(path))
    for i, item in enumerate(items):
        if item in IGNORE:
            continue  # Saltar elementos a ignorar

        item_path = os.path.join(path, item)
        connector = "├── " if i < len(items) - 1 else "└── "

        if os.path.isdir(item_path):
            md += f"{prefix}{connector}{item}/\n"
            md += tree_to_md(item_path, prefix + ("│   " if i < len(items) - 1 else "    "))
        else:
            md += f"{prefix}{connector}{item}\n"
    return md

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write("# Estructura del Proyecto\n\n")
    f.write(tree_to_md(ROOT_DIR))

print(f"✅ Archivo {OUTPUT_FILE} generado correctamente")
