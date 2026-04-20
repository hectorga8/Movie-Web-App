import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingHero() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      {/* Imagen de Fondo (Hero) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/src/assets/hero.png" 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#032541]/90 to-[#032541]/40"></div>
      </div>

      <div className="w-full max-w-[1200px] px-6 relative z-10 text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-2 tracking-tight">Bienvenidos.</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-10 opacity-90 leading-tight">
          Millones de películas, series y gente por descubrir. <br className="hidden md:block" /> 
          Explora ahora.
        </h2>

        {/* Buscador Estilo HashiCorp/TMDB */}
        <form onSubmit={handleSearch} className="relative max-w-4xl group">
          <input
            type="text"
            placeholder="Buscar una película, serie de TV..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-12 md:h-14 pl-6 pr-32 rounded-full bg-white text-black text-lg focus:outline-none shadow-xl transition-all border-2 border-transparent focus:border-mds-color-waypoint"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 h-full px-8 md:px-10 rounded-full bg-gradient-to-r from-mds-color-waypoint to-[#1060ff] text-white font-bold text-lg hover:brightness-110 transition-all cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}

export default LandingHero;
