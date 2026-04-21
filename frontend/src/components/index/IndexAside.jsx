import React from 'react';

function IndexAside() {
  return (
    <aside className="w-full space-y-12">
      
      {/* Noticias */}
      <div className="group">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-[#7b42bc] rounded-full"></span>
          Noticias de Hollywood
        </h2>
        <article className="mb-6 group/news cursor-pointer">
          <div className="relative overflow-hidden rounded-2xl mb-4 aspect-video shadow-2xl border border-white/5">
            <img src="https://image.tmdb.org/t/p/w500/ovM06PdffK866PBrsBqPfwZhybi.jpg" alt="" className="w-full h-full object-cover group-hover/news:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/news:opacity-100 transition-opacity"></div>
          </div>
          <h3 className="text-lg font-bold text-white group-hover/news:text-[#1060ff] transition-colors leading-tight mb-2">
            Las 10 películas más esperadas de este verano
          </h3>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-black">Hace 2 días</p>
        </article>

        <div className="space-y-5 pt-6 border-t border-white/5">
          <article className="flex gap-4 group/article cursor-pointer items-center">
            <img src="https://image.tmdb.org/t/p/w200/8GxvynZpEJq9S1nOzSLnfbvMvS9.jpg" alt="" className="w-14 h-20 object-cover shrink-0 rounded-xl shadow-xl border border-white/5 group-hover/article:scale-105 transition-transform" />
            <div>
              <h3 className="text-sm font-bold text-white/80 group-hover/article:text-[#1060ff] transition-colors leading-snug">Entrevista exclusiva con Christopher Nolan</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-2 font-black">Hace 4 días</p>
            </div>
          </article>
        </div>
        <button className="w-full mt-6 py-3 rounded-xl border border-white/5 text-xs font-bold text-white/40 hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest">
          Ver todas las noticias
        </button>
      </div>

      {/* Listas Destacadas */}
      <div className="pt-8 border-t border-white/5">
        <h2 className="text-lg font-bold text-white mb-2">¿Buscas una maratón?</h2>
        <p className="text-xs text-white/40 mb-6 font-medium">Colecciones curadas por la comunidad</p>
        
        <div className="grid grid-cols-4 gap-2 mb-6">
          <img src="https://image.tmdb.org/t/p/w200/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg" alt="" className="w-full object-cover aspect-[2/3] rounded-lg border border-white/5 hover:scale-105 transition-transform" />
          <img src="https://image.tmdb.org/t/p/w200/811CcaulbxxDswZpXh9IuuIyS6H.jpg" alt="" className="w-full object-cover aspect-[2/3] rounded-lg border border-white/5 hover:scale-105 transition-transform" />
          <img src="https://image.tmdb.org/t/p/w200/5v9OAnfS68Zp066fA509Y99pY07.jpg" alt="" className="w-full object-cover aspect-[2/3] rounded-lg border border-white/5 hover:scale-105 transition-transform" />
          <img src="https://image.tmdb.org/t/p/w200/saF3H9Ah71S1QzG6vP9YvYlARuL.jpg" alt="" className="w-full object-cover aspect-[2/3] rounded-lg border border-white/5 hover:scale-105 transition-transform" />
        </div>

        <div className="space-y-3 mb-6">
          <a href="#" className="flex items-center gap-3 text-sm font-bold text-white/60 hover:text-[#1060ff] transition-colors group/link">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1060ff] group-hover:scale-150 transition-transform"></span> Mejores del Siglo XXI
          </a>
          <a href="#" className="flex items-center gap-3 text-sm font-bold text-white/60 hover:text-[#7b42bc] transition-colors group/link">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7b42bc] group-hover:scale-150 transition-transform"></span> Cine de Autor
          </a>
        </div>
        <button className="text-xs font-black text-[#1060ff] hover:text-[#7b42bc] transition-colors uppercase tracking-widest">
          Explorar Listas →
        </button>
      </div>

      {/* Géneros */}
      <div className="pt-8 border-t border-white/5">
        <h2 className="text-lg font-bold text-white mb-6">Explorar por género</h2>
        <div className="flex flex-wrap gap-2">
          {["🎬 Acción", "🚀 Sci-Fi", "🐉 Fantasía", "🔦 Thriller", "📽️ Documental"].map(genre => (
            <a key={genre} href="#" className="inline-block text-[10px] font-black tracking-widest py-2 px-4 rounded-xl bg-white/5 border border-white/5 text-white/60 hover:border-[#1060ff]/40 hover:text-white transition-all uppercase">
              {genre}
            </a>
          ))}
        </div>
      </div>

    </aside>
  );
}

export default IndexAside;
