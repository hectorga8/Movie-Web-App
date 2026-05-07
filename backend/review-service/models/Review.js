const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Asumiendo que existe en el auth-service, aunque aquí guardaremos el string
  },
  username: {
    type: String,
    required: true
  },
  mediaId: {
    type: Number,
    required: true // ID de TMDb
  },
  mediaType: {
    type: String,
    enum: ['movie', 'tv'],
    required: true
  },
  mediaTitle: {
    type: String,
    required: true
  },
  mediaPoster: {
    type: String
  },
  mediaYear: {
    type: String
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  reviewText: {
    type: String,
    required: true
  },
  watchedOn: {
    type: Date,
    default: Date.now
  },
  mediaLiked: {
    type: Boolean,
    default: false
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Review', reviewSchema);
