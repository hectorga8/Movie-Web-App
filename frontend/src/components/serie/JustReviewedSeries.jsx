import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import movieService from '../../services/movieService';

function JustReviewedSeries() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const data = await movieService.getTVTrending(); // Using trending but offset
        if (Array.isArray(data)) {
          setSeries(data.slice(4, 16));
        } else if (data && Array.isArray(data.results)) {
          setSeries(data.results.slice(4, 16));
        }
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchSeries();
  }, []);

  return (
    <div className="flex flex-wrap md:flex-nowrap justify-between gap-1 mb-10">
      {series.map((serie) => (
        <Link 
          key={serie.id} 
          to={`/serie/${serie.id}`} 
          className="flex-1 border border-[#445566] hover:border-[#00e054] rounded-[3px] overflow-hidden transition-colors aspect-[2/3] bg-[#2c3440] relative group/card"
        >
          <img loading="lazy" 
            src={movieService.getImageUrl(serie.poster_path, 'w185')} 
            alt={serie.name || serie.title}
            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-2 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300 flex items-end justify-center z-10">
            <span className="text-white text-[10px] text-center line-clamp-2 leading-tight drop-shadow-md w-full">{serie.title || serie.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default JustReviewedSeries;