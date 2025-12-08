# 🐳 Docker: Guía Completa

Este documento explica cómo está configurado el entorno Docker del proyecto, tanto para **producción** como para **desarrollo**, detallando las diferencias entre ambos, la estructura de imágenes, multi-stage builds, volúmenes y optimizaciones aplicadas.

---

## 📦 1. Estructura General

El proyecto utiliza Docker para encapsular:

- Backend (FastAPI + modelos IA)
- Frontend (React + Vite + Nginx)
- Configuraciones separadas para:
  - Producción: imágenes optimizadas, sin hot reload, servidor Nginx, etc.
  - Desarrollo: recompilación rápida, volúmenes locales, servidores de desarrollo, recarga automática.

Ambos entornos comparten la misma estructura de servicios, pero con comportamientos y Dockerfiles distintos.

---

## 🚀 2. Producción

### 2.1 docker-compose (producción)

En producción se utiliza:

```bash
docker-compose.yaml
```

Este archivo define:

#### ✔️ Servicios

- backend
- frontend

Ambos conectados mediante una **network interna**, lo que permite comunicación rápida sin exponer puertos adicionales.

#### ✔️ Naming de imágenes

Las imágenes generadas siguen el patrón:

```bash
blueprint_visualizer-backend:prod
blueprint_visualizer-frontend:prod
```

#### ✔️ Backend en producción

Puertos: `8000:8000`

- Variables:

  - `ENV=production`
  - `PYTHONUNBUFFERED=1`

- Sin volúmenes (imagen 100% inmutable)
- Ejecutado con Uvicorn sin `--reload`

#### ✔️ Frontend en producción

- Puertos: `3000:80`
  (el contenedor expone Nginx en el puerto 80)
- Depende del backend
- Sirve el build estático generado por Vite mediante Nginx

---

### 2.2 Dockerfile del backend (producción)

El backend utiliza un multi-stage build para reducir drásticamente el tamaño de la imagen.

#### 🏗️ Stage 1: builder

Incluye solo lo necesario para compilar dependencias

- Se copian `requirements.txt`
- Se instalan dependencias base (sin torch)
- Se generan ruedas/precompilados necesarios

#### 🚀 Stage 2: runtime

- Se instala únicamente **torch** (la dependencia más pesada)
- Se copian las dependencias del builder
- Se copia el proyecto
- Se ejecuta Uvicorn sin recarga automática

Resultado:
📉 Imagen reducida de ~15GB → ~3GB
Gracias a separar la instalación de `torch` y aprovechar caching.

---

### 2.3 Dockerfile del frontend (producción)

También usa multi-stage build:

#### 🏗️ Stage 1: builder

- Instala dependencias Node
- Ejecuta `pnpm run build`

#### 🚀 Stage 2: runtime (Nginx)

- Copia el resultado del build
- Copia la configuración Nginx personalizada → `/etc/nginx/conf.d/default.conf`
- Expone puerto `80`
- Ejecuta Nginx como servidor final

---

## 🔧 3. Desarrollo

El entorno de desarrollo está optimizado para **rapidez**, no para tamaño de imagen.

### 3.1 docker-compose.dev.yaml

Para ejecutarlo:

```bash
docker-compose -f docker compose.dev.yaml up --build
```

Imágenes generadas:

```bash
blueprint_visualizer-backend:dev
blueprint_visualizer-frontend:dev
```

#### ✔️ Diferencias clave frente a producción:

**Backend**

- Usa volúmenes:

```yml
volumes:
  - ./backend:/app/backend
```

Esto permite actualizar código del backend sin reconstruir la imagen completa.

**Frontend**

- Puertos: `5173:5173` (servidor Vite)
- Variable:

```bash
VITE_BACKEND_URL=http://localhost:8000/api
```

- Volúmenes:

```yml
volumes:
  - ./frontend:/app
  - /app/node_modules
```

Esta combinación:

- Permite hot reload
- Aísla `node_modules` del host (evita incompatibilidades entre SO)

---

### 3.2 Dockerfile.dev del backend

Un solo stage:

- Instala dependencias
- Copia el código
- Arranca FastAPI con `--reload`

Más simple, más rápido, pero menos optimizado.

---

### 3.3 Dockerfile.dev del frontend

Un solo stage:

- Instala dependencias
- Expone puerto `5173`

Ejecuta:

```bash
pnpm run dev
```

---

## 🔍 4. Tabla comparativa (Producción vs Desarrollo)

| Característica    | Producción                           | Desarrollo                        |
| ----------------- | ------------------------------------ | --------------------------------- |
| compose file      | docker-compose.yaml                  | docker-compose.dev.yaml           |
| multi-stage build | ✔️ sí                                | ❌ no                             |
| volúmenes         | ❌ no                                | ✔️ sí (código backend + frontend) |
| servidor frontend | Nginx                                | Vite dev server                   |
| puertos frontend  | 3000 → 80                            | 5173 → 5173                       |
| tamaño de imagen  | muy reducido                         | más grande                        |
| hot reload        | ❌                                   | ✔️                                |
| torch             | instalado solo en runtime optimizado | instalado directamente            |

---

## 💡 5. Posibles mejoras futuras

- Montar solo rutas necesarias en vez de todo el backend
- Añadir perfiles: `docker compose --profile dev up`
- Crear imágenes base caché para torch y modelos
- Añadir un servicio opcional para correr tests automáticamente

---

## 🧪 6. Comandos útiles

```bash
# Levantar entorno producción
docker compose up --build

# Levantar entorno producción en modo detach
docker compose up --build -d

# Levantar desarrollo
docker compose -f docker-compose.dev.yaml up --build

# Detener
docker compose down

# Ver logs
docker compose logs -f

# Limpieza profunda
docker system prune -a
```
