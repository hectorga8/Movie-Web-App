import React from 'react';

function RecentActivity() {
  const recentPosters = [
    "https://image.tmdb.org/t/p/w400/8GxvynZpEJq9S1nOzSLnfbvMvS9.jpg", // Oppenheimer
    "https://image.tmdb.org/t/p/w400/811CcaulbxxDswZpXh9IuuIyS6H.jpg", // Poor Things
    "https://image.tmdb.org/t/p/w400/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg", // Dune Part Two
    "https://image.tmdb.org/t/p/w400/gajva2L0vL462IZxaYI4pCoYjgz.jpg"  // Blade Runner 2049
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between border-b border-[#2c3440] pb-2 mb-4">
        <h2 className="text-[12px] text-[#8b9bb4] font-bold uppercase tracking-widest">Actividad Reciente</h2>
        <button className="text-[10px] text-[#8b9bb4] hover:text-white uppercase tracking-widest transition-colors">Todo</button>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {recentPosters.map((poster, index) => (
          <div key={index} className="aspect-[2/3] border border-[#2c3440] rounded-[3px] bg-[#1a1c23] hover:border-[#00e054] transition-colors cursor-pointer overflow-hidden group">
            <img 
              src={poster} 
              alt="Actividad Reciente" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100" 
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentActivity;