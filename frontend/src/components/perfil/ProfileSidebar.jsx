import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { watchlistService } from '../../services/watchlistService';
import { PosterStack } from '../listas/PosterStack';

function ProfileSidebar({ profileUser, isOwnProfile, reviews = [] }) {
  const [watchlist, setWatchlist] = useState([]);
  
  useEffect(() => {
    if (profileUser?._id) {
      watchlistService.getUserWatchlistById(profileUser._id)
        .then(data => setWatchlist(data))
        .catch(err => console.error("Error fetching watchlist:", err));
    }
  }, [profileUser]);

  // Extract poster paths for the stacked view (up to 5)
  const watchlistPosters = watchlist.map(item => item.image).filter(Boolean).slice(0, 5);

  // Diary is simulated for now from reviews
  const diary = reviews.slice(0, 3).map(rev => ({
    date: new Date(rev.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
    title: rev.mediaTitle,
    year: rev.mediaYear,
    mediaId: rev.mediaId
  }));

  // Ratings calculation
  const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let maxRatingCount = 0;
  
  reviews.forEach(rev => {
    const rating = Math.round(rev.rating);
    if (rating >= 1 && rating <= 5) {
      ratingCounts[rating]++;
      if (ratingCounts[rating] > maxRatingCount) {
        maxRatingCount = ratingCounts[rating];
      }
    }
  });

  const ratings = [ratingCounts[1], ratingCounts[2], ratingCounts[3], ratingCounts[4], ratingCounts[5]];

  return (
    <div className="space-y-10">
      
      {/* Watchlist Section */}
      <section>
        <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-1">
          <h2 className="text-[12px] uppercase tracking-[1.5px] text-white/40 font-bold">Pendientes</h2>
          <span className="text-[11px] text-white/30 font-bold">{watchlist.length}</span>
        </div>
        {watchlist.length > 0 ? (
          <Link to={`/perfil/${profileUser?.name}/watchlist`} className="block border border-white/10 rounded-[3px] overflow-hidden transition-all duration-300 hover:border-[#1060ff]/50 cursor-pointer">
             <PosterStack posters={watchlistPosters} size="normal" full={true} />
          </Link>
        ) : (
          <div className="text-[13px] text-white/30 italic py-2">
            No hay películas pendientes.
          </div>
        )}
      </section>

      {/* Diary Section */}
      <section>
        <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-1">
          <h2 className="text-[12px] uppercase tracking-[1.5px] text-white/40 font-bold">Diario</h2>
          <Link to={`/perfil/${profileUser?.name}/diary`} className="text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors">Más</Link>
        </div>
        <div className="space-y-3">
          {diary.length > 0 ? diary.map((entry, i) => (
            <div key={i} className="flex items-baseline gap-3 group">
              <div className="text-[10px] font-bold text-white/20 uppercase whitespace-nowrap">{entry.date}</div>
              <div className="flex-1 truncate">
                <Link to={`/pelicula/${entry.mediaId}`} className="text-[13px] font-bold text-white/80 group-hover:text-[#40bcf4] transition-colors">{entry.title}</Link>
                <span className="ml-1 text-[11px] text-white/30">{entry.year}</span>
              </div>
            </div>
          )) : (
            <p className="text-[13px] text-white/30 italic py-2">No hay actividad reciente.</p>
          )}
        </div>
      </section>

      {/* Ratings Section */}
      <section>
        <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-1">
          <h2 className="text-[12px] uppercase tracking-[1.5px] text-white/40 font-bold">Calificaciones</h2>
          <span className="text-[11px] text-white/30 font-bold">{reviews.filter(r => r.rating > 0).length}</span>
        </div>
        <div className="flex items-end gap-1 h-12 px-1">
          {ratings.map((val, i) => (
            <div 
              key={i} 
              className="flex-1 bg-white/10 hover:bg-[#00e054] transition-colors rounded-t-[1px]" 
              style={{ height: val > 0 ? `${(val / maxRatingCount) * 100}%` : '4px' }}
              title={`${i + 1} estrellas: ${val}`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1 text-[10px] text-white/20 font-bold">
          <span>★</span>
          <span>★★★★★</span>
        </div>
      </section>

      {/* Following Section */}
      <section>
        <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-1">
          <h2 className="text-[12px] uppercase tracking-[1.5px] text-white/40 font-bold">Siguiendo</h2>
          <span className="text-[11px] text-white/30 font-bold">{profileUser?.following?.length || 0}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {profileUser?.following?.slice(0, 12).map((followId, i) => (
            <Link key={i} to={`/perfil/${followId}`} className="w-8 h-8 rounded-full bg-[#2c3440] border border-white/5 overflow-hidden hover:border-[#00e054] transition-colors cursor-pointer">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${followId}`} alt="" className="w-full h-full object-cover" />
            </Link>
          ))}
          {profileUser?.following?.length > 12 && (
             <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-white/30">
               +{profileUser.following.length - 12}
             </div>
          )}
        </div>
      </section>

    </div>
  );
}

export default ProfileSidebar;
