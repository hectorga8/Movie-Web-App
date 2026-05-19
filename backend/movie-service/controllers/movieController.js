const tmdbApi = require('../config/tmdb');

exports.getAllMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const { genre, year, yearStart, yearEnd, sort_by, watch_provider } = req.query;

    const tmdbPage1 = (page - 1) * 2 + 1;
    const tmdbPage2 = (page - 1) * 2 + 2;

    const baseParams = { language: 'es-ES', sort_by: sort_by || 'popularity.desc' };

    if (genre) baseParams.with_genres = genre;
    if (year) baseParams.primary_release_year = year;
    if (yearStart && yearEnd) {
      baseParams['primary_release_date.gte'] = `${yearStart}-01-01`;
      baseParams['primary_release_date.lte'] = `${yearEnd}-12-31`;
    }
    if (watch_provider) {
      baseParams.with_watch_providers = watch_provider;
      baseParams.watch_region = 'ES';
      baseParams.with_watch_monetization_types = 'flatrate';
    }

    const params1 = { ...baseParams, page: tmdbPage1 };
    const params2 = { ...baseParams, page: tmdbPage2 };

    const [res1, res2] = await Promise.all([
      tmdbApi.get('/discover/movie', { params: params1 }),
      tmdbApi.get('/discover/movie', { params: params2 })
    ]);

    const combinedResults = [...res1.data.results, ...res2.data.results];
    
    res.json({
      page,
      results: combinedResults,
      total_pages: Math.ceil(res1.data.total_pages / 2),
      total_results: res1.data.total_results
    });
  } catch (error) {
    console.error("❌ Error Movie All:", error.response?.data || error.message);
    res.status(500).json({ error: 'Error obteniendo todas las películas' });
  }
};

exports.searchMovies = async (req, res) => {
  try {
    const { query } = req.query;
    const { data } = await tmdbApi.get('/search/movie', { params: { query, language: 'es-ES' } });
    res.json(data);
  } catch (error) { res.status(500).json({ error: 'Error TMDb' }); }
};

exports.getTrendingMovies = async (req, res) => {
  try {
    const { data } = await tmdbApi.get('/trending/movie/week', { params: { language: 'es-ES' } });
    res.json(data.results || []);
  } catch (error) {
    console.error("❌ Error Movie Trending:", error.response?.data || error.message);
    res.status(500).json({ error: 'Error TMDb Trending' });
  }
};

exports.getPopularMovies = async (req, res) => {
  try {
    const { data } = await tmdbApi.get('/movie/popular', { params: { language: 'es-ES' } });
    res.json(data.results || []);
  } catch (error) { res.status(500).json({ error: 'Error TMDb' }); }
};

exports.getTopRatedMovies = async (req, res) => {
  try {
    const { data } = await tmdbApi.get('/movie/top_rated', { params: { language: 'es-ES' } });
    res.json(data.results || []);
  } catch (error) { res.status(500).json({ error: 'Error TMDb' }); }
};

exports.getNowPlayingMovies = async (req, res) => {
  try {
    const { data } = await tmdbApi.get('/movie/now_playing', { params: { language: 'es-ES' } });
    res.json(data.results || []);
  } catch (error) { res.status(500).json({ error: 'Error TMDb' }); }
};

exports.getMovieById = async (req, res) => {
  try {
    const Review = require('../../review-service/models/Review');
    
    // SUPER-ENDPOINT: Peticiones en paralelo a TMDb y MongoDB (Reseñas internas)
    const [tmdbResponse, internalReviews] = await Promise.all([
      tmdbApi.get(`/movie/${req.params.id}`, { 
        params: { 
          language: 'es-ES',
          append_to_response: 'credits,videos,images,recommendations,similar,reviews,external_ids,release_dates,watch/providers',
          include_video_language: 'es,en,null'
        } 
      }),
      Review.find({ mediaId: req.params.id, mediaType: 'movie' }).sort({ createdAt: -1 }).lean().catch(() => [])
    ]);

    const data = tmdbResponse.data;
    data.internalReviews = internalReviews; // Inyectamos las reseñas internas en la misma respuesta

    res.json(data);
  } catch (error) { 
    console.error("❌ Error Detalle Película:", error.response?.data || error.message);
    res.status(500).json({ error: 'Error obteniendo detalles' }); 
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await tmdbApi.get(`/movie/${id}/recommendations`, { 
      params: { language: 'es-ES', page: 1 } 
    });
    res.json(data.results || []);
  } catch (error) {
    console.error("❌ Error Recomendaciones:", error.response?.data || error.message);
    res.status(500).json({ error: 'Error obteniendo recomendaciones' });
  }
};
