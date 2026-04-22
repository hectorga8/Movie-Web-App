import React from 'react';

const ListaHeader = ({ list }) => {
  return (
    <div className="mb-10">
      {/* Información del Autor */}
      <div className="flex items-center gap-3 mb-6">
        <img 
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${list.creator}`} 
          alt={list.creator}
          className="w-10 h-10 rounded-full border border-white/10"
        />
        <div>
          <span className="text-[#8b9bb4] text-[12px] font-light uppercase tracking-widest block mb-0.5">Una lista de</span>
          <span className="text-white text-[16px] font-bold">{list.creator}</span>
        </div>
      </div>

      {/* Título de la Lista */}
      <h1 className="text-[32px] md:text-[42px] font-bold text-white leading-tight mb-4 tracking-tight">
        {list.title}
      </h1>

      {/* Descripción (font-light) */}
      {list.description && (
        <p className="text-[#8b9bb4] text-[16px] md:text-[18px] font-light leading-relaxed max-w-[800px] italic">
          {list.description}
        </p>
      )}
    </div>
  );
};

export default ListaHeader;
