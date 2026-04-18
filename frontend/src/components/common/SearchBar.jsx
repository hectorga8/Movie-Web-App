import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Cerrar el buscador al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lógica de búsqueda con Debounce (espera 500ms tras dejar de escribir)
  useEffect(() => {
    const searchBooks = async () => {
      if (query.length < 3) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_BOOKS_API_URL}/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
        setIsOpen(true);
      } catch (err) {
        console.error('Error buscando libros:', err);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchBooks, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSelectBook = (googleId) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/libro/${googleId}`);
  };

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative group">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#606C38]/50 group-focus-within:text-[#BC6C25] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input
          type="text"
          placeholder="Busca autores, títulos, ISBN..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 3 && setIsOpen(true)}
          className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-[#F4F3ED] border border-[#606C38]/10 text-sm text-[#283618] placeholder-[#606C38]/40 focus:outline-none focus:border-[#BC6C25]/40 focus:bg-white transition-all"
        />
        {loading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-[#BC6C25]/20 border-t-[#BC6C25] rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* RESULTADOS DESPLEGABLES */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-[#606C38]/10 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-[400px] overflow-y-auto">
            {results.map((book) => (
              <div
                key={book.googleId}
                onClick={() => handleSelectBook(book.googleId)}
                className="flex items-center gap-4 p-3 hover:bg-[#F4F3ED] cursor-pointer transition-colors group"
              >
                <img 
                  src={book.thumbnail} 
                  alt={book.title} 
                  className="w-10 h-14 object-cover rounded-lg shadow-sm group-hover:scale-105 transition-transform" 
                />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#283618] truncate leading-tight">{book.title}</p>
                  <p className="text-[11px] text-[#606C38]/70 truncate">{book.author}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 bg-[#FDFCF7] border-t border-[#606C38]/5 text-center">
            <p className="text-[10px] font-bold text-[#606C38]/40 uppercase tracking-widest">Resultados de Google Books</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
