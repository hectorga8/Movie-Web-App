import React from 'react';
import { Link } from 'react-router-dom';
import movieService from '../../services/movieService';

function PersonGrid({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-10">
      {items.map(item => (
        <Link key={item.id} to={`/persona/${item.id}`} className="group">
          <div className="aspect-[2/3] bg-[#2c3440] rounded-[3px] border border-transparent transition-all overflow-hidden shadow-md group-hover:shadow-lg relative group-hover:border-[#1060ff]">
            <img 
              src={movieService.getImageUrl(item.profile_path, 'w300')} 
              alt={item.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h3 className="text-white text-[13px] font-bold truncate group-hover:text-[#1060ff] transition-colors mt-2 text-center">
            {item.name}
          </h3>
        </Link>
      ))}
    </div>
  );
}

export default PersonGrid;