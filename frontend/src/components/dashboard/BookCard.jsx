// ─────────────────────────────────────────────────────────────
// BookCard.jsx
// Tarjeta de libro para el Dashboard
// ─────────────────────────────────────────────────────────────

function BookCard({ 
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
            className={i < count ? "text-[#BC6C25] text-xs" : "text-[#BC6C25]/30 text-xs"}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="group relative flex flex-col">
      {/* Contenedor de la Portada */}
      <div className="relative w-full aspect-[2/3] mb-3">
        <img 
          src={image} 
          alt={title} 
          className="book-cover w-full h-full object-cover card-hover cursor-pointer"
          loading="lazy"
        />
        
        {/* Badge: Leyendo */}
        {status === "reading" && (
          <span className="absolute top-2 left-2 bg-[#FDFCF7]/95 backdrop-blur-sm text-[#283618] text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md shadow-sm">
            Leyendo
          </span>
        )}

        {/* Icono Favorito */}
        {favorite && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-[#FDFCF7]/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm text-[#BC6C25]">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        )}

        {/* Botón de opciones (aparece en hover) */}
        {showOptions && (
          <button className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-[#283618] text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-md hover:bg-[#BC6C25]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
            </svg>
          </button>
        )}
      </div>

      {/* Información del Libro */}
      <a 
        href="#" 
        className="font-bold text-[#283618] text-sm leading-tight hover:text-[#606C38] transition-colors line-clamp-1"
      >
        {title}
      </a>
      <p className="text-xs text-[#606C38]/80 mt-0.5 line-clamp-1">
        {author}
      </p>

      {/* Barra de progreso (solo si está leyendo) */}
      {status === "reading" && (
        <div className="mt-2">
          <div className="w-full bg-[#606C38]/10 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-[#606C38] h-full rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-[#606C38]/60 mt-1 font-medium">
            {progress}% completado
          </p>
        </div>
      )}

      {/* Badge Pendiente */}
      {status === "pending" && (
        <p className="text-[10px] uppercase font-bold text-[#BC6C25] mt-2 tracking-wider">
          Pendiente
        </p>
      )}

      {/* Rating */}
      {rating > 0 && renderStars(rating)}
    </div>
  );
}

export default BookCard;
