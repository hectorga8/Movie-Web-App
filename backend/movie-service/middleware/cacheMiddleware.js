const NodeCache = require('node-cache');

// Mantenemos la caché en memoria por 10 minutos (600 segundos) por defecto
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    // La clave de la caché será la URL completa incluyendo query parameters
    const key = '__express__' + req.originalUrl || req.url;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      console.log(`⚡ Sirviendo desde la caché: ${key}`);
      return res.json(cachedResponse);
    } else {
      console.log(`🌐 Petición a TMDb: ${key}`);
      // Sobrescribimos el método res.json para guardar en caché antes de enviar
      const originalJson = res.json;
      res.json = (body) => {
        // Solo guardamos en caché respuestas exitosas
        if (res.statusCode >= 200 && res.statusCode < 300) {
          cache.set(key, body, duration || 600);
        }
        originalJson.call(res, body);
      };
      next();
    }
  };
};

module.exports = cacheMiddleware;
