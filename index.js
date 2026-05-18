require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Importar rutas de Auth Service
const authRoutes = require('./backend/auth-service/routes/authRoutes');

// Importar rutas de Movie Service
const movieRoutes = require('./backend/movie-service/routes/movieRoutes');
const tvRoutes = require('./backend/movie-service/routes/tvRoutes');
const personRoutes = require('./backend/movie-service/routes/personRoutes');
const searchRoutes = require('./backend/movie-service/routes/searchRoutes');
const newsRoutes = require('./backend/movie-service/routes/newsRoutes');

// Importar rutas de Watchlist Service
const watchlistRoutes = require('./backend/watchlist-service/routes/watchlistRoutes');

// Importar rutas de Review Service
const reviewRoutes = require('./backend/review-service/routes/reviewRoutes');

const app = express();
const PORT = process.env.PORT || 10000; // Puerto por defecto en Render

// Middlewares Globales
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Conexiones a Bases de Datos (Estrategia Multi-conexión)
const connectDB = (uri, name) => {
  if (!uri) {
    console.warn(`⚠️ Advertencia: No se ha definido URI para ${name}`);
    return;
  }
  mongoose.createConnection(uri)
    .asPromise()
    .then(() => console.log(`✅ Conectado a MongoDB - ${name}`))
    .catch(err => console.error(`❌ Error en conexión ${name}:`, err));
};

// En producción conectamos todas. En local, el orquestador usará las mismas URIs.
// Nota: Mongoose compartirá el estado global si usamos mongoose.connect, 
// para microservicios unificados es mejor que cada uno use su conexión si tienen DBs distintas,
// pero por simplicidad para el MVP usaremos la conexión principal para los modelos que no especifiquen otra.

mongoose.connect(process.env.MONGO_URI_AUTH || process.env.MONGO_URI)
  .then(() => console.log('✅ Orquestador conectado a la base de datos principal'))
  .catch(err => console.error('❌ Error conexión DB principal:', err));

// Montaje de Rutas (Idéntico a Nginx)
app.use('/api/auth', authRoutes);
app.use('/api/movies/news', newsRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/tv', tvRoutes);
app.use('/api/person', personRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/health', (req, res) => {
  res.send('CineSaaS API Gateway - Unificado y Operativo 🍿');
});

// Servir Frontend en producción (Opcional, pero útil si Render lo maneja todo)
// Si decides usar Vercel para el front, este bloque no se usará.
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, 'frontend/dist')));
  app.get('{*path}', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
    }
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Servidor Unificado corriendo en puerto ${PORT}`);
  console.log(`🔗 API disponible en http://localhost:${PORT}/api`);
});
