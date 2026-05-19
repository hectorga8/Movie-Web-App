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

// Configuración de Middlewares globales
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// --- CONEXIÓN A BASES DE DATOS ---
// En el monolito, conectamos a una sola DB o usamos URIs separadas según .env
const connectDB = async (uri, name) => {
  try {
    if (!uri) return null;
    const conn = await mongoose.createConnection(uri).asPromise();
    console.log(`✅ Conectado a MongoDB: ${name}`);
    return conn;
  } catch (err) {
    console.error(`❌ Error en ${name}:`, err.message);
    return null;
  }
};

// --- INYECCIÓN DE CONEXIONES (Para que los modelos sepan dónde guardar) ---
// Nota: Para que el portfolio sea "Limpio", los servicios deberían usar mongoose.connection
// Pero para el monolito, si usamos múltiples DBs, inyectamos la conexión si fuera necesario.
// Por simplicidad en Render, usaremos la conexión global por defecto.
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
