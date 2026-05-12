# 📑 Especificaciones Técnicas - Microservicios

Usa este documento en Notion para documentar tus endpoints.

## 🔐 Auth Service (Puerto 5001)
Base URL: `http://localhost:5001/api/auth`

| Método | Endpoint | Descripción | Protegido |
| :--- | :--- | :--- | :--- |
| POST | `/register` | Registra un nuevo usuario | No |
| POST | `/login` | Inicia sesión y devuelve JWT | No |
| GET | `/me` | Obtiene el perfil del usuario actual | Sí |

---

## 🎥 Movie Service (Puerto 5002)
Base URL: `http://localhost:5002/api/movies`

| Método | Endpoint | Descripción | Protegido |
| :--- | :--- | :--- | :--- |
| GET | `/trending` | Películas en tendencia del día | No |
| GET | `/:id` | Detalles de una película específica | No |
| GET | `/search?q=...` | Buscador de películas | No |

---
*Nota: Todos los endpoints protegidos requieren el header `Authorization: Bearer <token>`.*
