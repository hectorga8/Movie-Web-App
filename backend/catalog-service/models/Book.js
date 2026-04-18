const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título del libro es obligatorio'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'El autor es obligatorio'],
    trim: true
  },
  isbn: {
    type: String,
    unique: true,
    sparse: true // Permite que algunos libros no tengan ISBN temporalmente
  },
  description: {
    type: String,
    default: 'Sin descripción disponible.'
  },
  categories: {
    type: [String],
    default: []
  },
  thumbnail: {
    type: String,
    default: 'https://via.placeholder.com/150x200?text=No+Cover'
  },
  pageCount: {
    type: Number,
    default: 0
  },
  averageRating: {
    type: Number,
    default: 0
  },
  publishedDate: {
    type: String
  }
}, {
  timestamps: true // Para saber cuándo añadimos un libro al catálogo
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
