import axios from 'axios';

// IMPORTANTE: Cambia 'localhost' por tu IP local (ej: 192.168.1.XX) para verlo en el móvil
const SERVER_IP = '192.168.1.36'; 

const api = axios.create({
  baseURL: `http://${SERVER_IP}:5002/api/movies`,
});

export const movieService = {
  getTrending: async () => {
    const { data } = await api.get('/trending');
    return data;
  },

  getPopular: async () => {
    const { data } = await api.get('/popular');
    return data;
  },

  searchMovies: async (query) => {
    const { data } = await api.get(`/search?query=${query}`);
    return data;
  },

  getImageUrl: (path, size = 'w500') => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
    return `https://image.tmdb.org/t/p/${size}${path}`;
  },

  getBackdropUrl: (path) => {
    if (!path) return 'https://via.placeholder.com/1280x720?text=No+Video';
    return `https://image.tmdb.org/t/p/w780${path}`;
  }
};

export default movieService;
