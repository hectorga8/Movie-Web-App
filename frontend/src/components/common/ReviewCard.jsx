import React, { useState } from 'react';
import { toggleLikeReview } from '../../services/reviewService';
import { useAuth } from '../../context/AuthContext';

const ReviewCard = ({ review, author, content, created_at, date, rating, internal = false, onLikeUpdate }) => {
  const { user } = useAuth();
  const [likesCount, setLikesCount] = useState(review?.likes || 0);
  const [isLiked, setIsLiked] = useState(review?.likedBy?.includes(user?._id) || false);
  const [loadingLike, setLoadingLike] = useState(false);

  // Manejamos tanto reviews de TMDb (objeto review) como props individuales (o internas)
  const displayAuthor = review?.username || review?.author || author || "Usuario CineBox";
  const displayContent = review?.reviewText || review?.content || content || "";
  const displayDate = review?.createdAt || review?.created_at ? new Date(review.createdAt || review.created_at).toLocaleDateString() : date || "Reciente";
  const displayRating = review?.rating || review?.author_details?.rating || rating || null;

  const handleLike = async () => {
    if (!user || !internal || loadingLike) return;
    try {
      setLoadingLike(true);
      const data = await toggleLikeReview(review._id);
      setLikesCount(data.likes);
      setIsLiked(data.likedBy.includes(user._id));
      if (onLikeUpdate) onLikeUpdate(data.likes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLike(false);
    }
  };

  return (
    <div className="p-8 bg-white/5 border border-white/10 rounded-[12px] shadow-2xl mb-8 transition-all hover:bg-white/10 group">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#1060ff] flex items-center justify-center font-bold text-white text-lg shadow-[0_0_15px_rgba(16,96,255,0.3)]">
            {displayAuthor[0]?.toUpperCase()}
          </div>
          <div>
            <h5 className="font-bold text-[16px] text-white mb-1">{displayAuthor}</h5>
            <p className="text-[11px] label-uppercase opacity-30 font-normal">
              {displayDate}
            </p>
          </div>
        </div>
        
        {displayRating && (
          <div className="px-3 py-1.5 bg-white/5 rounded-[6px] border border-white/10 flex items-center gap-2">
            <span className="text-[#ffcf25] text-sm">★</span>
            <span className="text-[13px] font-normal text-white">{displayRating}</span>
          </div>
        )}
      </div>

      <div className="relative">
        <svg className="absolute -top-4 -left-2 w-10 h-10 text-white/5 opacity-40 -z-10" fill="currentColor" viewBox="0 0 32 32">
          <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-2.2 1.8-4 4-4V8h-2zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8h-2z" />
        </svg>
        <p className="body-relaxed text-[16px] text-white/70 italic leading-[1.7] pl-2">
          "{displayContent}"
        </p>
      </div>

      {internal && (
        <div className="mt-4 flex items-center gap-2 justify-end">
          <button 
            onClick={handleLike}
            disabled={!user || loadingLike}
            className={`flex items-center gap-1.5 text-[12px] font-normal uppercase transition-colors ${isLiked ? 'text-[#ff4e4e]' : 'text-white/40 hover:text-white'}`}
          >
            <span className={`text-[16px] ${isLiked ? '' : 'grayscale'}`}>❤</span>
            {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
