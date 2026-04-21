import React, { useRef, useState } from 'react';
import movieService from '../../services/movieService';

function TrailerSection({ movies = [] }) {
  const scrollRef = useRef(null);
  const [showLeftBtn, setShowLeftBtn] = useState(false);

  const handlePlayTrailer = async (movieId) => {
    try {
      // Pedimos el detalle de la película para obtener sus vídeos
      const detail = await movieService.getMovieDetail(movieId);
      const trailer = detail.videos?.results?.find(v => v.type === 'Trailer' && v.iso_639_1 === 'es') 
        || detail.videos?.results?.find(v => v.type === 'Trailer') 
        || detail.videos?.results?.[0];
      
      if (trailer) {
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
      } else {
        alert("Tráiler no disponible en este momento.");
      }
    } catch (error) {
      console.error("Error cargando trailer:", error);
    }
  };

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
    <section className="w-full py-14 bg-[#0d0e12] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(1,180,228,0.3),transparent_70%)]"></div>
      </div>
      
      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="flex items-center gap-6 mb-8">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tighter">Últimos trailers</h3>
          <div className="flex border border-white/10 rounded-full overflow-hidden bg-white/5">
            <button className="px-6 py-1.5 bg-[#1060ff] text-white font-bold text-sm cursor-pointer transition-colors">
              Streaming
            </button>
            <button className="px-6 py-1.5 text-white/60 font-bold text-sm cursor-pointer hover:text-white transition-colors">
              En televisión
            </button>
          </div>
        </div>

        <div className="relative">
          {showLeftBtn && (
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-[100px] -translate-y-1/2 -ml-4 z-40 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-all text-white border border-white/10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}

          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-[100px] -translate-y-1/2 -mr-4 z-40 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-all text-white border border-white/10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
          </button>

          <div className="absolute -right-2 top-0 h-full w-40 z-20 pointer-events-none bg-gradient-to-l from-[#0d0e12] via-[#0d0e12]/80 to-transparent"></div>

          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-6 pt-10 pb-8 no-scrollbar scroll-smooth outline-none relative z-10 -mt-10"
          >
            {movies.map(movie => (
              <div 
                key={movie.id} 
                onClick={() => handlePlayTrailer(movie.id)}
                className="min-w-[240px] md:min-w-[275px] h-auto group cursor-pointer shrink-0"
              >
                <div className="h-[160px] relative rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300 group-hover:scale-[1.03]">
                  <img 
                    src={movie.backdrop} 
                    alt={movie.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:opacity-70" 
                  />

                  <div className="absolute top-0 left-0 w-full p-5 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
                    <h5 className="font-bold text-lg text-[#d5d7db] group-hover:text-white transition-colors truncate max-w-[90%] tracking-tight">
                      {movie.title}
                    </h5>
                    <p className="text-[#d5d7db]/60 text-xs font-bold uppercase tracking-widest mt-0.5">Tráiler Oficial</p>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all group-hover:bg-mds-color-waypoint group-hover:scale-110 group-hover:border-transparent group-hover:shadow-[0_0_20px_rgba(20,198,203,0.4)]">
                      <svg className="w-8 h-8 fill-white ml-1.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-mds-color-waypoint/30 rounded-2xl transition-all pointer-events-none"></div>
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
