# Imagen base ligera
FROM node:20-alpine

# Instalamos pnpm globalmente
RUN npm install -g pnpm

# Directorio de trabajo
WORKDIR /usr/src/app

# Caché de dependencias
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Código fuente
COPY . .

# Exponemos el puerto
EXPOSE 5002

# Comando desarrollo
CMD ["pnpm", "run", "dev"]
