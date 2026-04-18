const Book = require('../models/Book');

// 🔍 BUSCAR LIBROS EN GOOGLE BOOKS (CON FILTRO DE CALIDAD)
exports.searchBooks = async (req, res) => {
  try {
    const { q } = req.query; 
    if (!q) return res.status(400).json({ message: 'Debes proporcionar un término de búsqueda' });

    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&maxResults=40&printType=books&orderBy=relevance`;
    
    const googleRes = await fetch(url);
    const data = await googleRes.json();

    if (!data.items) return res.status(200).json([]);

    const uniqueBooks = new Map();
    const noiseKeywords = ['resumen', 'guía', 'summary', 'guide', 'workbook', 'notebook', 'cuaderno', 'estudio'];

    data.items.forEach(item => {
      const info = item.volumeInfo;
      const title = info.title || '';
      const author = info.authors ? info.authors[0] : 'Desconocido';
      
      // 1. FILTRAR RUIDO (Si el título contiene palabras como "Resumen" o "Guía", lo saltamos)
      const isNoise = noiseKeywords.some(word => title.toLowerCase().includes(word));
      if (isNoise) return;

      // 2. DEDUPLICACIÓN (Usamos "Título + Autor" como clave única)
      const key = `${title.toLowerCase().trim()}-${author.toLowerCase().trim()}`;
      
      // Si ya tenemos este libro, solo lo sustituimos si el nuevo tiene mejor pinta (más descripción)
      if (!uniqueBooks.has(key) || (info.description && !uniqueBooks.get(key).description)) {
        if (info.imageLinks && info.imageLinks.thumbnail) {
          uniqueBooks.set(key, {
            googleId: item.id,
            title: title,
            author: info.authors ? info.authors.join(', ') : 'Autor desconocido',
            thumbnail: info.imageLinks.thumbnail.replace('http:', 'https:'),
            description: info.description || '',
            categories: info.categories || []
          });
        }
      }
    });

    // Convertimos el Map de nuevo a un Array y limitamos a los 10 mejores
    const results = Array.from(uniqueBooks.values()).slice(0, 10);

    res.status(200).json(results);
  } catch (error) {
    console.error('Error al buscar en Google Books:', error);
    res.status(500).json({ message: 'Error al conectar con la API de libros' });
  }
};

// 📖 OBTENER DETALLE DE UN LIBRO POR ID DE GOOGLE
exports.getBookByGoogleId = async (req, res) => {
  try {
    const { id } = req.params;
    const googleRes = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
    const item = await googleRes.json();

    if (item.error) return res.status(404).json({ message: 'Libro no encontrado' });

    const bookDetail = {
      googleId: item.id,
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Autor desconocido',
      description: item.volumeInfo.description || 'Sin descripción.',
      thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.large || item.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/300x450?text=No+Cover',
      categories: item.volumeInfo.categories || [],
      pageCount: item.volumeInfo.pageCount || 0,
      averageRating: item.volumeInfo.averageRating || 0,
      publishedDate: item.volumeInfo.publishedDate || 'N/A'
    };

    res.status(200).json(bookDetail);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener detalle del libro' });
  }
};
