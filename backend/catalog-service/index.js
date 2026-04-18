require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 5002;

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Catalog-Service conectado a MongoDB'))
  .catch((err) => console.error('❌ Error conexión MongoDB (Catalog):', err));

// Rutas
app.use('/api/books', bookRoutes);

app.get('/', (req, res) => {
  res.send('Microservicio de Catálogo funcionando 📚');
});

app.listen(PORT, () => {
  console.log(`Catalog-Service corriendo en http://localhost:${PORT}`);
});
