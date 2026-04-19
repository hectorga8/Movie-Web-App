import React, { useState, useEffect } from 'react';
import LandingHero from '../components/landing/LandingHero';
import MovieSection from '../components/landing/MovieSection';
import TrailerSection from '../components/landing/TrailerSection';
import JoinSection from '../components/landing/JoinSection';
import movieService from '../services/movieService';

function Landing() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
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
      try {
        const [trendingData, popularData] = await Promise.all([
          movieService.getTrending(),
          movieService.getPopular()
        ]);
        setTrendingMovies(mapResults(trendingData));
        setPopularMovies(mapResults(popularData));
      } catch (error) {
        console.warn("Error cargando datos iniciales.");
      }
    };
    fetchInitialData();
  }, []);

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults(null);
      return;
    }
    try {
      const results = await movieService.searchMovies(query);
      setSearchResults(mapResults(results));
    } catch (error) {
      console.error("Error en búsqueda");
    }
  };

  return (
    <div className="w-full bg-white overflow-hidden font-['DM_Sans',sans-serif]">
      <LandingHero onSearch={handleSearch} />
      
      {searchResults ? (
        <MovieSection title="Resultados de búsqueda" items={searchResults} />
      ) : (
        <>
          <MovieSection title="Tendencias" items={trendingMovies} />
          {/* Le pasamos las películas en tendencia para que muestre sus trailers/backdrops */}
          <TrailerSection movies={trendingMovies.slice(0, 10)} />
          <MovieSection title="Lo más popular" items={popularMovies} />
        </>
      )}
      <JoinSection />
    </div>
  );
}

export default Landing;
