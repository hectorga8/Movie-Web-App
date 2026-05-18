import React from 'react';
import { Link } from 'react-router-dom';

function RecentActivity({ profileUser, isOwnProfile, reviews = [] }) {
  const loading = false;
  const recentReviews = reviews.slice(0, 3);
  
  // Sort by likes descending to get the top 3 most popular
  const popularReviews = [...reviews].sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 3);

  const renderStars = (rating) => (
    <div className="flex text-[#00e054] text-[12px]">
      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
    </div>
  );

  return (
    <div className="space-y-10">
      {/* Recent Reviews Section */}
      <section>
        <div className="flex items-center justify-between mb-2 border-b border-white/10 pb-1">
          <h2 className="text-[13px] md:text-[15px] font-light uppercase text-white/40">Reseñas Recientes</h2>
          <Link to={`/perfil/${profileUser?.name}/reviews`} className="text-[10px] font-normal uppercase text-white/20 hover:text-white transition-colors">Más</Link>
        </div>

        <div className="mt-4 space-y-6">
          {loading ? (
            <div className="text-white/20 text-[13px] py-4">Cargando actividad...</div>
          ) : recentReviews.length > 0 ? (
            recentReviews.map(review => (
              <div key={review._id} className="flex gap-4 group">
                <Link to={`/pelicula/${review.mediaId}`} className="w-12 h-[72px] shrink-0 rounded-[2px] overflow-hidden border border-white/10 group-hover:border-[#00e054] transition-colors bg-[#2c3440]">
                  <img 
                    src={review.mediaPoster ? `https://image.tmdb.org/t/p/w200${review.mediaPoster}` : 'https://via.placeholder.com/200x300'} 
                    alt={review.mediaTitle}
                    className="w-full h-full object-cover"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <Link to={`/pelicula/${review.mediaId}`} className="text-white text-[18px] font-normal hover:text-[#40bcf4] transition-colors truncate">
                      {review.mediaTitle}
                    </Link>
                    <span className="text-white/40 text-[16px]">{review.mediaYear}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(review.rating)}
                    <span className="text-white/20 text-[11px] font-normal uppercase">
                      {new Date(review.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-white/60 text-[14px] line-clamp-2 italic font-light leading-relaxed">
                    "{review.reviewText}"
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white/30 text-[13px] italic py-4">No hay reseñas recientes.</p>
          )}
        </div>
      </section>

      {/* Popular Reviews */}
      <section>
        <div className="flex items-center justify-between mb-2 border-b border-white/10 pb-1">
          <h2 className="text-[13px] md:text-[15px] font-light uppercase text-white/40">Reseñas Populares</h2>
          <Link to={`/perfil/${profileUser?.name}/reviews/populares`} className="text-[10px] font-normal uppercase text-white/20 hover:text-white transition-colors">Más</Link>
        </div>
        
        <div className="mt-4 space-y-6">
          {popularReviews.length > 0 ? (
            popularReviews.map(review => (
              <div key={`pop-${review._id}`} className="flex gap-4 group cursor-pointer relative">
                {/* Overlay link that covers the whole card to go to the new page */}
                <Link to={`/perfil/${profileUser?.name}/reviews/populares`} className="absolute inset-0 z-10"></Link>
                
                <div className="w-12 h-[72px] shrink-0 rounded-[2px] overflow-hidden border border-white/10 group-hover:border-[#00e054] transition-colors bg-[#2c3440] relative z-20">
                  <img 
                    src={review.mediaPoster ? `https://image.tmdb.org/t/p/w200${review.mediaPoster}` : 'https://via.placeholder.com/200x300'} 
                    alt={review.mediaTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-white text-[18px] font-normal group-hover:text-[#40bcf4] transition-colors truncate relative z-20">
                      {review.mediaTitle}
                    </span>
                    <span className="text-white/40 text-[16px]">{review.mediaYear}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(review.rating)}
                    <span className="text-white/40 text-[11px] font-normal flex items-center gap-1">
                      <span className="text-red-500">❤</span> {review.likes || 0}
                    </span>
                  </div>
                  <p className="text-white/60 text-[14px] line-clamp-2 italic font-light leading-relaxed">
                    "{review.reviewText}"
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white/30 text-[13px] italic py-4">No hay reseñas populares todavía.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default RecentActivity;

