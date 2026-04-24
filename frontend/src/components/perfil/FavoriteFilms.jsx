import React from 'react';
import { useAuth } from '../../context/AuthContext';

function FavoriteFilms() {
  const { user } = useAuth();
  const favorites = user?.favoriteMovies || [];

  return (
    <section className="mb-12">
      <div className="border-b border-[#2c3440] pb-2 mb-4 flex justify-between items-end">
        <h2 className="text-[12px] text-[#8b9bb4] font-bold uppercase tracking-widest">Películas Favoritas</h2>
      </div>
      
      {favorites.length === 0 ? (
        <p className="text-[#8b9bb4] text-[14px] font-serif">
          ¡No olvides seleccionar tus <button className="text-white hover:text-[#1060ff] font-bold transition-colors">películas favoritas!</button>
        </p>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {/* Aquí mapearíamos las películas reales. Por ahora mostramos placeholders basados en la cantidad o un límite */}
          {[...Array(Math.min(favorites.length, 4))].map((_, i) => (
            <div key={i} className="aspect-[2/3] bg-[#2c3440] rounded-[3px] border border-[#445566] hover:border-white transition-colors cursor-pointer flex items-center justify-center group shadow-md">
              <span className="text-[#8b9bb4] text-xs">Pelicula ID: {favorites[i]}</span>
            </div>
          ))}
          {/* Rellenar con vacíos si hay menos de 4 */}
          {[...Array(Math.max(0, 4 - favorites.length))].map((_, i) => (
            <div key={`empty-${i}`} className="aspect-[2/3] bg-[#1a1c23] rounded-[3px] border border-[#2c3440] transition-colors flex items-center justify-center shadow-md opacity-50">
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default FavoriteFilms;