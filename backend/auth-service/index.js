require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5001; 

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB (con validación de URI para evitar crashes)
if (!process.env.MONGO_URI) {
  console.error('❌ CRÍTICO: No se ha definido MONGO_URI en el archivo .env');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Auth-Service (CineBox) conectado a MongoDB'))
  .catch((err) => {
    console.error('❌ Error conexión MongoDB:', err);
    console.warn('💡 Tip: Asegúrate de que MongoDB esté corriendo localmente o de que tu IP esté permitida en MongoDB Atlas.');
  });

// Rutas
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Microservicio de Autenticación CineBox - Operativo 🍿');
});

app.listen(PORT, () => {
  console.log(`Auth-Service (CineBox) corriendo en http://localhost:${PORT}`);
});
