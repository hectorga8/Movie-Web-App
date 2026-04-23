import React from 'react';
import HomeMovieCard from '../index/HomeMovieCard';

const ListaGrid = ({ movies = [] }) => {
  const formattedMovies = movies.map((m, index) => {
    if (typeof m === 'string') {
      return {
        id: index,
        image: `https://image.tmdb.org/t/p/w400${m}`,
        title: 'Película Muestra',
        date: '2026',
        rating: 80
      };
    }
    return {
      id: m.movieId || m.id,
      image: `https://image.tmdb.org/t/p/w400${m.posterPath || m.poster_path}`,
      title: m.title || m.name || 'Desconocido',
      date: m.releaseDate ? m.releaseDate.split('-')[0] : 'N/A',
      rating: m.rating || 0
    };
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 mb-20">
      {formattedMovies.map((movie, index) => (
        <HomeMovieCard key={movie.id || index} movie={movie} />
      ))}
    </div>
  );
};

export default ListaGrid;
