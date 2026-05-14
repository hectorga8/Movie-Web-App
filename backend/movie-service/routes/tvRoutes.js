const express = require('express');
const router = express.Router();
const tvController = require('../controllers/tvController');

router.get('/all', tvController.getAllTvShows);
router.get('/list/trending', tvController.getTrendingTvShows);
router.get('/:id', tvController.getTvShowById);

module.exports = router;
