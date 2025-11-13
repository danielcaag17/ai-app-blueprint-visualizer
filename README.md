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

## 🧰 Tecnologías Principales

| Área                        | Tecnología / Herramienta                               | Descripción                                                                     |
| --------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------- |
| **Backend**                 | **FastAPI (Python 3.13)**                              | Framework ligero y rápido para exponer endpoints REST y gestionar la lógica IA. |
| **Frontend**                | **React + TypeScript + Vite**                          | SPA modular y reactiva para visualizar los blueprints y diagramas Mermaid.      |
| **IA Base**                 | **Modelos open source (Flan-T5, LLaMA 3, Mistral 7B)** | Procesamiento del texto y generación del análisis técnico.                      |
| **Visualización**           | **Mermaid.js**                                         | Renderización de diagramas arquitectónicos generados por la IA.                 |
| **Persistencia**            | **JSON temporal / SQLite (planeado)**                  | Almacenamiento mínimo para pruebas; planeado registro de usuarios y logs.       |
| **Estilos**                 | **CSS modular**                                        | Sistema visual simple, escalable y adaptable a temas futuros (dark/light).      |
| **Gestión de dependencias** | **pnpm (frontend)** / **pip (backend)**                | Entornos separados para desarrollo y despliegue.                                |

---

## 🔬 Posibles Extensiones Futuras

- 🧩 **Autenticación y gestión de usuarios** (tipos _standard_ y _premium_) con persistencia y sesión.
- 📦 **Descarga completa de blueprints:** exportar estructuras, diagramas y documentación en `.zip`.
- 💾 **Base de datos persistente (SQLite / PostgreSQL)** para guardar proyectos y logs.
- 🧠 **Fine-tuning de modelos IA** con dataset propio de descripciones y relaciones.
- 🎨 **Interfaz mejorada:** temas claro/oscuro, vistas interactivas y estilo visual refinado.
- 🔄 **Interactividad con diagramas Mermaid** (zoom, resalte, navegación de entidades).
- 🚀 **Integración CI/CD y contenedores Docker** para despliegue unificado backend + frontend.
- 🧰 **CLI o API pública** para generar blueprints desde línea de comandos.
- 🔄 **Integración con IA especializada** en generación de código (CodeLlama, StarCoder, etc.).
- 💾 **Exportación directa a repositorios GitHub**.

---

## 🧱 Estructura de Ficheros

```bash

ai-app-blueprint-visualizer/
│
├── .chatgpt/
│   ├── contexts/
│   │   ├── history/
│   │   │   ├── 2025-11-11_context_v1.md
│   │   │   └── _log.md
│   │   ├── context_backend.md
│   │   ├── context_frontend.md
│   │   └── context_general.md
│   ├── templates/
│   │   ├── architecture_design.md
│   │   ├── bug_analysis.md
│   │   ├── context_template.md
│   │   ├── docstring_generator.md
│   │   ├── refactor_code.md
│   │   └── test_generator.md
│   └── launcher.sh
│
├── backend/ # API principal con FastAPI y lógica de generación
│   ├── core/
│   │ ├── config.py
│   │ └── model_manager.py
│   ├── ml_models/
│   │ ├── entity_extractor/
│   │ └── relation_extractor/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── main.py
│   └── router.py
│
├── frontend/ # Interfaz web para introducir ideas y visualizar resultados
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   ├── blueprint/
│   │   │   │   ├── BaseBlueprintService.ts
│   │   │   │   ├── PremiumBlueprintService.ts
│   │   │   │   ├── StandardBlueprintService.ts
│   │   │   │   └── index.ts
│   │   │   └── api.ts
│   │   ├── assets/
│   │   │   ├── css/
│   │   │   │   ├── pages/
│   │   │   │   ├── components.css
│   │   │   │   ├── globals.css
│   │   │   │   ├── layouts.css
│   │   │   │   └── reset.css
│   │   │   └── logo.svg
│   │   ├── components/
│   │   │   ├── StructureTree/
│   │   │   ├── FullView.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── InputView.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── OutputView.tsx
│   │   ├── context/
│   │   │   ├── UserContext.tsx
│   │   │   └── useUser.ts
│   │   ├── hooks/
│   │   │   ├── useMermaid.tsx
│   │   │   └── useTechnologies.tsx
│   │   ├── types/
│   │   │   ├── apiResponse.ts
│   │   │   └── structure.ts
│   │   ├── utils/
│   │   │   └── ViewManager.tsx
│   │   ├── views/
│   │   │   ├── ErrorView.tsx
│   │   │   ├── InitialView.tsx
│   │   │   └── ResultView.tsx
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
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
├── scripts/ # Scripts varios
│
├── .gitignore
├── LICENSE
├── README.md
├── notas.txt # Futuras implementaciones
├── requirements-dev.txt # Exactamente todas las dependencias y versiones (pip freeze > requirements-dev.txt)
└── requirements.txt

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
uvicorn backend.main:app --reload  # servicio disponible en http://localhost:8000

# 4. Ejecutar frontend (otra terminal)
cd frontend
pnpm install               # o npm install / yarn install
pnpm run dev               # inicia el servidor (http://localhost:5173)
```

---

## 🧠 Filosofía del Proyecto

"No se trata de generar código automáticamente, sino de enseñar a pensar en estructura."

Este proyecto pretende combinar IA + pensamiento arquitectónico, ayudando a los desarrolladores a construir con claridad y visión.
Cada iteración busca mejorar la comprensión mutua entre humanos y máquinas a la hora de diseñar software.

---

## 🧑‍💻 Autor

Daniel Cañizares
Ingeniero en Informática especializado en software y apasionado por la creación de productos digitales con inteligencia artificial.

---

## 📜 Licencia

[MIT License](https://github.com/danielcaag17/ai-app-blueprint-visualizer/LICENSE) © 2025 Daniel Cañizares Aguilar
