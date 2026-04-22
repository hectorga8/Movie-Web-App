import React from 'react';
import { Link } from 'react-router-dom';

function HomeMovieCard({ movie }) {
  return (
    <Link to={`/pelicula/${movie.id}`} className="flex flex-col gap-2 group cursor-pointer block">
      {/* Imagen con bordes redondeados y sombra sutil */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-[4px] border border-white/10 shadow-lg">
        <img 
          src={movie.image} 
          alt={movie.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      {/* Info debajo de la imagen - Layout de una sola línea */}
      <div className="mt-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Puntuación */}
          <div className="flex items-center gap-1">
            <span className="text-[#00e054] text-[13px]">★</span>
            <span className="text-white/90 text-[13px] font-bold">{(movie.rating / 10).toFixed(1)}</span>
          </div>
          
          {/* Icono para escribir reseña (Reviews) */}
          <button onClick={(e) => e.preventDefault()} className="text-white/20 hover:text-[#1060ff] transition-colors relative z-10">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
        
        {/* Año a la derecha del todo */}
        <p className="text-white/30 text-[11px] font-light uppercase tracking-wider">
          {movie.date}
        </p>
      </div>
    </Link>
  );
}

export default HomeMovieCard;
