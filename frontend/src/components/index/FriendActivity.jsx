import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getFeed } from '../../services/reviewService';
import { Link } from 'react-router-dom';

function FriendActivity() {
  const { user } = useAuth();
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true);
      if (user && user.following && user.following.length > 0) {
        try {
          const data = await getFeed(user.following);
          setFeed(data);
        } catch (error) {
          console.error('Error fetching feed:', error);
        }
      }
      setLoading(false);
    };

    fetchFeed();
  }, [user]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24)); // diff in hours

    if (diff < 1) return 'Hace menos de 1h';
    if (diff < 24) return `Hace ${diff}h`;
    if (diff < 48) return 'Ayer';
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  if (!user) {
    return (
      <div className="group">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-[#1060ff] rounded-full"></span>
          Actividad de tu red
        </h2>
        <div className="rounded-xl bg-white/5 border border-white/10 p-6 text-center">
          <p className="text-sm text-white/50 mb-4">Inicia sesión para ver la actividad de tus amigos.</p>
          <Link to="/login" className="text-xs text-[#1060ff] hover:text-white uppercase font-bold tracking-wider transition-colors">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="group">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-[#1060ff] rounded-full"></span>
        Actividad de tu red
      </h2>
      <div className="rounded-xl bg-white/5 border border-white/10 p-6">
        {loading ? (
          <div className="text-center py-4 text-white/30 text-xs uppercase animate-pulse">Cargando actividad...</div>
        ) : feed.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-sm text-white/50 mb-2">Aún no hay actividad reciente.</p>
            <p className="text-xs text-white/30">Sigue a otros miembros para ver sus reseñas aquí.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {feed.map((review, i) => (
              <div key={review._id} className="relative">
                <div className="flex gap-4">
                  <Link to={`/${review.mediaType}/${review.mediaId}`} className="shrink-0">
                    <img loading="lazy" 
                      src={review.mediaPoster ? `https://image.tmdb.org/t/p/w200${review.mediaPoster}` : "https://via.placeholder.com/200x300"} 
                      alt={review.mediaTitle} 
                      className="w-12 h-16 object-cover border border-white/10 rounded-[2px] hover:border-[#1060ff] transition-colors" 
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/80 leading-snug mb-1">
                      <Link to={`/perfil/${review.userId}`} className="font-bold text-white hover:text-[#1060ff] transition-colors">
                        {review.username}
                      </Link> ha visto <Link to={`/${review.mediaType}/${review.mediaId}`} className="font-medium text-white hover:text-[#1060ff] transition-colors">{review.mediaTitle}</Link>
                    </p>
                    
                    <div className="flex items-center gap-2 mb-2">
                      {review.rating > 0 && (
                        <div className="flex text-[#00e054] text-[10px]">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <span key={idx} className={idx < review.rating / 2 ? 'opacity-100' : 'opacity-20'}>★</span>
                          ))}
                        </div>
                      )}
                      {review.mediaLiked && <span className="text-red-500 text-xs">♥</span>}
                    </div>

                    {review.reviewText && (
                      <p className="text-[13px] text-white/60 line-clamp-2 italic border-l-2 border-white/10 pl-2">
                        "{review.reviewText}"
                      </p>
                    )}
                    <span className="text-[10px] text-white/30 font-light uppercase mt-2 block">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                </div>
                {i < feed.length - 1 && <div className="h-px bg-white/5 w-full mt-6"></div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FriendActivity;
