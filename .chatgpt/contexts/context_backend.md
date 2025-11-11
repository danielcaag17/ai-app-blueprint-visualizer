# Contexto Backend – AI App Blueprint Visualizer

## 1. Arquitectura general

- **Repositorio:** El backend y frontend se encuentran actualmente en el mismo repositorio.

- **Arquitectura:** Monolítica. Todo el backend reside en `main.py` y se comunica con los modelos y servicios internos.

- **Interfaz:** API REST construida con FastAPI.

- **Estado actual:** Stateless. Futuro plan de gestión de usuarios y registro de conversaciones.

- **Stack tecnológico principal:**

  - Python 3.x
  - FastAPI
  - LLMs: base Google Flan-T5 para _entity/relation extraction_
  - JSON como formato de respuesta y persistencia temporal

---

## 2. Flujo de ejecución

1. **Petición del frontend al backend**

   - **Endpoint principal:** `POST /api/blueprint`
   - **Body de la petición:**
     - Descripción en lenguaje natural de la app
     - Especificaciones técnicas (frameworks, bases de datos, etc.)

2. **Procesamiento en el backend**

- **Extracción de Entidades y Atributos (LLM - Entity)**

  - Modelo especializado analiza la descripción para identificar entidades y atributos.

- **Extracción de Relaciones (LLM - Relation)**

  - Segundo modelo determina relaciones entre las entidades detectadas.

- **Generación de JSON intermedio**

  - Representa entidades, atributos y relaciones en un formato estandarizado.

- **Conversión a Mermaid.js**

  - Se genera código Mermaid a partir del JSON.

- **Generación de explicación textual (LLM - Description)**

  - Tercer modelo produce un texto explicativo sobre el diagrama generado.

3. **Respuesta al frontend**

   - Código Mermaid
   - Descripción textual del diagrama, incluyendo título, visión general y explicación de componentes
   - El frontend renderiza el diagrama y permite la interacción visual.

---

## 3. Endpoints principales

| Endpoint            | Prefijo        | Tags                 | Descripción                                               | Notas                      |
| ------------------- | -------------- | -------------------- | --------------------------------------------------------- | -------------------------- |
| /api/blueprint      | blueprint      | blueprint            | Genera el diagrama de clases + JSON + descripción textual | Estándar para usuarios     |
| /api/full-blueprint | full-blueprint | blueprint, structure | Genera blueprint completo + estructura de ficheros        | Para usuarios premium      |
| /api/structure      | structure      | structure            | Genera la estructura de ficheros base del proyecto        | Independiente de blueprint |

> Cada endpoint es independiente, aunque `/full-blueprint` combina la funcionalidad de `/blueprint` y `/structure`. Todas las respuestas son en formato JSON.

---

## 4. Lógica de IA y modelos

**Pipeline de LLMs:**

- Entity extractor (`entity_extractor`)
- Relation extractor (`relation_extractor`)
- Description generator (`description`)

**Implementación:**

- Modelos cargados en `model_manager.py` y llamados desde `main.py`.
- Todo el procesamiento ocurre dentro del servidor principal.
- Plantillas de entrada predefinidas con parámetros adicionales proporcionados por el usuario.

**Estado actual:**

- Endpoint `/blueprint` con respuesta hardcodeada
- Relation extractor aún no implementado
- Entity extractor entrenado parcialmente (dataset de 50-100 ejemplos)

---

## 5. Dataset y entrenamiento

**Ubicación:**

- `backend/ml_models/entity_extractor/dataset/`
- `backend/ml_models/relation_extractor/dataset/`

**Formato:** JSON (`input`, `entities`, `relations`)  
**Generación:** Semi-automática  
**Tamaño actual:** 50-100 ejemplos, suficiente para pruebas iniciales  
**Posible expansión futura:** scripts o endpoints para ampliación y evaluación del dataset

---

# 6. Persistencia

- Actualmente no hay persistencia permanente.
- Futuro: gestión de usuarios, conversaciones y logs.
- Respuestas temporales enviadas directamente al frontend como JSON.

---

# 7. Renderización de diagramas

- El backend solo produce JSON y código Mermaid.
- El frontend se encarga de renderizar Mermaid.js en SVG.
- Plan futuro: permitir descargar diagramas y documentación completa.

---

# 8. Estado actual del desarrollo

- Endpoints funcionales (hardcodeados)
- `/structure` planeado pero pendiente
- `entity_extractor` parcialmente desarrollado
- `relation_extractor` pendiente
- No hay Docker ni CI/CD configurado todavía

---

# 9. Estructura de directorios del backend

```bash
backend/
│
├── core/
│ ├── config.py
│ └── model_manager.py
├── ml_models/
│ ├── entity_extractor/
│ └── relation_extractor/
├── models/
├── routes/
├── services/
├── utils/
├── main.py
└── router.py
```
