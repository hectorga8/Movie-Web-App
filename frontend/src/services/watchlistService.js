import axios from 'axios';

// Detectamos automáticamente la IP del servidor (localhost o IP de red)
const SERVER_IP = window.location.hostname;
const BASE_URL = `http://${SERVER_IP}:5003/api`;

// Creamos una instancia de axios para añadir el token automáticamente
const watchlistApi = axios.create({
  baseURL: BASE_URL
});

// Interceptor para inyectar el token en cada petición
watchlistApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const watchlistService = {
  // Obtener toda la lista del usuario
  getUserList: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const { data } = await watchlistApi.get(`/watchlist?${params}`);
    return data;
  },

  // Añadir o actualizar un elemento
  addItem: async (mediaId, mediaType, status = 'plan_to_watch', isFavorite = false, rating = null) => {
    const { data } = await watchlistApi.post('/watchlist', {
      mediaId,
      mediaType,
      status,
      isFavorite,
      rating
    });
    return data;
  },

  // Eliminar un elemento
  removeItem: async (mediaId, mediaType) => {
    const { data } = await watchlistApi.delete(`/watchlist/${mediaType}/${mediaId}`);
    return data;
  },

  // Comprobar estado (si está en la lista)
  checkStatus: async (mediaId, mediaType) => {
    const { data } = await watchlistApi.get(`/watchlist/check/${mediaType}/${mediaId}`);
    return data;
  },

  // Obtener listas públicas para la página de Listas
  getPublicLists: async () => {
    // Usamos el mismo base_url pero el endpoint no requiere auth si configuramos bien el interceptor
    // o simplemente llamamos al endpoint público que creamos
    const { data } = await watchlistApi.get('/watchlist/public-lists');
    return data;
  }
};

export default watchlistService;
