const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

// Obtener todas las reviews populares (para el index)
router.get('/popular', reviewController.getPopularReviews);

// Obtener reviews para una película o serie específica
router.get('/media/:mediaType/:mediaId', reviewController.getReviewsForMedia);

// Crear o actualizar una review (requiere autenticación)
router.post('/', authMiddleware, reviewController.createOrUpdateReview);

// Dar like o quitar like a una review (requiere autenticación)
router.post('/:id/like', authMiddleware, reviewController.toggleLikeReview);

module.exports = router;
