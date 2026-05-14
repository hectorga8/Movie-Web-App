const Review = require('../models/Review');

// Crear o actualizar review
exports.createOrUpdateReview = async (req, res) => {
  try {
    const { mediaId, mediaType, mediaTitle, mediaPoster, mediaYear, rating, reviewText, watchedOn, liked, username } = req.body;
    const userId = req.user.id;
    // Si viene en el body lo usamos, si no ponemos 'Usuario Anonimo' temporalmente para evitar el 500, o fallar limpiamente.
    const finalUsername = username || req.user.username || 'Usuario'; 

    // Comprobamos si ya existe una review del usuario para este media
    let review = await Review.findOne({ userId, mediaId, mediaType });

    if (review) {
      // Actualizamos
      review.rating = rating;
      review.reviewText = reviewText;
      review.watchedOn = watchedOn || new Date();
      review.mediaPoster = mediaPoster || review.mediaPoster;
      review.mediaYear = mediaYear || review.mediaYear;
      review.mediaLiked = liked || false;
      await review.save();
      return res.status(200).json({ message: 'Review actualizada correctamente', review });
    } else {
      // Creamos nueva
      review = new Review({
        userId,
        username: finalUsername,
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        mediaYear,
        rating,
        reviewText,
        watchedOn: watchedOn || new Date(),
        mediaLiked: liked || false
      });
      await review.save();
      return res.status(201).json({ message: 'Review creada correctamente', review });
    }
  } catch (error) {
    console.error('Error al guardar la review:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener reviews populares con filtrado por periodo y paginación
exports.getPopularReviews = async (req, res) => {
  try {
    const { period = 'all', page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    let query = {};
    const now = new Date();

    if (period === 'week') {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - 7);
      query.createdAt = { $gte: startOfWeek };
    } else if (period === 'month') {
      const startOfMonth = new Date(now);
      startOfMonth.setMonth(now.getMonth() - 1);
      query.createdAt = { $gte: startOfMonth };
    } else if (period === 'year') {
      const startOfYear = new Date(now);
      startOfYear.setFullYear(now.getFullYear() - 1);
      query.createdAt = { $gte: startOfYear };
    }

    const reviews = await Review.find(query)
      .sort({ likes: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Review.countDocuments(query);

    res.status(200).json({
      reviews,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    console.error('Error al obtener reviews populares:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener los reseñadores más populares (basado en likes totales)
exports.getPopularReviewers = async (req, res) => {
  try {
    const reviewers = await Review.aggregate([
      // Sort reviews by date descending first so that $push captures the most recent ones
      { $sort: { watchedOn: -1 } },
      {
        $group: {
          _id: "$userId",
          username: { $first: "$username" },
          totalLikes: { $sum: "$likes" },
          reviewCount: { $sum: 1 },
          recentReviews: { 
            $push: {
              mediaId: "$mediaId",
              mediaPoster: "$mediaPoster",
              rating: "$rating"
            } 
          }
        }
      },
      {
        $project: {
          _id: 1,
          username: 1,
          totalLikes: 1,
          reviewCount: 1,
          // Solo devolvemos las 4 últimas
          recentReviews: { $slice: ["$recentReviews", 4] }
        }
      },
      { $sort: { totalLikes: -1 } },
      { $limit: 20 }
    ]);
    res.status(200).json(reviewers);
  } catch (error) {
    console.error('Error al obtener reseñadores populares:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener reviews de un media específico
exports.getReviewsForMedia = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;
    const reviews = await Review.find({ mediaType, mediaId })
      .sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error al obtener reviews del media:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener reseñas de un usuario específico
exports.getReviewsForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const reviews = await Review.find({ userId })
      .sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error al obtener reseñas del usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar todos los datos de un usuario (Reviews y likes dados)
exports.deleteUserData = async (req, res) => {
  try {
    const { userId } = req.params;

    // 1. Eliminar todas las reseñas del usuario
    await Review.deleteMany({ userId });

    // 2. Quitar el rastro de likes del usuario en otras reseñas
    await Review.updateMany(
      { likedBy: userId },
      { 
        $pull: { likedBy: userId },
        $inc: { likes: -1 }
      }
    );

    res.status(200).json({ message: 'Datos del usuario eliminados correctamente del servicio de reseñas' });
  } catch (error) {
    console.error('Error al eliminar datos del usuario en Review Service:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Dar/Quitar like a una review
exports.toggleLikeReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ error: 'Review no encontrada' });

    const index = review.likedBy.indexOf(userId);
    if (index === -1) {
      // Dar like
      review.likedBy.push(userId);
      review.likes += 1;
    } else {
      // Quitar like
      review.likedBy.splice(index, 1);
      review.likes -= 1;
    }

    await review.save();
    res.status(200).json({ message: 'Like actualizado', likes: review.likes, likedBy: review.likedBy });
  } catch (error) {
    console.error('Error al hacer toggle like:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener estadísticas de todos los reseñadores (all-time + esta semana)
exports.getAllReviewersStats = async (req, res) => {
  try {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const stats = await Review.aggregate([
      {
        $group: {
          _id: "$userId",
          username: { $first: "$username" },
          totalWatched: { $sum: 1 },
          reviewCount: { $sum: 1 },
          totalLikes: { $sum: "$likes" },
          watchedThisWeek: { 
            $sum: { $cond: [{ $gte: ["$createdAt", lastWeek] }, 1, 0] } 
          },
          likesThisWeek: { 
            $sum: { $cond: [{ $gte: ["$createdAt", lastWeek] }, "$likes", 0] } 
          },
          recentReviews: { 
            $push: {
              mediaId: "$mediaId",
              mediaPoster: "$mediaPoster",
              rating: "$rating",
              createdAt: "$createdAt"
            } 
          }
        }
      },
      {
        $project: {
          _id: 1,
          username: 1,
          totalWatched: 1,
          reviewCount: 1,
          totalLikes: 1,
          watchedThisWeek: 1,
          likesThisWeek: 1,
          recentReviews: {
            $slice: [
              {
                $sortArray: { input: "$recentReviews", sortBy: { createdAt: -1 } }
              }, 
              4
            ]
          }
        }
      }
    ]);
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error in getAllReviewersStats:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener reviews populares de la semana (empezando por el lunes)
exports.getWeeklyPopularReviews = async (req, res) => {
  try {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday
    const distanceToMonday = (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
    
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - distanceToMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const reviews = await Review.find({
      createdAt: { $gte: startOfWeek, $lte: endOfWeek }
    })
      .sort({ likes: -1, createdAt: -1 })
      .limit(10);
      
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error al obtener reviews populares semanales:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
