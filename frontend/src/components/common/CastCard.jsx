import React from 'react';
import movieService from '../../services/movieService';

const CastCard = ({ person }) => {
  if (!person) return null;
  
  return (
    <div className="min-w-[140px] md:min-w-[160px] group cursor-pointer">
      <div className="h-[220px] mb-3 rounded-[4px] overflow-hidden border border-[#d5d7db]/40 shadow-whisper bg-[#f1f2f3]">
        <img 
          src={movieService.getImageUrl(person.profile_path, 'w185')} 
          alt={person.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <h4 className="font-bold text-[14px] text-black leading-tight mb-0.5 group-hover:text-[#1060ff] transition-colors">
        {person.name}
      </h4>
      <p className="text-[12px] text-[#656a76] font-medium leading-tight">
        {person.character}
      </p>
    </div>
  );
};

export default CastCard;
