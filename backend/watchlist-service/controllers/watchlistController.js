const WatchlistItem = require('../models/Watchlist');
const CustomList = require('../models/CustomList');

exports.createCustomList = async (req, res) => {
  try {
    const { name, description, tags, isPublic, isRanked, movies, creator } = req.body;
    const userId = req.user.id;

    if (!name) {
      return res.status(400).json({ error: 'El nombre de la lista es obligatorio' });
    }

    const newList = new CustomList({
      userId,
      creator,
      name,
      description,
      tags,
      isPublic,
      isRanked,
      movies
    });

    await newList.save();
    res.status(201).json(newList);
  } catch (error) {
    console.error('Error creating custom list:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getCustomListById = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await CustomList.findById(id);
    
    if (!list) {
      return res.status(404).json({ error: 'Lista no encontrada' });
    }

    const listObj = list.toObject();
    listObj.title = listObj.name;
    listObj.posters = listObj.movies;

    res.status(200).json(listObj);
  } catch (error) {
    console.error('Error fetching custom list:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.addItem = async (req, res) => {
  try {
    const { mediaId, mediaType, status, isFavorite, rating, title, image } = req.body;
    const userId = req.user.id;

    if (!mediaId || !mediaType) {
      return res.status(400).json({ error: 'Faltan datos de la película/serie' });
    }

    const item = await WatchlistItem.findOneAndUpdate(
      { userId, mediaId, mediaType },
      { $set: { status, isFavorite, rating, title, image, addedAt: Date.now() } },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Añadido a la lista', item });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getUserList = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, mediaType, isFavorite } = req.query;

    const query = { userId };
    if (status) query.status = status;
    if (mediaType) query.mediaType = mediaType;
    if (isFavorite === 'true') query.isFavorite = true;

    const list = await WatchlistItem.find(query).sort({ addedAt: -1 });
    res.status(200).json(list);
  } catch (error) {
    console.error('Error fetching list:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { mediaId, mediaType } = req.params;

    await WatchlistItem.findOneAndDelete({ userId, mediaId: Number(mediaId), mediaType });
    res.status(200).json({ message: 'Elemento eliminado de la lista' });
  } catch (error) {
    console.error('Error removing item:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.checkItemStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { mediaId, mediaType } = req.params;

    const item = await WatchlistItem.findOne({ userId, mediaId: Number(mediaId), mediaType });
    if (!item) {
      return res.status(200).json({ inList: false });
    }
    
    res.status(200).json({ 
      inList: true, 
      status: item.status, 
      isFavorite: item.isFavorite, 
      rating: item.rating 
    });
  } catch (error) {
    console.error('Error checking item:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getPublicLists = async (req, res) => {
  try {
    // Datos mockeados con posters únicos y variados para una mejor experiencia visual
    const mockLists = {
      featured: [
        {
          id: 1,
          title: "Top 500 Narrative Feature Films",
          creator: "Official Lists",
          moviesCount: 500,
          likes: 0,
          posters: [
            "/qJ2tW6WMUDux911r6m7haRef0WH.jpg", // The Dark Knight
            "/8xV47NDrjdZDxaVCQAl3LuRE8iO.jpg", // 12 Angry Men
            "/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg", // The Godfather
            "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", // The Godfather II
            "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg"  // Schindler's List
          ]
        },
        {
          id: 2,
          title: "Essential Sci-Fi & Cyberpunk",
          creator: "CineBox Staff",
          moviesCount: 42,
          likes: 0,
          posters: [
            "/m8eFedsS7vQCZCS8WGp5L1bVDZ1.jpg", // Inception
            "/6oom5QYQ2yQTMJIhqDirM1yH863.jpg", // The Matrix
            "/vqzNJRH4YyquRiWxCCOH0aXggHI.jpg", // Terminator 2
            "/saHP97rTPS5eLmrLQEcANmKrsFl.jpg", // Forrest Gump (Placeholder for variety)
            "/hZ6YpZ7ZpZ7ZpZ7ZpZ7ZpZ7ZpZ7.jpg"  // Blade Runner 2049 (Simulated)
          ]
        },
        {
          id: 3,
          title: "Masterpieces of Japanese Cinema",
          creator: "Alexander",
          moviesCount: 25,
          likes: 0,
          posters: [
            "/a2tys4sD7EGUQRO4YL24X1p7E6c.jpg", // Parasite (Non-Japanese but East Asian context)
            "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", // Spirited Away
            "/w7WeH0hR31j0qU4w5UaFp8m6tU6.jpg", // Princess Mononoke
            "/8s4h9rDqjXF2nE1Q1N4M7V9U1T.jpg", // Seven Samurai (Simulated)
            "/9L4K1Q1Z4s1J8T3W4Z6V9L2T7X.jpg"  // Your Name (Simulated)
          ]
        }
      ],
      popular: [
        {
          id: 4,
          title: "7 minutes of avant garde film",
          creator: "Alex Fields",
          moviesCount: 56,
          likes: 1500,
          posters: [
            "/3g1vHjZWeXn2E5X6E7u8I3J3d2q.jpg", 
            "/vTDApAIn4nOFM19VnInB7q90vT9.jpg", 
            "/y2TBEqN2Rly1V8H3n3EwH9mQY9G.jpg",
            "/4M5A7g4zL9T6t7G4T4Z2G2XqY4Y.jpg",
            "/1Tj4q8C1v0wQyW0y0x0Q8G3K7I.jpg"
          ]
        },
        {
          id: 5,
          title: "Best Animated Movies of All Time",
          creator: "Official Lists",
          moviesCount: 150,
          likes: 371000,
          posters: [
            "/ld769pS9v6v6v6v6v6v6v6v6v6.jpg", // Toy Story (Simulated)
            "/uXDpS9v6v6v6v6v6v6v6v6v6v6.jpg", // Spider-Verse (Simulated)
            "/vXDpS9v6v6v6v6v6v6v6v6v6v6.jpg", // Lion King (Simulated)
            "/wXDpS9v6v6v6v6v6v6v6v6v6v6.jpg", // Coco (Simulated)
            "/xXDpS9v6v6v6v6v6v6v6v6v6v6.jpg"  // Wall-E (Simulated)
          ]
        },
        {
          id: 6,
          title: "Modern Horror Classics (2010-2024)",
          creator: "fcbarcelona",
          moviesCount: 88,
          likes: 384000,
          posters: [
            "/8m9v6v6v6v6v6v6v6v6v6v6v6v6.jpg", // Hereditary (Simulated)
            "/9m9v6v6v6v6v6v6v6v6v6v6v6v6.jpg", // Get Out (Simulated)
            "/am9v6v6v6v6v6v6v6v6v6v6v6v6.jpg", // The Witch (Simulated)
            "/bm9v6v6v6v6v6v6v6v6v6v6v6v6.jpg", // Midsommar (Simulated)
            "/cm9v6v6v6v6v6v6v6v6v6v6v6v6.jpg"  // It Follows (Simulated)
          ]
        }
      ],
      recentlyLiked: [
        {
          id: 7,
          title: "Cine de autor: Imprescindibles",
          creator: "Sofía",
          moviesCount: 120,
          likes: 420,
          description: "Una selección personal de películas que rompen moldes y desafían al espectador.",
          posters: ["/4TjD7H1N1YqR4Z6wUvH3W5z9P4b.jpg", "/2o6O5Gf3X5Y8z2v9S1X7W2Z8L2b.jpg", "/8c4a8kE7p1A3t3K9l7U5q3M9R7P.jpg", "/1w6H9Z9R2a8z5X1T7J9V4L9S8M.jpg", "/9m2R4K7X1a3Y6C3T2D9V1H7L2N.jpg"]
        },
        {
          id: 8,
          title: "Atracos Perfectos: Tensión y Planificación",
          creator: "Marcos",
          moviesCount: 45,
          likes: 12000,
          description: "Desde los clásicos del noir hasta las producciones modernas más frenéticas.",
          posters: ["/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg", "/8xV47NDrjdZDxaVCQAl3LuRE8iO.jpg", "/qJ2tW6WMUDux911r6m7haRef0WH.jpg", "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg", "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"]
        },
        {
          id: 9,
          title: "Neo-Noir: Sombras y Ciudad",
          creator: "Elena",
          moviesCount: 62,
          likes: 850,
          description: "La evolución del cine negro en ambientes futuristas y urbanos contemporáneos.",
          posters: ["/RYMX2wcKCBAr24UyPD7xwaq11U.jpg", "/or06FN3Dka5tukK1e9sl16pB3iy.jpg", "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg", "/qAZ0pzat24kLdO3o8cgjpIQFO8C.jpg", "/cezWGskPA5mKy2ylI61Y2GkGFU4.jpg"]
        }
      ],
      crewPicks: [
        {
          id: 12,
          title: "Premios Oscar 2024: Ganadoras",
          creator: "Oscars",
          moviesCount: 15,
          posters: ["/a2tys4sD7EGUQRO4YL24X1p7E6c.jpg", "/gLh42K30x5sP6lM659p7H2v8L1T.jpg", "/1U2zY9v2wZ6q2T2u1X3W4L9T8R.jpg", "/9M4N8w9Z5T1J2K3R4L6S7Q8P1V.jpg"]
        },
        {
          id: 13,
          title: "Joyas del Cine Europeo",
          creator: "Oscars",
          moviesCount: 50,
          posters: ["/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", "/w7WeH0hR31j0qU4w5UaFp8m6tU6.jpg", "/a2tys4sD7EGUQRO4YL24X1p7E6c.jpg", "/9L4K1Q1Z4s1J8T3W4Z6V9L2T7X.jpg"]
        },
        {
          id: 14,
          title: "Directoras que hicieron historia",
          creator: "Oscars",
          moviesCount: 101,
          posters: ["/vqzNJRH4YyquRiWxCCOH0aXggHI.jpg", "/m8eFedsS7vQCZCS8WGp5L1bVDZ1.jpg", "/5KCVkau1HEl7ZzfPsKAPM0sMiKc.jpg", "/6oom5QYQ2yQTMJIhqDirM1yH863.jpg"]
        }
      ]
    };

    res.status(200).json(mockLists);
  } catch (error) {
    console.error('Error fetching public lists:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
