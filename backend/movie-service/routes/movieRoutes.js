const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/all', movieController.getAllMovies);
router.get('/search', movieController.searchMovies);
router.get('/trending', movieController.getTrendingMovies);
router.get('/popular', movieController.getPopularMovies);
router.get('/top-rated', movieController.getTopRatedMovies);
router.get('/now-playing', movieController.getNowPlayingMovies);
router.get('/:id', movieController.getMovieById);

module.exports = router;
