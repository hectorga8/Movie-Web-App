const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlistController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas públicas
router.get('/public-lists', watchlistController.getPublicLists);
router.post('/feed-lists', watchlistController.getFeedLists);
router.get('/users/all-stats', watchlistController.getAllUsersStats);
router.get('/custom-lists/user/:userId', watchlistController.getUserCustomLists);
router.get('/user/:userId', watchlistController.getUserListById);
router.get('/user/:userId/stats', watchlistController.getUserStats);
router.get('/media/:mediaType/:mediaId/stats', watchlistController.getMediaStats);

// Eliminar todos los datos de un usuario
router.delete('/user/:userId', watchlistController.deleteUserData);

// Rutas protegidas
router.use(authMiddleware);

router.post('/custom-list', watchlistController.createCustomList);
router.put('/custom-list/:id', watchlistController.updateCustomList);
router.get('/list/:id', watchlistController.getCustomListById);
router.post('/', watchlistController.addItem);
router.get('/', watchlistController.getUserList);
router.delete('/:mediaType/:mediaId', watchlistController.removeItem);
router.get('/check/:mediaType/:mediaId', watchlistController.checkItemStatus);

module.exports = router;
