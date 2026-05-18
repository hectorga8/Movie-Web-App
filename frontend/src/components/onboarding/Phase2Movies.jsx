import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MovieSearchAutocomplete from '../listas/MovieSearchAutocomplete';
import { X, CheckCircle, PlusCircle } from 'lucide-react';
import movieService from '../../services/movieService';

export default function Phase2Movies({ onNext, initialData }) {
  const [selectedMovies, setSelectedMovies] = useState(initialData || []);

  const handleSelectMovie = (movie) => {
    if (!selectedMovies.find(m => m.id === movie.id)) {
      setSelectedMovies([...selectedMovies, { ...movie, status: 'vistas' }]);
    }
  };

  const removeMovie = (id) => {
    setSelectedMovies(selectedMovies.filter(m => m.id !== id));
  };

  const toggleStatus = (id) => {
    setSelectedMovies(selectedMovies.map(m => {
      if (m.id === id) {
        return { ...m, status: m.status === 'vistas' ? 'watchlist' : 'vistas' };
      }
      return m;
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center w-full max-w-xl"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">Tu Primera Colección</h2>
        <p className="text-white/50">Busca 3 películas que te hayan marcado y dinos si ya las viste o quieres verlas.</p>
      </div>

      <div className="w-full mb-8 relative z-50">
        <MovieSearchAutocomplete onSelect={handleSelectMovie} />
      </div>

      <div className="w-full space-y-4 mb-10 min-h-[200px]">
        <AnimatePresence>
          {selectedMovies.map(movie => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-3"
            >
              <img loading="lazy" 
                src={movieService.getImageUrl(movie.poster_path, 'w92')} 
                alt={movie.title}
                className="w-12 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <h4 className="text-white font-bold text-sm">{movie.title}</h4>
                <p className="text-white/40 text-xs">{movie.release_date?.substring(0, 4)}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toggleStatus(movie.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-normal flex items-center gap-1.5 transition-colors ${movie.status === 'vistas' ? 'bg-[#1060ff]/20 text-[#1060ff] border border-[#1060ff]/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'}`}
                >
                  {movie.status === 'vistas' ? <CheckCircle className="w-3.5 h-3.5" /> : <PlusCircle className="w-3.5 h-3.5" />}
                  {movie.status === 'vistas' ? 'Ya la vi' : 'Quiero verla'}
                </button>
                
                <button 
                  onClick={() => removeMovie(movie.id)}
                  className="p-1.5 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {selectedMovies.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-white/20 text-sm">
            <p>Busca una película arriba para empezar</p>
          </div>
        )}
      </div>

      <button
        onClick={() => onNext(selectedMovies)}
        disabled={selectedMovies.length < 3}
        className={`w-full py-4 rounded-[8px] font-normal text-[13px] uppercase transition-all ${selectedMovies.length >= 3 ? 'bg-[#1060ff] hover:bg-[#2b89ff] text-white shadow-lg shadow-[#1060ff]/20 cursor-pointer' : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
      >
        Continuar ({selectedMovies.length}/3)
      </button>
    </motion.div>
  );
}
