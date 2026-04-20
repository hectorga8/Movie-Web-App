# Imagen base ligera
FROM node:20-alpine

# Directorio de trabajo
WORKDIR /usr/src/app

# Caché de dependencias
COPY package*.json ./
RUN npm install

# Código fuente
COPY . .

# Exponemos el puerto
EXPOSE 5002

# Comando desarrollo
CMD ["npm", "run", "dev"]
