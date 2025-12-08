# 1) Build stage
FROM node:22 AS builder

WORKDIR /app

# No es necesario pues ya está en nginx.conf configurado
# ARG VITE_BACKEND_URL
# ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN npm install -g pnpm

COPY package*.json ./

RUN pnpm install

COPY . .
RUN pnpm run build

# 2) Production stage (Nginx)
FROM nginx:stable-alpine AS runtime

# Copia configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# El build de React genera la carpeta "dist" (Vite)
# o "build" (CRA). Ajusta según el caso:
COPY --from=builder /app/dist /usr/share/nginx/html
# Si usas Create React App, cambia por:
# COPY --from=builder /app/build /usr/share/nginx/html

# nginx listens on port 80 by default
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]