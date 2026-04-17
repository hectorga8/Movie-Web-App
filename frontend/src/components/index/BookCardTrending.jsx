// ─────────────────────────────────────────────────────────────
// BookCardTrending.jsx
// Tarjeta de libro específica para la sección de tendencias
// ─────────────────────────────────────────────────────────────

function BookCardTrending({ image, title, author, rating, category, inLibrary = false }) {
  return (
    <article className="group bg-white rounded-xl border border-[#606C38]/10 hover:border-[#606C38]/30 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg overflow-hidden shadow-sm flex flex-col">
      <a href="#" className="block relative aspect-[2/3] bg-[#F4F3ED] overflow-hidden p-3 pb-0">
        <img 
          src={image} 
          alt={title} 
          className="book-cover w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" 
        />
        <span className="absolute top-2 left-2 inline-block text-[0.6rem] font-bold tracking-widest uppercase py-1 px-2 rounded-md bg-white/90 text-[#283618] backdrop-blur-sm shadow-sm">
          {category}
        </span>
      </a>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-['Playfair_Display',Georgia,serif] text-sm lg:text-base xl:text-lg font-bold text-[#283618] group-hover:text-[#606C38] transition-colors line-clamp-2 leading-snug mb-1">
          {title}
        </h3>
        <p className="text-xs lg:text-sm text-[#606C38]/80 mb-2">{author}</p>
        <div className="flex items-center gap-0.5 mb-3 mt-auto">
          <span className="text-[#BC6C25] text-[10px] lg:text-xs">
            {"★".repeat(Math.floor(rating))}
            {rating % 1 !== 0 && "★"}
          </span>
          <span className="text-[10px] lg:text-xs text-[#606C38] ml-1 font-medium">{rating}</span>
        </div>
        
        {inLibrary ? (
          <button className="w-full py-2 rounded-lg bg-[#606C38]/10 text-[#606C38] text-[10px] lg:text-xs font-bold">
            ✓ En biblioteca
          </button>
        ) : (
          <button className="w-full py-2 rounded-lg bg-[#F4F3ED] hover:bg-[#283618] hover:text-white border border-[#606C38]/10 text-[#283618] text-[10px] lg:text-xs font-bold transition-all">
            Añadir a pendientes
          </button>
        )}
      </div>
    </article>
  );
}

export default BookCardTrending;
