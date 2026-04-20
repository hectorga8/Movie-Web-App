import React from 'react';
import { motion } from 'framer-motion';

function LandingHero({ movies = [] }) {
  // Ahora el muro es 100% único, tomamos todos los ítems que recibimos de la Landing
  const backgroundPosters = movies;

  return (
    <section className="relative w-full h-[550px] md:h-[750px] flex items-center justify-center overflow-hidden bg-black">
      
      {/* CAPA 1: MURO DE PÓSTERS EN DIAGONAL (100% ÚNICO Y SIN REPETICIÓN) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div 
          className="flex flex-wrap justify-center gap-4 w-[200%] opacity-20 -rotate-12 scale-150"
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

        {/* CAPA 2: BLUR Y OVERLAY OSCURO (Estilo JustWatch) */}
        <div className="absolute inset-0 bg-[#032541]/85 backdrop-blur-xs"></div>
      </div>

      {/* CAPA 3: CONTENIDO PRINCIPAL CENTRADO */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 text-center text-white">
        
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

          <div className="hidden sm:block">
            <svg className="text-white/20" width="16" height="39" viewBox="0 0 16 39" fill="none" stroke="currentColor">
              <line x1="0.72265" y1="10.584" x2="15.7226" y2="0.583975"></line>
              <line x1="0.72265" y1="17.584" x2="15.7226" y2="7.58398"></line>
              <line x1="0.72265" y1="24.584" x2="15.7226" y2="14.584"></line>
              <line x1="0.72265" y1="31.584" x2="15.7226" y2="21.584"></line>
              <line x1="0.72265" y1="38.584" x2="15.7226" y2="28.584"></line>
            </svg>
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
