const tmdbApi = require('../config/tmdb');

exports.searchMulti = async (req, res) => {
  try {
    const { query, sortBy } = req.query;
    if (!query) return res.status(400).json({ error: 'Falta parámetro query' });
    
    const { data } = await tmdbApi.get('/search/multi', { params: { query, language: 'es-ES' } });
    
    let results = data.results || [];
    
    // Filtramos para asegurar que sean películas, series o personas
    results = results.filter(item => ['movie', 'tv', 'person'].includes(item.media_type));

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
};
