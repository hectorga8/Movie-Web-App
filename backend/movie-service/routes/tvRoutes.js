const express = require('express');
const router = express.Router();
const tvController = require('../controllers/tvController');
const cache = require('../middleware/cacheMiddleware');

router.get('/all', cache(600), tvController.getAllTvShows);
router.get('/list/trending', cache(1800), tvController.getTrendingTvShows);
router.get('/:id', cache(7200), tvController.getTvShowById);

module.exports = router;
