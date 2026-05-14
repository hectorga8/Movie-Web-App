import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HomeMovieCard from "../components/index/HomeMovieCard";
import movieService from '../services/movieService';
import { getWeeklyPopularReviews, toggleLikeReview } from '../services/reviewService';
import watchlistService from '../services/watchlistService';

function PopularReviewItem({ initialReview }) {
  const { user } = useAuth();
  const [review, setReview] = useState(initialReview);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);
  
  const isLiked = review.likedBy?.includes(user?._id) || false;
  const isLong = review.reviewText && review.reviewText.length > 130;
  const displayContent = isExpanded || !isLong 
    ? review.reviewText 
    : review.reviewText.substring(0, 130) + '...';

  const handleLike = async () => {
    if (!user || loadingLike) return;
    try {
      setLoadingLike(true);
      const data = await toggleLikeReview(review._id);
      setReview({ ...review, likes: data.likes, likedBy: data.likedBy });
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLike(false);
    }
  };

  return (
    <div className="flex gap-4 p-4 bg-white/5 rounded-[4px] border border-white/5 relative overflow-hidden group transition-all">
      <Link to={`/${review.mediaType}/${review.mediaId}`} className="w-16 md:w-20 shrink-0 rounded-[2px] overflow-hidden aspect-[2/3] block bg-white/10 h-max cursor-pointer">
         <img src={review.mediaPoster ? `https://image.tmdb.org/t/p/w200${review.mediaPoster}` : 'https://via.placeholder.com/200x300?text=No+Poster'} alt={review.mediaTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
      </Link>
      <div className="flex-1 min-w-0 flex flex-col justify-start">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-[14px] truncate">{review.username}</span>
          <div className="flex text-[#00e054] text-lg">
            {'★'.repeat(Math.max(0, review.rating || 0))}{'☆'.repeat(Math.max(0, 5 - (review.rating || 0)))}
          </div>
        </div>
        <Link to={`/${review.mediaType}/${review.mediaId}`} className="text-white/80 text-[12px] font-bold mb-1 hover:text-[#1060ff] transition-colors cursor-pointer">{review.mediaTitle} <span className="font-normal opacity-50">{review.mediaYear}</span></Link>
        <p className="text-white/60 text-[13px] italic font-light break-words mb-2">
          "{displayContent}"
          {isLong && !isExpanded && (
            <button onClick={() => setIsExpanded(true)} className="ml-1 text-white font-bold bg-transparent border-none text-[12px] hover:text-[#1060ff] cursor-pointer">Leer más</button>
          )}
        </p>
        {isLong && isExpanded && (
            <button onClick={() => setIsExpanded(false)} className="mt-1 mb-2 self-start text-white font-bold bg-transparent border-none text-[12px] hover:text-[#1060ff] cursor-pointer">Encoger review</button>
        )}
        <div className="mt-auto pt-2 text-[13px] text-white/30 font-light flex items-center gap-3 border-t border-white/5">
          <button 
            onClick={handleLike}
            disabled={!user || loadingLike}
            className={`flex items-center gap-1.5 font-bold uppercase tracking-wider transition-colors cursor-pointer ${isLiked ? 'text-[#ff4e4e]' : 'text-white/40 hover:text-white'}`}
          >
            <span className={`text-[20px] leading-none ${isLiked ? '' : 'grayscale'}`}>❤</span>
            {review.likes} {review.likes === 1 ? 'Me gusta' : 'Me gusta'}
          </button>
        </div>
      </div>
    </div>
  );
}

function MiniMovieCard({ movie }) {
  return (
    <Link to={`/pelicula/${movie.id}`} className="group block w-full">
      <div className="aspect-[2/3] rounded-[4px] overflow-hidden mb-2 shadow-lg border border-white/5 bg-black/40 relative group/card">
        <img 
          src={movie.image} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110" 
          alt={movie.title} 
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
      </div>
      <h5 className="font-bold text-[12px] text-white/90 group-hover:text-[#1060ff] transition-colors line-clamp-1 leading-tight">
        {movie.title}
      </h5>
      <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-0.5">
        {movie.date}
      </p>
    </Link>
  );
}

