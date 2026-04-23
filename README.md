<div align="center">
  <img src="frontend/public/favicon.svg" alt="CineBox Logo" width="100" />
  
  # 🎬 CineBox (CineSaaS)

  **Tu biblioteca personal de cine y series.**  
  Descubre, organiza, valora y comparte tu pasión por el séptimo arte.

  [![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![TMDb API](https://img.shields.io/badge/API-TMDb-01B4E4?logo=themoviedb&logoColor=white)](https://www.themoviedb.org/)
</div>

<br />

CineBox es una plataforma Full-Stack (MERN) diseñada con una estética minimalista, oscura y moderna (inspirada en Letterboxd y plataformas de streaming premium). Permite a los usuarios registrar su actividad cinéfila, crear listas personalizadas, interactuar con la comunidad y (próximamente) acceder a características exclusivas mediante una suscripción PRO.

---

## 📋 Tabla de Contenidos

- [✨ Características Principales](#-características-principales)
- [📸 Capturas de Pantalla](#-capturas-de-pantalla)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [🏗️ Arquitectura de Microservicios](#️-arquitectura-de-microservicios)
- [🚀 Instalación y Uso](#-instalación-y-uso)
- [🔮 Próximos Pasos (Roadmap)](#-próximos-pasos-roadmap)

---

## ✨ Características Principales

- **Catálogo Infinito:** Integración en tiempo real con la API de TMDb para acceder a miles de películas y series actualizadas.
- **Gestión de Perfil:** Crea tu cuenta, personaliza tu avatar, biografía y controla tus estadísticas de visionado.
- **Listas Personalizadas:** Crea listas públicas o privadas, añade películas fácilmente con autocompletado y compártelas con la comunidad.
- **Sistema de Reseñas y Ratings:** Valora películas con un sistema de estrellas (incluyendo medias estrellas) y escribe tus críticas.
- **Buscador Global Inteligente:** Búsqueda rápida con resultados instantáneos, historial de búsquedas recientes y tendencias actuales.
- **Diseño Responsive:** Experiencia fluida y adaptada tanto para navegadores de escritorio como para dispositivos móviles.
- **Modo Oscuro Nativo:** Interfaz diseñada con una paleta de colores oscuros (`#14181c`, `#2c3440`) para reducir la fatiga visual, con acentos en verde (`#00e054`) y azul (`#40bcf4`).

<br />

<!-- Demo de Navegación -->
<div align="center">
  <video src="https://i.imgur.com/OQdgS0n.mp4" autoplay loop muted playsinline width="100%"></video>
  <p><em>Ejemplo de navegación fluida entre películas, series y perfil.</em></p>
</div>

---

## 📸 Capturas de Pantalla

A continuación se muestra un vistazo a las diferentes secciones de la plataforma:

### Landing
Interfaz intuitiva para explorar el contenido y las funciones que ofrece la página.
<div align="center">
  <img src="https://via.placeholder.com/800x400?text=Captura+Landing+Aqui" alt="Landing" />
</div>

### Inicio
Visualiza estrenos, tendencias, noticias del mundillo y la actividad reciente de la comunidad.
<div align="center">
  <img src="https://i.imgur.com/zdpqvrw.png" alt="CineBox Dashboard" />
</div>

### Explorador de Películas y Series
Filtra el contenido por año, rating, popularidad, género y plataforma de streaming.
<div align="center">
  <img src="https://via.placeholder.com/800x400?text=Captura+Filtros+Aqui" alt="Filtros de CineBox" />
</div>

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** (Librería UI)
- **Vite** (Bundler ultrarrápido)
- **Tailwind CSS** (Estilizado de componentes)
- **React Router v6** (Navegación SPA)
- **Axios** (Peticiones HTTP)
- **Context API** (Gestión de estado global de Autenticación)

### Backend
- **Node.js & Express.js** (Entorno y Framework)
- **MongoDB & Mongoose** (Base de datos NoSQL y ODM)
- **JWT (JSON Web Tokens)** (Autenticación y Autorización)
- **Bcrypt.js** (Encriptación de contraseñas)

### APIs de Terceros
- **The Movie Database (TMDb) API:** Proveedor principal de datos (imágenes, sinopsis, cast, trailers).
- **DiceBear API:** Generación dinámica de avatares basados en el nombre de usuario.

---

## 🏗️ Arquitectura de Microservicios

El backend de CineBox está diseñado siguiendo una arquitectura modular orientada a microservicios para facilitar su escalabilidad y despliegue en entornos Cloud (Docker/AWS).

- **Auth Service (`puerto 5001`):** Gestión de usuarios, login, registro y validación JWT.
- **Movie Service (`puerto 5002`):** Actúa como proxy/caché conectándose a la API de TMDb. Evita exponer la API Key en el frontend.
- **Watchlist Service (`puerto 5003`):** Gestiona las listas personalizadas, el estado de visionado (pendiente/visto) y las interacciones sociales (likes, comentarios).

---

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (v18 o superior)
- MongoDB (Local o Atlas)
- Una API Key gratuita de [TMDb](https://www.themoviedb.org/documentation/api)

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/cinebox.git
cd cinebox
```

### 2. Configurar Variables de Envorno
Deberás crear un archivo `.env` en cada servicio del backend y en el frontend. (Revisa los archivos `.env.example` de cada carpeta).

Ejemplo para el Frontend (`frontend/.env`):
```env
VITE_TMDB_API_KEY=tu_api_key_aqui
```

Ejemplo para un microservicio (`backend/auth-service/.env`):
```env
PORT=5001
MONGO_URI=mongodb+srv://...
JWT_SECRET=tu_secreto_super_seguro
```

### 3. Instalar dependencias y ejecutar
Puedes ejecutar cada servicio individualmente o usar una herramienta como `Concurrently` o `Docker Compose` (recomendado).

**Para iniciar el Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Para iniciar los Microservicios (Ej: Auth Service):**
```bash
cd backend/auth-service
npm install
npm start
```

La aplicación estará disponible en `http://localhost:5173`.

---

## 🔮 Próximos Pasos (Roadmap)

- [ ] **Módulo de Billing (Stripe):** Implementación de pasarela de pagos para el nivel Premium (Suscripción PRO de 5€/mes).
- [ ] **Funciones Sociales:** Seguir usuarios, feed de actividad en tiempo real y comentarios en reviews.
- [ ] **Recomendaciones con IA:** Integración con OpenAI para sugerir películas basadas en el texto de las reseñas del usuario.
- [ ] **Despliegue Completo en Docker:** Archivo `docker-compose.yml` unificado para levantar toda la infraestructura con un solo comando.

---

<div align="center">
  <p>Construido con 🍿 por <a href="https://github.com/HectorSersi">HectorSersi</a></p>
</div>
