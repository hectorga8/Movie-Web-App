import React, { useRef, useState, useEffect } from 'react';

function MovieSection({ title, items, variant = "light" }) {
  const isDark = variant === "dark";
  const scrollRef = useRef(null);
  const [showLeftBtn, setShowLeftBtn] = useState(false);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowLeftBtn(scrollRef.current.scrollLeft > 10);
    }
  };

  return (
    <section className={`w-full py-14 relative group ${isDark ? 'bg-[#032541] text-white' : 'bg-[#fcfcfc] text-black'}`}>
      <div className="w-full max-w-[1200px] mx-auto px-6 relative">
        
        <div className="flex items-center gap-6 mb-8">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tighter">{title}</h3>
          <div className={`flex border rounded-full overflow-hidden ${isDark ? 'border-[#1ed5a9]' : 'border-[#032541]'}`}>
            <button className={`px-6 py-1.5 font-bold text-sm cursor-pointer transition-colors ${isDark ? 'bg-[#1ed5a9] text-[#032541]' : 'bg-[#032541] text-[#1ed5a9]'}`}>
              Hoy
            </button>
            <button className={`px-6 py-1.5 font-bold text-sm cursor-pointer transition-colors hover:bg-black/10 ${isDark ? 'text-white' : 'text-[#032541]'}`}>
              Esta semana
            </button>
          </div>
        </div>

        {/* Contenedor con Scroll y Máscara de Difuminado */}
        <div className="relative">
          {/* Botón Izquierdo */}
          {showLeftBtn && (
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-[135px] -translate-y-1/2 -ml-4 z-30 w-12 h-12 rounded-full bg-white/90 shadow-xl flex items-center justify-center cursor-pointer hover:scale-110 transition-all text-black border border-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}

          {/* Botón Derecho */}
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-[135px] -translate-y-1/2 -mr-4 z-30 w-12 h-12 rounded-full bg-white/90 shadow-xl flex items-center justify-center cursor-pointer hover:scale-110 transition-all text-black border border-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
          </button>

          {/* Difuminado Lado Derecho */}
          <div className={`absolute right-0 top-0 h-[270px] w-32 z-20 pointer-events-none bg-gradient-to-l ${isDark ? 'from-[#032541]' : 'from-[#fcfcfc]'} to-transparent`}></div>

          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-8 pb-8 no-scrollbar scroll-smooth outline-none relative z-10"
          >
            {items.map(movie => (
              <div key={movie.id} className="min-w-[180px] max-w-[180px] group/card cursor-pointer shrink-0">
                <div className="relative mb-6 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 group-hover/card:scale-105">
                  <img 
                    src={movie.image} 
                    alt={movie.title} 
                    className="w-full h-[270px] object-cover group-hover/card:opacity-90 transition-opacity" 
                  />
                  <div className="absolute -bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 w-10 h-10 bg-[#081c22] border-2 border-[#21d07a] rounded-full flex items-center justify-center text-white text-[11px] font-bold shadow-md">
                    {movie.rating}<span className="text-[6px] font-normal">%</span>
                  </div>
                </div>
                <h4 className="font-bold text-[16px] leading-snug hover:text-[#01b4e4] line-clamp-2 transition-colors">
                  {movie.title}
                </h4>
                <p className="opacity-50 text-sm mt-1 font-medium">{movie.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieSection;
