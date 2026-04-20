import React from 'react';

const DetailSidebar = ({ item, type, externalIds }) => {
  if (!item) return null;

  const director = type === 'movie' 
    ? item.credits?.crew?.find(p => p.job === 'Director')?.name 
    : null;
  const creator = type === 'tv' ? item.created_by?.[0]?.name : null;

  return (
    <aside className="w-full lg:w-[280px] shrink-0 border-t lg:border-t-0 lg:border-l border-[#f1f2f3] pt-10 lg:pt-0 lg:pl-10">
      <div className="sticky top-20 space-y-10 text-left">
        
        {/* GÉNEROS */}
        <div>
          <h4 className="label-uppercase text-[10px] mb-4 opacity-40 font-bold tracking-[2.5px]">GÉNEROS</h4>
          <div className="flex flex-wrap gap-2">
            {item.genres?.map(g => (
              <span key={g.id} className="px-3 py-1 bg-[#f1f2f3] border border-[#d5d7db]/60 rounded-[3px] text-[11px] font-bold text-[#3b3d45]">
                {g.name}
              </span>
            ))}
          </div>
        </div>

        {/* REDES SOCIALES */}
        <div>
          <h4 className="label-uppercase text-[10px] mb-5 opacity-40 font-bold tracking-[2.5px]">CONEXIONES</h4>
          <div className="flex gap-3">
            {externalIds?.instagram_id && (
              <a href={`https://instagram.com/${externalIds.instagram_id}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-[4px] border border-[#d5d7db] flex items-center justify-center hover:bg-[#15181e] hover:text-white transition-all">
                <img src="https://www.svgrepo.com/show/333552/instagram.svg" className="w-5 h-5" alt="IG" />
              </a>
            )}
            {item.homepage && (
              <a href={item.homepage} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-[4px] border border-[#d5d7db] flex items-center justify-center hover:bg-[#f1f2f3] transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
              </a>
            )}
          </div>
        </div>

        {/* INFO TÉCNICA */}
        <div className="space-y-6 pt-8 border-t border-[#f1f2f3]">
          <div className="flex justify-between items-baseline border-b border-[#f1f2f3] pb-3 text-left">
            <p className="label-uppercase text-[9px] opacity-40 font-bold">ESTADO</p>
            <p className="font-bold text-black text-xs">{item.status === 'Released' || item.status === 'Ended' ? (type === 'movie' ? 'Estrenada' : 'Terminada') : 'En emisión'}</p>
          </div>
          <div className="flex justify-between items-baseline border-b border-[#f1f2f3] pb-3 text-left">
            <p className="label-uppercase text-[9px] opacity-40 font-bold">IDIOMA</p>
            <p className="font-bold text-black text-xs uppercase">{item.original_language}</p>
          </div>
          {type === 'tv' && item.networks?.[0] && (
            <div className="flex justify-between items-baseline border-b border-[#f1f2f3] pb-3 text-left">
              <p className="label-uppercase text-[9px] opacity-40 font-bold">RED</p>
              <p className="font-bold text-black text-xs">{item.networks[0].name}</p>
            </div>
          )}
          <div className="flex justify-between items-baseline border-b border-[#f1f2f3] pb-3 text-left">
            <p className="label-uppercase text-[9px] opacity-40 font-bold">{type === 'movie' ? 'DIRECTOR' : 'CREADOR'}</p>
            <p className="font-bold text-black text-xs text-right">{director || creator || 'N/A'}</p>
          </div>
          
          {type === 'movie' && item.runtime && (
             <div className="flex justify-between items-baseline border-b border-[#f1f2f3] pb-3 text-left">
                <p className="label-uppercase text-[9px] opacity-40 font-bold">DURACIÓN</p>
                <p className="font-bold text-black text-xs">{item.runtime} min</p>
             </div>
          )}

          {type === 'tv' && item.next_episode_to_air && (
            <div className="p-5 bg-[#1060ff]/5 border border-[#1060ff]/20 rounded-[4px] text-center">
              <p className="label-uppercase text-[9px] text-[#1060ff] font-bold tracking-[2px] mb-2">PRÓXIMO DESPLIEGUE</p>
              <p className="font-bold text-lg text-black leading-none">{new Date(item.next_episode_to_air.air_date).toLocaleDateString()}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default DetailSidebar;
