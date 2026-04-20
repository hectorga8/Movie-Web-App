import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery(''); // Limpiamos después de buscar
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <input
        type="text"
        placeholder="Buscar cine y TV..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-10 pl-10 pr-4 bg-[#f1f2f3] border border-[#d5d7db] rounded-[5px] text-sm font-bold text-black focus:outline-none focus:border-[#1060ff] transition-all placeholder:text-[#656a76]/50"
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <svg className="w-4 h-4 text-[#656a76]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </form>
  );
}

export default SearchBar;
