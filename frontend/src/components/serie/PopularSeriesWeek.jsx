import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import movieService from '../../services/movieService';
import { watchlistService } from '../../services/watchlistService';
import { getReviewsForMedia } from '../../services/reviewService';

function PopularSeriesWeek() {
  const [series, setSeries] = useState([]);
  const [serieStats, setSerieStats] = useState({});

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const data = await movieService.getTVTrending();
        let fetchedSeries = [];
        if (Array.isArray(data)) {
          fetchedSeries = data.slice(0, 4);
        } else if (data && Array.isArray(data.results)) {
          fetchedSeries = data.results.slice(0, 4);
        }
        setSeries(fetchedSeries);

        const statsObj = {};
        await Promise.all(fetchedSeries.map(async (serie) => {
          try {
            const mediaType = 'tv';
            const [wStats, reviews] = await Promise.all([
              watchlistService.getMediaStats(serie.id, mediaType),
              getReviewsForMedia(mediaType, serie.id).catch(() => [])
            ]);
            
            statsObj[serie.id] = {
              views: wStats.watched > 0 ? (wStats.watched > 999 ? (wStats.watched/1000).toFixed(1)+'K' : wStats.watched) : '0',
              lists: reviews.length > 0 ? (reviews.length > 999 ? (reviews.length/1000).toFixed(1)+'K' : reviews.length) : '0',
              likes: wStats.favorites > 0 ? (wStats.favorites > 999 ? (wStats.favorites/1000).toFixed(1)+'K' : wStats.favorites) : '0'
            };
          } catch (e) {
            statsObj[serie.id] = { views: '0', lists: '0', likes: '0' };
          }
        }));
        setSerieStats(statsObj);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchSeries();
  }, []);

  return (
    <div className="relative mb-10 group">

      <div className="grid grid-cols-4 gap-1.5">
        {series.map((serie, i) => {
          const stats = serieStats[serie.id] || { views: '...', lists: '...', likes: '...' };
          return (
            <div key={serie.id} className="flex flex-col">
              <Link to={`/serie/${serie.id}`} className="block border border-[#445566] hover:border-[#00e054] rounded-[4px] overflow-hidden transition-colors aspect-[2/3] bg-[#2c3440] relative group/card">
                <img 
                  src={movieService.getImageUrl(serie.poster_path, 'w500')} 
                  alt={serie.name || serie.title}
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300 flex items-end justify-center">
                  <span className="text-white text-[13px] text-center line-clamp-2 leading-tight drop-shadow-md w-full">{serie.title || serie.name}</span>
                </div>
              </Link>
              
              <div className="hidden md:flex items-center justify-center gap-3 mt-2 text-[11px] font-normal text-[#8aa8c2]">
                <div className="flex items-center gap-1" title="Vistas">
                  <span className="text-[#00e054]">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                  </span>
                  {stats.views}
                </div>
                <div className="flex items-center gap-1" title="Reseñas">
                  <span className="text-[#40bcf4]">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/></svg>
                  </span>
                  {stats.lists}
                </div>
                <div className="flex items-center gap-1" title="Me gusta">
                  <span className="text-[#ff8000]">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  </span>
                  {stats.likes}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PopularSeriesWeek;