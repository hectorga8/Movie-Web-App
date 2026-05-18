import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import movieService from '../../services/movieService';

function MediaCard({ 
  id, 
  type = 'pelicula', 
  imagePath, 
  title, 
  isFavorite = false,
  showTypeBadge = false,
  titlePosition = 'outside' // 'outside' o 'inside'
}) {
  const isMovie = type === 'movie' || type === 'pelicula';
  const urlType = isMovie ? 'pelicula' : 'serie';
  const displayType = isMovie ? 'Cine' : 'TV';
  const hoverColor = isMovie ? 'group-hover:border-[#00e054]' : 'group-hover:border-[#ff8000]';
  const textHoverColor = isMovie ? 'group-hover:text-[#00e054]' : 'group-hover:text-[#ff8000]';
  
  // Manejar rutas relativas vs URLs completas
  const imageUrl = imagePath && imagePath.startsWith('http') 
    ? imagePath 
    : (imagePath ? movieService.getImageUrl(imagePath, 'w400') : "https://via.placeholder.com/400x600?text=No+Image");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <Link to={`/${urlType}/${id}`} className="block">
        <div className={`aspect-[2/3] bg-[#2c3440] rounded-[4px] border border-transparent ${hoverColor} transition-all overflow-hidden shadow-md group-hover:shadow-lg relative group/card`}>
          <img loading="lazy" 
            src={imageUrl} 
            alt={title || "Sin título"} 
            className="w-full h-full object-cover"
          />
          
          {showTypeBadge && (
            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-normal uppercase text-white border border-white/10 z-10">
              {displayType}
            </div>
          )}

          {isFavorite && (
            <div className="absolute top-2 left-2 bg-red-500 text-white p-1 rounded-full shadow-md z-10">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>
          )}

          {titlePosition === 'inside' && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300 flex items-end justify-center z-10">
              <span className="text-white text-[13px] text-center line-clamp-2 leading-tight drop-shadow-md w-full">{title || "Sin título"}</span>
            </div>
          )}
        </div>
        
        {titlePosition === 'outside' && (
          <div className="mt-2 px-1">
            <h3 className={`text-white text-[13px] md:text-[15px] font-bold truncate ${textHoverColor} transition-colors`}>{title || "Sin título"}</h3>
          </div>
        )}
      </Link>
    </motion.div>
  );
}

export default MediaCard;
