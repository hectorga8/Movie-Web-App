import React from 'react';
import movieService from '../../services/movieService';

const SeasonSection = ({ seasons }) => {
  if (!seasons || seasons.length === 0) return null;

  const currentSeason = seasons[seasons.length - 1];

  return (
    <div className="mb-16">
      {/* Título fuera de la card */}
      <div className="mb-6">
        <h3 className="font-brand text-3xl text-black leading-tight font-bold">Temporada Actual</h3>
      </div>

      <div className="p-8 bg-[#f1f2f3] rounded-[8px] border border-[#d5d7db]/60 shadow-whisper relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#1060ff] opacity-[0.03] rounded-bl-full pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
          <div className="w-[160px] shrink-0 rounded-[4px] overflow-hidden shadow-medium border border-[#d5d7db]/40 transition-transform group-hover:scale-[1.02] bg-[#d5d7db]">
            <img 
              src={movieService.getImageUrl(currentSeason.poster_path)} 
              alt={currentSeason.name} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
              <h4 className="font-bold text-2xl text-black">
                {currentSeason.name}
              </h4>
              {/* Rating alineado con el título */}
              <div className="flex items-center gap-2 px-2.5 py-1 bg-white rounded-[4px] border border-[#d5d7db]/60 shadow-sm">
                <span className="text-[#ffcf25] text-sm">★</span>
                <span className="text-[13px] font-bold text-black">{currentSeason.vote_average || 'N/A'}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-bold text-[#3b3d45]">
                {currentSeason.air_date?.split('-')[0] || 'Próximamente'}
              </span>
              <div className="w-px h-3 bg-[#d5d7db]"></div>
              <span className="text-[11px] label-uppercase opacity-50 font-bold">
                {currentSeason.episode_count} episodios
              </span>
            </div>

            <p className="body-relaxed text-[15px] text-[#656a76] mb-8 line-clamp-3 leading-[1.6]">
              {currentSeason.overview || "No hay una descripción disponible para esta temporada."}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary-dark text-[11px] tracking-[1px] py-2 px-5">
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
