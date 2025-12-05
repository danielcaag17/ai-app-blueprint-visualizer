# ================================
# 1️⃣ BUILDER - instala dependencias
# ================================
FROM python:3.13.7-slim AS builder

WORKDIR /app

# Instalar dependencias del sistema mínimas
# Se hace esto porque Muchas librerías de Python (especialmente ML o ciencia de datos) 
# tienen extensiones en C/C++ y requieren compilación
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential && \
    rm -rf /var/lib/apt/lists/*

# Copiar requirements primero para usar cache
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# ================================
# 2️⃣ FINAL IMAGE - solo runtime
# ================================
FROM python:3.13.7-slim AS runtime

WORKDIR /app

# Instalar SOLO lo necesario en producción
RUN pip install --no-cache-dir torch --index-url https://download.pytorch.org/whl/cpu

# Copiar solo dependencias ya instaladas
COPY --from=builder /usr/local/lib/python3.13 /usr/local/lib/python3.13
COPY --from=builder /usr/local/bin /usr/local/bin

# Copiar el código del backend
COPY . /app/backend

# Exponer el puerto de FastAPI
EXPOSE 8000

# Lanzar el servidor
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
