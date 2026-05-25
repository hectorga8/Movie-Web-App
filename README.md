<div align="center">
  <img src="frontend/public/favicon.svg" alt="CineSaaS Logo" width="120" />
  
  # 🎬 CineSaaS (App de Películas)

  **Tu plataforma definitiva para descubrir, organizar y compartir tu pasión por el cine.**  
  Una experiencia de usuario impecable orientada a la comunidad, sin anuncios y enfocada en el *Product-Led Growth*.

  [![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express-Microservices-000000?logo=express&logoColor=white)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![TMDb API](https://img.shields.io/badge/API-TMDb-01B4E4?logo=themoviedb&logoColor=white)](https://www.themoviedb.org/)
  [![pnpm](https://img.shields.io/badge/pnpm-workspace-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
</div>

<br />

CineSaaS es un proyecto Full-Stack desarrollado como un monorepo, implementando una **Arquitectura de Microservicios** robusta y escalable. Su diseño oscuro, moderno y minimalista se inspira en las principales plataformas de *streaming* y Letterboxd, ofreciendo funcionalidades sociales avanzadas y un catálogo actualizado en tiempo real.

---

## 📋 Tabla de Contenidos

- [✨ Características Destacadas](#-características-destacadas)
- [📸 Galería y Demostración](#-galería-y-demostración)
- [🏗️ Arquitectura y Microservicios](#️-arquitectura-y-microservicios)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [🚀 Instalación Local y Docker](#-instalación-local-y-docker)

---

## ✨ Características Destacadas

*   **Catálogo en Tiempo Real:** Integración con la API de TMDb para acceder a información actualizada sobre películas, series, actores, trailers y tendencias en español.
*   **Gestión de Colecciones:** Crea listas personalizadas (públicas o privadas), marca contenido como "visto", y mantén una "Watchlist" al día.
*   **Comunidad y Reseñas:** Valora obras con un sistema de estrellas detallado, escribe críticas y compártelas con la comunidad.
*   **Búsqueda Avanzada:** Motor de búsqueda inteligente con filtros dinámicos (género, año, puntuación, plataforma de streaming).
*   **Experiencia de Usuario (UX) Premium:** Modo oscuro nativo, animaciones fluidas con Framer Motion, diseño 100% *responsive* y un enfoque total en la retención de usuarios.

---

## 📸 Galería y Demostración

### 🎥 Demo Interactivo (GIF / Video)
*Muestra de la navegación fluida, transiciones y experiencia de usuario.*
<div align="center">
  <img src="assets/gifDemo.gif" alt="Navegación CineSaaS" width="100%" />
</div>

<br/>

### 🖥️ Capturas de Pantalla

<div align="center">
  <h4>🏠 Página de Inicio (Dashboard)</h4>
  <img src="assets/Landing.png" alt="Dashboard" width="80%" />
  <p><em>Estrenos, tendencias y recomendaciones.</em></p>
  <br/>

  <h4>🔍 Explorador y Filtros</h4>
  <img src="assets/Filtros.png" alt="Explorador" width="80%" />
  <p><em>Búsqueda avanzada con autocompletado y filtros.</em></p>
  <br/>

  <h4>🎬 Detalles de Película/Serie</h4>
  <img src="assets/PeliculaPortada.png" alt="Detalle" width="80%" />
  <p><em>Trailers, reparto, sinopsis y reseñas de la comunidad.</em></p>
  <br/>

  <h4>👤 Perfil y Listas Personalizadas</h4>
  <img src="assets/Perfil.png" alt="Perfil" width="80%" />
  <p><em>Tu biblioteca personal, actividad y estadísticas.</em></p>
</div>

---

## 🏗️ Arquitectura y Microservicios

El proyecto utiliza un enfoque de **Monorepo gestionado con pnpm workspaces**, separando claramente la lógica de negocio en backend mediante microservicios independientes, facilitando futuros despliegues Serverless o en contenedores Docker.

1.  **Auth Service (`:5001`):** Autenticación JWT, gestión de perfiles, encriptación Bcrypt y roles.
2.  **Movie Service (`:5002`):** Proxy/Caché para la API de TMDb. Optimiza las llamadas externas y centraliza los datos del catálogo.
3.  **Watchlist Service (`:5003`):** Gestiona la biblioteca personal del usuario (pendientes, vistas, listas custom).
4.  **Review Service (`:5004`):** Centraliza la interacción social, comentarios, puntuaciones y *likes*.

---

## 🛠️ Stack Tecnológico

**Frontend:**
*   **Framework:** React 18 + Vite
*   **Estilos:** Tailwind CSS + Framer Motion (Animaciones UI)
*   **Estado y Peticiones:** Context API + Axios
*   **Navegación:** React Router v6

**Backend (Microservicios):**
*   **Entorno:** Node.js + Express
*   **Base de Datos:** MongoDB Atlas + Mongoose
*   **Seguridad:** JSON Web Tokens (JWT), Middlewares de autorización y validación.

**Herramientas y DevOps:**
*   **Gestor de Paquetes:** pnpm (Workspaces)
*   **Contenedores:** Docker & Docker Compose (Despliegue unificado)

---

## 🚀 Instalación Local y Docker

### Prerrequisitos
*   [Node.js](https://nodejs.org/) (v18 o superior)
*   [pnpm](https://pnpm.io/installation) (Gestor de paquetes recomendado para este monorepo)
*   Cuenta en [TMDb](https://www.themoviedb.org/documentation/api) para obtener tu API Key gratuita.
*   Instancia local de MongoDB o clúster en MongoDB Atlas.
*   [Docker](https://www.docker.com/) (opcional, para despliegue unificado)

### Pasos de Configuración

**1. Clonar el repositorio:**
```bash
git clone https://github.com/TuUsuario/cine-saas.git
cd cine-saas
```

**2. Instalar todas las dependencias del monorepo:**
```bash
pnpm install
```

**3. Variables de Entorno:**
Deberás configurar los archivos `.env` basándote en los `.example` proporcionados en cada directorio.
*   En `frontend/.env`: `VITE_TMDB_API_KEY`, etc.
*   En cada microservicio de `backend/*/.env`: `MONGO_URI`, `JWT_SECRET`, `PORT`, etc.

**4. Ejecutar el proyecto:**
Gracias a pnpm workspaces o herramientas como concurrently, puedes levantar todo (o usar Docker):

*Opción A: Levantar Frontend localmente*
```bash
cd frontend
pnpm dev
```

*Opción B: Levantar toda la infraestructura con Docker (Recomendado)*
```bash
docker-compose up -d --build
```

---

<div align="center">
  <i>Página desarrollada por Héctor Gómez Álvaro</i>
</div>
