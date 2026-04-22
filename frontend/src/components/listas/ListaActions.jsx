import React from 'react';

const ActionButton = ({ icon, label, count, onClick, variant = 'default' }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2.5 px-5 py-2.5 rounded-[5px] border border-[#b2b6bd]/20 transition-all active:scale-[0.98] ${
      variant === 'primary' 
        ? 'bg-[#1060ff] text-white hover:bg-[#2b89ff]' 
        : 'bg-[#15181e] text-[#8b9bb4] hover:text-white hover:bg-black'
    }`}
  >
    {icon}
    <span className="text-[11px] font-bold uppercase tracking-widest">{label}</span>
    {count !== undefined && (
      <span className="text-[11px] font-light bg-white/10 px-1.5 rounded-sm">{count}</span>
    )}
  </button>
);

const ListaActions = ({ list }) => {
  return (
    <div className="flex flex-wrap items-center gap-4 py-8 border-y border-white/5 mb-12">
      <ActionButton 
        icon={<svg className="w-4 h-4 text-[#00e054]" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/></svg>}
        label="Like"
        count={list.likes}
      />

      <ActionButton 
        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/></svg>}
        label="Seguir Lista"
      />

      <ActionButton 
        icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>}
        label="Compartir"
      />

      <button className="ml-auto text-[#8b9bb4] hover:text-white transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/></svg>
      </button>
    </div>
  );
};

export default ListaActions;
