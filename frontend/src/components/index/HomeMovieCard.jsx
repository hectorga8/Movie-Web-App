import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReviewModal from '../common/ReviewModal';

function HomeMovieCard({ movie }) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <Link to={`/pelicula/${movie.id}`} className="flex flex-col gap-2 group cursor-pointer block">
          {/* Imagen con bordes redondeados y sombra sutil */}
          <div className="relative aspect-[2/3] overflow-hidden rounded-[4px] border border-white/10 shadow-lg group/card">
            <img loading="lazy" 
              src={movie.image} 
              alt={movie.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300 flex items-end justify-center">
              <span className="text-white text-[13px] text-center line-clamp-2 leading-tight drop-shadow-md w-full">{movie.title}</span>
            </div>
          </div>

          {/* Info debajo de la imagen - Layout de una sola línea */}
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Puntuación */}
              <div className="flex items-center gap-1">
                <span className="text-[#00e054] text-[13px] md:text-[15px] leading-none">★</span>
                <span className="text-white/90 text-[13px] md:text-[15px] font-normal leading-none">{(movie.rating / 10).toFixed(1)}</span>
              </div>
              
              {/* Icono para escribir reseña (Reviews) */}
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setIsReviewModalOpen(true);
                }} 
                className="text-white/20 hover:text-[#1060ff] transition-colors relative z-10 cursor-pointer flex items-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
            
            {/* Año a la derecha del todo */}
            <p className="text-white/30 text-[11px] md:text-[14px] font-light uppercase leading-none">
              {movie.date}
            </p>
          </div>
        </Link>
      </motion.div>

      {isReviewModalOpen && (
        <ReviewModal
          media={movie.rawMedia || { id: movie.id, title: movie.title, release_date: `${movie.date}-01-01` }}
          mediaType={movie.mediaType || "movie"}
          onClose={() => setIsReviewModalOpen(false)}
        />
      )}
    </>
  );
}

export default HomeMovieCard;
