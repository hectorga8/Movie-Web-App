const mongoose = require('mongoose');

const CustomListSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  creator: {
    type: String,
    default: "Usuario"
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  tags: [{
    type: String
  }],
  isPublic: {
    type: Boolean,
    default: true
  },
  isRanked: {
    type: Boolean,
    default: false
  },
  movies: [{
    movieId: Number,
    title: String,
    posterPath: String,
    releaseDate: String,
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  likesCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('CustomList', CustomListSchema);
