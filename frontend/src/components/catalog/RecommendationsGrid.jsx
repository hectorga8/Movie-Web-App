import React from 'react';
import { Link } from 'react-router-dom';
import movieService from '../../services/movieService';

const RecommendationsGrid = ({ items, type, currentItemName }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-16">
      <h3 className="font-brand text-3xl text-black mb-8 leading-tight font-bold">
        Si te gustó {currentItemName}...
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {items.slice(0, 5).map(rec => {
          const name = rec.title || rec.name;
          const date = rec.release_date || rec.first_air_date;
          const year = date?.split('-')[0] || 'N/R';
          
          return (
            <Link to={`/${type}/${rec.id}`} key={rec.id} className="group">
              <div className="aspect-[2/3] rounded-[3px] overflow-hidden mb-2.5 shadow-whisper border border-[#d5d7db]/40 bg-[#f1f2f3]">
                <img 
                  src={movieService.getImageUrl(rec.poster_path, 'w342')} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  alt={name} 
                />
              </div>
              <h5 className="font-bold text-[12px] text-black group-hover:text-[#1060ff] transition-colors line-clamp-1">
                {name}
              </h5>
              <p className="text-[10px] text-[#656a76] font-bold opacity-60 uppercase tracking-wider">
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
