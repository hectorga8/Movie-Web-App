# Usamos una imagen de Node.js ligera
FROM node:20-alpine

# Directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiamos solo los archivos de dependencias primero (optimización de caché)
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto del servicio
EXPOSE 5001

# Comando para desarrollo (con nodemon)
CMD ["npm", "run", "dev"]
