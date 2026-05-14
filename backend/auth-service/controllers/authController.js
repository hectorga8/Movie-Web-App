const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(`📝 Intentando registro para: ${email}`);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.warn(`⚠️ El usuario ${email} ya existe.`);
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    console.log(`✅ Usuario registrado con éxito: ${email}`);
    const token = createToken(newUser._id);
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error('❌ Error en el registro:', error);
    res.status(500).json({ message: 'Error en el registro' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`🔑 Intentando login para: ${email}`);

    const user = await User.findOne({ email });
    if (!user) {
        console.warn(`❌ Usuario no encontrado: ${email}`);
        return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.warn(`❌ Contraseña incorrecta para: ${email}`);
        return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    console.log(`✅ Login exitoso para: ${email}`);
    const token = createToken(user._id);
    res.status(200).json({ token, user });
  } catch (error) {
    console.error('❌ Error en el login:', error);
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
    
    if (!user) {
      console.log(`📝 Creando nuevo usuario de Google: ${email}`);
      const randomPassword = crypto.randomBytes(32).toString('hex');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(randomPassword, salt);

      user = new User({ 
        name, 
        email, 
        password: hashedPassword,
        onboardingCompleted: false 
      });
      await user.save();
    }

    console.log(`✅ Google Auth exitoso: ${email}`);
    const ourToken = createToken(user._id);
    res.status(200).json({ token: ourToken, user });
  } catch (error) {
    console.error('❌ Error Google Auth:', error);
    res.status(500).json({ message: 'Error en autenticación con Google' });
  }
};

// Obtener perfil actual
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    console.error('❌ Error en getMe:', error);
    res.status(500).json({ message: 'Error obteniendo perfil' });
  }
};

// Actualizar perfil
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    user.name = req.body.username || user.name;
    user.givenName = req.body.givenName !== undefined ? req.body.givenName : user.givenName;
    user.familyName = req.body.familyName !== undefined ? req.body.familyName : user.familyName;
    user.email = req.body.email || user.email;
    user.location = req.body.location !== undefined ? req.body.location : user.location;
    user.website = req.body.website !== undefined ? req.body.website : user.website;
    user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
    user.pronoun = req.body.pronoun || user.pronoun;
    user.avatar = req.body.avatar || user.avatar;
    user.onboardingCompleted = req.body.onboardingCompleted !== undefined ? req.body.onboardingCompleted : user.onboardingCompleted;
    
    if (req.body.genres) {
      user.genres = req.body.genres;
    }
    
    if (req.body.favoriteMovies) {
      user.favoriteMovies = req.body.favoriteMovies;
    }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('❌ Error actualizando perfil:', error);
    res.status(500).json({ message: 'Error actualizando perfil' });
  }
};

// Alternar película favorita (añadir/quitar del array)
exports.toggleFavoriteMovie = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const movieId = String(req.params.movieId);
    const index = user.favoriteMovies.indexOf(movieId);

    if (index === -1) {
      // Add
      user.favoriteMovies.unshift(movieId);
    } else {
      // Remove
      user.favoriteMovies.splice(index, 1);
    }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('❌ Error toggling favorite movie:', error);
    res.status(500).json({ message: 'Error al actualizar película favorita' });
  }
};


// Cambiar contraseña
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    
    if (currentPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Contraseña actual incorrecta' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: 'Contraseña actualizada' });
  } catch (error) {
    console.error('❌ Error cambiando contraseña:', error);
    res.status(500).json({ message: 'Error al cambiar contraseña' });
  }
};

