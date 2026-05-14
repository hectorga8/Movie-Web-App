import axios from 'axios';

const SERVER_IP = window.location.hostname;
const BASE_URL = `http://${SERVER_IP}:5003/api`;

const watchlistApi = axios.create({
  baseURL: BASE_URL
});

watchlistApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const watchlistService = {
  getUserList: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const { data } = await watchlistApi.get(`/watchlist?${params}`);
    return data;
  },

  addItem: async (mediaId, mediaType, status = 'plan_to_watch', isFavorite = false, rating = null, title = null, image = null, inWatchlist = false) => {
    const { data } = await watchlistApi.post('/watchlist', { mediaId, mediaType, status, isFavorite, rating, title, image, inWatchlist });
    return data;
  },

  removeItem: async (mediaId, mediaType) => {
    const { data } = await watchlistApi.delete(`/watchlist/${mediaType}/${mediaId}`);
    return data;
  },

  checkStatus: async (mediaId, mediaType) => {
    const { data } = await watchlistApi.get(`/watchlist/check/${mediaType}/${mediaId}`);
    return data;
  },

  getUserWatchlistById: async (userId, options = { inWatchlist: true }) => {
    const params = new URLSearchParams();
    if (options.inWatchlist) params.append('inWatchlist', 'true');
    if (options.status) params.append('status', options.status);
    
    const { data } = await watchlistApi.get(`/watchlist/user/${userId}?${params.toString()}`);
    return data;
  },

  getUserStats: async (userId) => {
    const { data } = await watchlistApi.get(`/watchlist/user/${userId}/stats`);
    return data;
  },

  getMediaStats: async (mediaId, mediaType) => {
    try {
      const { data } = await watchlistApi.get(`/watchlist/media/${mediaType}/${mediaId}/stats`);
      return data;
    } catch (e) {
      return { watched: 0, favorites: 0 };
    }
  },

  getPublicLists: async () => {
    try {
      const { data } = await watchlistApi.get('/watchlist/public-lists');
      return data;
    } catch (error) {
      const validPosters = [
        "/qJ2tW6WMUDux911r6m7haRef0WH.jpg", "/8xV47NDrjdZDxaVCQAl3LuRE8iO.jpg", 
        "/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg", "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", 
        "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg"
      ];
      return {
        featured: [
          { id: '1', title: 'Top 500 Narrative Feature Films', creator: 'Official Lists', posters: validPosters, likes: 12000 },
          { id: '2', title: 'Most Fans on CineBox', creator: 'Official Lists', posters: validPosters, likes: 8500 },
          { id: '3', title: 'One Million Watched Club', creator: 'Alexander', posters: validPosters, likes: 9200 }
        ],
        popular: [
          { id: '4', title: '7 minutes of avant garde film', creator: 'Alex Fields', posters: validPosters, likes: 13000, moviesCount: 58 },
          { id: '5', title: 'The Great Directors', creator: 'Official Lists', posters: validPosters, likes: 371000, moviesCount: 500 },
          { id: '6', title: 'Movies to watch twice', creator: 'fcbarcelona', posters: validPosters, likes: 644000, moviesCount: 800 }
        ],
        recentlyLiked: [
          { id: '7', title: 'my favorite sapphic films 🧡', creator: 'cherry', posters: validPosters, likes: 872, moviesCount: 84, description: 'From my gay awakening until today I watched an insane amount of sapphic cinema...' },
          { id: '8', title: 'Top 5,000 Highest Rated', creator: 'Avery Rhodes', posters: validPosters, likes: 1000, moviesCount: 4953 }
        ],
        crewPicks: [
          { id: '9', title: 'Oscar-winning films: Best Picture', creator: 'Oscars', posters: validPosters, moviesCount: 98 },
          { id: '10', title: 'Oscar-winning films: International', creator: 'Oscars', posters: validPosters, moviesCount: 78 }
        ]
      };
    }
  },

  getAllUsersStats: async () => {
    try {
      const { data } = await watchlistApi.get('/watchlist/users/all-stats');
      return data;
    } catch (error) {
      console.error('Error fetching user stats:', error);
      return { items: [], lists: [] };
    }
  },

  getListById: async (id) => {
    try {
      const { data } = await watchlistApi.get(`/watchlist/list/${id}`);
      return data;
    } catch (error) {
      // Fallback para detalle si falla el backend
      return null; // El componente DetalleLista ya tiene su propio mock si esto es null
    }
  },

  getUserCustomLists: async (userId) => {
    try {
      const { data } = await watchlistApi.get(`/watchlist/custom-lists/user/${userId}`);
      return data;
    } catch (error) {
      console.error('Error fetching user custom lists:', error);
      return [];
    }
  },

  createList: async (listData) => {
    const { data } = await watchlistApi.post('/watchlist/custom-list', listData);
    return data;
  },

  updateList: async (id, listData) => {
    const { data } = await watchlistApi.put(`/watchlist/custom-list/${id}`, listData);
    return data;
  }
};

export default watchlistService;
