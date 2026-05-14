const tmdbApi = require('../config/tmdb');

exports.getAllTvShows = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const { genre, year, yearStart, yearEnd, sort_by, watch_provider } = req.query;

    const tmdbPage1 = (page - 1) * 2 + 1;
    const tmdbPage2 = (page - 1) * 2 + 2;

    const baseParams = { language: 'es-ES', sort_by: sort_by || 'popularity.desc' };

    if (genre) baseParams.with_genres = genre;
    if (year) baseParams.first_air_date_year = year;
    if (yearStart && yearEnd) {
      baseParams['first_air_date.gte'] = `${yearStart}-01-01`;
      baseParams['first_air_date.lte'] = `${yearEnd}-12-31`;
    }
    if (watch_provider) {
      baseParams.with_watch_providers = watch_provider;
      baseParams.watch_region = 'ES';
      baseParams.with_watch_monetization_types = 'flatrate';
    }

    const params1 = { ...baseParams, page: tmdbPage1 };
    const params2 = { ...baseParams, page: tmdbPage2 };

    const [res1, res2] = await Promise.all([
      tmdbApi.get('/discover/tv', { params: params1 }),
      tmdbApi.get('/discover/tv', { params: params2 })
    ]);

    const combinedResults = [...res1.data.results, ...res2.data.results];
    
    res.json({
      page,
      results: combinedResults,
      total_pages: Math.ceil(res1.data.total_pages / 2),
      total_results: res1.data.total_results
    });
  } catch (error) {
    console.error("❌ Error TV All:", error.response?.data || error.message);
    res.status(500).json({ error: 'Error obteniendo series' });
  }
};

exports.getTrendingTvShows = async (req, res) => {
  try {
    const { data } = await tmdbApi.get('/trending/tv/week', { params: { language: 'es-ES' } });
    res.json(data.results || []);
  } catch (error) { 
    console.error("❌ Error TV Trending:", error.response?.data || error.message);
    res.status(500).json({ error: 'Error obteniendo series' }); 
  }
};

exports.getTvShowById = async (req, res) => {
  try {
    const { data } = await tmdbApi.get(`/tv/${req.params.id}`, { 
      params: { 
        language: 'es-ES',
        append_to_response: 'credits,videos,images,recommendations,similar,reviews,external_ids,content_ratings,watch/providers',
        include_video_language: 'es,en,null'
      } 
    });
    res.json(data);
  } catch (error) { res.status(500).json({ error: 'Error obteniendo serie' }); }
};
