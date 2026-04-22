import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import movieService from '../../services/movieService';

const MovieSearchAutocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [panelStyle, setPanelStyle] = useState({});
  const wrapperRef = useRef(null);
  const anchorRef = useRef(null);
  const portalRef = useRef(null);

  const updatePosition = () => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPanelStyle({
        position: 'fixed',
        top: rect.bottom + 2,
        left: rect.left,
        width: rect.width,
        zIndex: 999999,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
    }
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [isOpen]);

  useEffect(() => {
    const searchMovies = async () => {
      if (query.length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }
      
      setIsSearching(true);
      try {
        const data = await movieService.searchMovies(query);
        const resultsArray = Array.isArray(data) ? data : (data.results || []);
        setResults(resultsArray.slice(0, 10));
        setIsOpen(true);
      } catch (error) {
        console.error('Error searching movies:', error);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(searchMovies, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  // Cerrar al hacer clic fuera, PERO ignorar si el clic es dentro del portal de resultados
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsidePortal = portalRef.current && portalRef.current.contains(event.target);
      const clickedInsideWrapper = wrapperRef.current && wrapperRef.current.contains(event.target);
      
      if (!clickedInsidePortal && !clickedInsideWrapper) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1" ref={wrapperRef}>
      <div className="relative flex items-center h-[36px]" ref={anchorRef}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder="Enter name of film..."
          className="w-full bg-[#2c3440] border border-white/5 rounded-r-[3px] px-4 py-2 text-white text-[14px] focus:outline-none focus:bg-[#445566] transition-all h-full"
        />
        {isSearching && (
          <div className="absolute right-3 w-4 h-4 border-2 border-[#1060ff] border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>

      {isOpen && results.length > 0 && createPortal(
        <div 
          ref={portalRef}
          className="bg-[#2c3440] border border-white/10 rounded-md shadow-2xl max-h-[300px] overflow-y-auto custom-scrollbar"
          style={panelStyle}
        >
          {results.map((movie) => (
            <div
              key={movie.id}
              onClick={() => {
                onSelect(movie);
                setQuery('');
                setIsOpen(false);
              }}
              className="flex items-center gap-3 p-2 hover:bg-[#1060ff] cursor-pointer transition-colors border-b border-white/5 last:border-0 group"
            >
              <img 
                src={movieService.getImageUrl(movie.poster_path, 'w92')} 
                alt="" 
                className="w-10 h-14 object-cover rounded-sm bg-black/40"
              />
              <div className="flex-1 overflow-hidden">
                <p className="text-white text-[14px] font-bold leading-tight truncate">
                  {movie.title}
                </p>
                <p className="text-[#8b9bb4] text-[12px] group-hover:text-white/70">
                  {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
                </p>
              </div>
            </div>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
};

export default MovieSearchAutocomplete;
