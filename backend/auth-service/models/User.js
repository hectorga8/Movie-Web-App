const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  givenName: {
    type: String,
    default: '',
  },
  familyName: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['free', 'pro', 'admin'],
    default: 'free',
  },
  avatar: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
  website: {
    type: String,
    default: '',
  },
  pronoun: {
    type: String,
    default: 'They / their',
  },
  // --- CAMPOS DE PERFIL / ONBOARDING (CineBox) ---
  onboardingCompleted: {
    type: Boolean,
    default: false,
  },
  watchingHabits: {
    type: String,
    default: '',
  },
  genres: {
    type: [String],
    default: [],
  },
  favoriteMovies: {
    type: [String],
    default: [],
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
}, {
  timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
