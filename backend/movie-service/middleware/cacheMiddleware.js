const NodeCache = require('node-cache');

// Caché agresiva: 1 hora (3600s) para datos de películas que no cambian seguido
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });

const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      return res.json(cachedResponse);
    } else {
      const originalJson = res.json;
      res.json = (body) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          cache.set(key, body, duration || 3600);
        }
        originalJson.call(res, body);
      };
      next();
    }
  };
};

module.exports = cacheMiddleware;
