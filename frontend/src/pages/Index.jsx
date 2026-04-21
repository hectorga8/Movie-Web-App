import React, { useState, useEffect } from 'react';
import IndexBanner from "../components/index/IndexBanner";
import FriendActivity from "../components/index/FriendActivity";
import MovieSection from "../components/landing/MovieSection";
import AIRecommendation from "../components/index/AIRecommendation";
import IndexAside from "../components/index/IndexAside";
import WatchingStreak from "../components/index/WatchingStreak";
import movieService from '../services/movieService';

function Index() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [recommended, setRecommended] = useState([]);

  const mapResults = (items) => items.map(m => ({
    id: m.id,
    title: m.title || m.name,
    date: m.release_date || m.first_air_date ? new Date(m.release_date || m.first_air_date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }) : 'Próximamente',
    rating: Math.round(m.vote_average * 10),
    image: movieService.getImageUrl(m.poster_path),
    backdrop: movieService.getBackdropUrl(m.backdrop_path)
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingData, popularData, topRatedData] = await Promise.all([
          movieService.getTrending(),
          movieService.getPopular(),
          movieService.getTopRated()
        ]);
        
        setTrendingMovies(mapResults(trendingData));
        setPopularMovies(mapResults(popularData));
        setRecommended(mapResults(topRatedData));
      } catch (e) {
        console.error("Error fetching movies for Index:", e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full bg-[#0d0e12] text-white min-h-screen font-['Inter',sans-serif]">
      {/* 1. Bienvenida */}
      <IndexBanner />

      <div className="w-full max-w-[1200px] mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content (Izquierda) */}
          <main className="flex-1 min-w-0 space-y-12">
            
            {/* 2. Actividad de Amigos (Prioridad Letterboxd) */}
            <section>
              <h2 className="text-[13px] font-bold uppercase tracking-[2px] text-white/40 mb-6 border-b border-white/5 pb-2">
                Novedades de tus amigos
              </h2>
              <FriendActivity />
            </section>

            {/* 3. Películas Populares */}
            <section>
              <MovieSection title="Populares esta semana" items={trendingMovies} />
            </section>

            {/* 4. Recomendaciones IA */}
            <section className="bg-white/5 rounded-lg p-6 border border-white/5">
              <AIRecommendation />
            </section>

            {/* 5. Joyas del Cine */}
            <section>
              <MovieSection title="Joyas del Cine" items={recommended} />
            </section>

          </main>

          {/* Barra Lateral (Derecha) */}
          <aside className="w-full lg:w-[300px] shrink-0 space-y-10">
            
            {/* Racha / Gamificación */}
            <section>
              <WatchingStreak />
            </section>

            {/* Listas y Enlaces */}
            <section className="sticky top-24">
              <h3 className="text-[11px] font-bold uppercase tracking-[1px] text-white/30 mb-4">
                Mi Biblioteca
              </h3>
              <IndexAside />
            </section>

          </aside>
        </div>
      </div>
    </div>
  );
}

export default Index;
