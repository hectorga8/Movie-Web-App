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

// Configuración de CORS más robusta para producción
const allowedOrigins = [
  'http://localhost:5173',
  'https://cinebox-zrci.onrender.com',
  /\.vercel\.app$/ // Permite cualquier subdominio de vercel.app
];

app.use(cors({
  origin: (origin, callback) => {
    // Permitir peticiones sin origen (como apps móviles o curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(o => typeof o === 'string' ? o === origin : o.test(origin))) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// Logger básico para depuración en producción
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// --- CONEXIÓN A BASES DE DATOS ---
mongoose.connect(process.env.MONGO_URI_AUTH || process.env.MONGO_URI)
  .then(() => console.log('✅ Base de Datos principal conectada'))
  .catch(err => console.error('❌ Error DB:', err));

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
