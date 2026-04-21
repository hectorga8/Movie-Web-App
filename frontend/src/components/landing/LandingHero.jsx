import React from 'react';
import { motion } from 'framer-motion';

function LandingHero({ movies = [] }) {
  const backgroundPosters = movies;

  return (
    <section className="relative w-full h-[420px] md:h-[700px] flex items-center justify-center overflow-hidden bg-black">

      {/* CAPA 1: MURO DE PÓSTERS EN DIAGONAL */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div
          className="flex flex-wrap justify-center gap-4 w-[200%] opacity-20 -rotate-12 scale-150 blur-xs"
          style={{ transformOrigin: 'center center' }}
        >
          {backgroundPosters.map((movie, idx) => (
            <div
              key={`${movie.id}-${idx}`}
              className="w-[140px] md:w-[200px] aspect-[2/3] shrink-0 overflow-hidden rounded-xl shadow-2xl border border-white/5"
            >
              <img
                src={movie.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* CAPA 2: UN SOLO GRADIENTE — sin overlay sólido encima */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(to top, #0d0e12 0%, #0d0e12 15%, rgba(13,14,18,0.85) 40%, rgba(13,14,18,0.4) 65%, rgba(13,14,18,0.15) 85%, transparent 100%)'
        }}
      />

      {/* CAPA 3: CONTENIDO PRINCIPAL CENTRADO */}
      <div className="relative z-20 w-full max-w-[1200px] mx-auto px-6 text-center text-white -mt-16">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-[900px] mx-auto"
        >
          <h1 className="text-6xl font-bold leading-tight sm:text-7xl lg:text-8xl tracking-tight">
            Bienvenidos.
          </h1>
          <p className="mt-8 text-2xl md:text-3xl font-medium leading-relaxed max-w-[700px] mx-auto">
            Millones de películas, series y gente por descubrir. <br className="hidden md:block" />
            <span className="text-[#01b4e4] font-bold">Explora ahora</span> la infraestructura de cine definitiva.
          </p>
        </motion.div>

        {/* ESTADÍSTICAS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center mt-16 gap-10 sm:gap-24"
        >
          <div className="flex items-center">
            <p className="text-5xl font-bold text-white tracking-tight">+1M</p>
            <p className="ml-4 text-sm text-white/60 font-bold leading-tight text-left uppercase tracking-widest">
              Películas &<br />Series
            </p>
          </div>
          
          <div className="flex items-center">
            <p className="text-5xl font-bold text-white tracking-tight">12,480</p>
            <p className="ml-4 text-sm text-white/60 font-bold leading-tight text-left uppercase tracking-widest">
              Usuarios<br />Activos
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default LandingHero;