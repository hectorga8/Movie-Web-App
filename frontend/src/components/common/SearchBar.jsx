import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function StarRating({ rating }) {
  const fullStars = Math.floor(rating || 0);
  return (
    <div className="flex gap-0.5 mt-1">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`text-[10px] ${i < fullStars ? "text-[#BC6C25]" : "text-[#BC6C25]/25"}`}>★</span>
      ))}
    </div>
  );
}

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchMovies = async () => {
      if (query.length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setLoading(true);
      setIsOpen(true);

      // Simulación de búsqueda local mientras se integra TMDb
      setTimeout(() => {
        const mockMovies = [
          { id: "1", title: "Dune: Parte Dos", author: "Denis Villeneuve", thumbnail: "https://image.tmdb.org/t/p/w200/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg", averageRating: 4.8, ratingsCount: 1540 },
          { id: "2", title: "Interstellar", author: "Christopher Nolan", thumbnail: "https://image.tmdb.org/t/p/w200/gEU2QniE6E77NI6lCU6MxlSv2rP.jpg", averageRating: 4.9, ratingsCount: 2100 },
          { id: "3", title: "Pobres Criaturas", author: "Yorgos Lanthimos", thumbnail: "https://image.tmdb.org/t/p/w200/811CcaulbxxDswZpXh9IuuIyS6H.jpg", averageRating: 4.5, ratingsCount: 890 }
        ].filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
        
        setResults(mockMovies);
        setLoading(false);
      }, 400);
    };

    const debounce = setTimeout(searchMovies, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelect = (movieId) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/pelicula/${movieId}`);
  };

  return (
    <div className="relative w-full max-w-[480px]" ref={containerRef}>
      <div className="relative group">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#606C38]/50 group-focus-within:text-[#BC6C25] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca películas en CineBox..."
          className="w-full bg-[#FDFCF7] border-2 border-[#606C38]/15 rounded-2xl py-2.5 pl-12 pr-4 text-sm text-[#283618] placeholder-[#606C38]/40 focus:outline-none focus:border-[#BC6C25] focus:ring-4 focus:ring-[#BC6C25]/5 transition-all shadow-sm"
        />
        {loading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-[#BC6C25]/30 border-t-[#BC6C25] rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Resultados Dropdown */}
      {isOpen && (results.length > 0 || loading) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-[#606C38]/15 shadow-2xl overflow-hidden z-[100] fade-up">
          <div className="p-2 max-h-[400px] overflow-y-auto">
            {results.map((movie) => (
              <button
                key={movie.id}
                onClick={() => handleSelect(movie.id)}
                className="w-full flex gap-3 p-3 rounded-xl hover:bg-[#F4F3ED] transition-colors text-left group"
              >
                <img 
                  src={movie.thumbnail} 
                  alt={movie.title}
                  className="w-10 h-14 object-cover rounded shadow-sm group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#283618] truncate leading-tight group-hover:text-[#BC6C25] transition-colors">{movie.title}</p>
                  <p className="text-[11px] text-[#606C38]/70 truncate">{movie.author}</p>
                  <StarRating rating={movie.averageRating} />
                </div>
              </button>
            ))}
            {!loading && results.length === 0 && (
              <div className="p-4 text-center text-xs text-[#606C38]/60 italic">No se encontraron películas.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
