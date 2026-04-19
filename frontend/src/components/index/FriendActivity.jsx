// ─────────────────────────────────────────────────────────────
// FriendActivity.jsx - Versión CineBox
// Actividad de amigos cinematográfica
// ─────────────────────────────────────────────────────────────

function FriendActivity() {
  return (
    <div className="fade-up delay-2">
      <h2 className="font-['Playfair_Display',Georgia,serif] text-xl lg:text-2xl font-bold text-[#283618] mb-4">
        Actividad de amigos
      </h2>
      <div className="rounded-2xl bg-white border border-[#606C38]/10 p-5 shadow-sm">
        <div className="space-y-6">
          
          {/* Actividad 1 */}
          <div className="flex gap-4">
            <div className="relative shrink-0">
              <img src="https://image.tmdb.org/t/p/w200/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg" alt="" className="movie-poster w-10 h-14 object-cover border-2 border-white ring-1 ring-[#606C38]/10 rounded shadow-sm" />
              <img src="https://image.tmdb.org/t/p/w200/811CcaulbxxDswZpXh9IuuIyS6H.jpg" alt="" className="movie-poster w-10 h-14 object-cover border-2 border-white ring-1 ring-[#606C38]/10 absolute -right-4 top-0 z-10 rounded shadow-sm" />
              <img src="https://image.tmdb.org/t/p/w200/8GxvynZpEJq9S1nOzSLnfbvMvS9.jpg" alt="" className="movie-poster w-10 h-14 object-cover border-2 border-white ring-1 ring-[#606C38]/10 absolute -right-8 top-0 z-20 rounded shadow-sm" />
            </div>
            <div className="flex-1 min-w-0 pl-10">
              <p className="text-xs text-[#606C38]/80 leading-relaxed">
                <span className="font-bold text-[#283618]">Carlos</span> y 2 amigos más han guardado <span className="font-bold text-[#283618]">Dune: Parte Dos</span> en sus listas.
              </p>
              <span className="text-[10px] text-[#606C38]/40 font-bold uppercase tracking-wider mt-1 block">Hace 15 min</span>
            </div>
          </div>

          <div className="h-px bg-[#606C38]/5"></div>

          {/* Actividad 2 */}
          <div className="flex gap-4">
            <img src="https://image.tmdb.org/t/p/w200/8Vtpi9BDTeC9mSjXmYpYp9S1sQ3.jpg" alt="" className="movie-poster w-12 h-16 object-cover shadow-md rounded" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[#606C38]/80 leading-relaxed">
                <span className="font-bold text-[#283618]">Ana</span> ha puntuado <span className="font-bold text-[#283618]">Across the Spider-Verse</span> con 5 estrellas.
              </p>
              <div className="flex text-[#BC6C25] text-[10px] mt-1">★★★★★</div>
              <span className="text-[10px] text-[#606C38]/40 font-bold uppercase tracking-wider mt-1 block">Ayer</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FriendActivity;
