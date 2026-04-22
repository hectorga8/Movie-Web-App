import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import movieService from '../../services/movieService';

const reviewers = [
  { name: "J", avatar: "https://i.pravatar.cc/150?u=2", films: "229 películas", reviews: "165 reseñas" },
  { name: "James (Schaffrillas)", avatar: "https://i.pravatar.cc/150?u=10", films: "1,453 películas", reviews: "1,347 reseñas" },
  { name: "Karsten", avatar: "https://i.pravatar.cc/150?u=11", films: "2,525 películas", reviews: "1,654 reseñas", isGreen: true },
  { name: "- ̗̀ mak ̖́-", avatar: "https://i.pravatar.cc/150?u=12", films: "734 películas", reviews: "808 reseñas" },
  { name: "zoë rose bryant", avatar: "https://i.pravatar.cc/150?u=13", films: "5,055 películas", reviews: "2,421 reseñas" }
];

function RightSidebarPeliculas() {
  const [crewPicks, setCrewPicks] = useState([]);

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
    fetchMovies();
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
              className="border border-[#445566] hover:border-[#00e054] rounded-[3px] overflow-hidden transition-colors aspect-[2/3] bg-[#2c3440]"
            >
              <img 
                src={movieService.getImageUrl(movie.poster_path, 'w185')} 
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Reviewers */}
      <div className="mb-8">
        <div className="flex justify-between items-end border-b border-[#445566] pb-2 mb-3">
          <h2 className="text-[12px] uppercase tracking-[1px] text-[#8aa8c2]">RESEÑADORES POPULARES</h2>
          <a href="#" className="text-[10px] text-[#8aa8c2] hover:text-[#fff] transition-colors">MÁS</a>
        </div>
        
        <div className="flex flex-col gap-4">
          {reviewers.map((reviewer, i) => (
            <div key={i} className="flex items-center gap-3">
              {reviewer.isGreen ? (
                 <div className="w-10 h-10 rounded-full bg-[#00e054] shrink-0 border border-[#445566]"></div>
              ) : (
                <img src={reviewer.avatar} alt={reviewer.name} className="w-10 h-10 rounded-full shrink-0 border border-[#445566]" />
              )}
              
              <div className="flex-1 min-w-0">
                <h4 className="text-[14px] font-bold text-[#fff] truncate hover:text-[#40bcf4] cursor-pointer">{reviewer.name}</h4>
                <p className="text-[11px] text-[#8aa8c2] truncate">
                  {reviewer.films}, {reviewer.reviews}
                </p>
              </div>
              
              <button className="w-6 h-6 rounded-full bg-[#2c3440] hover:bg-[#fff] hover:text-[#14181c] text-[#8aa8c2] flex items-center justify-center font-bold text-lg leading-none transition-colors border border-[#445566]">
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