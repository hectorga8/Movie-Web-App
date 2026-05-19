const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // En el monolito unificado, inyectamos el ID directamente para evitar 
      // consultas constantes a la base de datos en cada middleware.
      req.user = { _id: decoded.id, id: decoded.id };
      
      next();
    } catch (error) {
      console.error('❌ Error en token:', error);
      res.status(401).json({ message: 'No autorizado, token fallido' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'No autorizado, no hay token' });
  }
};

module.exports = { protect };
