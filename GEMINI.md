# Contexto del Proyecto: App de Películas (CineSaaS)

## 🎯 Objetivo del Proyecto
Desarrollar desde cero una plataforma de gestión y descubrimiento de cine bajo un modelo de suscripción (SaaS). El foco principal es el **APRENDIZAJE activo** del desarrollador en arquitecturas modernas y monetización.

## 🏗️ Arquitectura del Sistema (Microservicios)
Se mantiene la estructura de microservicios para facilitar la futura transición a **AWS (Lambda/API Gateway/DynamoDB)**.

### 🧩 Servicios Definidos:
1.  **Auth Service (Puerto 5001):** Gestión de identidades, JWT, perfiles de usuario y Google OAuth.
2.  **Movie Service:** Gestión del catálogo. Conexión con la **API de TMDb** para obtener datos en español, gestión de caché y filtros avanzados.
3.  **Watchlist Service:** Biblioteca personal (Películas guardadas, "vistas", listas personalizadas del usuario).
4.  **Billing Service (Suscripción 5€):** Integración con Stripe para gestionar el acceso premium y pagos recurrentes.
5.  **Social/Review Service:** Sistema de valoraciones, comentarios y la función de "compartir listas con amigos".

### 🛠 Stack Tecnológico Actual
- **Frontend:** React (Vite) + Tailwind CSS + Framer Motion (para una UI tipo Netflix).
- **Backend:** Node.js + Express (Arquitectura desacoplada).
- **Base de Datos:** MongoDB Atlas (Persistencia de usuarios y preferencias).
- **API Externa:** TMDb (The Movie Database) para el 100% de los datos de cine.

## 🧠 Filosofía de Desarrollo (IMPORTANTE)
1.  **Modo Mentor:** Gemini no entrega código "sin alma". Explica la lógica, los patrones de diseño y los conceptos antes de la implementación.
2.  **Aprendizaje Progresivo:** Construcción módulo a módulo. No se avanza al siguiente microservicio hasta que el anterior esté testeadoy comprendido.
3.  **Foco en el Desarrollador:** Explicación profunda de Hooks de React, Context API para el estado global y Middleware de Node.js para seguridad.
4.  **Calidad sobre Cantidad:** Prioridad absoluta a Clean Code, manejo de errores profesional y principios SOLID.

## 📋 Reglas de Interacción
- Toda la comunicación, explicaciones y comentarios de código deben ser en **Español**.
- Al introducir nuevas herramientas (ej. Axios para TMDb, Stripe SDK), explicar su función y alternativas.
- El objetivo final es un producto que pueda generar ingresos de 5€/mes, por lo que la experiencia de usuario (UX) es clave.