// ─────────────────────────────────────────────────────────────
// bookController.js (OPEN LIBRARY EDITION - ENGLISH)
// ─────────────────────────────────────────────────────────────

const cache = new Map();
const CACHE_TTL = 1000 * 60 * 30; // 30 minutos

function getFromCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.value;
}

function setToCache(key, value) {
  cache.set(key, { value, timestamp: Date.now() });
}

const normalize = (str) => (str || "").toLowerCase().trim().replace(/\s+/g, "-");

// ─────────────────────────────────────────────────────────────
// SEARCH BOOKS (Búsqueda General)
// ─────────────────────────────────────────────────────────────
exports.searchBooks = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: "Search query (q) is required" });

    const cacheKey = `search-ol-${normalize(q)}`;
    const cached = getFromCache(cacheKey);
    if (cached) return res.status(200).json(cached);

    // Open Library Search API
    // Reducimos el límite a 12 para ganar velocidad
    const fields = "key,title,author_name,cover_i,ratings_average,ratings_count,first_publish_year,subject";
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=12&fields=${fields}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.docs || data.docs.length === 0) {
      setToCache(cacheKey, []);
      return res.status(200).json([]);
    }

    // Mapeamos al formato de nuestra App
    const books = data.docs.map(doc => {
      // Open Library devuelve el ID como "/works/OL12345W", lo limpiamos
      const id = doc.key.replace("/works/", "");
      
      return {
        id: id,
        title: doc.title,
        author: doc.author_name ? doc.author_name.join(", ") : "Unknown Author",
        thumbnail: doc.cover_i 
          ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` 
          : "https://via.placeholder.com/128x192?text=No+Cover",
        categories: (doc.subject || []).slice(0, 3),
        averageRating: doc.ratings_average ? parseFloat(doc.ratings_average.toFixed(1)) : 0,
        ratingsCount: doc.ratings_count || 0,
        publishedDate: doc.first_publish_year?.toString() || "N/A"
      };
    });

    setToCache(cacheKey, books);
    res.status(200).json(books);

  } catch (error) {
    console.error("OpenLibrary Search Error:", error.message);
    res.status(500).json({ message: "Error searching books in Open Library" });
  }
};

// ─────────────────────────────────────────────────────────────
// GET BOOK DETAIL (Detalle por ID)
// ─────────────────────────────────────────────────────────────
exports.getBookByGoogleId = async (req, res) => {
  try {
    const { id } = req.params; // Sigue llamándose igual en la ruta por compatibilidad
    
    if (!id || id === "undefined") {
      return res.status(400).json({ message: "Invalid Book ID" });
    }

    const cacheKey = `detail-ol-${id}`;
    const cached = getFromCache(cacheKey);
    if (cached) return res.status(200).json(cached);

    // Lanzamos 2 peticiones en paralelo: El libro y sus ratings
    const [workRes, ratingsRes] = await Promise.all([
      fetch(`https://openlibrary.org/works/${id}.json`),
      fetch(`https://openlibrary.org/works/${id}/ratings.json`)
    ]);

    if (!workRes.ok) {
      return res.status(404).json({ message: "Book not found in Open Library" });
    }

    const work = await workRes.json();
    const ratings = await ratingsRes.json().catch(() => ({}));

    // Obtener nombres de autores (Open Library devuelve solo sus IDs)
    let authorNames = "Unknown Author";
    if (work.authors && work.authors.length > 0) {
      const authorPromises = work.authors.slice(0, 2).map(a => 
        fetch(`https://openlibrary.org${a.author.key}.json`)
          .then(r => r.json())
          .then(d => d.name || "")
          .catch(() => "")
      );
      const names = await Promise.all(authorPromises);
      authorNames = names.filter(n => n).join(", ") || authorNames;
    }

    // Procesar la descripción (Open Library la devuelve como string o como objeto)
    let description = "No description available.";
    if (work.description) {
      description = typeof work.description === 'string' 
        ? work.description 
        : work.description.value || description;
    }

    const result = {
      id: id,
      title: work.title,
      author: authorNames,
      description: description,
      thumbnail: work.covers 
        ? `https://covers.openlibrary.org/b/id/${work.covers[0]}-L.jpg` 
        : "https://via.placeholder.com/300x450?text=No+Cover",
      categories: (work.subjects || []).slice(0, 5),
      pageCount: work.number_of_pages || 0,
      averageRating: ratings.summary?.average ? parseFloat(ratings.summary.average.toFixed(1)) : 0,
      ratingsCount: ratings.summary?.count || 0,
      publishedDate: work.first_publish_date || "N/A",
      publisher: "Open Library Community",
      isbn: work.identifiers?.isbn_13?.[0] || work.identifiers?.isbn_10?.[0] || "N/A"
    };

    setToCache(cacheKey, result);
    res.status(200).json(result);

  } catch (error) {
    console.error("OpenLibrary Detail Error:", error.message);
    res.status(500).json({ message: "Error fetching book details from Open Library" });
  }
};
