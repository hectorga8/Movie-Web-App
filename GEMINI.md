# Contexto del Proyecto: App de Libros (SaaS)

## 🎯 Objetivo del Proyecto
Desarrollar desde cero una aplicación de gestión de libros bajo un modelo de suscripción. El propósito principal es el **APRENDIZAJE activo** del desarrollador.

## 🏗️ Arquitectura del Sistema (Microservicios)
Hemos optado por una arquitectura de microservicios para garantizar la escalabilidad y facilitar la futura migración a **AWS (Serverless/Lambda)**.

### 🧩 Servicios Definidos:
1.  **Auth Service (Puerto 5001):** Gestión de usuarios, registro, login (JWT) y OAuth con Google.
2.  **Catalog Service:** (Pendiente) Gestión del inventario de libros, búsqueda y filtros.
3.  **Library Service:** (Pendiente) Progreso de lectura y biblioteca personal del usuario.
4.  **Billing Service:** (Pendiente) Suscripciones y pagos con Stripe.
5.  **Review Service:** (Pendiente) Reseñas, valoraciones y sistema social.

### 🛠 Stack Tecnológico Actual
- **Frontend:** React (Vite) + Tailwind CSS.
- **Backend:** Node.js + Express (Estructura Multiservicio).
- **Base de Datos:** MongoDB (NoSQL) - Ideal para transicionar a DynamoDB.
- **Contenedores:** Docker (Próximamente para orquestar los servicios).

## 🧠 Filosofía de Desarrollo (IMPORTANTE)
1.  **Modo Mentor:** No generes el código completo del tirón. Explica los conceptos antes de implementarlos.
2.  **Paso a Paso:** Vamos a construir la app por módulos. No avances al siguiente paso hasta que yo confirme que he entendido el anterior.
3.  **Aprendizaje de React & Node:** Explica el porqué de los Hooks (`useState`, `useEffect`), el sistema de rutas y cómo funciona la arquitectura cliente-servidor.
4.  **Refactorización:** Cuando propongas código, señala las mejores prácticas para que aprenda a escribir código limpio desde el principio.

## 📋 Reglas de Interacción
- Prioriza la enseñanza sobre la entrega rápida de archivos.
- Siempre que introduzcas una librería nueva de Node o React, explica para qué sirve.
- Usa español para todas las explicaciones y comentarios de código.