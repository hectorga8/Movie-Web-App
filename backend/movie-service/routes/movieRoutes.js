const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const cache = require('../middleware/cacheMiddleware');

// Usamos caché de 10 minutos (600s) para endpoints generales y 2 horas (7200s) para detalles específicos
router.get('/all', cache(600), movieController.getAllMovies);
router.get('/search', cache(600), movieController.searchMovies);
router.get('/trending', cache(1800), movieController.getTrendingMovies);
router.get('/popular', cache(1800), movieController.getPopularMovies);
router.get('/top-rated', cache(3600), movieController.getTopRatedMovies);
router.get('/now-playing', cache(1800), movieController.getNowPlayingMovies);
router.get('/:id/recommendations', cache(3600), movieController.getRecommendations);
router.get('/:id', cache(7200), movieController.getMovieById);

module.exports = router;
