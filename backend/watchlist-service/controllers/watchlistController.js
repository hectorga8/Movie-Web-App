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

exports.updateCustomList = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, tags, isPublic, isRanked, movies } = req.body;
    const userId = req.user.id;

    if (!name) {
      return res.status(400).json({ error: 'El nombre de la lista es obligatorio' });
    }

    const list = await CustomList.findOneAndUpdate(
      { _id: id, userId },
      { name, description, tags, isPublic, isRanked, movies },
      { new: true }
    );

    if (!list) {
      return res.status(404).json({ error: 'Lista no encontrada o no tienes permisos' });
    }

    res.status(200).json(list);
  } catch (error) {
    console.error('Error updating custom list:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.toggleLikeList = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const list = await CustomList.findById(id);
    if (!list) {
      return res.status(404).json({ error: 'Lista no encontrada' });
    }

    const index = list.likes.indexOf(userId);
    if (index === -1) {
      list.likes.push(userId);
    } else {
      list.likes.splice(index, 1);
    }

    await list.save();

    res.status(200).json({ likes: list.likes.length, isLiked: index === -1 });
  } catch (error) {
    console.error('Error toggling list like:', error);
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

exports.getUserCustomLists = async (req, res) => {
  try {
    const { userId } = req.params;
    const lists = await CustomList.find({ userId }).sort({ createdAt: -1 });
    
    const formattedLists = lists.map(list => {
      const listObj = list.toObject();
      listObj.title = listObj.name;
      listObj.posters = listObj.movies;
      // We assign moviesCount based on length of movies array if present. The schema uses movies.
      listObj.moviesCount = listObj.movies ? listObj.movies.length : 0;
      return listObj;
    });

    res.status(200).json(formattedLists);
  } catch (error) {
    console.error('Error fetching user custom lists:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.addItem = async (req, res) => {
  try {
    const { mediaId, mediaType, status, isFavorite, rating, title, image, inWatchlist } = req.body;
    const userId = req.user.id;

    if (!mediaId || !mediaType) {
      return res.status(400).json({ error: 'Faltan datos de la película/serie' });
    }

    const item = await WatchlistItem.findOneAndUpdate(
      { userId, mediaId, mediaType },
      { $set: { status, isFavorite, rating, title, image, inWatchlist, addedAt: Date.now() } },
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
    const { status, mediaType, isFavorite, inWatchlist } = req.query;

    const query = { userId };
    if (status) query.status = status;
    if (mediaType) query.mediaType = mediaType;
    if (isFavorite === 'true') query.isFavorite = true;
    if (inWatchlist === 'true') query.inWatchlist = true;

    const list = await WatchlistItem.find(query).sort({ addedAt: -1 });
    res.status(200).json(list);
  } catch (error) {
    console.error('Error fetching list:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getUserListById = async (req, res) => {
  try {
    const { userId } = req.params;
    const { inWatchlist, status } = req.query;
    
    const query = { userId };
    if (inWatchlist === 'true') query.inWatchlist = true;
    if (status) query.status = status;

    const list = await WatchlistItem.find(query).sort({ addedAt: -1 });
    res.status(200).json(list);
  } catch (error) {
    console.error('Error fetching list by id:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getUserStats = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1).getTime();

    const watchedFilms = await WatchlistItem.countDocuments({ userId, status: 'watched', mediaType: 'movie' });
    const watchedThisYear = await WatchlistItem.countDocuments({ 
      userId, 
      status: 'watched', 
      mediaType: 'movie',
      addedAt: { $gte: startOfYear } 
    });
    
    const listsCount = await CustomList.countDocuments({ creator: userId }); // Assuming creator is username or we should use userId. Wait, schema uses userId.
    const listsCountById = await CustomList.countDocuments({ userId });

    res.status(200).json({
      filmsCount: watchedFilms,
      thisYearCount: watchedThisYear,
      listsCount: listsCountById
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getMediaStats = async (req, res) => {
  try {
    const { mediaId, mediaType } = req.params;
    const watched = await WatchlistItem.countDocuments({ mediaId: Number(mediaId), mediaType, status: 'watched' });
    const favorites = await WatchlistItem.countDocuments({ mediaId: Number(mediaId), mediaType, isFavorite: true });
    
    res.status(200).json({ watched, favorites });
  } catch (error) {
    console.error('Error fetching media stats:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.checkItemStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { mediaId, mediaType } = req.params;

    const item = await WatchlistItem.findOne({ userId, mediaId: Number(mediaId), mediaType });
    if (!item) {
      return res.status(200).json({ inList: false, inWatchlist: false });
    }
    
    res.status(200).json({ 
      inList: true, 
      status: item.status, 
      isFavorite: item.isFavorite, 
      inWatchlist: item.inWatchlist,
      rating: item.rating 
    });
  } catch (error) {
    console.error('Error checking item:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { mediaId, mediaType } = req.params;

    await WatchlistItem.findOneAndDelete({ userId, mediaId: Number(mediaId), mediaType });

    res.status(200).json({ message: 'Item removed from watchlist' });
  } catch (error) {
    console.error('Error removing item:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar todos los datos de un usuario (Watchlist y Custom Lists)
exports.deleteUserData = async (req, res) => {
  try {
    const { userId } = req.params;

    // 1. Eliminar todos los items de la watchlist del usuario
    await WatchlistItem.deleteMany({ userId });

    // 2. Eliminar todas las listas personalizadas creadas por el usuario
    await CustomList.deleteMany({ userId });

    // 3. Quitar el rastro de likes del usuario en otras listas
    await CustomList.updateMany(
      { likes: userId },
      { $pull: { likes: userId } }
    );

    res.status(200).json({ message: 'Datos del usuario eliminados correctamente del servicio de watchlist' });
  } catch (error) {
    console.error('Error al eliminar datos del usuario en Watchlist Service:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getPublicLists = async (req, res) => {
  try {
    const validPosters = [
      "/qJ2tW6WMUDux911r6m7haRef0WH.jpg", "/8xV47NDrjdZDxaVCQAl3LuRE8iO.jpg", 
      "/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg", "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", 
      "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg"
    ];
    
    // Datos mockeados con posters únicos y variados para una mejor experiencia visual
    const mockLists = {
      featured: [
        {
          id: 1,
          title: "Top 500 Narrative Feature Films",
          creator: "Official Lists",
          moviesCount: 500,
          likes: 0,
          posters: validPosters
        },
        {
          id: 2,
          title: "Essential Sci-Fi & Cyberpunk",
          creator: "CineBox Staff",
          moviesCount: 42,
          likes: 0,
          posters: validPosters
        },
        {
          id: 3,
          title: "Masterpieces of Japanese Cinema",
          creator: "Alexander",
          moviesCount: 25,
          likes: 0,
          posters: validPosters
        }
      ],
      popular: [
        {
          id: 4,
          title: "7 minutes of avant garde film",
          creator: "Alex Fields",
          moviesCount: 56,
          likes: 1500,
          posters: validPosters
        },
        {
          id: 5,
          title: "Best Animated Movies of All Time",
          creator: "Official Lists",
          moviesCount: 150,
          likes: 371000,
          posters: validPosters
        },
        {
          id: 6,
          title: "Modern Horror Classics (2010-2024)",
          creator: "fcbarcelona",
          moviesCount: 88,
          likes: 384000,
          posters: validPosters
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
          posters: validPosters
        },
        {
          id: 8,
          title: "Atracos Perfectos: Tensión y Planificación",
          creator: "Marcos",
          moviesCount: 45,
          likes: 12000,
          description: "Desde los clásicos del noir hasta las producciones modernas más frenéticas.",
          posters: validPosters
        },
        {
          id: 9,
          title: "Neo-Noir: Sombras y Ciudad",
          creator: "Elena",
          moviesCount: 62,
          likes: 850,
          description: "La evolución del cine negro en ambientes futuristas y urbanos contemporáneos.",
          posters: validPosters
        }
      ],
      crewPicks: [
        {
          id: 12,
          title: "Premios Oscar 2024: Ganadoras",
          creator: "Oscars",
          moviesCount: 15,
          posters: validPosters
        },
        {
          id: 13,
          title: "Joyas del Cine Europeo",
          creator: "Oscars",
          moviesCount: 50,
          posters: validPosters
        },
        {
          id: 14,
          title: "Directoras que hicieron historia",
          creator: "Oscars",
          moviesCount: 101,
          posters: validPosters
        }
      ]
    };

    res.status(200).json(mockLists);
  } catch (error) {
    console.error('Error fetching public lists:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getAllUsersStats = async (req, res) => {
  try {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const items = await WatchlistItem.aggregate([
      {
        $group: {
          _id: "$userId",
          addedThisWeek: { $sum: { $cond: [{ $gte: ["$addedAt", lastWeek] }, 1, 0] } },
          favoritesThisWeek: { $sum: { $cond: [{ $and: [{ $gte: ["$addedAt", lastWeek] }, { $eq: ["$isFavorite", true] }] }, 1, 0] } },
          totalWatched: { $sum: { $cond: [{ $eq: ["$status", "watched"] }, 1, 0] } }
        }
      }
    ]);

    const lists = await CustomList.aggregate([
      {
        $group: {
          _id: "$userId",
          totalLists: { $sum: 1 },
          listsThisWeek: { $sum: { $cond: [{ $gte: ["$createdAt", lastWeek] }, 1, 0] } }
        }
      }
    ]);

    res.status(200).json({ items, lists });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
