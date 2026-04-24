import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange, accentColor = 'bg-[#00e054] hover:bg-[#00c048]' }) {
  return (
    <div className="flex justify-center items-center gap-4">
      <button 
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="bg-[#2c3440] hover:bg-[#445566] text-white px-4 py-2 rounded-[3px] text-[13px] font-bold uppercase tracking-widest disabled:opacity-50 transition-colors cursor-pointer"
      >
        Anterior
      </button>
      <span className="text-white text-[13px] font-bold">
        Página {currentPage} de {totalPages}
      </span>
      <button 
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`${accentColor} text-white px-4 py-2 rounded-[3px] text-[13px] font-bold uppercase tracking-widest disabled:opacity-50 transition-colors cursor-pointer`}
      >
        Siguiente
      </button>
    </div>
  );
}

export default Pagination;