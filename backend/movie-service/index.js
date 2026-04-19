require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
// Usamos el valor de tu .env (que es el token largo)
const TMDB_TOKEN = process.env.TMDB_API_KEY; 

if (!TMDB_TOKEN) {
  console.error('⚠️ ERROR: TMDB_API_KEY no configurado en .env');
} else {
  console.log('✅ Token detectado. Intentando conexión...');
}

// Configuración de Axios para usar Bearer Token (v4)
const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    'Content-Type': 'application/json;charset=utf-8'
  },
  params: {
    language: 'es-ES'
  }
});

// Endpoint Tendencias
app.get('/api/movies/trending', async (req, res) => {
  try {
    const { data } = await tmdbApi.get('/trending/movie/day');
    res.json(data.results);
  } catch (error) {
    console.error('❌ Error TMDb (Trending):', error.response?.status || error.message);
    res.status(error.response?.status || 500).json({ error: 'Error en TMDb' });
  }
});

// Endpoint Populares
app.get('/api/movies/popular', async (req, res) => {
  try {
    const { data } = await tmdbApi.get('/movie/popular');
    res.json(data.results);
  } catch (error) {
    console.error('❌ Error TMDb (Popular):', error.response?.status || error.message);
    res.status(500).json({ error: 'Error en TMDb' });
  }
});

// Endpoint Búsqueda
app.get('/api/movies/search', async (req, res) => {
  const { query } = req.query;
  try {
    const { data } = await tmdbApi.get('/search/movie', { params: { query } });
    res.json(data.results);
  } catch (error) {
    console.error('❌ Error TMDb (Search):', error.response?.status || error.message);
    res.status(500).json({ error: 'Error en la búsqueda' });
  }
});

app.listen(PORT, () => {
  console.log(`Movie Service listo en http://localhost:${PORT}`);
});
