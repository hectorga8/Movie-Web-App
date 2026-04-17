const mongoose = require('mongoose');

// 1. Definimos el Esquema (la "forma" del usuario)
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true, // No permite emails duplicados
    lowercase: true, // Lo guarda siempre en minúsculas
  },
  password: {
    type: String,
    // Eliminamos 'required: true' para permitir usuarios de Google
  },
}, {
  timestamps: true // Añade createdAt y updatedAt automáticamente
});

// 2. Creamos el Modelo basado en el Esquema
const User = mongoose.model('User', UserSchema);

module.exports = User;
