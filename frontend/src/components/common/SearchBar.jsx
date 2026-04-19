import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function StarRating({ rating }) {
  if (!rating) return null;
  return (
    <div className="flex items-center gap-0.5 mt-1">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`text-[10px] ${i <= Math.round(rating) ? 'text-[#BC6C25]' : 'text-[#BC6C25]/25'}`}>★</span>
      ))}
      <span className="text-[9px] text-[#606C38]/60 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false); // ← rastrea si ya buscamos
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const abortRef = useRef(null); // ← cancela fetches anteriores

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Si la query es corta, limpiar y salir
    if (query.length < 3) {
      setResults([]);
      setIsOpen(false);
      setSearched(false);
      setLoading(false);
      // Cancelar cualquier fetch en curso
      if (abortRef.current) abortRef.current.abort();
      return;
    }

    // Cancelar fetch anterior si existe
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setSearched(false);

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BOOKS_API_URL}/search?q=${encodeURIComponent(query)}`,
          { 
            signal: controller.signal,
            credentials: 'omit', // No enviar cookies ni tokens de sesión
            cache: 'no-store'    // No usar resultados cacheados
          }
        );

        if (!res.ok) {
          throw new Error(`Error en la búsqueda: ${res.status}`);
        }

        const data = await res.json();
        
        // Validar que la data sea un array para evitar errores de .map()
        const books = Array.isArray(data) ? data : [];
        
        setResults(books);
        setIsOpen(true);
        setSearched(true);
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.error('Error buscando libros:', err);
        setResults([]);
        setSearched(true);
      } finally {
        setLoading(false);
      }
    }, 600);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  const handleSelect = (googleId) => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
    setSearched(false);
    navigate(`/libro/${googleId}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative group">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#606C38]/50 group-focus-within:text-[#BC6C25] transition-colors"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input
          type="text"
          placeholder="Busca autores, títulos, ISBN..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            // Si ya tenemos resultados y la query es válida, reabrir
            if (results.length > 0 && query.length >= 3) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-[#F4F3ED] border border-[#606C38]/10 text-sm text-[#283618] placeholder-[#606C38]/40 focus:outline-none focus:border-[#BC6C25]/40 focus:bg-white transition-all"
        />
        {loading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-[#BC6C25]/20 border-t-[#BC6C25] rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Resultados */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-[#606C38]/10 overflow-hidden z-[100]">
          <div className="flex flex-col">
            {results.slice(0, 5).map((book) => (
              <button
                key={book.id}
                onClick={() => handleSelect(book.id)}
                className="w-full flex items-center gap-4 p-3 hover:bg-[#F4F3ED] transition-colors text-left group"
              >
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="w-10 h-14 object-cover rounded-md shadow-sm group-hover:scale-105 transition-transform shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#283618] truncate leading-tight">{book.title}</p>
                  <p className="text-[11px] text-[#606C38]/70 truncate">{book.author}</p>
                  <StarRating rating={book.averageRating} />
                </div>
                {book.ratingsCount > 0 && (
                  <span className="text-[9px] text-[#606C38]/40 shrink-0 hidden sm:block">
                    {book.ratingsCount.toLocaleString()} votos
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="p-2.5 bg-[#FDFCF7] border-t border-[#606C38]/5 text-center">
            <p className="text-[10px] font-bold text-[#606C38]/40 uppercase tracking-widest">
              Google Books · ordenado por popularidad
            </p>
          </div>
        </div>
      )}

      {/* Sin resultados */}
      {isOpen && !loading && searched && results.length === 0 && query.length >= 3 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-[#606C38]/10 p-6 text-center z-[100]">
          <p className="text-sm text-[#606C38]/70">
            No se encontraron resultados para{' '}
            <span className="font-bold text-[#283618]">"{query}"</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchBar;