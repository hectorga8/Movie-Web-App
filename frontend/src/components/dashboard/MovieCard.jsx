import { Link } from "react-router-dom";

// ─────────────────────────────────────────────────────────────
// MovieCard.jsx - Versión CineBox
// Tarjeta de película para el Dashboard
// ─────────────────────────────────────────────────────────────

function MovieCard({ 
  id,
  image, 
  title, 
  author, 
  progress = 0, 
  status = "", // "reading", "pending", "read"
  favorite = false,
  rating = 0,
  showOptions = true 
}) {
  
  // Renderizado de estrellas basado en el rating
  const renderStars = (count) => {
    return (
      <div className="flex items-center gap-0.5 mt-2">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className={i < count ? "text-[#ffcf25] text-xs" : "text-[#d5d7db] text-xs"}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="group relative flex flex-col">
      {/* Contenedor del Póster */}
      <div className="relative w-full aspect-[2/3] mb-3">
        <Link to={`/pelicula/${id}`}>
          <img 
            src={image} 
            alt={title} 
            className="movie-poster w-full h-full object-cover cursor-pointer rounded-[8px] shadow-whisper transition-transform group-hover:scale-[1.02] duration-300"
            loading="lazy"
          />
        </Link>
        
        {/* Badge: Viendo */}
        {status === "reading" && (
          <span className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm text-black label-uppercase px-2 py-1 rounded-[2px] shadow-whisper text-[9px]">
            Viendo
          </span>
        )}

        {/* Icono Favorito */}
        {favorite && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-whisper text-[#ffcf25]">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        )}

        {/* Botón de opciones (aparece en hover) */}
        {showOptions && (
          <button className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-[#15181e] text-[#efeff1] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-medium hover:bg-black">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
            </svg>
          </button>
        )}
      </div>

      {/* Información de la Película */}
      <Link 
        to={`/pelicula/${id}`} 
        className="font-brand text-black text-sm leading-tight hover:text-[#1060ff] transition-colors line-clamp-1"
      >
        {title}
      </Link>
      <p className="text-xs text-[#656a76] mt-1 line-clamp-1">
        {author}
      </p>

      {/* Barra de progreso (solo si está viendo) */}
      {status === "reading" && (
        <div className="mt-3">
          <div className="w-full bg-[#f1f2f3] rounded-full h-1 overflow-hidden">
            <div 
              className="bg-[#14c6cb] h-full rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-[#656a76] mt-1.5 font-bold uppercase tracking-tight">
            {progress}% visto
          </p>
        </div>
      )}

      {/* Badge Pendiente */}
      {status === "pending" && (
        <p className="label-uppercase text-[9px] text-[#1060ff] mt-2">
          Pendiente
        </p>
      )}

      {/* Rating */}
      {rating > 0 && renderStars(rating)}
    </div>
  );
}

export default MovieCard;
