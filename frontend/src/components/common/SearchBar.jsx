import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import movieService from '../../services/movieService';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [inputStyle, setInputStyle] = useState({});
  const [panelStyle, setPanelStyle] = useState({});
  const [trendingTags] = useState(['Acción', 'Marvel', 'Netflix', 'Oscar 2024', 'Terror']);
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const portalRef = useRef(null);

  const updatePositions = () => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
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
  };

  useEffect(() => {
    updatePositions();
    window.addEventListener('resize', updatePositions);
    window.addEventListener('scroll', updatePositions);
    return () => {
      window.removeEventListener('resize', updatePositions);
      window.removeEventListener('scroll', updatePositions);
    };
  }, [isFocused]);

  useEffect(() => {
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
      if (!clickedInsidePortal && !clickedInsideAnchor) {
        setIsFocused(false);
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
    }
  };

  const handleTagClick = (tag) => {
    saveRecentSearch(tag);
    navigate(`/search?q=${encodeURIComponent(tag)}`);
    setIsFocused(false);
  };

  return (
    <>
      {/* ANCHOR invisible — ocupa el espacio en el header */}
      <div ref={anchorRef} className="relative w-full h-10" />

      {createPortal(
        <div ref={portalRef}>
          {/* OVERLAY */}
          {isFocused && (
            <div
              className="fixed inset-0 bg-[#0d0e12]/60 pointer-events-none"
              style={{ zIndex: 999997 }}
            />
          )}

          {/* INPUT — flotando encima de todo */}
          <div style={inputStyle}>
            <form onSubmit={handleSearchSubmit} className="relative h-full">
              <input
                type="text"
                placeholder="Buscar películas, series..."
                value={query}
                onFocus={() => setIsFocused(true)}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-full pl-10 pr-4 bg-[#1a1b23] border border-white/10 rounded-full text-[16px] md:text-[13px] font-medium text-white outline-none transition-all duration-200 placeholder:text-white/20 hover:bg-white/5 focus:border-[#1060ff]/40"
              />
              <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${isFocused ? 'text-[#1060ff]' : 'text-white/30'}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>
          </div>

          {/* PANEL DESPLEGABLE */}
          {isFocused && (
            <div
              className="bg-[#1a1b23] border border-[#1060ff]/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
              style={{ ...panelStyle, animation: 'slideDown 0.2s ease-out forwards' }}
            >
              <div className="p-4">
                {query.length === 0 ? (
                  <div className="space-y-5">
                    {recentSearches.length > 0 && (
                      <div>
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[2px] mb-3">Recientes</p>
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
                      </div>
                    )}
                    <div>
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-[2px] mb-3">Tendencias hoy</p>
                      <div className="flex flex-wrap gap-2">
                        {trendingTags.map((tag, i) => (
                          <button
                            key={i}
                            onClick={() => handleTagClick(tag)}
                            className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[12px] font-bold text-white/60 hover:bg-[#1060ff] hover:text-white hover:border-transparent transition-all"
                          >
                            {tag}
                          </button>
                        ))}
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
                            onClick={() => setIsFocused(false)}
                            className="flex items-center gap-4 p-2 rounded-xl hover:bg-white/5 transition-all group"
                          >
                            <div className="w-10 h-14 shrink-0 rounded-lg overflow-hidden bg-white/5">
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