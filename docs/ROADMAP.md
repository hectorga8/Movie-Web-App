# 🚀 CineSaaS - Roadmap Maestro de Desarrollo

Este documento refleja el estado actual de **CineSaaS**. Puedes copiar este contenido en Notion para gestionar tu progreso.

## 🏗️ Fase 0: Arquitectura y Entorno (Completado)
- [x] Estructura de microservicios (Auth, Movie, Review, Watchlist).
- [x] Dockerización de servicios (Dockerfiles y docker-compose).
- [x] Configuración inicial del Frontend con React 19 + Vite + Tailwind CSS.
- [x] Instalación de dependencias críticas (Axios, Framer Motion, Lucide, React Router).

## 🔐 Fase 1: Auth Service (En Progreso)
- [x] Estructura de controladores, modelos (User) y rutas.
- [x] Middleware de autenticación base.
- [ ] Implementación completa de Registro/Login con JWT.
- [ ] Integración con Google OAuth (Preparado en Frontend).
- [ ] Validación de perfiles de usuario.

## 🎬 Fase 2: Movie Service (Avanzado)
- [x] Lógica principal de integración con API externa (TMDb).
- [x] Refactorización de `index.js` en controladores/rutas para escalabilidad.
- [ ] Sistema de búsqueda y filtrado avanzado.
- [ ] Implementación de caché para optimizar llamadas a TMDb.

## 📱 Fase 3: Frontend y UI/UX (En Desarrollo)
- [x] Sistema de rutas con `react-router-dom`.
- [x] Biblioteca de componentes básicos (Auth, Layout, Common).
- [x] Implementación de Páginas (Landing, Dashboard, Película, Perfil, etc.).
- [ ] Integración de datos reales en los componentes (actualmente muchos usan datos estáticos).
- [ ] Pulido de animaciones con Framer Motion (Efecto "Netflix-style").

## 👥 Fase 4: Funciones Sociales y Listas (Estructura Lista)
- [x] **Review Service**: Modelos y rutas para valoraciones y comentarios creados.
- [x] **Watchlist Service**: Modelos para listas personalizadas y "por ver" creados.
- [ ] Lógica de negocio para compartir listas.
- [ ] Sistema de "Actividad de Amigos".

## 🚀 Fase 5: Despliegue y Refinamiento (Pendiente)
- [ ] Pruebas de integración entre microservicios.
- [ ] Optimización de imágenes y carga (Lighthouse score).
- [ ] Preparación para AWS (Lambda/DynamoDB) - *Opcional futuro*.

---
*Nota: Este Roadmap es dinámico. Marca los checks conforme avances en el código.*
*Última sincronización con el sistema: 12 de Mayo de 2026*
