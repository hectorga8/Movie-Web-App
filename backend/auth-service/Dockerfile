# Usamos una imagen de Node.js ligera
FROM node:20-alpine

# Instalamos pnpm globalmente
RUN npm install -g pnpm

# Directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiamos solo los archivos de dependencias primero (optimización de caché)
COPY package.json pnpm-lock.yaml ./

# Instalamos dependencias usando pnpm
RUN pnpm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto del servicio
EXPOSE 5001

# Comando para desarrollo (con nodemon)
CMD ["pnpm", "run", "dev"]