// Eliminar cuenta
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Limpiar rastro social en Auth Service (seguidores/siguiendo)
    // Quitamos al usuario de las listas de seguidores de otros
    await User.updateMany(
      { followers: userId },
      { $pull: { followers: userId } }
    );
    // Quitamos al usuario de las listas de "siguiendo" de otros
    await User.updateMany(
      { following: userId },
      { $pull: { following: userId } }
    );

    // 2. Llamar a otros microservicios para eliminar datos en cascada
    const REVIEW_SERVICE_URL = process.env.REVIEW_SERVICE_URL || 'http://review-service:5004';
    const WATCHLIST_SERVICE_URL = process.env.WATCHLIST_SERVICE_URL || 'http://watchlist-service:5003';

    // Ejecutamos las llamadas en paralelo para mayor eficiencia
    await Promise.allSettled([
      fetch(`${REVIEW_SERVICE_URL}/api/reviews/user/${userId}`, { method: 'DELETE' })
        .catch(err => console.error('⚠️ Error llamando a Review Service:', err.message)),
      
      fetch(`${WATCHLIST_SERVICE_URL}/api/watchlist/user/${userId}`, { method: 'DELETE' })
        .catch(err => console.error('⚠️ Error llamando a Watchlist Service:', err.message))
    ]);

    // 3. Finalmente eliminar el usuario de la base de datos de Auth
    await User.findByIdAndDelete(userId);

    res.status(200).json({ 
      message: 'Cuenta y todos sus datos asociados (reseñas, listas, likes) han sido eliminados con éxito' 
    });
  } catch (error) {
    console.error('❌ Error eliminando cuenta:', error);
    res.status(500).json({ message: 'Error al eliminar cuenta y sus datos asociados' });
  }
};

// Obtener perfil de un usuario por ID o nombre
exports.getUserProfile = async (req, res) => {
  try {
    const { identifier } = req.params;
    let user;
    
    // Si es un ObjectId válido de MongoDB
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      user = await User.findById(identifier).select('-password');
    } else {
      user = await User.findOne({ name: identifier }).select('-password');
    }

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(user);
  } catch (error) {
    console.error('❌ Error obteniendo perfil:', error);
    res.status(500).json({ message: 'Error obteniendo perfil' });
  }
};

// Seguir usuario
exports.followUser = async (req, res) => {
  try {
    const userToFollowId = req.params.id;
    const currentUserId = req.user._id;

    if (userToFollowId === currentUserId.toString()) {
      return res.status(400).json({ message: 'No puedes seguirte a ti mismo' });
    }

    const userToFollow = await User.findById(userToFollowId);
    const currentUser = await User.findById(currentUserId);

    if (!userToFollow) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (!currentUser.following.includes(userToFollowId)) {
      currentUser.following.push(userToFollowId);
      userToFollow.followers.push(currentUserId);
      await currentUser.save();
      await userToFollow.save();
    }

    res.status(200).json(currentUser);
  } catch (error) {
    console.error('❌ Error siguiendo usuario:', error);
    res.status(500).json({ message: 'Error al seguir usuario' });
  }
};

// Dejar de seguir usuario
exports.unfollowUser = async (req, res) => {
  try {
    const userToUnfollowId = req.params.id;
    const currentUserId = req.user._id;

    const userToUnfollow = await User.findById(userToUnfollowId);
    const currentUser = await User.findById(currentUserId);

    if (!userToUnfollow) return res.status(404).json({ message: 'Usuario no encontrado' });

    currentUser.following = currentUser.following.filter(id => id.toString() !== userToUnfollowId);
    userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== currentUserId.toString());
    
    await currentUser.save();
    await userToUnfollow.save();

    res.status(200).json(currentUser);
  } catch (error) {
    console.error('❌ Error dejando de seguir usuario:', error);
    res.status(500).json({ message: 'Error al dejar de seguir usuario' });
  }
};

// Obtener múltiples usuarios a la vez (para avatares y datos en lista)
exports.getBulkUsers = async (req, res) => {
  try {
    const { userIds } = req.body;
    if (!userIds || !Array.isArray(userIds)) {
      return res.status(400).json({ message: 'Se requiere un array de userIds' });
    }
    const users = await User.find({ _id: { $in: userIds } }).select('_id name avatar');
    res.status(200).json(users);
  } catch (error) {
    console.error('❌ Error en getBulkUsers:', error);
    res.status(500).json({ message: 'Error obteniendo usuarios en bulk' });
  }
};
