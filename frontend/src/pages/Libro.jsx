import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReviewCard from '../components/libro/ReviewCard';
import InteractiveRating from '../components/libro/InteractiveRating';
import RatingDistribution from '../components/libro/RatingDistribution';

// ═══════════════════════════════════════════════════════════════
// Libro.jsx
// Página de detalle profundo de un libro individual (Datos Reales)
// ═══════════════════════════════════════════════════════════════

function Libro() {
  const { id } = useParams(); // Obtenemos el ID de Google de la URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Cargar datos del libro ─────────────────────────────────────
  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_BOOKS_API_URL}/${id}`);
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.message || 'No se encontró el libro');
        
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBookDetail();
  }, [id]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-12 h-12 border-4 border-[#BC6C25]/20 border-t-[#BC6C25] rounded-full animate-spin"></div>
      <p className="text-[#606C38] font-bold animate-pulse">Consultando a la biblioteca de Google...</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <h2 className="text-2xl font-bold text-[#283618] mb-2">¡Vaya! Algo ha fallado</h2>
      <p className="text-[#606C38] mb-6">{error}</p>
      <Link to="/inicio" className="px-6 py-2 bg-[#283618] text-white rounded-xl font-bold">Volver al inicio</Link>
    </div>
  );

  // ── Datos complementarios (Próximamente de otros servicios) ───
  const extraData = {
    ratingDistribution: [
      { stars: 5, percentage: 62 },
      { stars: 4, percentage: 22 },
      { stars: 3, percentage: 10 },
      { stars: 2, percentage: 4 },
      { stars: 1, percentage: 2 }
    ],
    aiSuggestions: [
      { id: 1, title: "La casa de los espíritus", author: "Isabel Allende", image: "https://covers.openlibrary.org/b/id/8225261-M.jpg", rating: 4.1 },
      { id: 2, title: "Pedro Páramo", author: "Juan Rulfo", image: "https://covers.openlibrary.org/b/id/10521270-M.jpg", rating: 4.3 }
    ],
    reviews: [
      { id: 1, name: "Ana García", date: "Hace 3 días", rating: 5, comment: "Una novela que te cambia la perspectiva de la literatura para siempre." }
    ]
  };

  return (
    <main className="w-full max-w-[1200px] mx-auto px-6 py-10">
      
      {/* Breadcrumb */}
      <nav className="fade-up text-xs font-semibold text-[#606C38]/60 mb-10 uppercase tracking-[0.15em] flex items-center gap-2">
        <Link to="/inicio" className="hover:text-[#283618] transition-colors">Explorar</Link>
        <span className="text-[#606C38]/30">›</span>
        <span className="text-[#606C38]/40">{book.categories[0] || 'Libro'}</span>
        <span className="text-[#606C38]/30">›</span>
        <span className="text-[#283618] truncate max-w-[200px]">{book.title}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-20 mb-20">
        
        {/* COLUMNA IZQUIERDA: Portada + Acciones */}
        <aside className="w-full md:w-[260px] shrink-0 flex flex-col items-center md:items-start">
          <div className="fade-up delay-1 mb-8 w-full flex justify-center md:justify-start">
            <img src={book.thumbnail} alt={book.title} className="book-cover w-full max-w-[220px] object-cover rounded-xl shadow-2xl transition-transform hover:scale-[1.02] duration-300" />
          </div>

          <div className="fade-up delay-2 w-full text-center md:text-left mb-6">
            <div className="flex items-center justify-center md:justify-start gap-0.5 mb-1.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#BC6C25] text-xl" style={{ opacity: i < Math.floor(book.averageRating) ? 1 : 0.45 }}>★</span>
              ))}
              <span className="font-bold text-lg text-[#283618] ml-2">{book.averageRating || 'N/A'}</span>
            </div>
            <p className="text-xs text-[#606C38]/70">Puntuación media en Google Books</p>
          </div>

          <div className="fade-up delay-3 w-full space-y-3">
            <button className="w-full py-3.5 rounded-xl bg-[#283618] hover:bg-[#606C38] text-[#FDFCF7] font-bold text-sm transition-all shadow-lg shadow-[#283618]/15 flex items-center justify-center gap-2">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width:18}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
              Añadir a mi biblioteca
            </button>
          </div>

          <div className="fade-up delay-4 w-full h-px bg-[#606C38]/10 my-6"></div>

          <InteractiveRating />

          <div className="fade-up delay-5 w-full h-px bg-[#606C38]/10 my-6"></div>

          <div className="fade-up delay-5 w-full space-y-3 text-sm">
            {[
              { label: "Páginas", value: book.pageCount },
              { label: "Publicación", value: book.publishedDate },
              { label: "ISBN", value: book.isbn || 'No disponible' },
              { label: "Categoría", value: book.categories[0] || 'N/A' }
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
              {book.title}
            </h1>
            <p className="text-lg md:text-xl font-medium text-[#606C38]">
              por <span className="text-[#283618] font-semibold">{book.author}</span>
            </p>
          </div>

          <div className="fade-up delay-2 flex flex-wrap gap-2 mb-10">
            {book.categories.map((genre, i) => (
              <span key={i} className="text-[10px] font-bold tracking-[0.08em] uppercase py-1.5 px-3.5 rounded-full bg-white border border-[#606C38]/20 text-[#283618]">
                {genre}
              </span>
            ))}
          </div>

          <section className="fade-up delay-3 mb-10">
            <h2 className="font-['Playfair_Display',Georgia,serif] text-2xl font-bold text-[#283618] mb-4">Sinopsis</h2>
            <div 
              className="space-y-4 text-[#283618]/85 leading-relaxed text-base"
              dangerouslySetInnerHTML={{ __html: book.description }}
            />
          </section>

          {/* AI SUGGESTIONS (Estatico por ahora) */}
          <section className="fade-up delay-4 mb-10 rounded-2xl border border-[#606C38]/15 bg-gradient-to-br from-[#F4F3ED] to-[#FDFCF7] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[#283618] flex items-center justify-center text-white shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <h3 className="font-['Playfair_Display',Georgia,serif] text-lg font-bold text-[#283618]">Folio AI sugiere</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {extraData.aiSuggestions.map((sug) => (
                <div key={sug.id} className="card-hover flex gap-3 p-3.5 rounded-xl bg-white border border-[#606C38]/10 hover:border-[#606C38]/40 shadow-sm cursor-pointer transition-all">
                  <img src={sug.image} alt={sug.title} className="w-12 h-[72px] object-cover rounded-md shadow-sm shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-[#283618] leading-tight mb-0.5 truncate">{sug.title}</p>
                    <p className="text-xs text-[#606C38]/75 mb-2 truncate">{sug.author}</p>
                    <div className="flex items-center gap-0.5">
                      <span className="text-[#BC6C25] text-xs">★</span>
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
              average={book.averageRating || 0} 
              totalReviews="Consultando Google..." 
              distribution={extraData.ratingDistribution}
            />

            <div className="space-y-5">
              {extraData.reviews.map((rev) => (
                <ReviewCard key={rev.id} {...rev} />
              ))}
            </div>
          </section>
        </div>

      </div>
    </main>
  );
}

export default Libro;
