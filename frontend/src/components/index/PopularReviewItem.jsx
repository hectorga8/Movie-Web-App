import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toggleLikeReview } from '../../services/reviewService';

function PopularReviewItem({ initialReview }) {
  const { user } = useAuth();
  const [review, setReview] = useState(initialReview);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);
  
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
    <div className="flex gap-4 p-4 bg-white/5 rounded-[4px] border border-white/5 relative overflow-hidden group transition-all">
      <Link to={`/${review.mediaType}/${review.mediaId}`} className="w-16 md:w-20 shrink-0 rounded-[2px] overflow-hidden aspect-[2/3] block bg-white/10 h-max cursor-pointer">
         <img src={review.mediaPoster ? `https://image.tmdb.org/t/p/w200${review.mediaPoster}` : 'https://via.placeholder.com/200x300?text=No+Poster'} alt={review.mediaTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
      </Link>
      <div className="flex-1 min-w-0 flex flex-col justify-start">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-[14px] truncate">{review.username}</span>
          <div className="flex text-[#00e054] text-lg">
            {'★'.repeat(Math.max(0, review.rating || 0))}{'☆'.repeat(Math.max(0, 5 - (review.rating || 0)))}
          </div>
        </div>
        <Link to={`/${review.mediaType}/${review.mediaId}`} className="text-white/80 text-[12px] font-bold mb-1 hover:text-[#1060ff] transition-colors cursor-pointer">{review.mediaTitle} <span className="font-normal opacity-50">{review.mediaYear}</span></Link>
        <p className="text-white/60 text-[13px] italic font-light break-words mb-2">
          "{displayContent}"
          {isLong && !isExpanded && (
            <button onClick={() => setIsExpanded(true)} className="ml-1 text-white font-bold bg-transparent border-none text-[12px] hover:text-[#1060ff] cursor-pointer">Leer más</button>
          )}
        </p>
        {isLong && isExpanded && (
            <button onClick={() => setIsExpanded(false)} className="mt-1 mb-2 self-start text-white font-bold bg-transparent border-none text-[12px] hover:text-[#1060ff] cursor-pointer">Encoger review</button>
        )}
        <div className="mt-auto pt-2 text-[13px] text-white/30 font-light flex items-center gap-3 border-t border-white/5">
          <button 
            onClick={handleLike}
            disabled={!user || loadingLike}
            className={`flex items-center gap-1.5 font-bold uppercase tracking-wider transition-colors cursor-pointer ${isLiked ? 'text-[#ff4e4e]' : 'text-white/40 hover:text-white'}`}
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