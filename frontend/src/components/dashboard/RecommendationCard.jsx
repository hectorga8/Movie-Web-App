// ─────────────────────────────────────────────────────────────
// RecommendationCard.jsx
// ─────────────────────────────────────────────────────────────

function RecommendationCard({ image, title, author, description, rating = 5, badge = "", variant = "secondary" }) {
  const isMain = variant === "main";

  return (
    <div className={`feature-card relative rounded-2xl shadow-sm transition-all overflow-hidden flex flex-col 
      ${isMain ? "bg-[#283618] p-6 shadow-lg shadow-[#283618]/20" : "bg-white border border-[#606C38]/10 p-5"}`}>
      
      {/* Badge para la principal */}
      {isMain && (
        <div className="inline-flex items-center gap-1.5 bg-[#BC6C25] text-white text-[0.65rem] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-4 w-fit">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
          Recomendado por IA
        </div>
      )}

      <div className="flex gap-4 mb-4">
        <img src={image} alt={title} className={`book-spine object-cover shrink-0 ${isMain ? "w-14 h-20" : "w-12 h-18"}`}/>
        <div className="flex-1 min-w-0">
          {!isMain && badge && <p className="text-[10px] font-bold uppercase tracking-widest text-[#606C38]/60 mb-1">{badge}</p>}
          <h3 className={`font-['Playfair_Display',Georgia,serif] font-bold leading-tight mb-1 truncate ${isMain ? "text-white text-base" : "text-[#283618] text-base"}`}>{title}</h3>
          <p className={`text-xs truncate ${isMain ? "text-white/60" : "text-[#606C38]/70"}`}>{author}</p>
          <div className="flex items-center gap-0.5 mt-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < rating ? "text-[#BC6C25] text-xs" : "text-[#BC6C25]/30 text-xs"}>★</span>
            ))}
          </div>
        </div>
      </div>

      {/* Descripción (Ahora para ambas variantes) */}
      <p className={`text-xs leading-relaxed line-clamp-2 ${isMain ? "text-white/70" : "text-[#606C38]/70"}`}>
        {description}
      </p>

      {/* Botón solo para la principal */}
      {isMain && (
        <button className="mt-5 w-full px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/10 transition-all">
          Añadir a mi lista
        </button>
      )}

      {/* Botón guardar para las secundarias */}
      {!isMain && (
        <button className="mt-4 w-fit text-[10px] font-bold uppercase tracking-wider text-[#283618] border-b border-[#283618]/20 hover:border-[#283618] transition-all">
          Guardar libro
        </button>
      )}
    </div>
  );
}

export default RecommendationCard;
