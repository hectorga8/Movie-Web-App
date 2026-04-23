import React from 'react';

function ProfileSidebar() {
  return (
    <div className="w-full">
      {/* Ad Banner */}
      <div className="w-full aspect-[4/3] bg-[#1a1c23] border border-[#2c3440] rounded-[4px] mb-10 overflow-hidden relative group cursor-pointer">
        {/* Imagen de fondo tipo Blade Runner (Ryan Gosling) */}
        <div className="absolute inset-0 opacity-60 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop')] bg-cover bg-center mix-blend-lighten group-hover:scale-105 transition-transform duration-700"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="relative z-10 p-5 flex flex-col h-full justify-between">
          <div>
            <h3 className="text-white font-black text-3xl italic tracking-tighter uppercase leading-[0.9] drop-shadow-md">NEED AN<br/>UPGRADE?</h3>
          </div>
          <div>
            <p className="text-white text-[12px] font-bold mb-3 drop-shadow-md leading-tight max-w-[80%]">
              Profile stats, filtering by favorite streaming services, watchlist alerts and no ads!
            </p>
            <div className="inline-flex items-center gap-1 bg-[#14181c]/90 px-3 py-1.5 rounded-[2px] backdrop-blur-sm border border-white/10 group-hover:bg-[#14181c] transition-colors">
              <span className="text-white font-black tracking-widest uppercase text-[12px]">GET</span>
              <span className="bg-[#ff8000] text-white px-1.5 py-0.5 rounded-[2px] font-black text-[11px] uppercase tracking-widest">PRO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <section>
        <div className="border-b border-[#2c3440] pb-2 mb-4">
          <h2 className="text-[12px] text-[#8b9bb4] font-bold uppercase tracking-widest">Activity</h2>
        </div>
        <p className="text-[#8b9bb4] text-[13px]">
          No recent activity
        </p>
      </section>
    </div>
  );
}

export default ProfileSidebar;