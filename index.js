require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// --- CARGA DE RUTAS (Módulos) ---
const authRoutes = require('./backend/auth-service/routes/authRoutes');
const movieRoutes = require('./backend/movie-service/routes/movieRoutes');
const tvRoutes = require('./backend/movie-service/routes/tvRoutes');
const personRoutes = require('./backend/movie-service/routes/personRoutes');
const searchRoutes = require('./backend/movie-service/routes/searchRoutes');
const watchlistRoutes = require('./backend/watchlist-service/routes/watchlistRoutes');
const reviewRoutes = require('./backend/review-service/routes/reviewRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de CORS permisiva para producción (Evita bloqueos en móviles)
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// Logger básico para depuración en producción
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// --- CONEXIÓN A BASE DE DATOS UNIFICADA ---
// Para máxima velocidad en Render, usamos una sola conexión.
const dbURI = process.env.MONGO_URI || process.env.MONGO_URI_AUTH;

mongoose.connect(dbURI)
  .then(() => console.log('✅ Base de Datos conectada exitosamente'))
  .catch(err => console.error('❌ Error conexión DB:', err));

// --- MONTAJE DE RUTAS (Estructura de Gateway unificada) ---
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/tv', tvRoutes);
app.use('/api/person', personRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/', (req, res) => {
  res.send('🚀 CineBox Monolito Híbrido - Todos los servicios operativos');
});

// Endpoint de Salud
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`
  🌟 BACKEND UNIFICADO CORRIENDO
  ---------------------------------
  Servicios: Auth, Movies, Watchlist, Reviews
  Puerto: ${PORT}
  Región: Render / Local
  ---------------------------------
  `);
});
