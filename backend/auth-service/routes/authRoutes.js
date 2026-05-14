const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/google', authController.googleAuth);

// Rutas de perfil
router.get('/me', protect, authController.getMe);
router.put('/profile', protect, authController.updateProfile);
router.post('/toggle-favorite/:movieId', protect, authController.toggleFavoriteMovie);
router.put('/change-password', protect, authController.changePassword);
router.delete('/account', protect, authController.deleteAccount);

// Perfiles públicos
router.get('/profile/:identifier', authController.getUserProfile);
router.post('/users/bulk', authController.getBulkUsers);

// Funcionalidad de seguir/dejar de seguir
router.post('/follow/:id', protect, authController.followUser);
router.delete('/follow/:id', protect, authController.unfollowUser);

module.exports = router;
