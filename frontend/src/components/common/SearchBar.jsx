import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import movieService from '../../services/movieService';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [trending, setTrending] = useState([]);
  const [inputStyle, setInputStyle] = useState({});
  const [panelStyle, setPanelStyle] = useState({});
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const portalRef = useRef(null);
  const inputRef = useRef(null);

  const updatePositions = () => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      const isMobile = window.innerWidth < 768;

      if (isMobile && isMobileExpanded) {
        // En móvil expandido, ocupa todo el ancho de la cabecera
        setInputStyle({
          position: 'fixed',
          top: 12,
          left: 16,
          width: window.innerWidth - 80, // Deja espacio para la hamburguesa a la derecha
          height: 40,
          zIndex: 999999,
        });
        setPanelStyle({
          position: 'fixed',
          top: 60,
          left: 16,
          width: window.innerWidth - 32,
          zIndex: 999999,
        });
      } else {
        // Desktop o móvil sin expandir (aunque en móvil no se renderiza si no está expandido)
        setInputStyle({
          position: 'fixed',
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          zIndex: 999999,
        });
        setPanelStyle({
          position: 'fixed',
          top: rect.bottom + 4,
          left: rect.left,
          width: rect.width,
          zIndex: 999999,
        });
      }
    }
  };

  useEffect(() => {
    updatePositions();
    window.addEventListener('resize', updatePositions);
    window.addEventListener('scroll', updatePositions);
    return () => {
      window.removeEventListener('resize', updatePositions);
      window.removeEventListener('scroll', updatePositions);
    };
  }, [isFocused, isMobileExpanded]);

  useEffect(() => {
    if (isMobileExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMobileExpanded]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await movieService.getTrending();
        setTrending(data?.slice(0, 8) || []);
      } catch (error) {
        console.error("Error cargando tendencias:", error);
      }
    };
    fetchTrending();

    const saved = sessionStorage.getItem('recentSearches');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length > 1) {
        try {
          const data = await movieService.searchMulti(query.trim());
          setResults(data.results?.slice(0, 5) || []);
        } catch (error) {
          console.error("Error en búsqueda rápida:", error);
        }
      } else {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsidePortal = portalRef.current && portalRef.current.contains(event.target);
      const clickedInsideAnchor = anchorRef.current && anchorRef.current.contains(event.target);
      
      // Si hacemos click fuera del search y estamos en móvil expandido, lo cerramos
      if (!clickedInsidePortal && !clickedInsideAnchor) {
        setIsFocused(false);
        setIsMobileExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveRecentSearch = (term) => {
    const updated = [term, ...recentSearches.filter(t => t !== term)].slice(0, 5);
    setRecentSearches(updated);
    sessionStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (query.trim()) {
      saveRecentSearch(query.trim());
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setIsFocused(false);
      setIsMobileExpanded(false);
    }
  };

  const handleTagClick = (tag) => {
    saveRecentSearch(tag);
    navigate(`/search?q=${encodeURIComponent(tag)}`);
    setIsFocused(false);
    setIsMobileExpanded(false);
  };

  const handleTrendingClick = (item) => {
    setIsFocused(false);
    setIsMobileExpanded(false);
    navigate(`/${item.media_type === 'tv' ? 'serie' : 'pelicula'}/${item.id}`);
  };

  return (
    <>
      {/* Botón Lupa en Móvil (Visible solo si no está expandido) */}
      <div className="md:hidden flex items-center justify-end w-full">
        {!isMobileExpanded && (
          <button 
            onClick={() => setIsMobileExpanded(true)}
            className="text-white/80 hover:text-white p-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        )}
      </div>

      {/* Anchor para el Input en Desktop */}
      <div ref={anchorRef} className={`relative w-full h-10 hidden md:block ${isMobileExpanded ? 'block' : ''}`} />

      {/* Portal del Buscador */}
      {createPortal(
        <div ref={portalRef}>
          {(isFocused || isMobileExpanded) && (
            <div
              className="fixed inset-0 bg-[#0d0e12]/80 md:bg-[#0d0e12]/60 pointer-events-none"
              style={{ zIndex: 999997 }}
            />
          )}

          <div style={inputStyle} className={`${!isMobileExpanded ? 'hidden md:block' : ''}`}>
            <form onSubmit={handleSearchSubmit} className="relative h-full">
              <input
                ref={inputRef}
                type="text"
                placeholder="Buscar películas, series..."
                value={query}
                onFocus={() => setIsFocused(true)}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-full pl-10 pr-10 md:pr-4 bg-[#1a1b23] md:bg-[#1a1b23] border border-white/10 rounded-full text-[16px] md:text-[13px] font-medium text-white outline-none transition-all duration-200 placeholder:text-white/40 focus:border-[#1060ff]/60 shadow-xl"
              />
              <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${isFocused || isMobileExpanded ? 'text-[#1060ff]' : 'text-white/30'}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              {/* Botón Cerrar en Móvil */}
              {isMobileExpanded && (
                <button 
                  type="button" 
                  onClick={() => {
                    setIsMobileExpanded(false);
                    setIsFocused(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-1 md:hidden"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </form>
          </div>

          {(isFocused || isMobileExpanded) && (
            <div
              className="bg-[#1a1b23] border border-[#1060ff]/30 md:border-[#1060ff]/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
              style={{ ...panelStyle, animation: 'slideDown 0.2s ease-out forwards' }}
            >
              <div className="p-4">
                {query.length === 0 ? (
                  <div className="space-y-5">
                    <div>
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-[2px] mb-3">Recientes</p>
                      {recentSearches.length > 0 ? (
                        <div className="space-y-1">
                          {recentSearches.map((term, i) => (
                            <button
                              key={i}
                              onClick={() => handleTagClick(term)}
                              className="w-full text-left px-3 py-2 rounded-lg text-white/70 hover:bg-white/5 hover:text-[#1060ff] transition-all flex items-center gap-3 text-sm"
                            >
                              <svg className="w-3.5 h-3.5 opacity-30 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {term}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="px-3 py-2 text-white/20 text-[13px] italic">No hay búsquedas recientes</p>
                      )}
                    </div>

                    <div>
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-[2px] mb-3">Tendencias</p>
                      <div className="flex flex-wrap gap-2">
                        {trending.length > 0 ? (
                          trending.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleTrendingClick(item)}
                              className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[12px] font-bold text-white/60 hover:bg-[#1060ff] hover:text-white hover:border-transparent transition-all"
                            >
                              {item.title || item.name}
                            </button>
                          ))
                        ) : (
                          <div className="flex gap-2 animate-pulse">
                            {[1, 2, 3].map(i => <div key={i} className="h-7 w-20 bg-white/5 rounded-full" />)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[2px]">Mejores coincidencias</p>
                    <div className="space-y-1">
                      {results.length > 0 ? (
                        results.map((item) => (
                          <Link
                            key={item.id}
                            to={`/${item.media_type === 'movie' ? 'pelicula' : 'serie'}/${item.id}`}
                            onClick={() => {
                              setIsFocused(false);
                              setIsMobileExpanded(false);
                            }}
                            className="flex items-center gap-4 p-2 rounded-xl hover:bg-white/5 transition-all group"
                          >
                            {/* Imagen oculta en móvil */}
                            <div className="hidden md:block w-10 h-14 shrink-0 rounded-lg overflow-hidden bg-white/5">
                              <img src={movieService.getImageUrl(item.poster_path, 'w92')} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-bold text-sm truncate group-hover:text-[#1060ff] transition-colors">
                                {item.title || item.name}
                              </p>
                              <p className="text-white/40 text-xs mt-0.5">
                                {(item.release_date || item.first_air_date)?.split('-')[0]} · {item.media_type === 'movie' ? 'Película' : 'Serie'}
                              </p>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <p className="py-4 text-center text-white/30 text-sm italic">No se encontraron resultados...</p>
                      )}
                    </div>
                    <div className="pt-3 border-t border-white/5">
                      <button
                        onClick={handleSearchSubmit}
                        className="text-[#1060ff] text-[13px] font-bold hover:underline underline-offset-4 w-full text-center py-2"
                      >
                        Ver todos los resultados para "{query}"
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>,
        document.body
      )}
    </>
  );
}

export default SearchBar;