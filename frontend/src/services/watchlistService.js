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

  addItem: async (mediaId, mediaType, status = 'plan_to_watch', isFavorite = false, rating = null) => {
    const { data } = await watchlistApi.post('/watchlist', { mediaId, mediaType, status, isFavorite, rating });
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

  getPublicLists: async () => {
    try {
      const { data } = await watchlistApi.get('/watchlist/public-lists');
      return data;
    } catch (error) {
      // FALLBACK: Si el backend no responde, devolvemos datos para que puedas navegar
      return {
        featured: [
          { id: '1', title: 'Top 500 Narrative Feature Films', creator: 'Official Lists', posters: ['/8739161.jpg', '/7222246.jpg', '/8231856.jpg', '/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg', '/q6y0Go1tsYKoH6EUQ77SA9CqthP.jpg'], likes: 12000 },
          { id: '2', title: 'Most Fans on CineBox', creator: 'Official Lists', posters: ['/q6y0Go1tsYKoH6EUQ77SA9CqthP.jpg', '/8739161.jpg', '/7222246.jpg', '/8231856.jpg', '/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg'], likes: 8500 },
          { id: '3', title: 'One Million Watched Club', creator: 'Alexander', posters: ['/8231856.jpg', '/7222246.jpg', '/8739161.jpg', '/q6y0Go1tsYKoH6EUQ77SA9CqthP.jpg', '/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg'], likes: 9200 }
        ],
        popular: [
          { id: '4', title: '7 minutes of avant garde film', creator: 'Alex Fields', posters: ['/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg', '/8739161.jpg', '/7222246.jpg', '/8231856.jpg', '/q6y0Go1tsYKoH6EUQ77SA9CqthP.jpg'], likes: 13000, moviesCount: 58 },
          { id: '5', title: 'The Great Directors', creator: 'Official Lists', posters: ['/7222246.jpg', '/8739161.jpg', '/8231856.jpg', '/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg', '/q6y0Go1tsYKoH6EUQ77SA9CqthP.jpg'], likes: 371000, moviesCount: 500 },
          { id: '6', title: 'Movies to watch twice', creator: 'fcbarcelona', posters: ['/8231856.jpg', '/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg', '/q6y0Go1tsYKoH6EUQ77SA9CqthP.jpg', '/7222246.jpg', '/8739161.jpg'], likes: 644000, moviesCount: 800 }
        ],
        recentlyLiked: [
          { id: '7', title: 'my favorite sapphic films 🧡', creator: 'cherry', posters: ['/8739161.jpg', '/8231856.jpg', '/7222246.jpg', '/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg', '/q6y0Go1tsYKoH6EUQ77SA9CqthP.jpg'], likes: 872, moviesCount: 84, description: 'From my gay awakening until today I watched an insane amount of sapphic cinema...' },
          { id: '8', title: 'Top 5,000 Highest Rated', creator: 'Avery Rhodes', posters: ['/7222246.jpg', '/8739161.jpg', '/8231856.jpg', '/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg', '/q6y0Go1tsYKoH6EUQ77SA9CqthP.jpg'], likes: 1000, moviesCount: 4953 }
        ],
        crewPicks: [
          { id: '9', title: 'Oscar-winning films: Best Picture', creator: 'Oscars', posters: ['/8739161.jpg', '/8231856.jpg', '/7222246.jpg', '/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg', '/q6y0Go1tsYKoH6EUQ77SA9CqthP.jpg'], moviesCount: 98 },
          { id: '10', title: 'Oscar-winning films: International', creator: 'Oscars', posters: ['/7222246.jpg', '/8739161.jpg', '/8231856.jpg', '/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg', '/q6y0Go1tsYKoH6EUQ77SA9CqthP.jpg'], moviesCount: 78 }
        ]
      };
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

  createList: async (listData) => {
    const { data } = await watchlistApi.post('/watchlist/custom-list', listData);
    return data;
  }
};

export default watchlistService;
