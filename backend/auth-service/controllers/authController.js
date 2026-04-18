const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // Nativo de Node.js para seguridad

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'El usuario ya existe' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = createToken(newUser._id);
    res.status(201).json({ token, user: { id: newUser._id, name, email, onboardingCompleted: false } });
  } catch (error) {
    res.status(500).json({ message: 'Error en el registro' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

    const token = createToken(user._id);
    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, onboardingCompleted: user.onboardingCompleted } });
  } catch (error) {
    res.status(500).json({ message: 'Error en el login' });
  }
};

exports.googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    const googleRes = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
    const googleUser = await googleRes.json();

    if (!googleUser.email) {
      return res.status(400).json({ message: 'Token de Google inválido' });
    }

    const { email, name } = googleUser;
    let user = await User.findOne({ email });
    let isNewUser = false;

    if (!user) {
      isNewUser = true;
      // 🎲 GENERAR CONTRASEÑA ALEATORIA SEGURA
      // El usuario no la conocerá, pero su cuenta siempre tendrá una.
      const randomPassword = crypto.randomBytes(32).toString('hex');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(randomPassword, salt);

      user = new User({ 
        name, 
        email, 
        password: hashedPassword,
        onboardingCompleted: false // Importante para el flujo futuro
      });
      await user.save();
    }

    const ourToken = createToken(user._id);
    res.status(200).json({ 
      token: ourToken, 
      user: { 
        id: user._id, 
        name, 
        email, 
        onboardingCompleted: user.onboardingCompleted,
        isNewUser // Útil para que el frontend sepa si redirigir al onboarding
      } 
    });
  } catch (error) {
    console.error('Error Google Auth:', error);
    res.status(500).json({ message: 'Error en autenticación con Google' });
  }
};
