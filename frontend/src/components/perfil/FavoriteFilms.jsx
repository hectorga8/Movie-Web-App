import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import movieService from '../../services/movieService';

function FavoriteFilms({ profileUser, isOwnProfile }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      if (profileUser?.favoriteMovies?.length > 0) {
        setLoading(true);
        try {
          const moviePromises = profileUser.favoriteMovies.map(id => 
            movieService.getMovieDetail(id).catch(() => null)
          );
          const results = await Promise.all(moviePromises);
          setMovies(results.filter(m => m !== null));
        } catch (err) {
          console.error('Error fetching favorites:', err);
        } finally {
          setLoading(false);
        }
      } else {
        setMovies([]);
      }
    };

    fetchFavoriteMovies();
  }, [profileUser]);

  const displayMovies = movies.slice(0, 4);
  const emptySlotsCount = Math.max(0, 4 - displayMovies.length);

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-2 border-b border-white/10 pb-1">
        <h2 className="text-[13px] md:text-[15px] font-light uppercase text-white/40">Películas Favoritas</h2>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full">
        {/* Contenedor de las 4 cards que ocupa todo el espacio posible */}
        <div className="flex-1 w-full grid grid-cols-4 gap-2">
          
          {/* Películas existentes */}
          {displayMovies.map((movie) => (
            <Link 
              key={`movie-${movie.id}`} 
              to={`/pelicula/${movie.id}`}
              className="aspect-[2/3] rounded-[3px] overflow-hidden border border-white/10 hover:border-[#00e054] transition-all group relative bg-[#2c3440]"
            >
              <img 
                src={movieService.getImageUrl(movie.poster_path, 'w342')} 
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-end justify-center z-10">
                <span className="text-white text-[13px] text-center line-clamp-2 leading-tight drop-shadow-md w-full">{movie.title || movie.name}</span>
              </div>
            </Link>
          ))}
          
          {/* Slots vacíos restantes para mantener siempre 4. El primer vacío muestra "Añadir" */}
          {Array.from({ length: emptySlotsCount }).map((_, i) => {
            const isAddSlot = isOwnProfile && (i === 0);
            return (
              <div key={`empty-${i}`} className="aspect-[2/3] rounded-[3px] bg-white/5 border border-white/5 border-dashed flex items-center justify-center">
                {isAddSlot ? (
                  <Link to="/peliculas/todas" className="text-[10px] font-normal uppercase text-white/20 hover:text-white transition-colors">
                    Añadir
                  </Link>
                ) : null}
              </div>
            );
          })}

        </div>

        {/* Botón MÁS al lado derecho (No es card) */}
        {movies.length > 0 && (
          <div className="shrink-0 pl-4">
            <Link 
              to={`/perfil/${profileUser.name}/likes`}
              className="text-red-500 hover:text-red-400 text-sm font-medium uppercase transition-colors"
            >
              MÁS {'>'}
            </Link>
          </div>
        )}
      </div>
      
      {!loading && movies.length === 0 && isOwnProfile && (
        <p className="mt-4 text-[13px] text-white/30 italic">
          No has seleccionado tus películas favoritas todavía.
        </p>
      )}
    </section>
  );
}

export default FavoriteFilms;