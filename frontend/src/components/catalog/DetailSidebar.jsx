import React from 'react';

const DetailSidebar = ({ item, type, externalIds }) => {
  if (!item) return null;

  const director = type === 'movie' 
    ? item.credits?.crew?.find(p => p.job === 'Director')?.name 
    : null;
  const creator = type === 'tv' ? item.created_by?.[0]?.name : null;

  return (
    <aside className="w-full lg:w-[280px] shrink-0 border-t lg:border-t-0 lg:border-l border-white/5 pt-10 lg:pt-0 lg:pl-10">
      <div className="sticky top-24 space-y-10 text-left">
        
        {/* GÉNEROS */}
        <div>
          <h4 className="label-uppercase text-[10px] mb-5 opacity-30 font-bold tracking-[2.5px] text-white">GÉNEROS</h4>
          <div className="flex flex-wrap gap-2.5">
            {item.genres?.map(g => (
              <span key={g.id} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-[6px] text-[11px] font-bold text-white/80 hover:bg-white/10 transition-colors">
                {g.name}
              </span>
            ))}
          </div>
        </div>

        {/* REDES SOCIALES */}
        <div>
          <h4 className="label-uppercase text-[10px] mb-5 opacity-30 font-bold tracking-[2.5px] text-white">CONEXIONES</h4>
          <div className="flex gap-4">
            {externalIds?.instagram_id && (
              <a href={`https://instagram.com/${externalIds.instagram_id}`} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-[8px] border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[#1060ff] hover:border-transparent transition-all group shadow-lg">
                <img src="https://www.svgrepo.com/show/333552/instagram.svg" className="w-5 h-5 invert opacity-70 group-hover:opacity-100 transition-opacity" alt="IG" />
              </a>
            )}
            {item.homepage && (
              <a href={item.homepage} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-[8px] border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-white/60 hover:text-white shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
              </a>
            )}
          </div>
        </div>

        {/* INFO TÉCNICA */}
        <div className="space-y-6 pt-8 border-t border-white/5">
          <div className="flex justify-between items-baseline border-b border-white/5 pb-4 text-left">
            <p className="label-uppercase text-[9px] opacity-30 font-bold text-white tracking-[1.5px]">ESTADO</p>
            <p className="font-bold text-white/90 text-[13px]">{item.status === 'Released' || item.status === 'Ended' ? (type === 'movie' ? 'Estrenada' : 'Terminada') : 'En emisión'}</p>
          </div>
          <div className="flex justify-between items-baseline border-b border-white/5 pb-4 text-left">
            <p className="label-uppercase text-[9px] opacity-30 font-bold text-white tracking-[1.5px]">IDIOMA</p>
            <p className="font-bold text-white/90 text-[13px] uppercase">{item.original_language}</p>
          </div>
          {type === 'tv' && item.networks?.[0] && (
            <div className="flex justify-between items-baseline border-b border-white/5 pb-4 text-left">
              <p className="label-uppercase text-[9px] opacity-30 font-bold text-white tracking-[1.5px]">RED</p>
              <p className="font-bold text-white/90 text-[13px]">{item.networks[0].name}</p>
            </div>
          )}
          <div className="flex justify-between items-baseline border-b border-white/5 pb-4 text-left">
            <p className="label-uppercase text-[9px] opacity-30 font-bold text-white tracking-[1.5px]">{type === 'movie' ? 'DIRECTOR' : 'CREADOR'}</p>
            <p className="font-bold text-white/90 text-[13px] text-right max-w-[150px] leading-tight">{director || creator || 'N/A'}</p>
          </div>
          
          {type === 'movie' && item.runtime && (
             <div className="flex justify-between items-baseline border-b border-white/5 pb-4 text-left">
                <p className="label-uppercase text-[9px] opacity-30 font-bold text-white tracking-[1.5px]">DURACIÓN</p>
                <p className="font-bold text-white/90 text-[13px]">{item.runtime} min</p>
             </div>
          )}

          {type === 'tv' && item.next_episode_to_air && (
            <div className="p-6 bg-[#1060ff]/10 border border-[#1060ff]/20 rounded-[12px] text-center shadow-[0_0_20px_rgba(16,96,255,0.1)]">
              <p className="label-uppercase text-[9px] text-[#1060ff] font-bold tracking-[2px] mb-3">PRÓXIMO DESPLIEGUE</p>
              <p className="font-bold text-xl text-white leading-none">{new Date(item.next_episode_to_air.air_date).toLocaleDateString()}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default DetailSidebar;
