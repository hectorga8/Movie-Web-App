import { Link } from "react-router-dom";

// ─────────────────────────────────────────────────────────────
// MovieCardTrending.jsx - Versión CineBox
// Tarjeta de película específica para la sección de tendencias
// ─────────────────────────────────────────────────────────────

function MovieCardTrending({ id, image, title, author, rating, category, inLibrary = false }) {
  return (
    <article className="group bg-white rounded-[8px] border border-[#d5d7db]/60 hover:border-[#1060ff]/30 transition-all duration-200 hover:shadow-medium overflow-hidden shadow-whisper flex flex-col">
      <Link to={`/pelicula/${id}`} className="block relative aspect-[2/3] bg-[#f1f2f3] overflow-hidden p-3 pb-0">
        <img 
          src={image} 
          alt={title} 
          className="movie-poster w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 shadow-sm rounded-t-[4px]" 
        />
        <span className="absolute top-2 left-2 inline-block label-uppercase py-1 px-2 rounded-[2px] bg-white/95 text-black backdrop-blur-sm shadow-whisper text-[10px]">
          {category}
        </span>
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <Link to={`/pelicula/${id}`}>
          <h3 className="font-brand text-sm lg:text-base xl:text-lg text-black group-hover:text-[#1060ff] transition-colors line-clamp-2 leading-tight mb-2">
            {title}
          </h3>
        </Link>
        <p className="text-xs lg:text-sm text-[#656a76] mb-3">{author}</p>
        <div className="flex items-center gap-1 mb-4 mt-auto">
          <span className="text-[#ffcf25] text-[10px] lg:text-xs">
            {"★".repeat(Math.floor(rating))}
            {rating % 1 !== 0 && "★"}
          </span>
          <span className="text-[10px] lg:text-xs text-[#656a76] ml-1 font-bold">{rating}</span>
        </div>
        
        {inLibrary ? (
          <button className="w-full py-2 rounded-[4px] bg-[#f1f2f3] text-[#656a76] text-[11px] font-bold">
            ✓ En biblioteca
          </button>
        ) : (
          <button className="w-full py-2 rounded-[4px] bg-white hover:bg-[#15181e] hover:text-[#efeff1] border border-[#d5d7db] text-black text-[11px] font-bold transition-all shadow-whisper">
            Añadir a pendientes
          </button>
        )}
      </div>
    </article>
  );
}

export default MovieCardTrending;
