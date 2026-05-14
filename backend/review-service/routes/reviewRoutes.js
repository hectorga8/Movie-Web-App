const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

// Obtener todas las reviews populares (con query params para period y pagination)
router.get('/popular', reviewController.getPopularReviews);

// Obtener los reseñadores más populares
router.get('/reviewers/popular', reviewController.getPopularReviewers);
router.get('/reviewers/all-stats', reviewController.getAllReviewersStats);

// Obtener reviews populares de la semana
router.get('/popular/weekly', reviewController.getWeeklyPopularReviews);

// Obtener reviews para una película o serie específica
router.get('/media/:mediaType/:mediaId', reviewController.getReviewsForMedia);

// Obtener reseñas de un usuario específico
router.get('/user/:userId', reviewController.getReviewsForUser);

// Eliminar todos los datos de un usuario
router.delete('/user/:userId', reviewController.deleteUserData);

// Crear o actualizar una review (requiere autenticación)
router.post('/', authMiddleware, reviewController.createOrUpdateReview);

// Dar like o quitar like a una review (requiere autenticación)
router.post('/:id/like', authMiddleware, reviewController.toggleLikeReview);

module.exports = router;
