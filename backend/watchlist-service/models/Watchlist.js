const mongoose = require('mongoose');

const WatchlistItemSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  mediaId: {
    type: Number,
    required: true
  },
  mediaType: {
    type: String,
    enum: ['movie', 'tv'],
    required: true
  },
  title: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  status: {
    type: String,
    enum: ['plan_to_watch', 'watched', 'dropped'],
    default: 'plan_to_watch'
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: null
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  inWatchlist: {
    type: Boolean,
    default: false
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

WatchlistItemSchema.index({ userId: 1, mediaId: 1, mediaType: 1 }, { unique: true });

module.exports = mongoose.model('WatchlistItem', WatchlistItemSchema);
