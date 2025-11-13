# Contexto Frontend – AI App Blueprint Visualizer

## 1. Arquitectura general

- **Repositorio:** El frontend comparte repositorio con el backend, dentro del mismo monolito.

- **Arquitectura:** SPA (Single Page Application) desarrollada con React + TypeScript y Vite como bundler.

- **Comunicación:** A través de endpoints REST expuestos por FastAPI (principalmente `/api/blueprint`, `/api/full-blueprint` y `/api/structure`).

- **Gestión de esatdo:** Local y por contexto (UserContext), sin persistencia externa.

- **Stack tecnológico principal:**

  - React 18 + TypeScript
  - Vite
  - Mermaid.js (visualización de diagramas)
  - HTML + CSS clásico estructurado por vistas y componentes

- **Estado actual:** Funcional pero en fase inicial, sin persistencia ni autenticación real. Todo se ejecuta en cliente.

---

## 2. Flujo de ejecución

1. **Entrada del usuario**

   - El usuario escribe la descripción de la aplicación en un `textarea` dentro de `InputView`.

   - Al pulsar el botón "**Generate**", se inicia la llamada al backend según el tipo de usuario (`standard` o `premium`).

2. **Llamada al backend**

   - Si el usuario es `standard`, se usa `StandardBlueprintService` → endpoint `/api/blueprint`.

   - Si es `premium`, se usa `PremiumBlueprintService` → endpoint `/api/full-blueprint`.

   - Durante la petición, la vista cambia al modo loading, con efecto de transparencia y placeholders.

3. **Renderización del resultado**

   - Cuando llega la respuesta JSON:

     - `useMermaid` genera el diagrama SVG desde el código Mermaid.

     - `useTechnologies` construye el HTML con las tecnologías recomendadas.

     - Si es premium, `StructureTree` renderiza la estructura de carpetas y archivos.

   - El loading overlay desaparece gradualmente y se muestra la vista final (`OutputView` o `FullView`).

4. **Manejo de errores**

   - Si la petición falla, se muestra `ErrorView` con un mensaje y un botón para volver a la vista inicial (`InputView`).

---

## 3. Componentes principales

| Componente / Vista | Descripción                                                                                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **InputView**      | Vista inicial. Contiene el `textarea`, botones de envío y selección de tipo de usuario. Gestiona la transición al estado _loading_.                         |
| **OutputView**     | Vista principal para usuarios estándar. Muestra el diagrama Mermaid y una explicación textual.                                                              |
| **FullView**       | Vista avanzada (premium). Amplía `OutputView` con información tecnológica, estructura de archivos (`StructureTree`) y futuros botones de descarga (`.zip`). |
| **StructureTree**  | Árbol interactivo que representa la estructura de carpetas generada por el backend. Permite visualizar jerarquías y archivos.                               |
| **Header**         | Barra superior. Incluye el botón de cambio de tipo de usuario (`standard` ↔ `premium`).                                                                     |
| **Loading**        | Capa visual semitransparente usada durante la carga de datos, mostrando la vista difuminada hasta que se completa la respuesta.                             |
| **ErrorView**      | Pantalla mostrada ante errores de red o backend. Permite regresar a la vista inicial.                                                                       |

---

## 4. Hooks y contextos

**`useMermaid.tsx`**

- Inicializa Mermaid (en `App.tsx`) y convierte el `mermaidCode` recibido del backend en SVG interactivo para renderizarlo en la interfaz.

**`useTechnologies.tsx`**

- Recibe una lista de tecnologías sugeridas por el backend y genera el HTML correspondiente para su visualización dentro de `FullView`.

**`UserContext.tsx`** + **`useUser.ts`**

- Gestiona el tipo de usuario actual (`standard` o `premium`).

  - Se cambia mediante un botón en `Header`.

  - En el futuro servirá como base para un sistema de autenticación real con usuarios persistentes.

---

## 5. Persistencia y estado

- Actualmente **no existe persistencia permanente**.

- Todo el estado se mantiene en memoria durante la sesión.

- Futuras versiones podrían almacenar preferencias o historial del usuario (probablemente en backend).

- Los resultados del backend se transforman directamente y se muestran sin almacenamiento intermedio.

---

## 6. Estilos y assets

- Estilos CSS organizados por:
  - `globals.css` → reglas generales y reset
  - `layouts.css` → distribución principal
  - `components.css` → estilos compartidos
  - `pages/*` → estilos específicos por vista (`home`, `standard-blueprint`, `premium-blueprint`)
- Sin uso actual de imágenes o iconos más allá de `logo.svg` (placeholder).
- Plan futuro:
  - Soporte de **modo claro/oscuro**.
  - Personalización visual de diagramas Mermaid.js.

---

## 7. Funcionalidades premium

- Renderizado adicional de:
  - Árbol de estructura de ficheros (`StructureTree`)
  - Lista de tecnologías (vía `useTechnologies`)
- **Botón de descarga (.zip)** planeado para exportar la estructura de carpetas generada.
- Futuras funcionalidades:
  - Exportación completa del blueprint.
  - Descarga de documentación autogenerada.
  - Interactividad avanzada con diagramas Mermaid.

---

## 8. Estado actual del desarrollo

- Flujo principal (entrada → backend → render → error) funcional.
- Sistema de cambio de usuario operativo pero sin backend real.
- `FullView` y funcionalidades premium parcialmente implementadas.
- Falta integrar:
  - Testeo y CI/CD
  - Mejora visual (Tailwind + UI refinada)
  - Persistencia de usuarios
  - Modo oscuro y descargas

---

## 9. Estructura de directorios del frontend

```bash
frontend/
│
├── public/
├── src/
│   ├── api/
│   │   ├── blueprint/
│   │   │   ├── BaseBlueprintService.ts
│   │   │   ├── PremiumBlueprintService.ts
│   │   │   ├── StandardBlueprintService.ts
│   │   │   └── index.ts
│   │   └── api.ts
│   ├── assets/
│   │   ├── css/
│   │   │   ├── pages/
│   │   │   ├── components.css
│   │   │   ├── globals.css
│   │   │   ├── layouts.css
│   │   │   └── reset.css
│   │   └── logo.svg
│   ├── components/
│   │   ├── StructureTree/
│   │   ├── FullView.tsx
│   │   ├── Header.tsx
│   │   ├── InputView.tsx
│   │   ├── Loading.tsx
│   │   └── OutputView.tsx
│   ├── context/
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   ├── views/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── index.html
├── package.json
└── vite.config.ts
```
