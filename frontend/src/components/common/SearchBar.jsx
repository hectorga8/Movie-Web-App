import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery(''); 
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-[220px] group">
      <input
        type="text"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-9 pl-9 pr-4 bg-gray-400/10 hover:bg-gray-400/20 focus:bg-white border border-transparent focus:border-[#1060ff]/30 rounded-full text-[13px] font-medium text-black outline-none transition-all duration-300 placeholder:text-gray-500/60"
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500/70 group-focus-within:text-[#1060ff] transition-colors">
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2.5" 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>
    </form>
  );
}

export default SearchBar;
