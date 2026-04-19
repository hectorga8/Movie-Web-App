import axios from 'axios';

// Configuración base de Axios para TMDb
const tmdbApi = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API_URL || 'https://api.themoviedb.org/3',
  params: {
    language: 'es-ES', // Siempre traeremos los datos en español
  },
});

// Interceptor para añadir el Bearer Token a todas las peticiones
tmdbApi.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_TMDB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const tmdbService = {
  // Obtener películas en tendencia
  getTrending: async (timeWindow = 'day') => {
    const { data } = await tmdbApi.get(`/trending/movie/${timeWindow}`);
    return data.results;
  },

  // Obtener películas populares
  getPopular: async () => {
    const { data } = await tmdbApi.get('/movie/popular');
    return data.results;
  },

  // Obtener trailers de una película
  getMovieTrailers: async (movieId) => {
    const { data } = await tmdbApi.get(`/movie/${movieId}/videos`);
    // Filtramos para obtener solo trailers de YouTube
    return data.results.filter(v => v.type === 'Trailer' && v.site === 'YouTube');
  },

  // Configuración de imágenes (Helper para construir URLs completas)
  getImageUrl: (path, size = 'w500') => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
};

export default tmdbService;
