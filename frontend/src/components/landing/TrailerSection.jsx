import React, { useRef, useState } from 'react';

function TrailerSection() {
  const scrollRef = useRef(null);
  const [showLeftBtn, setShowLeftBtn] = useState(false);

  const trailers = [
    { id: 1, img: "https://image.tmdb.org/t/p/w500/z6jGvS36S7ouH9L0Z69vX9MvX9M.jpg", title: "Dune: Part Two" },
    { id: 2, img: "https://image.tmdb.org/t/p/w500/oBIQrgvS36S7ouH9L0Z69vX9MvX9M.jpg", title: "Kung Fu Panda 4" },
    { id: 3, img: "https://image.tmdb.org/t/p/w500/bck9y9vS36S7ouH9L0Z69vX9MvX9M.jpg", title: "Poor Things" },
    { id: 4, img: "https://image.tmdb.org/t/p/w500/8Gxv8UbgDx9p0X7tpIq1XzXm78B.jpg", title: "Oppenheimer" }
  ];

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
    <section className="w-full py-14 bg-[#032541] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(1,180,228,0.3),transparent_70%)]"></div>
      </div>
      
      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="flex items-center gap-6 mb-8">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tighter">Últimos trailers</h3>
          <div className="flex border border-[#1ed5a9] rounded-full overflow-hidden">
            <button className="px-6 py-1.5 bg-[#1ed5a9] text-[#032541] font-bold text-sm cursor-pointer transition-colors">
              Streaming
            </button>
            <button className="px-6 py-1.5 text-white font-bold text-sm cursor-pointer hover:bg-white/10 transition-colors">
              En televisión
            </button>
          </div>
        </div>

        <div className="relative">
          {/* Botones de Navegación (Flechas) */}
          {showLeftBtn && (
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-[100px] -translate-y-1/2 -ml-4 z-40 w-11 h-11 
              rounded-full bg-white shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-all 
              text-black border border-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}

          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-[100px] -translate-y-1/2 -mr-4 z-40 w-11 h-11 rounded-full bg-white shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-all text-black border border-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
          </button>

          {/* Difuminado Lado Derecho */}
          <div className="absolute right-0 top-0 h-full w-32 z-20 pointer-events-none bg-gradient-to-l from-[#032541] to-transparent"></div>

          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-8 pb-8 no-scrollbar scroll-smooth outline-none relative z-10"
          >
            {trailers.map(trailer => (
              <div key={trailer.id} className="min-w-[300px] md:min-w-[350px] group cursor-pointer shrink-0">
                {/* Contenedor de Imagen (Card) */}
                <div className="h-[200px] relative rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300 group-hover:scale-[1.03]">
                  <img 
                    src={trailer.img} 
                    alt={trailer.title} 
                    className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" 
                  />
                  {/* Icono de Play (Centrado Visualmente) */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all group-hover:bg-[#1ed5a9] group-hover:scale-110 group-hover:border-transparent">
                      <svg className="w-8 h-8 fill-white ml-1.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Títulos FUERA de la Card para evitar que se sobresalgan */}
                <div className="mt-4 text-center">
                    <h5 className="font-bold text-lg text-white group-hover:text-[#1ed5a9] transition-colors truncate px-4">
                      {trailer.title}
                    </h5>
                    
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrailerSection;
