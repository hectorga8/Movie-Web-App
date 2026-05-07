const Review = require('../models/Review');

// Crear o actualizar review
exports.createOrUpdateReview = async (req, res) => {
  try {
    const { mediaId, mediaType, mediaTitle, mediaPoster, mediaYear, rating, reviewText, watchedOn, liked } = req.body;
    const userId = req.user.id;
    const username = req.user.username; // Suponiendo que el middleware inyecta el username o lo mandamos desde el front.

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
        username,
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

// Obtener reviews populares (ordenadas por likes y fecha)
exports.getPopularReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ likes: -1, createdAt: -1 })
      .limit(10);
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error al obtener reviews populares:', error);
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
