import React from 'react';
import { Link } from 'react-router-dom';

const ListaGrid = ({ movies = [] }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-20">
      {movies.map((movie, index) => (
        <Link 
          key={index} 
          to={`/pelicula/${movie.id || index}`}
          className="group relative"
        >
          <div className="aspect-[2/3] overflow-hidden rounded-[4px] border border-white/10 group-hover:border-[#1060ff]/50 transition-all duration-300 bg-[#1a1c23] shadow-lg">
            <img 
              src={`https://image.tmdb.org/t/p/w400${movie.poster_path || movie}`} 
              alt="Movie Poster" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/200x300?text=No+Poster'; }}
            />
            {/* Overlay al hacer hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/></svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListaGrid;
