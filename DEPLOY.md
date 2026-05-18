# 🚀 Guía de Despliegue CineSaaS

Esta guía te ayudará a subir CineSaaS a un servidor propio (VPS) usando Docker.

## 📋 Requisitos Previos
1. Un servidor con **Ubuntu 22.04+** (ej: DigitalOcean, Hetzner, AWS EC2).
2. **Docker** y **Docker Compose** instalados en el servidor.
3. Tu código subido a un repositorio de **GitHub**.

## 🛠️ Pasos para el Despliegue

### 1. Clonar el código en el servidor
```bash
git clone https://github.com/tu-usuario/app-peliculas.git
cd app-peliculas
```

### 2. Configurar variables de entorno
Copia la plantilla y edítala con tus datos reales:
```bash
cp .env.production.example .env
nano .env
```
*Asegúrate de poner tu clave de TMDb y las URIs de MongoDB Atlas.*

### 3. Levantar la infraestructura
Ejecuta el siguiente comando para construir y arrancar todos los servicios en segundo plano:
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

### 4. Verificar el estado
Puedes ver si todo está corriendo correctamente con:
```bash
docker ps
```
Deberías ver los contenedores de `cinesaas-auth-prod`, `cinesaas-movies-prod`, etc., y el `cinesaas-gateway-prod` escuchando en el puerto 80.

## 🌐 Acceso a la web
Una vez completado, tu web estará disponible en la IP de tu servidor: `http://tu-ip-servidor`.

## 🔒 Próximos pasos recomendados
1. **Dominio:** Apunta un dominio (ej: `cinesaas.com`) a la IP de tu servidor.
2. **SSL (HTTPS):** Instala `certbot` en el servidor o usa un contenedor de Nginx con SSL para cifrar el tráfico.
3. **CORS:** Actualiza los microservicios para que solo acepten peticiones desde tu dominio oficial.
