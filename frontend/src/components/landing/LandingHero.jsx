import React, { useState } from 'react';

function LandingHero({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <section className="relative w-full min-h-[500px] flex items-center bg-[#032541] py-20 px-6">
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src="https://image.tmdb.org/t/p/original/69Uqt79BY68jQFW4YmS96T9p94Y.jpg" 
          alt="Hero BG" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#032541] to-transparent"></div>
      </div>

      <div className="w-full max-w-[1200px] mx-auto relative z-10">
        <div className="max-w-[900px]">
          <h1 className="text-[48px] md:text-[64px] font-extrabold text-white leading-tight mb-2">
            Bienvenidos.
          </h1>
          <h2 className="text-[24px] md:text-[32px] font-bold text-white mb-10 leading-tight">
            Millones de películas, series y gente que las ama. Explora ahora.
          </h2>

          <form onSubmit={handleSubmit} className="relative w-full max-w-[1000px] mt-8 group">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar películas, series, personas..." 
              className="w-full h-12 md:h-14 px-6 rounded-full text-black/70 text-lg outline-none pr-32 bg-white"
            />
            <button 
              type="submit"
              className="absolute right-0 top-0 h-full px-8 rounded-full bg-gradient-to-r from-mds-color-waypoint to-mds-color-action text-white font-bold text-lg hover:text-black transition-all cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LandingHero;
