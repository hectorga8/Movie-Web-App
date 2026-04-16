import ReviewCard from '../components/libro/ReviewCard';
import InteractiveRating from '../components/libro/InteractiveRating';
import RatingDistribution from '../components/libro/RatingDistribution';

// ═══════════════════════════════════════════════════════════════
// Libro.jsx
// Página de detalle profundo de un libro individual
// ═══════════════════════════════════════════════════════════════

function Libro() {
  // ── Datos del libro ────────────────────────────────────────────
  const bookData = {
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    image: "https://covers.openlibrary.org/b/id/8739161-L.jpg",
    rating: 4.5,
    reviewsCount: "24,502",
    pages: 496,
    published: "Mayo 1967",
    publisher: "Sudamericana",
    language: "Español",
    isbn: "9788497592208",
    genres: ["Ficción", "Realismo mágico", "Clásico", "Premio Nobel"],
    synopsis: [
      "«Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo.»",
      "Con esta cita comienza una de las novelas más importantes del siglo XX y una de las aventuras literarias más fascinantes de todos los tiempos. Millones de ejemplares de Cien años de soledad leídos en todas las lenguas y el Premio Nobel de Literatura coronando una obra que se había abierto paso 'boca a boca'.",
      "La fabulosa historia de la familia Buendía-Iguarán, con sus milagros, fantasías, obsesiones, tragedias e incestos, representa al mismo tiempo el mito y la historia, la tragedia y el amor del mundo entero."
    ],
    ratingDistribution: [
      { stars: 5, percentage: 62 },
      { stars: 4, percentage: 22 },
      { stars: 3, percentage: 10 },
      { stars: 2, percentage: 4 },
      { stars: 1, percentage: 2 }
    ],
    aiSuggestions: [
      { id: 1, title: "La casa de los espíritus", author: "Isabel Allende", image: "https://covers.openlibrary.org/b/id/8225261-M.jpg", rating: 4.1 },
      { id: 2, title: "Pedro Páramo", author: "Juan Rulfo", image: "https://covers.openlibrary.org/b/id/10521270-M.jpg", rating: 4.3 },
      { id: 3, title: "Rayuela", author: "Julio Cortázar", image: "https://covers.openlibrary.org/b/id/8373426-M.jpg", rating: 4.0 },
      { id: 4, title: "El amor en los tiempos del cólera", author: "Gabriel García Márquez", image: "https://covers.openlibrary.org/b/id/9255566-M.jpg", rating: 4.4 }
    ],
    reviews: [
      { id: 1, name: "Ana García", date: "Hace 3 días", rating: 5, comment: "Una novela que te cambia la perspectiva de la literatura para siempre. García Márquez construye un universo completamente propio donde lo imposible se vuelve cotidiano." },
      { id: 2, name: "Carlos Méndez", date: "Hace 1 semana", rating: 4, comment: "Al principio me costó entrar por la cantidad de personajes con el mismo nombre, pero cuando te sumerges en Macondo ya no puedes salir. La prosa es hipnótica." }
    ]
  };

  return (
    <main className="w-full max-w-[1200px] mx-auto px-6 py-10">
      
      {/* Breadcrumb */}
      <nav className="fade-up text-xs font-semibold text-[#606C38]/60 mb-10 uppercase tracking-[0.15em] flex items-center gap-2">
        <a href="#" className="hover:text-[#283618] transition-colors">Explorar</a>
        <span className="text-[#606C38]/30">›</span>
        <a href="#" className="hover:text-[#283618] transition-colors">Ficción</a>
        <span className="text-[#606C38]/30">›</span>
        <span className="text-[#283618]">{bookData.title}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-20 mb-20">
        
        {/* COLUMNA IZQUIERDA: Portada + Acciones */}
        <aside className="w-full md:w-[260px] shrink-0 flex flex-col items-center md:items-start">
          <div className="fade-up delay-1 mb-8 w-full flex justify-center md:justify-start">
            <img src={bookData.image} alt={bookData.title} className="book-cover w-full max-w-[220px] object-cover transition-transform hover:scale-[1.02] duration-300" />
          </div>

          <div className="fade-up delay-2 w-full text-center md:text-left mb-6">
            <div className="flex items-center justify-center md:justify-start gap-0.5 mb-1.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#BC6C25] text-xl" style={{ opacity: i < 4 ? 1 : 0.45 }}>★</span>
              ))}
              <span className="font-bold text-lg text-[#283618] ml-2">{bookData.rating}</span>
            </div>
            <p className="text-xs text-[#606C38]/70">Basado en {bookData.reviewsCount} valoraciones</p>
          </div>

          <div className="fade-up delay-3 w-full space-y-3">
            <button className="w-full py-3.5 rounded-xl bg-[#283618] hover:bg-[#606C38] text-[#FDFCF7] font-bold text-sm transition-all shadow-lg shadow-[#283618]/15 flex items-center justify-center gap-2">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width:18}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
              Añadir a mi biblioteca
            </button>
            <button className="w-full py-3.5 rounded-xl bg-white border border-[#606C38]/20 hover:bg-[#BC6C25] hover:border-[#BC6C25] hover:text-white text-[#283618] font-bold text-sm transition-all flex items-center justify-center gap-2 group">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width:18}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
              Añadir a favoritos
            </button>
            <button className="w-full py-3.5 rounded-xl bg-white border border-[#606C38]/20 hover:border-[#283618] hover:bg-[#F4F3ED] text-[#283618] font-bold text-sm transition-all flex items-center justify-center gap-2">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width:18}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Marcar como leído
            </button>
          </div>

          <div className="fade-up delay-4 w-full h-px bg-[#606C38]/10 my-6"></div>

          <InteractiveRating />

          <div className="fade-up delay-5 w-full h-px bg-[#606C38]/10 my-6"></div>

          <div className="fade-up delay-5 w-full space-y-3 text-sm">
            {[
              { label: "Páginas", value: bookData.pages },
              { label: "Publicación", value: bookData.published },
              { label: "Editorial", value: bookData.publisher },
              { label: "Idioma", value: bookData.language },
              { label: "ISBN", value: bookData.isbn }
            ].map((info, i) => (
              <div key={i} className="flex justify-between items-baseline">
                <span className="text-[#606C38]/60 text-xs uppercase tracking-wider font-semibold">{info.label}</span>
                <span className="font-bold text-[#283618]">{info.value}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* COLUMNA DERECHA: Detalle */}
        <div className="flex-1 min-w-0">
          <div className="fade-up delay-1 mb-6">
            <h1 className="font-['Playfair_Display',Georgia,serif] text-4xl md:text-5xl lg:text-6xl font-bold text-[#283618] leading-[1.05] mb-3">
              {bookData.title}
            </h1>
            <p className="text-lg md:text-xl font-medium text-[#606C38]">
              por <a href="#" className="text-[#283618] underline decoration-[#606C38]/25 hover:decoration-[#283618] font-semibold">{bookData.author}</a>
            </p>
          </div>

          <div className="fade-up delay-2 flex flex-wrap gap-2 mb-10">
            {bookData.genres.map((genre, i) => (
              <span key={i} className="text-[10px] font-bold tracking-[0.08em] uppercase py-1.5 px-3.5 rounded-full bg-white border border-[#606C38]/20 text-[#283618]">
                {genre}
              </span>
            ))}
          </div>

          <section className="fade-up delay-3 mb-10">
            <h2 className="font-['Playfair_Display',Georgia,serif] text-2xl font-bold text-[#283618] mb-4">Sinopsis</h2>
            <div className="space-y-4 text-[#283618]/85 leading-relaxed text-base">
              {bookData.synopsis.map((para, i) => (
                <p key={i} className={i === 0 ? "italic border-l-2 border-[#BC6C25]/40 pl-4 text-[#283618]/70" : ""}>
                  {para}
                </p>
              ))}
            </div>
          </section>

          <section className="fade-up delay-4 mb-10 rounded-2xl border border-[#606C38]/15 bg-gradient-to-br from-[#F4F3ED] to-[#FDFCF7] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[#283618] flex items-center justify-center text-white shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <h3 className="font-['Playfair_Display',Georgia,serif] text-lg font-bold text-[#283618]">Folio AI sugiere</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bookData.aiSuggestions.map((sug) => (
                <div key={sug.id} className="card-hover flex gap-3 p-3.5 rounded-xl bg-white border border-[#606C38]/10 hover:border-[#606C38]/40 shadow-sm cursor-pointer transition-all">
                  <img src={sug.image} alt={sug.title} className="w-12 h-[72px] object-cover rounded-md shadow-sm shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-[#283618] leading-tight mb-0.5 truncate">{sug.title}</p>
                    <p className="text-xs text-[#606C38]/75 mb-2 truncate">{sug.author}</p>
                    <div className="flex items-center gap-0.5">
                      <span className="text-[#BC6C25] text-xs">★</span><span className="text-[#BC6C25]/40 text-xs">★★★★</span>
                      <span className="text-[10px] text-[#606C38]/60 ml-1">{sug.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="fade-up delay-5 mb-10">
            <h2 className="font-['Playfair_Display',Georgia,serif] text-2xl font-bold text-[#283618] mb-6">Valoraciones de la comunidad</h2>
            
            <RatingDistribution 
              average={bookData.rating} 
              totalReviews={bookData.reviewsCount} 
              distribution={bookData.ratingDistribution}
            />

            <div className="space-y-5">
              {bookData.reviews.map((rev) => (
                <ReviewCard key={rev.id} {...rev} />
              ))}
              <button className="w-full py-3 rounded-xl border border-[#606C38]/20 hover:bg-[#F4F3ED] text-[#283618] text-sm font-bold transition-all">
                Ver todas las reseñas ({bookData.reviewsCount})
              </button>
            </div>
          </section>
        </div>

      </div>
    </main>
  );
}

export default Libro;
