// ─────────────────────────────────────────────────────────────
// IndexAside.jsx
// Barra lateral derecha con noticias, listas y géneros
// ─────────────────────────────────────────────────────────────

function IndexAside() {
  return (
    <aside className="w-full lg:w-72 xl:w-80 shrink-0 space-y-10 fade-up delay-4">
      
      {/* Noticias */}
      <div>
        <h2 className="font-['Playfair_Display',Georgia,serif] text-xl lg:text-2xl font-bold text-[#283618] mb-5">Noticias y entrevistas</h2>
        <article className="mb-5 group/news cursor-pointer">
          <div className="relative overflow-hidden rounded-xl mb-3 aspect-video shadow-sm border border-[#606C38]/10">
            <img src="https://covers.openlibrary.org/b/id/8225261-L.jpg" alt="" className="w-full h-full object-cover group-hover/news:scale-105 transition-transform duration-500" />
          </div>
          <h3 className="font-['Playfair_Display',Georgia,serif] text-base font-bold text-[#283618] group-hover/news:text-[#606C38] transition-colors leading-snug mb-1">
            100 libros épicos para elevar tu lectura de primavera
          </h3>
          <p className="text-[10px] uppercase tracking-wider text-[#606C38]/60 font-semibold">Hace 2 días</p>
        </article>

        <div className="space-y-4 pt-4 border-t border-[#606C38]/10">
          <article className="flex gap-3 group/article cursor-pointer">
            <img src="https://covers.openlibrary.org/b/id/8373426-M.jpg" alt="" className="book-cover w-12 object-cover shrink-0 h-16" />
            <div>
              <h3 className="text-sm font-bold text-[#283618] group-hover/article:text-[#606C38] transition-colors leading-snug">Entrevista exclusiva con Patrick Rothfuss</h3>
              <p className="text-[10px] uppercase tracking-wider text-[#606C38]/60 mt-1 font-semibold">Hace 4 días</p>
            </div>
          </article>
        </div>
        <a href="#" className="block mt-5 text-sm text-[#283618] font-bold hover:text-[#BC6C25] transition-colors">Ver todas las noticias →</a>
      </div>

      {/* Listas */}
      <div className="pt-8 border-t border-[#606C38]/10">
        <h2 className="font-['Playfair_Display',Georgia,serif] text-lg font-bold text-[#283618] mb-1">¿Te gustan las listas?</h2>
        <p className="text-sm text-[#606C38]/80 mb-5">Los mejores libros del siglo XXI según la comunidad</p>
        
        <div className="grid grid-cols-4 gap-2 mb-5">
          <img src="https://covers.openlibrary.org/b/id/8739161-M.jpg" alt="" className="book-cover w-full object-cover aspect-[2/3] card-hover" />
          <img src="https://covers.openlibrary.org/b/id/9255566-M.jpg" alt="" className="book-cover w-full object-cover aspect-[2/3] card-hover" />
          <img src="https://covers.openlibrary.org/b/id/8373426-M.jpg" alt="" className="book-cover w-full object-cover aspect-[2/3] card-hover" />
          <img src="https://covers.openlibrary.org/b/id/8225261-M.jpg" alt="" className="book-cover w-full object-cover aspect-[2/3] card-hover" />
        </div>

        <div className="space-y-3 mb-5">
          <a href="#" className="flex items-center gap-2 text-sm font-medium text-[#283618] hover:text-[#BC6C25] transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BC6C25] shrink-0"></span> Mejores libros del siglo XXI
          </a>
          <a href="#" className="flex items-center gap-2 text-sm font-medium text-[#283618] hover:text-[#BC6C25] transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-[#606C38] shrink-0"></span> Fantasía épica imprescindible
          </a>
        </div>
        <a href="#" className="block text-sm text-[#283618] font-bold hover:text-[#BC6C25] transition-colors">Explorar todas las listas →</a>
      </div>

      {/* Géneros */}
      <div className="pt-8 border-t border-[#606C38]/10">
        <h2 className="font-['Playfair_Display',Georgia,serif] text-lg font-bold text-[#283618] mb-4">Explorar por género</h2>
        <div className="flex flex-wrap gap-2">
          {["📖 Ficción", "🔬 Sci-Fi", "🧙 Fantasía", "🕵️ Misterio", "🏛️ Historia"].map(genre => (
            <a key={genre} href="#" className="inline-block text-[11px] font-bold tracking-wide py-1.5 px-3 rounded-lg bg-white border border-[#606C38]/20 text-[#283618] hover:border-[#283618] hover:bg-[#F4F3ED] transition-all">
              {genre}
            </a>
          ))}
        </div>
      </div>

    </aside>
  );
}

export default IndexAside;
