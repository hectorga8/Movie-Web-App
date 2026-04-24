import axios from 'axios';

// Detectamos automáticamente la IP del servidor (localhost o IP de red)
const SERVER_IP = window.location.hostname; 
const BASE_URL = `http://${SERVER_IP}:5002/api`;

export const movieService = {
  // PELÍCULAS
  getAllMovies: async (page = 1) => {
    const { data } = await axios.get(`${BASE_URL}/movies/all?page=${page}`);
    return data;
  },

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

  // PERSONAS
  getAllPersons: async (page = 1) => {
    const { data } = await axios.get(`${BASE_URL}/person/all?page=${page}`);
    return data;
  },

  getPersonDetail: async (id) => {
    const { data } = await axios.get(`${BASE_URL}/person/${id}`);
    return data;
  },

  // SERIES (TV)
  getAllSeries: async (page = 1) => {
    const { data } = await axios.get(`${BASE_URL}/tv/all?page=${page}`);
    return data;
  },

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
  },

  translateRole: (char, gender) => {
    if (!char) return '';
    const isFemale = gender === 1;
    let translated = char;

    // Reemplazos de palabras exactas ignorando mayúsculas/minúsculas
    translated = translated.replace(/\b(self|himself|herself)\b/ig, isFemale ? 'Ella misma' : 'Él mismo');
    translated = translated.replace(/\bguest star\b/ig, 'Estrella invitada');
    translated = translated.replace(/\bguest\b/ig, isFemale ? 'Invitada' : 'Invitado');
    translated = translated.replace(/\bnominee\b/ig, isFemale ? 'Nominada' : 'Nominado');
    translated = translated.replace(/\bhost\b/ig, isFemale ? 'Presentadora' : 'Presentador');
    translated = translated.replace(/\bpresenter\b/ig, isFemale ? 'Presentadora' : 'Presentador');
    translated = translated.replace(/\bnarrator\b/ig, isFemale ? 'Narradora' : 'Narrador');
    translated = translated.replace(/\bjudge\b/ig, isFemale ? 'Jueza' : 'Juez');
    translated = translated.replace(/\bcontestant\b/ig, 'Concursante');
    translated = translated.replace(/\bparticipant\b/ig, 'Participante');

    // Tags entre paréntesis comunes
    translated = translated.replace(/\(uncredited\)/ig, '(sin acreditar)');
    translated = translated.replace(/\(voice\)/ig, '(voz)');
    translated = translated.replace(/\(archive footage\)/ig, '(archivo)');
    translated = translated.replace(/\(archive sound\)/ig, '(audio de archivo)');
    translated = translated.replace(/\(creator\)/ig, '(creador)');
    translated = translated.replace(/\(writer\)/ig, '(guionista)');

    // Limpiar redundancias si TMDb manda "Self - Self"
    const parts = translated.split(' - ').map(p => p.trim());
    if (parts.length === 2 && parts[0] === parts[1]) {
      return parts[0];
    }

    return translated;
  }
};

export default movieService;
