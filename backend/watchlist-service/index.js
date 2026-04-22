require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const watchlistRoutes = require('./routes/watchlistRoutes');

const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Watchlist Service conectado a MongoDB'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));

app.use('/api/watchlist', watchlistRoutes);

app.get('/health', (req, res) => res.send('Watchlist Service OK'));

app.listen(PORT, () => {
  console.log(`Watchlist Service listo en el puerto ${PORT}`);
});
