const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlistController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas públicas
router.get('/public-lists', watchlistController.getPublicLists);

// Rutas protegidas
router.use(authMiddleware);

router.post('/', watchlistController.addItem);
router.get('/', watchlistController.getUserList);
router.delete('/:mediaType/:mediaId', watchlistController.removeItem);
router.get('/check/:mediaType/:mediaId', watchlistController.checkItemStatus);

module.exports = router;
