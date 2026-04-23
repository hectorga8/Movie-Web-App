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
          className="flex-1 border border-[#445566] hover:border-[#00e054] rounded-[3px] overflow-hidden transition-colors aspect-[2/3] bg-[#2c3440]"
        >
          <img 
            src={movieService.getImageUrl(serie.poster_path, 'w185')} 
            alt={serie.name || serie.title}
            className="w-full h-full object-cover"
          />
        </Link>
      ))}
    </div>
  );
}

export default JustReviewedSeries;