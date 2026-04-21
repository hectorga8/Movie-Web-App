import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HomeMovieCard from "../components/index/HomeMovieCard";
import movieService from '../services/movieService';

function Index() {
  const { user } = useAuth();
  const [newMovies, setNewMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

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
      excerpt: "Estamos trabajando en CineBox Pro, un sistema de suscripción que te permitirá acceder a funciones exclusivas y estadísticas avanzadas de tu perfil.",
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
      image: movieService.getImageUrl(m.poster_path)
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [newData, popularData, newsData] = await Promise.all([
          movieService.getNowPlaying().catch(() => ({ results: [] })),
          movieService.getPopular().catch(() => ({ results: [] })),
          movieService.getNews().catch(() => [])
        ]);
        
        const newItems = Array.isArray(newData) ? newData : (newData.results || []);
        const popularItems = Array.isArray(popularData) ? popularData : (popularData.results || []);

        setNewMovies(mapResults(newItems));
        setPopularMovies(mapResults(popularItems));
        
        // Si newsData llega vacío, usamos el fallback
        setNews(newsData.length > 0 ? newsData : fallbackNews);
      } catch (e) {
        console.error("Error fetching data for Index:", e);
        setNews(fallbackNews);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-[#0d0e12] to-[#1a1c23] text-white min-h-screen font-['Inter',sans-serif]">
      <div className="max-w-[950px] mx-auto px-6 py-12">
        
        {/* 1. Bienvenida */}
        <section className="mb-12">
          <h1 className="text-[26px] md:text-[32px] font-medium text-[#efeff1] text-center leading-tight">
            Bienvenido, <Link to="/perfil" className="hover:text-[#1060ff] transition-colors">{user?.name.split(' ')[0]}</Link>. Esto es lo que has estado viendo…
          </h1>
          <p className="text-white/40 text-[15px] mt-2 text-center font-light">
            Esta página de inicio se personalizará a medida que sigas a los miembros activos de CineBox.
          </p>
        </section>

        {/* 2. Nuevo en CineBox */}
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

        {/* 3. Populares en CineBox */}
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

        {/* 4. Noticias de la Red */}
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

        {/* 5. Reviews Populares */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[13px] font-light uppercase tracking-[1.5px] text-white/50">Reviews Populares de la Comunidad</h2>
          </div>
          <div className="h-[1px] bg-white/10 w-full mb-6"></div>
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-[4px] border border-white/5">
                <div className="w-12 h-18 bg-white/10 shrink-0 rounded-[2px] overflow-hidden">
                   <img src={`https://image.tmdb.org/t/p/w200/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg`} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-[14px]">Usuario_{i}</span>
                    <div className="flex text-[#00e054] text-[10px]">★★★★★</div>
                  </div>
                  <p className="text-white/60 text-[13px] italic line-clamp-2 font-light">"Una obra maestra absoluta del género. La dirección de fotografía es simplemente espectacular y la banda sonora te sumerge por completo..."</p>
                  <div className="mt-2 text-[11px] text-white/30 font-light flex items-center gap-3">
                    <span className="flex items-center gap-1"><span className="text-[#ff4e4e]">❤</span> {120 + i*15} likes</span>
                    <span>12 comentarios</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Listas Populares */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[13px] font-light uppercase tracking-[1.5px] text-white/50">Listas Populares</h2>
          </div>
          <div className="h-[1px] bg-white/10 w-full mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map(i => (
              <div key={i} className="group cursor-pointer">
                <div className="flex -space-x-8 mb-3">
                  {[1, 2, 3, 4, 5].map(j => (
                    <div key={j} className="w-16 h-24 border border-black rounded-[2px] overflow-hidden shadow-xl transform group-hover:-translate-y-1 transition-transform">
                       <img src={`https://image.tmdb.org/t/p/w200/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg`} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <h4 className="text-[14px] font-bold text-white group-hover:text-[#1060ff] transition-colors">Las 100 mejores películas de Ciencia Ficción</h4>
                <p className="text-white/40 text-[11px] uppercase tracking-wider mt-1 font-light">Por Cinefilo_Pro · 1.2k likes</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

export default Index;
