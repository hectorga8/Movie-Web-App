import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import movieService from '../../services/movieService';
import { getSortedMembers } from '../../services/membersService';

function RightSidebarPeliculas() {
  const [crewPicks, setCrewPicks] = useState([]);
  const [popularReviewers, setPopularReviewers] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await movieService.getTopRated();
        if (Array.isArray(data)) {
          setCrewPicks(data.slice(0, 6));
        } else if (data && Array.isArray(data.results)) {
          setCrewPicks(data.results.slice(0, 6));
        }
      } catch (error) {
        console.error("Error", error);
      }
    };
    
    const fetchReviewers = async () => {
      try {
        const data = await getSortedMembers();
        setPopularReviewers(data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching popular reviewers:", error);
      }
    };

    fetchMovies();
    fetchReviewers();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Crew Picks */}
      <div className="mb-8">
        <h2 className="text-[12px] uppercase tracking-[1px] text-[#8aa8c2] border-b border-[#445566] pb-2 mb-3">RECOMENDACIONES</h2>
        <div className="grid grid-cols-3 gap-1">
          {crewPicks.map((movie) => (
            <Link 
              key={movie.id} 
              to={`/pelicula/${movie.id}`} 
              className="border border-[#445566] hover:border-[#00e054] rounded-[3px] overflow-hidden transition-colors aspect-[2/3] bg-[#2c3440] relative group/card"
            >
              <img 
                src={movieService.getImageUrl(movie.poster_path, 'w185')} 
                alt={movie.title}
                className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300 flex items-end justify-center z-10">
                <span className="text-white text-[10px] text-center line-clamp-2 leading-tight drop-shadow-md w-full">{movie.title || movie.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Reviewers */}
      <div className="mb-8">
        <div className="flex justify-between items-end border-b border-[#445566] pb-2 mb-3">
          <h2 className="text-[12px] uppercase tracking-[1px] text-[#8aa8c2]">RESEÑADORES POPULARES</h2>
          <Link to="/miembros" className="text-[10px] text-[#8aa8c2] hover:text-[#fff] transition-colors">MÁS</Link>
        </div>
        
        <div className="flex flex-col gap-4">
          {popularReviewers.map((reviewer, i) => (
            <div key={reviewer._id || i} className="flex items-center gap-3 group">
              <Link to={`/perfil/${reviewer._id}`} className="w-10 h-10 rounded-full shrink-0 border border-[#445566] overflow-hidden group-hover:border-[#40bcf4] transition-colors flex items-center justify-center bg-[#1c2228]">
                {reviewer.avatar ? (
                  <img src={reviewer.avatar} alt={reviewer.username} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[#8aa8c2] text-lg font-bold">{(reviewer.username || 'U')[0].toUpperCase()}</span>
                )}
              </Link>
              
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <Link to={`/perfil/${reviewer._id}`} className="text-[14px] font-bold text-[#fff] truncate hover:text-[#40bcf4] transition-colors leading-tight">
                  {reviewer.username}
                </Link>
                <p className="text-[11px] text-[#8aa8c2] truncate leading-tight mt-0.5">
                  {reviewer.totalWatched || 0} películas, {reviewer.reviewCount || 0} reseñas
                </p>
              </div>
              
              <button className="w-6 h-6 rounded-full bg-[#2c3440] hover:bg-[#fff] hover:text-[#14181c] text-[#8aa8c2] flex items-center justify-center font-bold text-lg leading-none transition-colors border border-[#445566] pb-0.5">
                +
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Can't find a film */}
      <div>
        <h2 className="text-[12px] uppercase tracking-[1px] text-[#8aa8c2] border-b border-[#445566] pb-2 mb-3">¿NO ENCUENTRAS UNA PELÍCULA?</h2>
        <p className="text-[13px] text-[#8aa8c2] leading-relaxed">
          Ayuda a mantener la base de datos actualizada.<br/>
          Descubre cómo <a href="#" className="text-[#fff] hover:text-[#40bcf4] font-bold transition-colors">añadir o editar una película</a>.
        </p>
      </div>
    </div>
  );
}

export default RightSidebarPeliculas;