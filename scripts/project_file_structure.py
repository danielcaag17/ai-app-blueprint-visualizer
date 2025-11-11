import os

# Carpeta raíz de tu proyecto
ROOT_DIR = ".."  # o la ruta a tu proyecto

# Archivo de salida
OUTPUT_FILE = "../docs/project_file_structure.md"

# Carpetas o archivos a ignorar
IGNORE = {".venv", ".env", ".git", "__pycache__", "node_modules", "dist", "build"}

def tree_to_md(path, prefix=""):
    md = ""
    items = sorted(os.listdir(path))
    
    # Separar carpetas y archivos
    dirs = [item for item in items if os.path.isdir(os.path.join(path, item)) and item not in IGNORE]
    files = [item for item in items if os.path.isfile(os.path.join(path, item)) and item not in IGNORE]
    
    # Primero procesar carpetas
    for i, folder in enumerate(dirs):
        folder_path = os.path.join(path, folder)
        connector = "├── " if i < len(dirs) - 1 or files else "└── "
        md += f"{prefix}{connector}{folder}/\n"
        md += tree_to_md(folder_path, prefix + ("│   " if i < len(dirs) - 1 or files else "    "))
    
    # Luego procesar archivos
    for j, file in enumerate(files):
        connector = "├── " if j < len(files) - 1 else "└── "
        md += f"{prefix}{connector}{file}\n"

    return md

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write("# Estructura del Proyecto\n\n")
    f.write(tree_to_md(ROOT_DIR))

print(f"✅ Archivo {OUTPUT_FILE} generado correctamente")
