const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  // --- CAMPOS DE PERFIL / ONBOARDING ---
  onboardingCompleted: {
    type: Boolean,
    default: false,
  },
  readingHabits: {
    type: String,
    default: '',
  },
  genres: {
    type: [String],
    default: [],
  },
  favoriteBooks: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
