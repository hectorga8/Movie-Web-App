import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import movieService from '../services/movieService';

const ResultCard = ({ item }) => {
  const isMovie = item.media_type === 'movie';
  const title = item.title || item.name;
  const date = item.release_date || item.first_air_date;
  const year = date ? date.split('-')[0] : 'N/R';
  const type = isMovie ? 'pelicula' : 'serie';

  return (
    <Link to={`/${type}/${item.id}`} className="flex gap-6 bg-white/5 border border-white/10 rounded-[12px] overflow-hidden shadow-2xl hover:bg-white/10 transition-all group mb-4">
      <div className="w-[100px] md:w-[150px] shrink-0 aspect-[2/3] bg-black/40">
        <img 
          src={movieService.getImageUrl(item.poster_path, 'w185')} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex-1 py-4 pr-6 flex flex-col justify-center text-left">
        <div className="flex items-baseline gap-3 mb-1">
          <h3 className="font-bold text-lg md:text-xl text-white group-hover:text-[#1060ff] transition-colors line-clamp-1">{title}</h3>
          <span className="text-sm font-bold text-white/40">{year}</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
           <span className={`text-[10px] font-bold label-uppercase px-2 py-0.5 rounded-[4px] border ${isMovie ? 'border-[#1060ff] text-[#1060ff]' : 'border-[#7b42bc] text-[#7b42bc]'}`}>
             {isMovie ? 'Película' : 'Serie TV'}
           </span>
           <div className="flex items-center gap-1 text-[11px] font-bold text-[#21d07a]">
             <span>★</span>
             <span>{item.vote_average > 0 ? `${Math.round(item.vote_average * 10)}%` : 'S/C'}</span>
           </div>
        </div>
        <p className="body-relaxed text-sm text-white/60 line-clamp-2 md:line-clamp-3 opacity-80 italic leading-relaxed">
          {item.overview || "No hay una descripción disponible para este contenido en la red CineBox."}
        </p>
      </div>
    </Link>
  );
};

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const [allResults, setAllResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchAndSort = async () => {
      if (!query) return;
      try {
        setLoading(true);
        const data = await movieService.searchMulti(query, sortBy);
        setAllResults(data.results);
        setCurrentPage(1);
        setLoading(false);
      } catch (error) {
        console.error("Error buscando:", error);
        setLoading(false);
      }
    };
    fetchAndSort();
  }, [query, sortBy]);

  // RESET DE PÁGINA: Si el usuario cambia el filtro, lo mandamos a la página 1
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  // Filtrado
  const filteredData = activeFilter === 'all' 
    ? allResults 
    : allResults.filter(r => r.media_type === activeFilter);

  // Paginación local
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentResults = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const movieCount = allResults.filter(r => r.media_type === 'movie').length;
  const tvCount = allResults.filter(r => r.media_type === 'tv').length;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (loading) return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#0d0e12] py-20">
      <div className="w-10 h-10 border-4 border-[#1060ff]/20 border-t-[#1060ff] rounded-full animate-spin mb-4"></div>
      <p className="label-uppercase text-xs opacity-50 tracking-[2px] text-white">Analizando datos globales...</p>
    </div>
  );

  return (
    <div className="flex-1 bg-[#0d0e12] flex flex-col items-center text-white">
      <div className="w-full max-w-[1200px] px-6 py-12">
        
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div className="text-left">
            <h2 className="text-sm font-bold label-uppercase opacity-30 tracking-[2px] mb-2">Power Search CineBox</h2>
            <h1 className="text-3xl font-brand text-white font-bold">
              "{query}" <span className="text-[#1060ff] text-xl opacity-60 ml-2">({filteredData.length} resultados)</span>
            </h1>
          </div>

          <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-1.5 rounded-[8px] shadow-sm">
             <div className="flex items-center gap-2 px-3 border-r border-white/5">
                <span className="text-[11px] font-bold label-uppercase opacity-40">Orden Global</span>
             </div>
             <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-[13px] font-bold text-white focus:outline-none pr-8 py-1.5 cursor-pointer appearance-none"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%231060ff\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: '16px' }}
             >
               <option value="relevance" className="bg-[#0d0e12]">Por Relevancia</option>
               <option value="popularity" className="bg-[#0d0e12]">Por Popularidad</option>
               <option value="rating" className="bg-[#0d0e12]">Mejor Valoradas</option>
               <option value="newest" className="bg-[#0d0e12]">Más Recientes (Global)</option>
             </select>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-10">
          
          <aside className="w-full lg:w-[260px] shrink-0">
            <div className="bg-white/5 border border-white/10 rounded-[12px] shadow-2xl overflow-hidden sticky top-24">
              <div className="bg-black/40 p-5">
                <h3 className="text-white font-bold text-sm label-uppercase tracking-widest text-left opacity-60">Filtrar por</h3>
              </div>
              <div className="p-2">
                <button 
                  onClick={() => setActiveFilter('all')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-[6px] font-bold text-[13px] transition-all cursor-pointer ${activeFilter === 'all' ? 'bg-[#1060ff] text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                >
                  <span>Todos</span>
                  <span className="opacity-40 text-[11px]">{allResults.length}</span>
                </button>
                <button 
                  onClick={() => setActiveFilter('movie')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-[6px] font-bold text-[13px] transition-all cursor-pointer ${activeFilter === 'movie' ? 'bg-[#1060ff] text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                >
                  <span>Películas</span>
                  <span className="opacity-40 text-[11px]">{movieCount}</span>
                </button>
                <button 
                  onClick={() => setActiveFilter('tv')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-[6px] font-bold text-[13px] transition-all cursor-pointer ${activeFilter === 'tv' ? 'bg-[#1060ff] text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                >
                  <span>Series de TV</span>
                  <span className="opacity-40 text-[11px]">{tvCount}</span>
                </button>
              </div>
            </div>
          </aside>

          <main className="flex-1 text-left">
            {currentResults.length > 0 ? (
              <>
                <div className="min-h-[500px]">
                  {currentResults.map(item => <ResultCard key={item.id} item={item} />)}
                </div>

                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-3">
                    <button 
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-20 transition-all cursor-pointer text-white"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                    </button>

                    <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white">
                      <span className="text-sm font-bold">{currentPage}</span>
                      <span className="text-xs font-bold opacity-30 uppercase tracking-widest">de</span>
                      <span className="text-sm font-bold opacity-60">{totalPages}</span>
                    </div>

                    <button 
                      disabled={currentPage >= totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-20 transition-all cursor-pointer text-white"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-[12px] p-16 text-center shadow-2xl">
                <p className="text-3xl font-brand mb-4 opacity-20 text-white">No hay contenido bajo este filtro</p>
                <p className="text-sm text-white/40 uppercase tracking-[2px] font-bold">Intenta cambiar el tipo o el criterio de ordenación.</p>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}

export default SearchResults;
