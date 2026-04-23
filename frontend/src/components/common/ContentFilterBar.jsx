import React, { useState } from 'react';

function Dropdown({ label, options }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <div className="flex items-center gap-1 cursor-pointer hover:text-[#fff] transition-colors py-2">
        <span className="uppercase tracking-[1px] text-[#9ab] group-hover:text-[#fff]">{label}</span>
        <svg className="w-3 h-3 text-[#678]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 bg-[#2c3440] border border-[#445566] rounded-[3px] shadow-xl z-50 py-1 min-w-[160px] max-h-[300px] overflow-y-auto">
          {options.map((opt, i) => (
            <button key={i} className="block w-full text-left px-3 py-1.5 text-[12px] text-[#8aa8c2] hover:bg-[#40bcf4] hover:text-white transition-colors whitespace-nowrap">
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ContentFilterBar({ variant = 'peliculas' }) {
  const decades = Array.from({ length: 13 }, (_, i) => `Década de ${1900 + i * 10}`);

  const filterConfigsPeliculas = [
    { label: 'AÑO', options: ['Todas las películas', 'Próximamente', ...decades] },
    { label: 'RATING', options: ['Más alto primero', 'Más bajo primero'] },
    { label: 'POPULAR', options: ['Todo', 'Este año', 'Este mes', 'Esta semana'] },
    { label: 'GÉNERO', options: ['Acción', 'Aventura', 'Animación', 'Comedia', 'Crimen', 'Documental', 'Drama', 'Familia', 'Fantasía', 'Historia', 'Terror', 'Música', 'Misterio', 'Romance', 'Ciencia ficción', 'Película de TV', 'Suspense', 'Bélica', 'Western'] },
    { label: 'SERVICIO', options: ['Netflix', 'Disney+', 'HBO Max', 'Amazon Prime Video', 'Apple TV+', 'Filmin', 'Movistar+', 'Crunchyroll'] },
    { label: 'OTROS', options: ['Orden alfabético', 'Sagas'] },
  ];

  const filterConfigsSeries = [
    { label: 'AÑO', options: ['Todas las series', 'Próximamente', ...decades] },
    { label: 'RATING', options: ['Más alto primero', 'Más bajo primero'] },
    { label: 'POPULAR', options: ['Todo', 'Este año', 'Este mes', 'Esta semana'] },
    { label: 'GÉNERO', options: ['Acción y Aventura', 'Animación', 'Comedia', 'Crimen', 'Documental', 'Drama', 'Familia', 'Misterio', 'Reality', 'Ciencia ficción y Fantasía', 'Talk', 'Guerra y Política', 'Western'] },
    { label: 'SERVICIO', options: ['Netflix', 'Disney+', 'HBO Max', 'Amazon Prime Video', 'Apple TV+', 'Filmin', 'Movistar+', 'Crunchyroll'] },
    { label: 'OTROS', options: ['Orden alfabético'] },
  ];

  const filterConfigs = variant === 'peliculas' ? filterConfigsPeliculas : filterConfigsSeries;

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-center pb-2 mb-6 z-40 relative">
      <div className="flex flex-wrap items-center gap-4 text-[12px] relative z-40">
        <span className="text-[#8aa8c2] uppercase tracking-[1px] py-2">EXPLORAR POR</span>
        
        {filterConfigs.map((filter, index) => (
          <Dropdown key={index} label={filter.label} options={filter.options} />
        ))}
      </div>
    </div>
  );
}

export default ContentFilterBar;