const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/multi', searchController.searchMulti);

module.exports = router;
