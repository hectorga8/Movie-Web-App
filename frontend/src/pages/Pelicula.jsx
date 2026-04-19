import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReviewCard from '../components/pelicula/ReviewCard';
import InteractiveRating from '../components/pelicula/InteractiveRating';

// Placeholder temporal para RatingDistribution mientras se crea el archivo
const RatingDistribution = ({ average, totalReviews, distribution }) => (
  <div className="mb-8 p-6 bg-white rounded-2xl border border-[#606C38]/10 shadow-sm">
    <div className="flex items-center gap-4 mb-6">
      <div className="text-5xl font-bold text-[#283618]">{average}</div>
      <div>
        <div className="flex text-[#BC6C25]">{'★'.repeat(Math.round(average))}{'☆'.repeat(5-Math.round(average))}</div>
        <div className="text-xs text-[#606C38]/60">{totalReviews}</div>
      </div>
    </div>
    <div className="space-y-2">
      {distribution.map((d) => (
        <div key={d.stars} className="flex items-center gap-3 text-sm">
          <span className="w-3 font-bold text-[#283618]">{d.stars}</span>
          <div className="flex-1 h-2 bg-[#F4F3ED] rounded-full overflow-hidden">
            <div className="h-full bg-[#BC6C25]" style={{ width: `${d.percentage}%` }}></div>
          </div>
          <span className="w-8 text-right text-[#606C38]/60">{d.percentage}%</span>
        </div>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// Pelicula.jsx - Versión CineBox (Transición a TMDb)
// ─────────────────────────────────────────────────────────────

function Pelicula() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        // Nota: En transición a TMDb o AWS Lambda. 
        // Por ahora, simulamos una respuesta exitosa con datos de prueba
        // para que la interfaz se pueda seguir desarrollando.
        
        // Simulación de carga (sustituir por TMDb pronto)
        setTimeout(() => {
          setMovie({
            id: id,
            title: id === "1" ? "Dune: Parte Dos" : "Película CineBox",
            author: "Denis Villeneuve",
            thumbnail: "https://image.tmdb.org/t/p/w400/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg",
            averageRating: 4.8,
            categories: ["Sci-Fi", "Aventura", "Drama"],
            description: "En el emocionante clímax de la épica de Frank Herbert, Paul Atreides se une a Chani y los Fremen mientras busca venganza contra los conspiradores que destruyeron a su familia.",
            pageCount: 166,
            publishedDate: "2024"
          });
          setLoading(false);
        }, 800);

      } catch (err) {
        setError("Error al cargar la información de la película.");
        setLoading(false);
      }
    };

    if (id) fetchMovieDetail();
  }, [id]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-[#283618]">
      <div className="w-12 h-12 border-4 border-[#BC6C25]/20 border-t-[#BC6C25] rounded-full animate-spin"></div>
      <p className="font-bold animate-pulse">Cargando detalles de CineBox...</p>
    </div>
  );

  if (error || !movie) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <h2 className="text-2xl font-bold text-[#283618] mb-2">¡Vaya! Algo ha fallado</h2>
      <p className="text-[#606C38] mb-6">{error || "No se pudo encontrar la película."}</p>
      <Link to="/inicio" className="px-6 py-2 bg-[#283618] text-white rounded-xl font-bold">Volver al inicio</Link>
    </div>
  );

  const extraData = {
    ratingDistribution: [
      { stars: 5, percentage: 75 }, { stars: 4, percentage: 15 }, { stars: 3, percentage: 5 }, { stars: 2, percentage: 3 }, { stars: 1, percentage: 2 }
    ],
    aiSuggestions: [
      { id: "s1", title: "Interstellar", author: "Christopher Nolan", image: "https://image.tmdb.org/t/p/w400/gEU2QniE6E77NI6lCU6MxlSv2rP.jpg", rating: 4.9 },
      { id: "s2", title: "Blade Runner 2049", author: "Denis Villeneuve", image: "https://image.tmdb.org/t/p/w400/gajva2L0vL462IZxaYI4pCoYjgz.jpg", rating: 4.7 }
    ],
    reviews: [
      { id: 1, name: "Carlos Cinéfilo", date: "Hace 2 días", rating: 5, comment: "Una experiencia visual sin precedentes. La dirección es impecable." }
    ]
  };

  return (
    <main className="w-full max-w-[1250px] mx-auto px-6 py-12">
      
      {/* Breadcrumb */}
      <nav className="fade-up label-uppercase mb-12 flex items-center gap-2 opacity-60">
        <Link to="/inicio" className="hover:text-[#1060ff] transition-colors">Explorar</Link>
        <span className="opacity-30">›</span>
        <span>{movie.categories?.[0] || 'Película'}</span>
        <span className="opacity-30">›</span>
        <span className="text-black truncate max-w-[200px]">{movie.title}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-16 lg:gap-24 mb-24">
        
        {/* COLUMNA IZQUIERDA: Póster + Acciones */}
        <aside className="w-full md:w-[280px] shrink-0 flex flex-col items-center md:items-start">
          <div className="fade-up delay-1 mb-10 w-full flex justify-center md:justify-start">
            <img src={movie.thumbnail} alt={movie.title} className="w-full max-w-[240px] object-cover rounded-[8px] shadow-medium transition-transform hover:scale-[1.01] duration-300 border border-[#d5d7db]/40" />
          </div>

          <div className="fade-up delay-2 w-full text-center md:text-left mb-8">
            <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#ffcf25] text-xl" style={{ opacity: i < Math.floor(movie.averageRating) ? 1 : 0.25 }}>★</span>
              ))}
              <span className="font-brand text-xl text-black ml-2">{movie.averageRating || 'N/A'}</span>
            </div>
            <p className="label-uppercase text-[11px] opacity-70">Puntuación CineBox DB</p>
          </div>

          <div className="fade-up delay-3 w-full space-y-4">
            <button className="w-full py-3.5 rounded-[5px] bg-[#15181e] hover:bg-black text-[#efeff1] font-bold text-[13px] transition-all shadow-whisper flex items-center justify-center gap-3">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{width:18}}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
              Añadir a mi colección
            </button>
            <button className="w-full py-3.5 rounded-[4px] bg-white border border-[#d5d7db] text-[#3b3d45] font-bold text-[13px] hover:bg-[#f1f2f3] transition-all shadow-whisper flex items-center justify-center gap-2">
              Ver tráiler
            </button>
          </div>

          <div className="fade-up delay-4 w-full h-px bg-[#d5d7db] my-8"></div>
          <InteractiveRating />
          <div className="fade-up delay-5 w-full h-px bg-[#d5d7db] my-8"></div>

          <div className="fade-up delay-5 w-full space-y-4 text-sm">
            {[
              { label: "Duración", value: movie.pageCount ? `${movie.pageCount} min` : 'N/A' },
              { label: "Estreno", value: movie.publishedDate },
              { label: "Género", value: movie.categories?.[0] || 'N/A' }
            ].map((info, i) => (
              <div key={i} className="flex justify-between items-baseline border-b border-[#f1f2f3] pb-2">
                <span className="label-uppercase text-[11px] opacity-60">{info.label}</span>
                <span className="font-bold text-black">{info.value}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* COLUMNA DERECHA: Detalle */}
        <div className="flex-1 min-w-0">
          <div className="fade-up delay-1 mb-8">
            <h1 className="font-brand h-tight text-5xl md:text-7xl lg:text-[82px] text-black mb-6" style={{ fontKerning: 'normal' }}>
              {movie.title}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-[#656a76]">
              dirigida por <span className="text-black font-bold">{movie.author}</span>
            </p>
          </div>

          <div className="fade-up delay-2 flex flex-wrap gap-2 mb-12">
            {movie.categories?.map((genre, i) => (
              <span key={i} className="label-uppercase text-[11px] py-2 px-4 rounded-[4px] bg-[#f1f2f3] border border-[#d5d7db]/60 text-black">
                {genre}
              </span>
            ))}
          </div>

          <section className="fade-up delay-3 mb-12">
            <h2 className="font-brand h-tight text-3xl text-black mb-6">Sinopsis</h2>
            <div className="body-relaxed text-lg text-black/80 max-w-3xl">
                {movie.description}
            </div>
          </section>

          {/* AI SUGGESTIONS */}
          <section className="fade-up delay-4 mb-16 rounded-[8px] border border-[#d5d7db]/60 bg-[#f1f2f3]/30 p-8 shadow-whisper">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-[4px] bg-[#15181e] flex items-center justify-center text-[#efeff1] shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <h3 className="font-brand h-tight text-2xl text-black">CineBox AI sugiere</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {extraData.aiSuggestions.map((sug) => (
                <div key={sug.id} className="flex gap-4 p-4 rounded-[4px] bg-white border border-[#d5d7db]/60 hover:border-[#1060ff]/40 shadow-whisper cursor-pointer transition-all">
                  <img src={sug.image} alt={sug.title} className="w-14 h-[84px] object-cover rounded-[2px] shadow-sm shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold text-[15px] text-black leading-tight mb-1 truncate">{sug.title}</p>
                    <p className="text-xs text-[#656a76] mb-3 truncate">{sug.author}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-[#ffcf25] text-xs">★</span>
                      <span className="text-[11px] font-bold text-[#656a76] ml-1">{sug.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="fade-up delay-5 mb-12">
            <h2 className="font-brand h-tight text-3xl text-black mb-8">Críticas de la comunidad</h2>
            <RatingDistribution average={movie.averageRating || 0} totalReviews="1.2k valoraciones" distribution={extraData.ratingDistribution} />
            <div className="space-y-6">
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

export default Pelicula;
