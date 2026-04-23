import React from 'react';

function AdBannerSerie() {
  return (
    <div className="w-full h-[80px] bg-[#1a2127] border border-[#2c3440] rounded-[4px] flex items-center justify-between px-6 mb-10 overflow-hidden relative group cursor-pointer">
      <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
      <div className="relative z-10">
        <h3 className="text-white font-black text-xl italic tracking-tight uppercase">TUS SERIES SIN LÍMITES.</h3>
        <p className="text-[#8aa8c2] text-xs mt-1">Lleva el control de episodios, notificaciones de estrenos y sin anuncios...</p>
      </div>
      <div className="relative z-10 flex items-center gap-2 bg-[#2c3440]/80 px-4 py-2 rounded">
        <span className="text-[#fff] font-bold tracking-widest uppercase text-sm">MEJORAR A</span>
        <span className="bg-[#ff8000] text-white px-2 py-0.5 rounded-[2px] font-bold text-xs uppercase tracking-widest">PRO</span>
      </div>
    </div>
  );
}

export default AdBannerSerie;