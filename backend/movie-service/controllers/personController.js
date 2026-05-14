const tmdbApi = require('../config/tmdb');

exports.getAllPersons = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const tmdbPage1 = (page - 1) * 2 + 1;
    const tmdbPage2 = (page - 1) * 2 + 2;

    const [res1, res2] = await Promise.all([
      tmdbApi.get('/person/popular', { params: { language: 'es-ES', page: tmdbPage1 } }),
      tmdbApi.get('/person/popular', { params: { language: 'es-ES', page: tmdbPage2 } })
    ]);

    const combinedResults = [...res1.data.results, ...res2.data.results];
    
    res.json({
      page,
      results: combinedResults,
      total_pages: Math.ceil(res1.data.total_pages / 2),
      total_results: res1.data.total_results
    });
  } catch (error) {
    console.error("❌ Error Person All:", error.response?.data || error.message);
    res.status(500).json({ error: 'Error obteniendo personas' });
  }
};

exports.getPersonById = async (req, res) => {
  try {
    const { data } = await tmdbApi.get(`/person/${req.params.id}`, { 
      params: { 
        language: 'es-ES',
        append_to_response: 'combined_credits,external_ids,images,translations'
      } 
    });
    
    // Fallback: Si no hay biografía en español, buscar la versión en inglés
    if (!data.biography && data.translations && data.translations.translations) {
      const enTranslation = data.translations.translations.find(t => t.iso_639_1 === 'en');
      if (enTranslation && enTranslation.data && enTranslation.data.biography) {
        data.biography = enTranslation.data.biography;
      }
    }

    res.json(data);
  } catch (error) { 
    console.error("❌ Error Detalle Persona:", error.response?.data || error.message);
    res.status(500).json({ error: 'Error obteniendo detalles de persona' }); 
  }
};
