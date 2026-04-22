import React from 'react';

export const PosterStack = ({ posters, size = 'normal', full = false, wider = false }) => {
  const isLarge = size === 'large';
  const postersToShow = (posters || []).slice(0, 5);
  
  // Clases dinámicas basadas en index.css
  const stackClass = `poster-stack ${isLarge ? 'lg' : ''} ${wider ? 'wider' : ''} ${full ? 'sidebar-fill' : ''}`.trim();
  
  // Dimensiones
  const pWidth = isLarge ? 125 : 85;
  const pHeight = isLarge ? 185 : 125;

  return (
    <div className="list -overlapped -stacked">
      <ul className={stackClass}>
        {postersToShow.map((poster, index) => (
          <li 
            key={index} 
            className="posteritem relative"
            style={{ zIndex: 10 - index }}
          >
            <div 
              style={{ width: `${pWidth}px`, height: `${pHeight}px` }}
              className="poster-container overflow-hidden border-r border-black/40 relative bg-[#1a1c23] rounded-[3px]"
            >
              <img 
                src={`https://image.tmdb.org/t/p/w400${poster}`} 
                alt="Poster" 
                className="image w-full h-full object-cover block opacity-100"
                loading="lazy"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/150x225?text=No+Poster'; }}
              />
              <span className="frame absolute inset-0 border border-white/5 pointer-events-none shadow-inner"></span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PosterStack;
