require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const RSSParser = require('rss-parser');

const app = express();
const PORT = process.env.PORT || 5002;

const parser = new RSSParser({
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['content:encoded', 'contentEncoded']
    ]
  },
  headers: { 
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
});

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

// Middleware para asegurar que siempre enviamos el api_key como fallback si no es un token v4
tmdbApi.interceptors.request.use(config => {
  if (TMDB_TOKEN && TMDB_TOKEN.length < 50) { // Probablemente es una API Key v3
    config.params = { ...config.params, api_key: TMDB_TOKEN };
  }
  return config;
});

// --- NOTICIAS REALES (Espinof - Artículos directos con imágenes) ---
app.get('/api/movies/news', async (req, res) => {
  try {
    const feed = await parser.parseURL('https://www.espinof.com/index.xml');
    
    const news = feed.items.slice(0, 5).map(item => {
      // En Espinof, la imagen suele venir en media:content o enclosure
      let image = null;
      if (item.enclosure && item.enclosure.url) image = item.enclosure.url;
      if (!image && item.mediaContent) image = item.mediaContent.$.url;
      
      // Si no, buscamos en el contenido HTML
      if (!image) {
        const content = item.contentEncoded || item.content || "";
        const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
        if (imgMatch) image = imgMatch[1];
      }

      // Imagen por defecto si falla todo
      if (!image) image = "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop";

      return {
        id: item.guid || item.link,
        title: item.title,
        excerpt: (item.contentSnippet || "").substring(0, 180).replace(/<[^>]*>?/gm, '') + '...',
        image: image,
        source: "Espinof", // Crédito a la fuente
        url: item.link,
        date: item.pubDate ? new Date(item.pubDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }) : "Hoy"
      };
    });

    res.status(200).json(news);
  } catch (error) {
    console.error("❌ Error RSS:", error.message);
    res.status(200).json([]); // Fallback al front
  }
});

// --- TV SERIES ---
app.get('/api/tv/list/trending', async (req, res) => {
  try {
    const { data } = await tmdbApi.get('/trending/tv/week', { params: { language: 'es-ES' } });
    res.json(data.results || []);
  } catch (error) { 
    console.error("❌ Error TV Trending:", error.response?.data || error.message);
    res.status(500).json({ error: 'Error obteniendo series' }); 
  }
});

// --- PELÍCULAS ---
app.get('/api/search/multi', async (req, res) => {
  try {
    const { query, sortBy } = req.query;
    if (!query) return res.status(400).json({ error: 'Falta parámetro query' });
    
    const { data } = await tmdbApi.get('/search/multi', { params: { query, language: 'es-ES' } });
    
    let results = data.results || [];
    
    // Filtramos para asegurar que solo sean películas o series (no personas)
    results = results.filter(item => item.media_type === 'movie' || item.media_type === 'tv');

    if (sortBy === 'popularity') {
      results.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    } else if (sortBy === 'rating') {
      results.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
    } else if (sortBy === 'newest') {
      results.sort((a, b) => {
        const dateA = new Date(a.release_date || a.first_air_date || '1970-01-01');
        const dateB = new Date(b.release_date || b.first_air_date || '1970-01-01');
        return dateB - dateA;
      });
    }

    data.results = results;
    res.json(data);
  } catch (error) { 
    console.error("❌ Error Search Multi:", error.response?.data || error.message);
    res.status(500).json({ error: 'Error buscando' }); 
  }
});

app.get('/api/movies/search', async (req, res) => {
  try {
    const { query } = req.query;
    const { data } = await tmdbApi.get('/search/movie', { params: { query, language: 'es-ES' } });
    res.json(data);
  } catch (error) { res.status(500).json({ error: 'Error TMDb' }); }
});

app.get('/api/movies/trending', async (req, res) => {
  try {
    const { data } = await tmdbApi.get('/trending/movie/week', { params: { language: 'es-ES' } });
    res.json(data.results || []);
  } catch (error) {
    console.error("❌ Error Movie Trending:", error.response?.data || error.message);
    res.status(500).json({ error: 'Error TMDb Trending' });
  }
});

app.get('/api/movies/popular', async (req, res) => {
  try {
    const { data } = await tmdbApi.get('/movie/popular', { params: { language: 'es-ES' } });
    res.json(data.results || []);
  } catch (error) { res.status(500).json({ error: 'Error TMDb' }); }
});

app.get('/api/movies/top-rated', async (req, res) => {
  try {
    const { data } = await tmdbApi.get('/movie/top_rated', { params: { language: 'es-ES' } });
    res.json(data.results || []);
  } catch (error) { res.status(500).json({ error: 'Error TMDb' }); }
});

app.get('/api/movies/now-playing', async (req, res) => {
  try {
    const { data } = await tmdbApi.get('/movie/now_playing', { params: { language: 'es-ES' } });
    res.json(data.results || []);
  } catch (error) { res.status(500).json({ error: 'Error TMDb' }); }
});

app.get('/api/movies/:id', async (req, res) => {
  try {
    // Pedimos el detalle completo con créditos, fechas de estreno (PEGI), reseñas, recomendaciones, IDs externos y proveedores
    const { data } = await tmdbApi.get(`/movie/${req.params.id}`, { 
      params: { 
        language: 'es-ES',
        append_to_response: 'credits,videos,images,recommendations,similar,reviews,external_ids,release_dates,watch/providers',
        include_video_language: 'es,en,null'
      } 
    });
    res.json(data);
  } catch (error) { 
    console.error("❌ Error Detalle Película:", error.response?.data || error.message);
    res.status(500).json({ error: 'Error obteniendo detalles' }); 
  }
});

app.get('/api/tv/:id', async (req, res) => {
  try {
    const { data } = await tmdbApi.get(`/tv/${req.params.id}`, { params: { language: 'es-ES' } });
    res.json(data);
  } catch (error) { res.status(500).json({ error: 'Error obteniendo serie' }); }
});

app.listen(PORT, () => {
  console.log(`Movie Service listo en puerto ${PORT}`);
});
