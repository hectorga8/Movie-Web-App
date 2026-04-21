import React from 'react';

function FriendActivity() {
  return (
    <div className="group">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-[#1060ff] rounded-full"></span>
        Actividad de la Comunidad
      </h2>
      <div className="rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-6 shadow-2xl hover:border-white/20 transition-all">
        <div className="space-y-8">
          
          {/* Actividad 1 */}
          <div className="flex gap-4">
            <div className="relative shrink-0 flex">
              <img src="https://image.tmdb.org/t/p/w200/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg" alt="" className="w-10 h-14 object-cover border border-white/10 rounded-lg shadow-xl" />
              <img src="https://image.tmdb.org/t/p/w200/811CcaulbxxDswZpXh9IuuIyS6H.jpg" alt="" className="w-10 h-14 object-cover border border-white/10 absolute left-4 top-0 z-10 rounded-lg shadow-xl" />
              <img src="https://image.tmdb.org/t/p/w200/8GxvynZpEJq9S1nOzSLnfbvMvS9.jpg" alt="" className="w-10 h-14 object-cover border border-white/10 absolute left-8 top-0 z-20 rounded-lg shadow-xl" />
            </div>
            <div className="flex-1 min-w-0 pl-12 flex flex-col justify-center">
              <p className="text-sm text-white/70 leading-relaxed">
                <span className="font-bold text-white">Carlos</span> y 2 amigos más han guardado <span className="font-bold text-[#1060ff]">Dune: Parte Dos</span>.
              </p>
              <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-2 block">Hace 15 min</span>
            </div>
          </div>

          <div className="h-px bg-white/5 mx-2"></div>

          {/* Actividad 2 */}
          <div className="flex gap-4 items-center">
            <img src="https://image.tmdb.org/t/p/w200/8Vtpi9BDTeC9mSjXmYpYp9S1sQ3.jpg" alt="" className="w-12 h-16 object-cover border border-white/10 shadow-xl rounded-lg" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white/70 leading-relaxed">
                <span className="font-bold text-white">Ana</span> ha puntuado <span className="font-bold text-[#7b42bc]">Across the Spider-Verse</span>.
              </p>
              <div className="flex text-[#1060ff] text-xs mt-1 gap-0.5">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-2 block">Ayer</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FriendActivity;
