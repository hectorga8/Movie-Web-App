import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import movieService from '../../services/movieService';

function PopularFilmsWeek() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await movieService.getTrending();
        if (Array.isArray(data)) {
          setMovies(data.slice(0, 4));
        } else if (data && Array.isArray(data.results)) {
          setMovies(data.results.slice(0, 4));
        }
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchMovies();
  }, []);

  const getMockStats = (index) => {
    const stats = [
      { views: '1.2M', lists: '161K', likes: '388K' },
      { views: '2.4M', lists: '309K', likes: '1.2M', isOrange: true, orangeIcon: '131' },
      { views: '97K', lists: '26K', likes: '20K' },
      { views: '88K', lists: '7.8K', likes: '20K' },
    ];
    return stats[index] || stats[0];
  };

  return (
    <div className="relative mb-10 group">
      {/* Carrusel Arrows */}
      <button className="absolute -left-6 top-1/2 -translate-y-1/2 text-[#678] hover:text-[#fff] transition-colors opacity-0 group-hover:opacity-100">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button className="absolute -right-6 top-1/2 -translate-y-1/2 text-[#678] hover:text-[#fff] transition-colors opacity-0 group-hover:opacity-100">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7-7" /></svg>
      </button>

      <div className="grid grid-cols-4 gap-1.5">
        {movies.map((movie, i) => {
          const stats = getMockStats(i);
          return (
            <div key={movie.id} className="flex flex-col">
              <Link to={`/pelicula/${movie.id}`} className="block border border-[#445566] hover:border-[#00e054] rounded-[4px] overflow-hidden transition-colors aspect-[2/3] bg-[#2c3440] relative">
                <img 
                  src={movieService.getImageUrl(movie.poster_path, 'w500')} 
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </Link>
              
              {/* Stat Icons Row (Letterboxd style) */}
              <div className="hidden md:flex items-center justify-center gap-3 mt-2 text-[11px] font-semibold text-[#8aa8c2]">
                <div className="flex items-center gap-1">
                  <span className={stats.isOrange ? 'text-[#00e054]' : 'text-[#00e054]'}>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                  </span>
                  {stats.views}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[#40bcf4]">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/></svg>
                  </span>
                  {stats.lists}
                </div>
                <div className="flex items-center gap-1">
                  <span className={stats.isOrange ? 'text-[#ff8000]' : 'text-[#ff8000]'}>
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  </span>
                  {stats.likes}
                </div>
                {stats.orangeIcon && (
                  <div className="flex items-center gap-1">
                    <span className="text-[#ff8000]">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 3.8l7 14.2H5l7-14.2zM11 10h2v5h-2v-5zm0 6h2v2h-2v-2z"/></svg>
                    </span>
                    {stats.orangeIcon}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PopularFilmsWeek;