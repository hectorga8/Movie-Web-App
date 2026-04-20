# Imagen base ligera
FROM node:20-alpine

# Directorio de trabajo
WORKDIR /usr/src/app

# Caché de dependencias
COPY package*.json ./
RUN npm install

# Código fuente
COPY . .

# Puerto por defecto de Vite
EXPOSE 5173

# Comando para desarrollo
CMD ["npm", "run", "dev"]
