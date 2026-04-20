import React, { useState, useEffect } from 'react';
import LandingHero from '../components/landing/LandingHero';
import MovieSection from '../components/landing/MovieSection';
import TrailerSection from '../components/landing/TrailerSection';
import JoinSection from '../components/landing/JoinSection';
import movieService from '../services/movieService';

function Landing() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const [searchResults, setSearchResults] = useState(null);

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
    const fetchInitialData = async () => {
      // Películas en tendencia
      try {
        const trendingData = await movieService.getTrending();
        setTrendingMovies(mapResults(trendingData));
      } catch (e) { console.warn("Fallo trending movies"); }

      // Películas populares
      try {
        const popularData = await movieService.getPopular();
        setPopularMovies(mapResults(popularData));
      } catch (e) { console.warn("Fallo popular movies"); }

      // Series en tendencia
      try {
        const tvData = await movieService.getTVTrending();
        console.log("📦 Series recibidas:", tvData);
        setTrendingTV(mapResults(tvData));
      } catch (e) { 
        console.error("❌ Fallo trending TV:", e); 
      }
    };
    fetchInitialData();
  }, []);

  return (
    <div className="w-full bg-white overflow-hidden font-['DM_Sans',sans-serif]">
      <LandingHero />
      
      <>
        <MovieSection title="Tendencias" items={trendingMovies} />
        {/* Le pasamos las películas en tendencia para que muestre sus trailers/backdrops */}
        <TrailerSection movies={trendingMovies.slice(0, 10)} />
        <MovieSection title="Series más populares" items={trendingTV} type="serie" />
        <MovieSection title="Lo más popular" items={popularMovies} />
      </>
      
      <JoinSection />
    </div>
  );
}

export default Landing;
