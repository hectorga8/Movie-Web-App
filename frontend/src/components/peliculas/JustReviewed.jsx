import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import movieService from '../../services/movieService';

function JustReviewed() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await movieService.getPopular();
        if (Array.isArray(data)) {
          setMovies(data.slice(4, 16));
        } else if (data && Array.isArray(data.results)) {
          setMovies(data.results.slice(4, 16));
        }
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="flex flex-wrap md:flex-nowrap justify-between gap-1 mb-10">
      {movies.map((movie) => (
        <Link 
          key={movie.id} 
          to={`/pelicula/${movie.id}`} 
          className="flex-1 border border-[#445566] hover:border-[#00e054] rounded-[3px] overflow-hidden transition-colors aspect-[2/3] bg-[#2c3440] relative group/card"
        >
          <img loading="lazy" 
            src={movieService.getImageUrl(movie.poster_path, 'w185')} 
            alt={movie.title}
            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300 flex items-end justify-center z-10">
            <span className="text-white text-[10px] text-center line-clamp-2 leading-tight drop-shadow-md w-full">{movie.title}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default JustReviewed;