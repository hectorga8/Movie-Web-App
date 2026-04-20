import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    <section className="relative w-full h-[550px] flex items-center justify-center overflow-hidden">
      {/* Imagen de Fondo con animación de zoom suave */}
      <motion.div 
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1.05, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80&w=2073&auto=format&fit=crop" 
          alt="Cinema Experience" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#032541] via-[#032541]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </motion.div>

      <div className="w-full max-w-[1200px] px-6 relative z-10 text-white text-left">
        {/* Título con entrada en cascada */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-3 tracking-tighter">Bienvenidos.</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-12 opacity-90 leading-tight">
            Millones de películas, series y gente por descubrir. <br className="hidden md:block" /> 
            Explora ahora.
          </h2>
        </motion.div>

        {/* Buscador con entrada sutil */}
        <motion.form 
          onSubmit={handleSearch}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative max-w-4xl group"
        >
          <input
            type="text"
            placeholder="Buscar una película, serie de TV..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-14 md:h-16 pl-8 pr-32 rounded-full bg-white text-black text-lg focus:outline-none shadow-2xl transition-all border-2 border-transparent focus:border-mds-color-waypoint"
          />
          <button
            type="submit"
            className="absolute right-1 top-1 bottom-1 px-8 md:px-12 rounded-full bg-gradient-to-r from-mds-color-waypoint to-[#1060ff] text-white font-bold text-lg hover:brightness-110 transition-all cursor-pointer"
          >
            Buscar
          </button>
        </motion.form>
      </div>
    </section>
  );
}

export default LandingHero;
