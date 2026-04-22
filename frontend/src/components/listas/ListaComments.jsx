import React, { useState } from 'react';

const ListaComments = () => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    console.log('Enviando comentario:', comment);
    setComment('');
  };

  return (
    <div className="pt-12 border-t border-white/5">
      <h3 className="text-[#8b9bb4] text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
        Comentarios
      </h3>

      <div className="flex gap-4 items-start mb-12">
        <div className="w-10 h-10 rounded-full bg-[#2c3440] shrink-0" />
        <form onSubmit={handleSubmit} className="flex-1">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escribe un comentario..."
            className="w-full bg-[#1a1c23] border border-white/10 rounded-[5px] p-4 text-white text-[14px] focus:outline-none focus:border-[#1060ff]/50 transition-all min-h-[100px] mb-4"
          />
          <button 
            type="submit"
            className="bg-[#2c3440] hover:bg-[#445566] text-white px-6 py-2 rounded-sm text-[11px] font-bold uppercase tracking-widest transition-colors"
          >
            Publicar
          </button>
        </form>
      </div>

      {/* Lista de comentarios (Placeholder por ahora) */}
      <div className="space-y-8 opacity-40">
        <p className="text-[#8b9bb4] text-[13px] italic">Aún no hay comentarios en esta lista. ¡Sé el primero en decir algo!</p>
      </div>
    </div>
  );
};

export default ListaComments;
