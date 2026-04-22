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
          className="flex-1 border border-[#445566] hover:border-[#00e054] rounded-[3px] overflow-hidden transition-colors aspect-[2/3] bg-[#2c3440]"
        >
          <img 
            src={movieService.getImageUrl(movie.poster_path, 'w185')} 
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </Link>
      ))}
    </div>
  );
}

export default JustReviewed;