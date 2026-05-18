import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import HomeMovieCard from "../components/index/HomeMovieCard";
import movieService from '../services/movieService';
import { getWeeklyPopularReviews } from '../services/reviewService';
import watchlistService from '../services/watchlistService';
import PopularReviewItem from '../components/index/PopularReviewItem';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Noticias de respaldo (Fallback) por si la API de noticias falla
const fallbackNews = [
  {
    id: 'n1',
    title: "CineBox: La nueva forma de vivir el cine",
    excerpt: "Explora nuestra nueva interfaz minimalista diseñada para que el contenido sea el protagonista. Guarda tus películas, series y comparte tus reviews con amigos.",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
    url: "#",
    date: "Hoy"
  },
  {
    id: 'n2',
    title: "Próximamente: Integración con suscripciones Premium",
    excerpt: "Estamos construyendo funciones avanzadas para que puedas ver estadísticas detalladas de tu perfil, exportar tus listas y conectar con más amigos.",
    image: "https://images.unsplash.com/photo-1524712245354-2c4e5e7124c5?q=80&w=2070&auto=format&fit=crop",
    url: "#",
    date: "Mañana"
  }
];

const mapResults = (items) => {
  if (!items || !Array.isArray(items)) return [];
  return items.slice(0, 6).map(m => ({
    id: m?.id || Math.random(),
    title: m?.title || m?.name || 'Desconocido',
    date: m?.release_date ? new Date(m.release_date).getFullYear() : (m?.first_air_date ? new Date(m.first_air_date).getFullYear() : 'N/A'),
    rating: Math.round((m?.vote_average || 0) * 10),
    image: movieService.getImageUrl(m?.poster_path),
    rawMedia: m || {},
    mediaType: m?.title ? 'movie' : 'tv'
  }));
};

const fetchIndexData = async (user) => {
  try {
    const fetchPromises = [
      movieService.getNowPlaying().catch(() => ({ results: [] })),
      movieService.getPopular().catch(() => ({ results: [] })),
      movieService.getNews().catch(() => []),
      getWeeklyPopularReviews().catch(() => []),
      watchlistService.getPublicLists().catch(() => ({ popular: [] }))
    ];

    // Personalización por géneros
    if (user?.genres?.length > 0) {
      const genreIds = user.genres.join('|');
      fetchPromises.push(movieService.getAllMovies(1, { genre: genreIds }).catch(() => ({ results: [] })));
    }

    // Personalización por película favorita (3C)
    let randomFavId = null;
    if (user?.favoriteMovies?.length > 0) {
      randomFavId = user.favoriteMovies[Math.floor(Math.random() * user.favoriteMovies.length)];
      fetchPromises.push(
        Promise.all([
          movieService.getMovieDetail(randomFavId).catch(() => ({ title: 'Tu favorita' })),
          movieService.getRecommendations(randomFavId).catch(() => ({ results: [] }))
        ])
      );
    }

    const results = await Promise.all(fetchPromises);
    
    const [newData, popularData, newsData, reviewsData, listsData] = results;
    
    const newItems = (newData && Array.isArray(newData)) ? newData : (newData?.results || []);
    const popularItems = (popularData && Array.isArray(popularData)) ? popularData : (popularData?.results || []);

    const newMovies = mapResults(newItems);
    const popularMovies = mapResults(popularItems);
    const popularReviews = Array.isArray(reviewsData) ? reviewsData : [];
    
    let popularLists = [];
    if (listsData && Array.isArray(listsData.popular)) {
      popularLists = [...listsData.popular].sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 3);
    }
    
    const news = (Array.isArray(newsData) && newsData.length > 0) ? newsData : fallbackNews;

    // Resultados de personalización
    let personalizedMovies = [];
    let currentIndex = 5;
    if (user?.genres?.length > 0) {
      const genreData = results[currentIndex++];
      const genreItems = (genreData && Array.isArray(genreData)) ? genreData : (genreData?.results || []);
      personalizedMovies = mapResults(genreItems);
    }

    let recommendationsByFav = { title: '', movies: [] };
    if (user?.favoriteMovies?.length > 0 && randomFavId) {
      const [favDetail, recsData] = results[currentIndex];
      const recItems = (recsData && Array.isArray(recsData)) ? recsData : (recsData?.results || []);
      recommendationsByFav = {
        title: favDetail?.title || favDetail?.name || 'Tu favorita',
        movies: mapResults(recItems)
      };
    }

    return {
      newMovies,
      popularMovies,
      personalizedMovies,
      recommendationsByFav,
      popularReviews,
      popularLists,
      news
    };
  } catch (error) {
    console.error("Error global en fetchIndexData:", error);
    return {
      newMovies: [],
      popularMovies: [],
      personalizedMovies: [],
      recommendationsByFav: { title: '', movies: [] },
      popularReviews: [],
      popularLists: [],
      news: fallbackNews
    };
  }
};

