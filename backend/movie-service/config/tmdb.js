const axios = require('axios');

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

module.exports = tmdbApi;
