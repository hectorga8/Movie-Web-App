import React from 'react';
import movieService from '../../services/movieService';

const SeasonSection = ({ seasons, seriesOverview }) => {
  if (!seasons || seasons.length === 0) return null;

  const currentSeason = seasons[seasons.length - 1];

  return (
    <div className="mb-16">
      {/* Título fuera de la card */}
      <div className="mb-6">
        <h3 className="font-brand text-3xl text-white leading-tight font-bold">Temporada Actual</h3>
      </div>

      <div className="p-8 bg-white/5 rounded-[12px] border border-white/10 shadow-2xl relative overflow-hidden group transition-all hover:bg-white/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1060ff] opacity-[0.05] rounded-bl-full pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
          <div className="w-[160px] shrink-0 rounded-[8px] overflow-hidden shadow-2xl border border-white/10 transition-transform group-hover:scale-[1.02] bg-black/40 aspect-[2/3]">
            <img 
              src={movieService.getImageUrl(currentSeason.poster_path)} 
              alt={currentSeason.name} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
              <h4 className="font-bold text-2xl text-white">
                {currentSeason.name}
              </h4>
              {/* Rating alineado con el título */}
              <div className="flex items-center gap-2 px-2.5 py-1 bg-white/5 rounded-[6px] border border-white/10 shadow-sm">
                <span className="text-[#ffcf25] text-sm">★</span>
                <span className="text-[13px] font-bold text-white">{currentSeason.vote_average || 'N/A'}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-bold text-white/60">
                {currentSeason.air_date?.split('-')[0] || 'Próximamente'}
              </span>
              <div className="w-px h-3 bg-white/10"></div>
              <span className="text-[11px] label-uppercase opacity-30 font-bold tracking-widest text-white">
                {currentSeason.episode_count} episodios
              </span>
            </div>

            <p className="body-relaxed text-[15px] text-white/70 mb-8 line-clamp-4 leading-[1.7] italic">
              {currentSeason.overview || seriesOverview || `La descripción para la ${currentSeason.name} se está sincronizando actualmente en la red CineBox.`}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-2.5 rounded-[8px] border border-white/10 bg-white/5 text-white text-[11px] font-bold tracking-[2px] hover:bg-[#1060ff] transition-all uppercase cursor-pointer">
                VER TODAS LAS TEMPORADAS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonSection;
