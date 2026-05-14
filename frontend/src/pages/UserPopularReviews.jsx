import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getReviewsForUser, toggleLikeReview } from '../services/reviewService';
import { getUserProfile } from '../services/authService';
import { useAuth } from '../context/AuthContext';

function UserReviewCard({ initialReview, username, avatar }) {
  const { user } = useAuth();
  const [review, setReview] = useState(initialReview);
  const [loadingLike, setLoadingLike] = useState(false);
  
  const isLiked = review.likedBy?.includes(user?._id) || false;

  const handleLike = async () => {
    if (!user || loadingLike) return;
    try {
      setLoadingLike(true);
      const data = await toggleLikeReview(review._id);
      setReview({ ...review, likes: data.likes, likedBy: data.likedBy });
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLike(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex text-[#00e054] text-[16px]">
        {'★'.repeat(Math.max(0, rating || 0))}{'☆'.repeat(Math.max(0, 5 - (rating || 0)))}
      </div>
    );
  };

  return (
    <div className="flex gap-5 py-6 border-b border-white/10 last:border-0 group">
      <Link to={`/pelicula/${review.mediaId}`} className="w-[70px] shrink-0 rounded-[3px] overflow-hidden aspect-[2/3] block bg-white/5 border border-white/10 group-hover:border-[#00e054] transition-colors">
        <img 
          src={review.mediaPoster ? `https://image.tmdb.org/t/p/w200${review.mediaPoster}` : 'https://via.placeholder.com/200x300?text=No+Poster'} 
          alt={review.mediaTitle} 
          className="w-full h-full object-cover" 
        />
      </Link>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <Link to={`/pelicula/${review.mediaId}`} className="text-white text-[20px] font-bold hover:text-[#40bcf4] transition-colors leading-tight">
            {review.mediaTitle}
          </Link>
          <span className="text-white/40 text-[18px] font-normal">{review.mediaYear}</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Link to={`/perfil/${username}`} className="flex items-center gap-2 group/user">
            <div className="w-6 h-6 rounded-full bg-white/10 overflow-hidden flex items-center justify-center border border-white/5 group-hover/user:border-[#00e054] transition-colors">
              {avatar ? (
                <img src={avatar} alt={username} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10px] font-bold uppercase">{username?.substring(0, 1)}</span>
              )}
            </div>
            <span className="text-white/60 text-[13px] font-bold group-hover/user:text-white transition-colors">{username}</span>
          </Link>
          {renderStars(review.rating)}
        </div>

        <p className="text-white/80 text-[15px] italic mb-4 font-light leading-relaxed">
          "{review.reviewText}"
        </p>

        <div className="flex items-center gap-4 text-[12px] font-bold uppercase tracking-wider">
          <button 
            onClick={handleLike}
            disabled={!user || loadingLike}
            className={`flex items-center gap-1.5 transition-colors cursor-pointer ${isLiked ? 'text-[#ff4e4e]' : 'text-white/30 hover:text-white'}`}
          >
            <span className="text-[18px] leading-none">❤</span>
            Me gusta
          </button>
          <span className="text-white/30 font-normal normal-case">{review.likes.toLocaleString()} me gusta</span>
        </div>
      </div>
    </div>
  );
}

function UserPopularReviews() {
  const { username } = useParams();
  const [reviews, setReviews] = useState([]);
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userProfile = await getUserProfile(username);
        setProfileUser(userProfile);

        if (userProfile && userProfile._id) {
          const userReviews = await getReviewsForUser(userProfile._id);
          // Sort by likes descending to get the most popular
          const sortedReviews = [...userReviews].sort((a, b) => (b.likes || 0) - (a.likes || 0));
          setReviews(sortedReviews);
        }
      } catch (err) {
        console.error('Error fetching user popular reviews:', err);
        setError('No se pudo cargar la información del usuario.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1060ff] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !profileUser) {
    return (
      <div className="min-h-screen bg-transparent text-[#8b9bb4] flex flex-col items-center justify-center pb-20">
        <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
        <p>{error || 'Usuario no encontrado.'}</p>
        <Link to="/inicio" className="mt-4 text-[#1060ff] hover:text-white transition-colors">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-transparent text-white min-h-screen font-['Inter',sans-serif]">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="mb-8 flex items-center gap-4 border-b border-white/10 pb-6">
          <Link to={`/perfil/${profileUser.name}`} className="text-[#8b9bb4] hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-[#2c3440]">
              {profileUser.avatar ? (
                <img src={profileUser.avatar} alt={profileUser.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/40 font-bold">
                  {profileUser.name.substring(0,1).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white leading-none mb-1">Reseñas de {profileUser.name}</h1>
              <p className="text-[12px] uppercase tracking-[1px] font-bold text-[#8b9bb4]">Ordenadas por popularidad</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          {reviews.length > 0 ? (
            reviews.map(review => (
              <UserReviewCard 
                key={review._id} 
                initialReview={review} 
                username={profileUser.name}
                avatar={profileUser.avatar}
              />
            ))
          ) : (
            <div className="py-20 text-center text-white/40 italic">
              Este usuario aún no ha escrito ninguna reseña.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default UserPopularReviews;