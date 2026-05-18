import React, { useState } from 'react';

const currentYear = new Date().getFullYear();
const startDecade = Math.floor(currentYear / 10) * 10;
const decades = Array.from({ length: 13 }, (_, i) => `Década de ${startDecade - i * 10}`);

const PROVIDERS = {
  'Netflix': 8,
  'Disney+': 337,
  'HBO Max': 384,
  'Amazon Prime Video': 119,
  'Apple TV+': 350,
  'Filmin': 63,
  'Movistar+': 149,
  'Crunchyroll': 283
};

function Dropdown({ label, options, selectedValue, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <div className="flex items-center gap-1 cursor-pointer hover:text-[#fff] transition-colors py-2">
        <span className={`uppercase ${selectedValue ? 'text-[#fff] font-normal' : 'text-[#9ab] group-hover:text-[#fff]'}`}>
          {selectedValue || label}
        </span>
        <svg className="w-3 h-3 text-[#678]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 bg-[#2c3440] border border-[#445566] rounded-[3px] shadow-xl z-50 py-1 min-w-[160px] max-h-[300px] overflow-y-auto">
          {options.map((opt, i) => (
            <button 
              key={i} 
              onClick={() => { onSelect(opt); setIsOpen(false); }}
              className="block w-full text-left px-3 py-1.5 text-[12px] text-[#8aa8c2] hover:bg-[#40bcf4] hover:text-white transition-colors whitespace-nowrap"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ContentFilterBar({ variant = 'peliculas', onFilterChange }) {
  const [filters, setFilters] = useState({ year: null, rating: null, genre: null, service: null, others: null });

  const genresPeliculas = [
    { label: 'Todos los géneros', value: '' },
    { label: 'Acción', value: '28' },
    { label: 'Aventura', value: '12' },
    { label: 'Animación', value: '16' },
    { label: 'Comedia', value: '35' },
    { label: 'Crimen', value: '80' },
    { label: 'Documental', value: '99' },
    { label: 'Drama', value: '18' },
    { label: 'Familia', value: '10751' },
    { label: 'Fantasía', value: '14' },
    { label: 'Historia', value: '36' },
    { label: 'Terror', value: '27' },
    { label: 'Música', value: '10402' },
    { label: 'Misterio', value: '9648' },
    { label: 'Romance', value: '10749' },
    { label: 'Ciencia ficción', value: '878' },
    { label: 'Película de TV', value: '10770' },
    { label: 'Suspense', value: '53' },
    { label: 'Bélica', value: '10752' },
    { label: 'Western', value: '37' }
  ];

  const genresSeries = [
    { label: 'Todos los géneros', value: '' },
    { label: 'Acción y Aventura', value: '10759' },
    { label: 'Animación', value: '16' },
    { label: 'Comedia', value: '35' },
    { label: 'Crimen', value: '80' },
    { label: 'Documental', value: '99' },
    { label: 'Drama', value: '18' },
    { label: 'Familia', value: '10751' },
    { label: 'Infantil', value: '10762' },
    { label: 'Misterio', value: '9648' },
    { label: 'Noticias', value: '10763' },
    { label: 'Reality', value: '10764' },
    { label: 'Sci-Fi & Fantasy', value: '10765' },
    { label: 'Telenovela', value: '10766' },
    { label: 'Talk Show', value: '10767' },
    { label: 'Guerra y Política', value: '10768' },
    { label: 'Western', value: '37' }
  ];

  const handleSelect = (key, opt) => {
    const newFilters = { ...filters, [key]: opt };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const currentGenres = variant === 'peliculas' ? genresPeliculas : genresSeries;

  return (
    <div className="flex flex-col md:flex-row md:items-center pb-2 mb-6 z-40 relative">
      <div className="flex flex-wrap items-center gap-4 text-[12px] relative z-40">
        <span className="text-[#8aa8c2] uppercase py-2">EXPLORAR POR</span>
        
        <Dropdown 
          label="AÑO" 
          options={[{label: 'Cualquier año', value: ''}, {label: 'Este año', value: currentYear}, ...decades.map(d => ({label: d, value: d}))]} 
          selectedValue={filters.year?.value ? filters.year.label : null} 
          onSelect={(opt) => handleSelect('year', opt)} 
        />
        <Dropdown 
          label="RATING" 
          options={[{label: 'Por Defecto', value: ''}, {label: 'Más alto primero', value: 'vote_average.desc'}, {label: 'Más bajo primero', value: 'vote_average.asc'}]} 
          selectedValue={filters.rating?.value ? filters.rating.label : null} 
          onSelect={(opt) => handleSelect('rating', opt)} 
        />
        <Dropdown 
          label="GÉNERO" 
          options={currentGenres} 
          selectedValue={filters.genre?.value ? filters.genre.label : null} 
          onSelect={(opt) => handleSelect('genre', opt)} 
        />
        <Dropdown 
          label="SERVICIO" 
          options={[{label: 'Todos', value: ''}, ...Object.entries(PROVIDERS).map(([k, v]) => ({label: k, value: v}))]} 
          selectedValue={filters.service?.value ? filters.service.label : null} 
          onSelect={(opt) => handleSelect('service', opt)} 
        />
        <Dropdown 
          label="OTROS" 
          options={[{label: 'Por Defecto', value: ''}, {label: 'Orden alfabético', value: 'title'}]} 
          selectedValue={filters.others?.value ? filters.others.label : null} 
          onSelect={(opt) => handleSelect('others', opt)} 
        />
        
        {Object.values(filters).some(f => f?.value) && (
           <button 
             onClick={() => {
               const clear = { year: null, rating: null, genre: null, service: null, others: null };
               setFilters(clear);
               onFilterChange(clear);
             }}
             className="text-[10px] uppercase text-red-400 hover:text-red-300 ml-4"
           >
             Limpiar filtros
           </button>
        )}
      </div>
    </div>
  );
}

export default ContentFilterBar;