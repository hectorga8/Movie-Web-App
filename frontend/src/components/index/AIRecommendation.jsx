import React from 'react';

function AIRecommendation() {
  const recommendations = [
    {
      title: "Dune: Parte Dos",
      director: "Denis Villeneuve",
      image: "https://image.tmdb.org/t/p/w200/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg",
      reason: "Por tu interés en Sci-Fi"
    },
    {
      title: "Interstellar",
      director: "Christopher Nolan",
      image: "https://image.tmdb.org/t/p/w200/gEU2QniE6E77NI6lCU6MxlSv2rP.jpg",
      reason: "Imprescindible de culto"
    },
    {
      title: "Oppenheimer",
      director: "Christopher Nolan",
      image: "https://image.tmdb.org/t/p/w200/8GxvynZpEJq9S1nOzSLnfbvMvS9.jpg",
      reason: "Basado en tus valoraciones"
    }
  ];

  return (
    <div className="rounded-3xl p-8 border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md shadow-2xl relative overflow-hidden group">
      {/* AI Glow effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#7b42bc]/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="flex flex-wrap items-center justify-between gap-6 mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1060ff] to-[#7b42bc] flex items-center justify-center text-white shadow-lg shadow-[#1060ff]/20 shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Recomendado por IA</h2>
            <p className="text-sm text-white/40 mt-1 font-medium">Analizando tus preferencias en tiempo real</p>
          </div>
        </div>
        <span className="inline-block text-[10px] font-black tracking-[0.2em] uppercase py-1.5 px-4 rounded-full bg-[#1060ff]/10 border border-[#1060ff]/30 text-[#1060ff]">SISTEMA ACTIVO</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {recommendations.map((rec, i) => (
          <div key={i} className="flex gap-5 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-[#1060ff]/30 hover:bg-white/10 transition-all cursor-pointer group/card shadow-lg">
            <div className="relative shrink-0">
              <img src={rec.image} alt={rec.title} className="w-16 h-24 object-cover rounded-xl shadow-2xl group-hover/card:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10"></div>
            </div>
            <div className="min-w-0 flex flex-col justify-center">
              <h4 className="text-lg font-bold text-white leading-tight mb-1 group-hover/card:text-[#1060ff] transition-colors line-clamp-1">{rec.title}</h4>
              <p className="text-xs text-white/40 mb-3 font-medium">{rec.director}</p>
              <div className="inline-flex py-1 px-2.5 rounded-lg bg-[#1060ff]/5 text-[10px] font-bold text-[#1060ff] uppercase tracking-wider w-fit">
                {rec.reason}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIRecommendation;
