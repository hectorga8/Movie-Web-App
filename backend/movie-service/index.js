require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_TOKEN = process.env.TMDB_API_KEY; 

if (!TMDB_TOKEN) {
  console.error('⚠️ ERROR: TMDB_API_KEY no configurado en .env');
}

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    'Content-Type': 'application/json;charset=utf-8'
  },
  params: { language: 'es-ES' }
});

// --- ROUTES: MOVIES ---
app.get('/api/movies/trending', async (req, res) => {
  try {
    const { data } = await tmdbApi.get('/trending/movie/day');
    res.json(data.results);
  } catch (error) {
    res.status(500).json({ error: 'Error TMDb' });
  }
});

app.get('/api/movies/popular', async (req, res) => {
  try {
    const { data } = await tmdbApi.get('/movie/popular');
    res.json(data.results);
  } catch (error) {
    res.status(500).json({ error: 'Error TMDb' });
  }
});

app.get('/api/movies/search', async (req, res) => {
  try {
    const { data } = await tmdbApi.get('/search/movie', { params: { query: req.query.query } });
    res.json(data.results);
  } catch (error) {
    res.status(500).json({ error: 'Error TMDb' });
  }
});

// Detalle completo de Película
app.get('/api/movies/:id', async (req, res) => {
  try {
    const { data } = await tmdbApi.get(`/movie/${req.params.id}`, {
      params: { 
        append_to_response: 'credits,videos,recommendations,external_ids,reviews,release_dates,watch/providers',
        include_video_language: 'es,en,null' // Traer trailers en español, inglés o sin idioma
      }
    });
    res.json(data);
  } catch (error) {
    console.error('❌ Error Movie Detail:', error.message);
    res.status(500).json({ error: 'Error obteniendo película' });
  }
});

// --- ROUTES: TV SERIES ---

// 1. Ruta específica (Trending)
app.get('/api/tv/list/trending', async (req, res) => {
  try {
    const { data } = await tmdbApi.get('/trending/tv/day');
    res.json(data.results);
  } catch (error) {
    console.error('❌ Error TV Trending:', error.message);
    res.status(500).json({ error: 'Error TMDb' });
  }
});

// 2. Ruta con parámetro (Detalle por ID)
app.get('/api/tv/:id', async (req, res) => {
  try {
    const { data } = await tmdbApi.get(`/tv/${req.params.id}`, {
      params: { 
        append_to_response: 'credits,videos,recommendations,external_ids,reviews,content_ratings,watch/providers',
        include_video_language: 'es,en,null'
      }
    });
    res.json(data);
  } catch (error) {
    console.error('❌ Error TV Detail:', error.message);
    res.status(500).json({ error: 'Error TMDb' });
  }
});

app.listen(PORT, () => {
  console.log(`Movie Service listo en puerto ${PORT}`);
});
