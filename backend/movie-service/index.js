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

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    'Content-Type': 'application/json;charset=utf-8'
  }
});

// --- MOVIES ---
app.get('/api/movies/trending', async (req, res) => {
  try {
    const { data } = await tmdbApi.get('/trending/movie/day', { params: { language: 'es-ES' } });
    res.json(data.results);
  } catch (error) { res.status(500).json({ error: 'Error TMDb' }); }
});

app.get('/api/movies/popular', async (req, res) => {
  try {
    const { data } = await tmdbApi.get('/movie/popular', { params: { language: 'es-ES' } });
    res.json(data.results);
  } catch (error) { res.status(500).json({ error: 'Error TMDb' }); }
});

app.get('/api/movies/:id', async (req, res) => {
  try {
    const { data } = await tmdbApi.get(`/movie/${req.params.id}`, {
      params: { 
        append_to_response: 'credits,videos,recommendations,external_ids,reviews,release_dates,watch/providers',
        language: 'es-ES',
        include_video_language: 'es,en,null'
      }
    });
    res.json(data);
  } catch (error) { res.status(500).json({ error: 'Error' }); }
});

// --- SEARCH GLOBAL (CON ORDENAMIENTO REAL) ---
app.get('/api/search/multi', async (req, res) => {
  try {
    const { query, sortBy = 'relevance' } = req.query;
    
    // Pedimos las primeras 5 páginas de TMDb (100 resultados) para tener una base sólida de ordenamiento
    const pagesToFetch = [1, 2, 3, 4, 5];
    const requests = pagesToFetch.map(p => 
      tmdbApi.get('/search/multi', { params: { query, language: 'es-ES', page: p } })
    );

    const responses = await Promise.all(requests);
    let allResults = [];
    
    responses.forEach(r => {
      allResults = [...allResults, ...r.data.results];
    });

    // 1. Limpieza: Solo películas y series que tengan póster (calidad)
    let filtered = allResults.filter(item => 
      (item.media_type === 'movie' || item.media_type === 'tv') && item.poster_path
    );

    // 2. Eliminar duplicados (a veces TMDb repite en diferentes páginas si el índice cambia)
    filtered = Array.from(new Map(filtered.map(item => [item.id, item])).values());

    // 3. Ordenamiento Global
    if (sortBy === 'popularity') {
      filtered.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => {
        const dateA = a.release_date || a.first_air_date || "0000-00-00";
        const dateB = b.release_date || b.first_air_date || "0000-00-00";
        return dateB.localeCompare(dateA);
      });
    }
    // Si es relevance, dejamos el orden original de TMDb (que ya viene mezclado en las 5 páginas)

    res.json({
      results: filtered,
      total_results: filtered.length
    });

  } catch (error) {
    console.error("❌ Error Search:", error.message);
    res.status(500).json({ error: 'Error en la búsqueda global' });
  }
});

// --- TV SERIES ---
app.get('/api/tv/list/trending', async (req, res) => {
  try {
    const { data } = await tmdbApi.get('/trending/tv/day', { params: { language: 'es-ES' } });
    res.json(data.results);
  } catch (error) { res.status(500).json({ error: 'Error' }); }
});

app.get('/api/tv/:id', async (req, res) => {
  try {
    const { data } = await tmdbApi.get(`/tv/${req.params.id}`, {
      params: { 
        append_to_response: 'credits,videos,recommendations,external_ids,reviews,content_ratings,watch/providers',
        language: 'es-ES',
        include_video_language: 'es,en,null'
      }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo serie' });
  }
});

app.listen(PORT, () => {
  console.log(`Movie Service listo en puerto ${PORT}`);
});
