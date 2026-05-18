import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toggleLikeReview } from '../../services/reviewService';
import { getUserProfile } from '../../services/authService';

function PopularReviewItem({ initialReview }) {
  const { user } = useAuth();
  const [review, setReview] = useState(initialReview);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);
  const [authorAvatar, setAuthorAvatar] = useState(initialReview.userAvatar || null);
  
  useEffect(() => {
    if (!authorAvatar && (review.userId || review.user)) {
      const fetchProfile = async () => {
        try {
          const profile = await getUserProfile(review.userId || review.user);
          if (profile && profile.avatar) {
            setAuthorAvatar(profile.avatar);
          }
        } catch (error) {
          // Fallback a inicial silenciosamente
        }
      };
      fetchProfile();
    }
  }, [review.userId, review.user, authorAvatar]);

  const isLiked = review.likedBy?.includes(user?._id) || false;
  const isLong = review.reviewText && review.reviewText.length > 130;
  const displayContent = isExpanded || !isLong 
    ? review.reviewText 
    : review.reviewText.substring(0, 130) + '...';

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

  return (
    <div className="flex gap-4 py-4 relative overflow-hidden transition-all">
      <Link to={`/${review.mediaType === 'movie' ? 'pelicula' : 'serie'}/${review.mediaId}`} className="w-16 md:w-20 shrink-0 rounded-[2px] overflow-hidden aspect-[2/3] block bg-white/10 h-max cursor-pointer">
         <img loading="lazy" src={review.mediaPoster ? `https://image.tmdb.org/t/p/w200${review.mediaPoster}` : 'https://via.placeholder.com/200x300?text=No+Poster'} alt={review.mediaTitle} className="w-full h-full object-cover" />
      </Link>
      <div className="flex-1 min-w-0 flex flex-col justify-start">
        <div className="flex items-center gap-2 mb-1">
          <Link to={`/perfil/${review.userId || review.user}`} className="flex items-center gap-2 group/user">
            <div className="w-5 h-5 rounded-full overflow-hidden bg-white/10 shrink-0">
              <img loading="lazy" 
                src={authorAvatar || `https://ui-avatars.com/api/?name=${review.username}&background=random`} 
                alt={review.username} 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-[17px] truncate text-blue-100/80 group-hover/user:text-white transition-colors cursor-pointer">
              {review.username}
            </span>
          </Link>
          <div className="flex text-[#00e054] text-lg">
            {'★'.repeat(Math.max(0, review.rating || 0))}{'☆'.repeat(Math.max(0, 5 - (review.rating || 0)))}
          </div>
        </div>
        <div className="flex items-baseline gap-2 mb-1">
          <Link to={`/${review.mediaType === 'movie' ? 'pelicula' : 'serie'}/${review.mediaId}`} className="text-white text-[18px] font-normal hover:text-blue-400 transition-colors cursor-pointer">
            {review.mediaTitle}
          </Link>
          <span className="font-normal opacity-50 text-[16px]">{review.mediaYear}</span>
        </div>
        <p className="text-blue-100/80 text-[15px] italic font-light break-words mb-2">
          "{displayContent}"
          {isLong && !isExpanded && (
            <button onClick={() => setIsExpanded(true)} className="ml-1 text-white font-normal bg-transparent border-none text-[12px] hover:text-[#1060ff] cursor-pointer">Leer más</button>
          )}
        </p>
        {isLong && isExpanded && (
            <button onClick={() => setIsExpanded(false)} className="mt-1 mb-2 self-start text-white font-normal bg-transparent border-none text-[12px] hover:text-[#1060ff] cursor-pointer">Encoger review</button>
        )}
        <div className="mt-auto pt-2 text-[13px] text-white/30 font-light flex items-center gap-3">
          <button 
            onClick={handleLike}
            disabled={!user || loadingLike}
            className={`flex items-center gap-1.5 font-normal uppercase transition-colors cursor-pointer ${isLiked ? 'text-[#ff4e4e]' : 'text-white/40 hover:text-white'}`}
          >
            <span className={`text-[20px] leading-none ${isLiked ? '' : 'grayscale'}`}>❤</span>
            {review.likes} {review.likes === 1 ? 'Me gusta' : 'Me gusta'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopularReviewItem;