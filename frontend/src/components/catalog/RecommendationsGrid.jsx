import React from 'react';
import { Link } from 'react-router-dom';
import movieService from '../../services/movieService';

const RecommendationsGrid = ({ items, type, currentItemName }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-16">
      <h3 className="font-brand text-3xl text-white mb-8 leading-tight font-bold">
        Si te gustó {currentItemName}...
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {items.slice(0, 5).map(rec => {
          const name = rec.title || rec.name;
          const date = rec.release_date || rec.first_air_date;
          const year = date?.split('-')[0] || 'N/R';
          
          return (
            <Link to={`/${type}/${rec.id}`} key={rec.id} className="group">
              <div className="aspect-[2/3] rounded-[8px] overflow-hidden mb-3 shadow-2xl border border-white/10 bg-black/40">
                <img 
                  src={movieService.getImageUrl(rec.poster_path, 'w342')} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  alt={name} 
                />
              </div>
              <h5 className="font-bold text-[14px] text-white group-hover:text-[#1060ff] transition-colors line-clamp-1 mb-1">
                {name}
              </h5>
              <p className="text-[11px] text-white/40 font-bold uppercase tracking-widest">
                {year}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendationsGrid;