function Index() {
  const { user } = useAuth();
  const [newMovies, setNewMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [personalizedMovies, setPersonalizedMovies] = useState([]);
  const [recommendationsByFav, setRecommendationsByFav] = useState({ title: '', movies: [] });
  const [popularReviews, setPopularReviews] = useState([]);
  const [popularLists, setPopularLists] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // ... (keep the rest of the states and news constants)

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
      id: m.id,
      title: m.title || m.name,
      date: m.release_date ? new Date(m.release_date).getFullYear() : (m.first_air_date ? new Date(m.first_air_date).getFullYear() : 'N/A'),
      rating: Math.round(m.vote_average * 10),
      image: movieService.getImageUrl(m.poster_path),
      rawMedia: m,
      mediaType: m.title ? 'movie' : 'tv'
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
          const genreIds = user.genres.join('|'); // '|' significa OR en TMDb
          fetchPromises.push(movieService.getAllMovies(1, { genre: genreIds }).catch(() => ({ results: [] })));
        }

        // Personalización por película favorita (3C)
        if (user?.favoriteMovies?.length > 0) {
          const randomFavId = user.favoriteMovies[Math.floor(Math.random() * user.favoriteMovies.length)];
          fetchPromises.push(
            Promise.all([
              movieService.getMovieDetail(randomFavId).catch(() => ({ title: 'Tu favorita' })),
              movieService.getRecommendations(randomFavId).catch(() => [])
            ])
          );
        }

        const results = await Promise.all(fetchPromises);
        
        const [newData, popularData, newsData, reviewsData, listsData] = results;
        
        const newItems = (newData && Array.isArray(newData)) ? newData : (newData?.results || []);
        const popularItems = (popularData && Array.isArray(popularData)) ? popularData : (popularData?.results || []);

        setNewMovies(mapResults(newItems));
        setPopularMovies(mapResults(popularItems));
        setPopularReviews(reviewsData);
        
        if (listsData && listsData.popular) {
          const sortedLists = [...listsData.popular].sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 3);
          setPopularLists(sortedLists);
        }
        
        setNews(newsData && newsData.length > 0 ? newsData : fallbackNews);

        // Resultados de personalización
        let currentIndex = 5;
        if (user?.genres?.length > 0) {
          const genreData = results[currentIndex++];
          const genreItems = (genreData && Array.isArray(genreData)) ? genreData : (genreData?.results || []);
          setPersonalizedMovies(mapResults(genreItems));
        }

        if (user?.favoriteMovies?.length > 0) {
          const [favDetail, recsData] = results[currentIndex];
          setRecommendationsByFav({
            title: favDetail.title || favDetail.name || 'Tu favorita',
            movies: mapResults(recsData)
          });
        }

      } catch (e) {
        console.error("Error fetching data for Index:", e);
        setNews(fallbackNews);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const welcomeMessage = () => {
    if (!user) return "Bienvenido a CineBox. Esto es lo que has estado viendo…";
    const firstName = user.name.split(' ')[0];
    if (user.genres && user.genres.length > 0) {
      return `Bienvenido, ${firstName}. Listos para más dosis de cine.`;
    }
    return `Bienvenido, ${firstName}. Esto es lo que has estado viendo…`;
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#0d0e12] to-[#1a1c23] text-white min-h-screen font-['Inter',sans-serif]">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        
        {/* 1. Bienvenida */}
        <section className="mb-12">
          <h1 className="text-[26px] md:text-[32px] font-light text-[#efeff1] text-center leading-tight">
            {welcomeMessage()}
          </h1>
          <p className="text-white/40 text-[15px] mt-2 text-center font-light">
            {user ? "Tu experiencia personalizada está lista." : "Esta página de inicio se personalizará a medida que sigas a los miembros activos de CineBox."}
          </p>
        </section>

        {/* 2. Nuevo en CineBox (AHORA PRIMERO) */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[13px] font-light uppercase tracking-[1.5px] text-white/50">Nuevo en CineBox</h2>
            <button className="text-[11px] font-light uppercase tracking-[1px] text-white/30 hover:text-white transition-colors">Más</button>
          </div>
          <div className="h-[1px] bg-white/10 w-full mb-6"></div>
          {loading ? (
            <div className="grid grid-cols-6 gap-5 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="aspect-[2/3] bg-white/5 rounded-[4px]"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
              {newMovies.length > 0 ? newMovies.map(movie => (
                <HomeMovieCard key={movie.id} movie={movie} />
              )) : (
                <div className="col-span-6 text-center text-white/20 py-10">Cargando estrenos...</div>
              )}
            </div>
          )}
        </section>

        {/* 3. Populares en CineBox (AHORA SEGUNDO) */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[13px] font-light uppercase tracking-[1.5px] text-white/50">Populares en CineBox</h2>
            <button className="text-[11px] font-light uppercase tracking-[1px] text-white/30 hover:text-white transition-colors">Más</button>
          </div>
          <div className="h-[1px] bg-white/10 w-full mb-6"></div>
          {loading ? (
            <div className="grid grid-cols-6 gap-5 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="aspect-[2/3] bg-white/5 rounded-[4px]"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
              {popularMovies.length > 0 ? popularMovies.map(movie => (
                <HomeMovieCard key={movie.id} movie={movie} />
              )) : (
                <div className="col-span-6 text-center text-white/20 py-10">Cargando populares...</div>
              )}
            </div>
          )}
        </section>

        {/* 4. SECCIONES PERSONALIZADAS A DOS COLUMNAS (Para ti y Porque te gustó) */}
        {user && (personalizedMovies.length > 0 || recommendationsByFav.movies.length > 0) && (
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 mb-16 relative">
            
            {/* Para ti (Izquierda) */}
            <section className="flex-1 min-w-0 lg:pr-12">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-[13px] font-bold uppercase tracking-[1.5px] text-[#00e054] truncate">Para ti: Tus géneros</h2>
                <button className="text-[11px] font-light uppercase tracking-[1px] text-white/30 hover:text-white transition-colors whitespace-nowrap ml-4">Ver más</button>
              </div>
              <div className="h-[1px] bg-[#00e054]/30 w-full mb-6"></div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-2">
                {personalizedMovies.slice(0, 4).map(movie => (
                  <div key={movie.id} className="w-full max-w-[180px] mx-auto">
                    <MiniMovieCard movie={movie} />
                  </div>
                ))}
              </div>
            </section>

            {/* Separador Vertical */}
            <div className="hidden lg:block w-[1px] bg-white/10 absolute left-1/2 top-0 bottom-0 -translate-x-1/2"></div>

            {/* Porque te gustó (Derecha) */}
            <section className="flex-1 min-w-0 lg:pl-12">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-[13px] font-bold uppercase tracking-[1.5px] text-[#1060ff] truncate">
                  Porque te gustó <span className="text-white">"{recommendationsByFav.title}"</span>
                </h2>
                <button className="text-[11px] font-light uppercase tracking-[1px] text-white/30 hover:text-white transition-colors whitespace-nowrap ml-4">Más</button>
              </div>
              <div className="h-[1px] bg-[#1060ff]/30 w-full mb-6"></div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-2">
                {recommendationsByFav.movies.slice(0, 4).map(movie => (
                  <div key={movie.id} className="w-full max-w-[180px] mx-auto">
                    <MiniMovieCard movie={movie} />
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* 5. Noticias de la Red */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[13px] font-light uppercase tracking-[1.5px] text-white/50">Cine en la red</h2>
          </div>
          <div className="h-[1px] bg-white/10 w-full mb-6"></div>
          {news.length > 0 && (
            <div className="bg-[#1a1c23]/30 rounded-[4px] border border-white/5 overflow-hidden flex flex-col md:flex-row gap-6 p-1 group hover:bg-[#1a1c23]/50 transition-colors">
              <div className="w-full md:w-[320px] aspect-video md:aspect-[16/10] shrink-0 overflow-hidden">
                <img 
                  src={news[0].image} 
                  alt={news[0].title} 
                  className="w-full h-full object-cover rounded-[3px] group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="flex flex-col justify-center p-4 md:p-2">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-bold text-[#1060ff] uppercase tracking-widest">{news[0].date}</span>
                  <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">vía {news[0].source}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-[#1060ff] transition-colors">{news[0].title}</h3>
                <p className="text-white/50 text-[14px] leading-relaxed mb-4 font-light line-clamp-3">
                  {news[0].excerpt}
                </p>
                <a 
                  href={news[0].url} 
                  className="text-white/80 text-[12px] font-bold hover:text-white flex items-center gap-1 group/link" 
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
              <h2 className="text-[13px] font-light uppercase tracking-[1.5px] text-white/50">Reseñas Populares</h2>
              <Link to="/reviews-populares" className="text-[11px] font-light uppercase tracking-[1px] text-white/30 hover:text-white transition-colors">Más</Link>
            </div>
            <div className="h-[1px] bg-white/10 w-full mb-6"></div>
            <div className="space-y-4">
              {popularReviews.length > 0 ? (
                popularReviews.slice(0, 3).map(review => (
                  <PopularReviewItem key={review._id} initialReview={review} />
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
              <h2 className="text-[13px] font-light uppercase tracking-[1.5px] text-white/50">Listas Populares</h2>
              <Link to="/listas" className="text-[11px] font-light uppercase tracking-[1px] text-white/30 hover:text-white transition-colors">Más</Link>
            </div>
            <div className="h-[1px] bg-white/10 w-full mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularLists.length > 0 ? popularLists.map(lista => (
                <Link to={`/lista/${lista.id}`} key={lista.id} className="group cursor-pointer block">
                  <div className="flex -space-x-8 mb-3">
                    {(lista.posters || []).slice(0, 5).map((poster, j) => (
                      <div key={j} className="w-16 h-24 border border-black rounded-[2px] overflow-hidden shadow-xl transform group-hover:-translate-y-1 transition-transform relative z-[1]">
                         <img src={poster ? `https://image.tmdb.org/t/p/w200${poster}` : 'https://via.placeholder.com/200x300?text=No+Poster'} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <h4 className="text-[14px] font-bold text-white group-hover:text-[#1060ff] transition-colors line-clamp-1">{lista.title}</h4>
                  <p className="text-white/40 text-[11px] uppercase tracking-wider mt-1 font-light">Por {lista.creator || 'Usuario'} · {(lista.likes/1000).toFixed(1)}k likes</p>
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