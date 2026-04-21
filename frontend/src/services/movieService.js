import axios from 'axios';

// Detectamos automáticamente la IP del servidor (localhost o IP de red)
const SERVER_IP = window.location.hostname; 
const BASE_URL = `http://${SERVER_IP}:5002/api`;

export const movieService = {
  // PELÍCULAS
  getTrending: async () => {
    const { data } = await axios.get(`${BASE_URL}/movies/trending`);
    return data;
  },

  getPopular: async () => {
    const { data } = await axios.get(`${BASE_URL}/movies/popular`);
    return data;
  },

  getNowPlaying: async () => {
    const { data } = await axios.get(`${BASE_URL}/movies/now-playing`);
    return data;
  },

  getTopRated: async () => {
    const { data } = await axios.get(`${BASE_URL}/movies/top-rated`);
    return data;
  },

  getMovieDetail: async (id) => {
    const { data } = await axios.get(`${BASE_URL}/movies/${id}`);
    return data;
  },

  searchMovies: async (query) => {
    const { data } = await axios.get(`${BASE_URL}/movies/search?query=${query}`);
    return data;
  },

  searchMulti: async (query, sortBy = 'relevance') => {
    const { data } = await axios.get(`${BASE_URL}/search/multi?query=${query}&sortBy=${sortBy}`);
    return data;
  },

  // SERIES (TV)
  getTVDetail: async (id) => {
    const { data } = await axios.get(`${BASE_URL}/tv/${id}`);
    return data;
  },

  getTVTrending: async () => {
    const { data } = await axios.get(`${BASE_URL}/tv/list/trending`);
    return data;
  },

  // NOTICIAS
  getNews: async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/movies/news`);
      return data;
    } catch (error) {
      console.error("Error fetching news:", error);
      return [];
    }
  },

  // HELPERS DE IMÁGENES
  getImageUrl: (path, size = 'w500') => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
    return `https://image.tmdb.org/t/p/${size}${path}`;
  },

  getBackdropUrl: (path) => {
    if (!path) return 'https://via.placeholder.com/1280x720?text=No+Video';
    return `https://image.tmdb.org/t/p/w1280${path}`;
  }
};

export default movieService;
