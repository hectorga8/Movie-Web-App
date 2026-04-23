import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const ListaComments = () => {
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    const newComment = {
      id: Date.now(),
      author: user?.name || 'Usuario Anónimo',
      text: comment,
      date: 'Ahora mismo',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Usuario'}`
    };

    setComments([newComment, ...comments]);
    setComment('');
  };

  return (
    <div className="pt-12 border-t border-white/5">
      <h3 className="text-[#8b9bb4] text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
        Comentarios
      </h3>

      <div className="flex gap-4 items-start mb-12">
        <img 
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Usuario'}`} 
          alt="Avatar" 
          className="w-10 h-10 rounded-full border border-white/10 shrink-0 bg-[#2c3440]" 
        />
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

      <div className="space-y-8">
        {comments.length === 0 ? (
          <p className="text-[#8b9bb4] text-[13px] italic opacity-40">Aún no hay comentarios en esta lista. ¡Sé el primero en decir algo!</p>
        ) : (
          comments.map(c => (
            <div key={c.id} className="flex gap-4">
              <img src={c.avatar} alt={c.author} className="w-10 h-10 rounded-full border border-white/10 shrink-0 bg-[#2c3440]" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-bold text-[14px]">{c.author}</span>
                  <span className="text-[#8b9bb4] text-[11px]">{c.date}</span>
                </div>
                <p className="text-[#8b9bb4] text-[14px]">{c.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListaComments;