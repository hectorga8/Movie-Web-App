require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5001; // Cambiamos a 5001 para que no choque con otros microservicios

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Auth-Service conectado a MongoDB'))
  .catch((err) => console.error('❌ Error conexión MongoDB:', err));

// Rutas
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Microservicio de Autenticación funcionando 📚');
});

app.listen(PORT, () => {
  console.log(`Auth-Service corriendo en http://localhost:${PORT}`);
});
