# 🧠 AI App Blueprint Visualizer

**AI App Blueprint Visualizer** es una herramienta que convierte ideas de aplicaciones en estructuras técnicas listas para desarrollar.  
Permite describir una aplicación en lenguaje natural y genera automáticamente:

- 📁 una arquitectura de carpetas coherente
- ⚙️ las tecnologías recomendadas
- 🧩 componentes y clases principales
<!-- - 🧠 un plan de desarrollo generado por IA -->

---

## 🚀 Objetivo

Facilitar el inicio de proyectos de software utilizando inteligencia artificial, reduciendo la fricción entre la idea inicial y la implementación técnica.  
Está diseñado para desarrolladores, startups y entusiastas que quieren validar o prototipar ideas rápidamente.

---

## 🧩 Funcionamiento General

1. El usuario describe su aplicación (p. ej. _“Una app móvil para reservar clases de yoga”_).
2. El sistema analiza la descripción y detecta los **módulos funcionales**.
3. La IA sugiere:
   - Tecnologías recomendadas (frontend, backend, DB, etc.)
   - Estructura base de archivos
   - Componentes y clases
4. Finalmente, el usuario puede **visualizar el blueprint** de la app en una interfaz visual o exportarlo como proyecto base.

---

## 🧰 Tecnologías Principales (provisionales)

| Área           | Tecnología                          | Descripción                                          |
| -------------- | ----------------------------------- | ---------------------------------------------------- |
| Backend        | **FastAPI** (Python)                | API modular y rápida para comunicación con IA        |
| Frontend       | **HTML + TailwindCSS + Vanilla JS** | Simplicidad y control total del diseño inicial       |
| IA Base        | **Llama 3 (Meta)** o **Mistral 7B** | Modelos open source, con opción de fine-tuning local |
| Visualización  | **Mermaid.js / D3.js**              | Para representar la arquitectura generada            |
| Almacenamiento | **SQLite o JSON local**             | Persistencia mínima para prototipo inicial           |

---

## 🔬 Posibles Extensiones Futuras

- 🎨 Interfaz más rica con React o Svelte.
- 🔄 Integración con IA especializada en generación de código (CodeLlama, StarCoder, etc.).
- 💾 Exportación directa a repositorios GitHub.
- 🧠 Entrenamiento incremental (fine-tuning) según feedback del usuario.

---

## 🧱 Estructura de Ficheros

```bash

ai-app-blueprint-visualizer/
│
├── backend/ # API principal con FastAPI y lógica de generación
│ ├── main.py # Punto de entrada FastAPI
│ ├── models/
│ │ ├── analysis_schemas.py
│ │ ├── blueprint_schemas.py
│ │ ├── request_schemas.py
│ │ └── response_schemas.py
│ ├── routes/
│ │ ├── blueprint.py # Endpoint para procesar descripciones y generar diagrama mermaid
│ │ └── full_blueprint.py
│ │ └── generate_structure.py
│ ├── services/
│ │ ├── ai_model.py # Interfaz con modelo LLM local
│ │ ├── mermaid_generator.py # Interfaz con modelo LLM local
│ │ └── structure_builder.py # Generador de estructura a partir del análisis
│ └── utils/
│ └──── helpers.py
│
├── frontend/ # Interfaz web para introducir ideas y visualizar resultados
│ ├── home.html
│ ├── premium-blueprint.html
│ ├── standard-blueprint.html
│ ├── css/
│ │ ├── pages/
│ │ │ ├── home.css
│ │ │ ├── premium-blueprint.css
│ │ │ └── standard-blueprint.css
│ │ ├── components.css
│ │ ├── globals.css
│ │ ├── layouts.css
│ │ └── reset.css
│ ├── js/
│ │ ├── events/
│ │ │ ├── clearTextarea.js
│ │ │ ├── eventsFactory.js
│ │ │ ├── eventsHome.js
│ │ │ ├── eventsPremiumBlueprint.js
│ │ │ ├── eventsStandardBlueprint.js
│ │ │ ├── generateBtn.js
│ │ │ ├── inputWatcher.js
│ │ │ ├── keyboardTextarea.js
│ │ │ └── reset.js
│ │ ├── api.js
│ │ ├── dom.js
│ │ ├── main.js
│ │ ├── render.js
│ │ └── utils.js
│ └── assets/
│ └──── logo.svg
│
├── ai/ # Modelos, prompts y configuración de IA
│ ├── base_model.py # Wrapper para modelo local (Llama, Mistral, etc.)
│ ├── prompts/
│ │ ├── structure_prompt.txt
│ │ └── tech_selection.txt
│ ├── fine_tuning/
│ │ └── dataset_examples.json
│ └── model_config.json
│
├── data/ # Ejemplos de entrada y salidas generadas
│ ├── examples/
│ │ └── example_description_1.json
│ └── generated_blueprints/
│ └── blueprint_2025_10_21.json
│
├── docs/ # Documentación, diagramas o notas de desarrollo
│
├── .gitignore
├── context.txt # Contexto actualizado de la aplicación
├── notas.txt # Futuras implementaciones
├── requirements.txt
├── README.md
└── LICENSE

```

---

## 💡 Instalación y Uso

```bash
# 1. Clonar repositorio
git clone https://github.com/danielcaag17/ai-app-blueprint-visualizer.git
cd ai-app-blueprint-visualizer

# 2. Crear entorno virtual e instalar dependencias
python -m venv .venv
source .venv/bin/activate  # en Linux/Mac
.venv\Scripts\activate     # en Windows
pip install -r requirements.txt

# 3. Ejecutar backend
uvicorn backend.main:app --reload

# 4. Abrir frontend/index.html en el navegador
```

---

## 🧠 Filosofía del Proyecto

"No se trata de generar código automáticamente, sino de enseñar a pensar en estructura."

Este proyecto pretende combinar IA + pensamiento arquitectónico, ayudando a los desarrolladores a construir con claridad y visión.
Cada iteración busca mejorar la comprensión mutua entre humanos y máquinas a la hora de diseñar software.

---

<!-- ## 📅 Estado Actual

- ✅ Semana 1: Definición del alcance y arquitectura inicial
- 🔄 Semana 2: Primer prototipo de interfaz y comunicación con IA
- ⏳ En progreso...

--- -->

## 🧑‍💻 Autor

Daniel Cañizares
Ingeniero en Informática especializado en software y apasionado por la creación de productos digitales con inteligencia artificial.

---

## 📜 Licencia

[MIT License](https://github.com/danielcaag17/ai-app-blueprint-visualizer/LICENSE) © 2025 Daniel Cañizares Aguilar
