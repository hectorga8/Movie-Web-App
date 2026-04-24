import React from 'react';
import { Link } from 'react-router-dom';
import movieService from '../../services/movieService';

function MediaGrid({ items, type }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-10">
      {items.map(item => (
        <Link key={item.id} to={`/${type}/${item.id}`} className="group">
          <div className={`aspect-[2/3] bg-[#2c3440] rounded-[3px] border border-transparent transition-all overflow-hidden shadow-md group-hover:shadow-lg relative ${type === 'pelicula' ? 'group-hover:border-[#00e054]' : 'group-hover:border-[#ff8000]'}`}>
            <img 
              src={movieService.getImageUrl(item.poster_path, 'w300')} 
              alt={item.title || item.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default MediaGrid;