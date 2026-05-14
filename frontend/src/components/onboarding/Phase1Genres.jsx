import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Ghost, Rocket, Heart, Swords, Smile, Zap, Search, Music, Sparkles } from 'lucide-react';

const GENRES = [
  { id: 28, name: 'Acción', icon: Swords },
  { id: 12, name: 'Aventura', icon: Zap },
  { id: 16, name: 'Animación', icon: Sparkles },
  { id: 35, name: 'Comedia', icon: Smile },
  { id: 80, name: 'Crimen', icon: Search },
  { id: 18, name: 'Drama', icon: Heart },
  { id: 27, name: 'Terror', icon: Ghost },
  { id: 878, name: 'Ciencia Ficción', icon: Rocket },
  { id: 10402, name: 'Música', icon: Music },
];

export default function Phase1Genres({ onNext, initialData }) {
  const [selected, setSelected] = useState(initialData || []);

  const toggleGenre = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(gId => gId !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-3">Tu ADN Cinéfilo</h2>
        <p className="text-white/50">Selecciona al menos 3 géneros favoritos para personalizar tu experiencia.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-10 w-full max-w-lg">
        {GENRES.map((genre) => {
          const isSelected = selected.includes(genre.id);
          const Icon = genre.icon;
          return (
            <motion.button
              key={genre.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleGenre(genre.id)}
              className={`
                relative flex flex-col items-center justify-center p-6 rounded-xl border transition-all overflow-hidden
                ${isSelected 
                  ? 'bg-[#1060ff]/10 border-[#1060ff] shadow-[0_0_20px_rgba(16,96,255,0.3)]' 
                  : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'}
              `}
            >
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1060ff]/20 to-transparent pointer-events-none" />
              )}
              <Icon className={`w-8 h-8 mb-3 ${isSelected ? 'text-[#1060ff]' : 'text-white/40'}`} />
              <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-white/60'}`}>
                {genre.name}
              </span>
            </motion.button>
          );
        })}
      </div>

      <button
        onClick={() => onNext(selected)}
        disabled={selected.length < 3}
        className={`
          w-full max-w-xs py-4 rounded-[8px] font-bold text-[13px] tracking-[1.5px] uppercase transition-all
          ${selected.length >= 3 
            ? 'bg-[#1060ff] hover:bg-[#2b89ff] text-white shadow-lg shadow-[#1060ff]/20 cursor-pointer' 
            : 'bg-white/5 text-white/20 cursor-not-allowed'}
        `}
      >
        Continuar ({selected.length}/3)
      </button>
    </motion.div>
  );
}
