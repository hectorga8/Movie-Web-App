import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import movieService from '../../services/movieService';

const reviewers = [
  { name: "Seriefilo", avatar: "https://i.pravatar.cc/150?u=21", films: "229 series", reviews: "165 reseñas" },
  { name: "BingeWatcher", avatar: "https://i.pravatar.cc/150?u=22", films: "453 series", reviews: "347 reseñas" },
  { name: "TV Fanatic", avatar: "https://i.pravatar.cc/150?u=23", films: "525 series", reviews: "654 reseñas", isGreen: true },
  { name: "Maratonista", avatar: "https://i.pravatar.cc/150?u=24", films: "734 series", reviews: "808 reseñas" },
  { name: "Episodio Piloto", avatar: "https://i.pravatar.cc/150?u=25", films: "1,055 series", reviews: "421 reseñas" }
];

function RightSidebarSeries() {
  const [crewPicks, setCrewPicks] = useState([]);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const data = await movieService.getTVTrending(); // Using trending, starting from index 6 to vary
        if (Array.isArray(data)) {
          setCrewPicks(data.slice(6, 12));
        } else if (data && Array.isArray(data.results)) {
          setCrewPicks(data.results.slice(6, 12));
        }
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchSeries();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="mb-8">
        <h2 className="text-[12px] uppercase tracking-[1px] text-[#8aa8c2] border-b border-[#445566] pb-2 mb-3">RECOMENDACIONES</h2>
        <div className="grid grid-cols-3 gap-1">
          {crewPicks.map((serie) => (
            <Link 
              key={serie.id} 
              to={`/serie/${serie.id}`} 
              className="border border-[#445566] hover:border-[#00e054] rounded-[3px] overflow-hidden transition-colors aspect-[2/3] bg-[#2c3440]"
            >
              <img 
                src={movieService.getImageUrl(serie.poster_path, 'w185')} 
                alt={serie.name || serie.title}
                className="w-full h-full object-cover"
              />
            </Link>
          ))}
        </div>
      </div>

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

      <div>
        <h2 className="text-[12px] uppercase tracking-[1px] text-[#8aa8c2] border-b border-[#445566] pb-2 mb-3">¿NO ENCUENTRAS UNA SERIE?</h2>
        <p className="text-[13px] text-[#8aa8c2] leading-relaxed">
          Ayuda a mantener la base de datos actualizada.<br/>
          Descubre cómo <a href="#" className="text-[#fff] hover:text-[#40bcf4] font-bold transition-colors">añadir o editar una serie</a>.
        </p>
      </div>
    </div>
  );
}

export default RightSidebarSeries;