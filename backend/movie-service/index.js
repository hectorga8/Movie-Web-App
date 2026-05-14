require('dotenv').config();
const express = require('express');
const cors = require('cors');

const movieRoutes = require('./routes/movieRoutes');
const tvRoutes = require('./routes/tvRoutes');
const personRoutes = require('./routes/personRoutes');
const searchRoutes = require('./routes/searchRoutes');
const newsRoutes = require('./routes/newsRoutes');

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

// Montamos las rutas. newsRoutes va primero para evitar que sea capturado por /api/movies/:id
app.use('/api/movies/news', newsRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/tv', tvRoutes);
app.use('/api/person', personRoutes);
app.use('/api/search', searchRoutes);

app.get('/', (req, res) => {
  res.send('Microservicio de Películas CineBox - Operativo 🍿');
});

app.listen(PORT, () => {
  console.log(`Movie Service listo en puerto ${PORT}`);
});
