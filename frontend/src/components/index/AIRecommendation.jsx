// ─────────────────────────────────────────────────────────────
// AIRecommendation.jsx - Versión CineBox
// Sección de recomendaciones inteligentes para Películas
// ─────────────────────────────────────────────────────────────

function AIRecommendation() {
  const recommendations = [
    {
      title: "Dune: Parte Dos",
      director: "Denis Villeneuve",
      image: "https://image.tmdb.org/t/p/w200/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg",
      reason: "«Por tu interés en Sci-Fi»"
    },
    {
      title: "Interstellar",
      director: "Christopher Nolan",
      image: "https://image.tmdb.org/t/p/w200/gEU2QniE6E77NI6lCU6MxlSv2rP.jpg",
      reason: "«Imprescindible de culto»"
    },
    {
      title: "Oppenheimer",
      director: "Christopher Nolan",
      image: "https://image.tmdb.org/t/p/w200/8GxvynZpEJq9S1nOzSLnfbvMvS9.jpg",
      reason: "«Basado en tus valoraciones»"
    }
  ];

  return (
    <div className="fade-up delay-3 rounded-2xl p-6 border border-[#606C38]/15 bg-gradient-to-br from-[#F4F3ED] to-[#FDFCF7] shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#283618] flex items-center justify-center text-white shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <div>
            <h2 className="font-['Playfair_Display',Georgia,serif] text-xl lg:text-2xl font-bold text-[#283618]">Recomendado para ti por IA</h2>
            <p className="text-xs lg:text-sm text-[#606C38]/70 mt-0.5">CineBox analiza tus gustos · actualizado hoy</p>
          </div>
        </div>
        <span className="inline-block text-[0.6rem] font-bold tracking-widest uppercase py-1 px-2.5 rounded-md bg-white border border-[#606C38]/20 text-[#283618]">Beta</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {recommendations.map((rec, i) => (
          <div key={i} className="flex gap-4 p-4 rounded-xl bg-white border border-[#606C38]/10 hover:border-[#606C38]/40 transition-all card-hover cursor-pointer">
            <img src={rec.image} alt={rec.title} className="w-16 object-cover rounded-lg shrink-0 h-20 lg:h-24 lg:w-18 shadow-md" />
            <div className="min-w-0 flex flex-col justify-center">
              <p className="font-['Playfair_Display',Georgia,serif] text-sm lg:text-base xl:text-lg font-bold text-[#283618] line-clamp-1">{rec.title}</p>
              <p className="text-xs lg:text-sm text-[#606C38]/80 mb-1">{rec.director}</p>
              <p className="text-[10px] lg:text-xs font-bold text-[#BC6C25] mt-1">{rec.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIRecommendation;
