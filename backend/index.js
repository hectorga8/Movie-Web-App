require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 5000;

// ── MIDDLEWARES ─────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── CONEXIÓN A MONGODB ──────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ ¡CONECTADO CON ÉXITO A MONGODB ATLAS! 🚀'))
  .catch((err) => console.error('❌ Error al conectar a MongoDB:', err.message));

// ── FUNCIÓN PARA CREAR TOKEN ────────────────────────────────
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// ── RUTAS ──────────────────────────────────────────────────

app.get('/', (req, res) => {
  res.send('API de Folio funcionando 📚');
});

// 🏁 REGISTRO TRADICIONAL
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'El usuario ya existe' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = createToken(newUser._id);
    res.status(201).json({ token, user: { id: newUser._id, name, email } });
  } catch (error) {
    res.status(500).json({ message: 'Error en el registro' });
  }
});

// 🌐 LOGIN CON GOOGLE
app.post('/api/auth/google', async (req, res) => {
  try {
    const { token } = req.body;

    // 1. Validar el token con la API de Google
    const googleRes = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
    const googleUser = await googleRes.json();

    if (!googleUser.email) {
      return res.status(400).json({ message: 'Token de Google inválido' });
    }

    const { email, name } = googleUser;

    // 2. Buscar o Crear el usuario
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        password: '', // Sin password porque viene de Google
      });
      await user.save();
    }

    // 3. Generar nuestro propio Token JWT
    const ourToken = createToken(user._id);

    res.status(200).json({
      token: ourToken,
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error('Error Google Auth:', error);
    res.status(500).json({ message: 'Error en autenticación con Google' });
  }
});

// 🔑 LOGIN TRADICIONAL
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

    // Solo comparamos si el usuario tiene contraseña (si no es de Google)
    if (!user.password) {
      return res.status(400).json({ message: 'Este usuario se registró con Google. Por favor, entra con Google.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

    const token = createToken(user._id);
    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Error en el login' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
