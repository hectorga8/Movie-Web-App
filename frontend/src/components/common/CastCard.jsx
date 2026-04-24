import React from 'react';
import { Link } from 'react-router-dom';
import movieService from '../../services/movieService';

const CastCard = ({ person }) => {
  if (!person) return null;
  
  return (
    <Link to={`/persona/${person.id}`} className="min-w-[140px] md:min-w-[160px] group cursor-pointer block">
      <div className="h-[220px] mb-3 rounded-[8px] overflow-hidden border border-white/10 shadow-2xl bg-black/20">
        <img 
          src={movieService.getImageUrl(person.profile_path, 'w185')} 
          alt={person.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <h4 className="font-bold text-[15px] text-white leading-tight mb-1 group-hover:text-[#1060ff] transition-colors">
        {person.name}
      </h4>
      <p className="text-[12px] text-white/40 font-medium leading-tight">
        {movieService.translateRole(person.character, person.gender)}
      </p>
    </Link>
  );
};

export default CastCard;
