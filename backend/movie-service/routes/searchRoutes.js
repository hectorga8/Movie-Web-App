const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const cache = require('../middleware/cacheMiddleware');

router.get('/multi', cache(300), searchController.searchMulti);

module.exports = router;