function Index() {
  const { user } = useAuth();
  
  const { data, error, isLoading } = useSWR(
    user ? ['indexData', user._id] : 'indexData', 
    () => fetchIndexData(user),
    { revalidateOnFocus: false, dedupingInterval: 300000 } // Cache por 5 min
  );

  const loading = isLoading || !data;
  
  const newMovies = data?.newMovies || [];
  const popularMovies = data?.popularMovies || [];
  const personalizedMovies = data?.personalizedMovies || [];
  const recommendationsByFav = data?.recommendationsByFav || { title: '', movies: [] };
  const popularReviews = Array.isArray(data?.popularReviews) ? data.popularReviews : [];
  const popularLists = Array.isArray(data?.popularLists) ? data.popularLists : [];
  const news = (Array.isArray(data?.news) && data.news.length > 0) ? data.news : fallbackNews;

  const welcomeMessage = () => {
    if (!user) return "Bienvenido a CineBox. Esto es lo que has estado viendo…";
    const firstName = user.name ? user.name.split(' ')[0] : 'Cinéfilo';
    const nameLink = <Link to="/perfil" className="text-white hover:text-[#1060ff] font-light transition-colors border-b border-transparent hover:border-[#1060ff] pb-0.5">{firstName}</Link>;
    
    if (user.genres && user.genres.length > 0) {
      return <>Bienvenido, {nameLink}. Listos para más dosis de cine.</>;
    }
    return <>Bienvenido, {nameLink}. Esto es lo que has estado viendo…</>;
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#0d0e12] to-[#1a1c23] text-white min-h-screen font-['Arimo',sans-serif]">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        
        {/* 1. Bienvenida */}
        <section className="mb-12">
          <h1 className="text-[26px] md:text-[36px] font-light text-[#efeff1] text-center leading-tight">
            {welcomeMessage()}
          </h1>
          <p className="text-blue-100/80 text-[15px] md:text-[17px] mt-2 text-center font-light">
            {user ? "Tu experiencia personalizada está lista." : "Esta página de inicio se personalizará a medida que sigas a los miembros activos de CineBox."}
          </p>
        </section>

        {/* 2. Nuevo en CineBox */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[13px] md:text-[15px] font-light uppercase text-white/50">Nuevo en CineBox</h2>
            <button className="text-[11px] md:text-[13px] font-light uppercase text-white/30 hover:text-white transition-colors">Más</button>
          </div>
          <div className="h-[1px] bg-white/10 w-full mb-6"></div>
          {loading ? (
            <div className="grid grid-cols-6 gap-5 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="aspect-[2/3] bg-white/5 rounded-[4px]"></div>
              ))}
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5"
            >
              {newMovies.length > 0 ? newMovies.map(movie => (
                <HomeMovieCard key={movie.id} movie={movie} />
              )) : (
                <div className="col-span-6 text-center text-white/20 py-10">Cargando estrenos...</div>
              )}
            </motion.div>
          )}
        </section>

        {/* 3. Populares en CineBox */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[13px] md:text-[15px] font-light uppercase text-white/50">Populares en CineBox</h2>
            <button className="text-[11px] md:text-[13px] font-light uppercase text-white/30 hover:text-white transition-colors">Más</button>
          </div>
          <div className="h-[1px] bg-white/10 w-full mb-6"></div>
          {loading ? (
            <div className="grid grid-cols-6 gap-5 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="aspect-[2/3] bg-white/5 rounded-[4px]"></div>
              ))}
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5"
            >
              {popularMovies.length > 0 ? popularMovies.map(movie => (
                <HomeMovieCard key={movie.id} movie={movie} />
              )) : (
                <div className="col-span-6 text-center text-white/20 py-10">Cargando populares...</div>
              )}
            </motion.div>
          )}
        </section>

        {/* 4. SECCIONES PERSONALIZADAS A DOS COLUMNAS */}
        {user && (personalizedMovies.length > 0 || recommendationsByFav.movies.length > 0) && (
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 mb-16 relative">
            
            {/* Para ti (Izquierda) */}
            <section className="flex-1 min-w-0 lg:pr-12">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-[13px] md:text-[15px] font-light uppercase text-white/50">Para ti: Tus géneros</h2>
                <Link to="/recomendaciones?type=generos" className="text-[11px] md:text-[13px] font-light uppercase text-white/30 hover:text-white transition-colors whitespace-nowrap ml-4">Más</Link>
              </div>
              <div className="h-[1px] bg-[#00e054]/30 w-full mb-6"></div>
              
              <div className="grid grid-cols-3 gap-2">
                {personalizedMovies.slice(0, 6).map(movie => (
                  <Link
                    key={movie.id}
                    to={`/pelicula/${movie.id}`}
                    className="border border-[#445566] hover:border-[#00e054] rounded-[3px] overflow-hidden transition-colors aspect-[2/3] bg-[#2c3440] relative group/card"
                  >
                    <img loading="lazy"
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300 flex items-end justify-center z-10">
                      <span className="text-white text-[10px] text-center line-clamp-2 leading-tight drop-shadow-md w-full">{movie.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Separador Vertical */}
            <div className="hidden lg:block w-[1px] bg-white/10 absolute left-1/2 top-0 bottom-0 -translate-x-1/2"></div>

            {/* Porque te gustó (Derecha) */}
            <section className="flex-1 min-w-0 lg:pl-12">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-[13px] md:text-[15px] font-light uppercase text-white/50">
                  Porque te gustó <span className="text-blue-500 font-medium">"{recommendationsByFav.title}"</span>
                </h2>
                <Link to="/recomendaciones?type=similares" className="text-[11px] md:text-[13px] font-light uppercase text-white/30 hover:text-white transition-colors whitespace-nowrap ml-4">Más</Link>
              </div>
              <div className="h-[1px] bg-[#1060ff]/30 w-full mb-6"></div>

              <div className="grid grid-cols-3 gap-2">
                {recommendationsByFav.movies.slice(0, 6).map(movie => (
                  <Link
                    key={movie.id}
                    to={`/pelicula/${movie.id}`}
                    className="border border-[#445566] hover:border-[#1060ff] rounded-[3px] overflow-hidden transition-colors aspect-[2/3] bg-[#2c3440] relative group/card"
                  >
                    <img loading="lazy"
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300 flex items-end justify-center z-10">
                      <span className="text-white text-[10px] text-center line-clamp-2 leading-tight drop-shadow-md w-full">{movie.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* 5. Noticias de la Red */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[13px] md:text-[15px] font-light uppercase text-white/50">Cine en la red</h2>
          </div>
          <div className="h-[1px] bg-white/10 w-full mb-6"></div>
          {news.length > 0 && news[0] && (
            <div className="bg-[#1a1c23]/30 rounded-[4px] border border-white/5 overflow-hidden flex flex-col md:flex-row gap-6 p-1 group hover:bg-[#1a1c23]/50 transition-colors">
              <div className="w-full md:w-[320px] aspect-video md:aspect-[16/10] shrink-0 overflow-hidden">
                <img loading="lazy" 
                  src={news[0]?.image || 'https://via.placeholder.com/800x450'} 
                  alt={news[0]?.title || 'Noticia'} 
                  className="w-full h-full object-cover rounded-[3px] group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="flex flex-col justify-center p-4 md:p-2">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] md:text-[12px] font-normal text-[#1060ff] uppercase">{news[0]?.date || 'Reciente'}</span>
                  <span className="text-[10px] md:text-[12px] text-white/20 font-normal uppercase">vía {news[0]?.source || 'CineBox'}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight group-hover:text-[#1060ff] transition-colors">{news[0]?.title}</h3>
                <p className="text-blue-100/80 text-[14px] md:text-[16px] leading-relaxed mb-4 font-light line-clamp-3">
                  {news[0]?.excerpt}
                </p>
                <a 
                  href={news[0]?.url || '#'} 
                  className="text-white/80 text-[12px] md:text-[14px] font-normal hover:text-white flex items-center gap-1 group/link" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Leer artículo completo 
                  <svg className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </a>
              </div>
            </div>
          )}
        </section>

        {/* 5 y 6. Layout a dos columnas con separador */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 mb-16 relative">
          
          {/* 5. Reseñas Populares */}
          <section className="flex-1 lg:pr-12">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[13px] md:text-[15px] font-light uppercase text-white/50">Reseñas Populares</h2>
              <Link to="/reviews-populares" className="text-[11px] md:text-[13px] font-light uppercase text-white/30 
              hover:text-white transition-colors">Más</Link>
            </div>
            <div className="h-[1px] bg-white/10 w-full mb-6"></div>
            <div className="space-y-4">
              {popularReviews.length > 0 ? (
                popularReviews.slice(0, 3).map(review => (
                  <PopularReviewItem key={review?._id || Math.random()} initialReview={review} />
                ))
              ) : (
                <div className="text-white/40 text-[13px] italic">Aún no hay reseñas populares.</div>
              )}
            </div>
          </section>

          {/* Separador Vertical */}
          <div className="hidden lg:block w-[1px] bg-white/10 absolute left-1/2 top-0 bottom-0 -translate-x-1/2"></div>

          {/* 6. Listas Populares */}
          <section className="flex-1 lg:pl-12">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[13px] md:text-[15px] font-light uppercase text-white/50">Listas Populares</h2>
              <Link to="/listas" className="text-[11px] md:text-[13px] font-light uppercase text-white/30 hover:text-white transition-colors">Más</Link>
            </div>
            <div className="h-[1px] bg-white/10 w-full mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularLists.length > 0 ? popularLists.map(lista => (
                <Link to={`/lista/${lista?.id || Math.random()}`} key={lista?.id || Math.random()} className="group cursor-pointer block">
                  <div className="flex -space-x-8 mb-3">
                    {(lista?.posters || []).slice(0, 5).map((poster, j) => (
                      <div key={j} className="w-16 h-24 border border-black rounded-[2px] overflow-hidden shadow-xl transform group-hover:-translate-y-1 transition-transform relative z-[1]">
                         <img loading="lazy" src={poster ? `https://image.tmdb.org/t/p/w200${poster}` : 'https://via.placeholder.com/200x300?text=No+Poster'} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <h4 className="text-[14px] font-bold text-white group-hover:text-[#1060ff] transition-colors line-clamp-1">{lista?.title || 'Lista'}</h4>
                  <p className="text-white/40 text-[11px] uppercase mt-1 font-light">Por {lista?.creator || 'Usuario'} · {((lista?.likes || 0)/1000).toFixed(1)}k likes</p>
                </Link>
              )) : (
                <div className="text-white/40 text-[13px] italic">Aún no hay listas populares.</div>
              )}
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}

export default Index;