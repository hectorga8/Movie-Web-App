import React from 'react';

function LandingHero({ movies = [] }) {
  const backgroundPosters = movies;

  return (
    <section className="relative w-full h-[420px] md:h-[700px] flex items-center justify-center overflow-hidden bg-black">

      {/* CAPA 1: MURO DE PÓSTERS EN DIAGONAL */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div
          className="flex flex-wrap justify-center gap-4 w-[200%] opacity-20 -rotate-12 scale-150 blur-xs"
          style={{ transformOrigin: 'center center', minHeight: '100%' }}
        >
          {backgroundPosters.map((movie, idx) => (
            <div
              key={`${movie.id}-${idx}`}
              className="w-[140px] md:w-[200px] aspect-[2/3] shrink-0 overflow-hidden rounded-xl shadow-2xl border border-white/5 bg-white/5"
            >
              {movie.image ? (
                <img
                  src={movie.image}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full bg-white/5 animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CAPA 2: UN SOLO GRADIENTE */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(to top, #0d0e12 0%, #0d0e12 15%, rgba(13,14,18,0.85) 40%, rgba(13,14,18,0.4) 65%, rgba(13,14,18,0.15) 85%, transparent 100%)'
        }}
      />

      {/* CAPA 3: CONTENIDO PRINCIPAL CENTRADO */}
      <div className="relative z-20 w-full max-w-[1200px] mx-auto px-4 sm:px-6 text-center text-white -mt-10 md:-mt-16">
        <div className="max-w-[900px] mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
            Bienvenidos.
          </h1>
          <p className="mt-4 md:mt-8 text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed max-w-[700px] mx-auto opacity-90">
            Millones de películas, series y gente por descubrir. <br className="hidden md:block" />
            <span className="text-[#01b4e4] font-bold">Explora ahora</span> la infraestructura definitiva.
          </p>
        </div>

        {/* ESTADÍSTICAS */}
        <div className="flex flex-row items-center justify-center mt-10 md:mt-16 gap-8 sm:gap-16 md:gap-24">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">+1M</p>
            <p className="text-[10px] sm:text-xs md:text-sm text-white/50 font-bold leading-tight text-center sm:text-left uppercase tracking-widest">
              Películas <br className="hidden sm:block" /> & Series
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">12k</p>
            <p className="text-[10px] sm:text-xs md:text-sm text-white/50 font-bold leading-tight text-center sm:text-left uppercase tracking-widest">
              Usuarios <br className="hidden sm:block" /> Activos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingHero;
