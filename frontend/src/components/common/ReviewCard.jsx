import React from 'react';

const ReviewCard = ({ review, author, content, created_at, date, rating }) => {
  // Manejamos tanto reviews de TMDb (objeto review) como props individuales
  const displayAuthor = review?.author || author || "Usuario CineBox";
  const displayContent = review?.content || content || "";
  const displayDate = review?.created_at ? new Date(review.created_at).toLocaleDateString() : date || "Reciente";
  const displayRating = review?.author_details?.rating || rating || null;

  return (
    <div className="p-8 bg-white border border-[#d5d7db]/60 rounded-[8px] shadow-whisper mb-8 transition-all hover:border-[#d5d7db]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#15181e] flex items-center justify-center font-bold text-[#efeff1] text-lg">
            {displayAuthor[0].toUpperCase()}
          </div>
          <div>
            <h5 className="font-bold text-[15px] text-black h-tight mb-1">{displayAuthor}</h5>
            <p className="text-[11px] label-uppercase opacity-60 tracking-[1.5px] font-bold">
              {displayDate}
            </p>
          </div>
        </div>
        
        {displayRating && (
          <div className="px-3 py-1.5 bg-[#f1f2f3] rounded-[4px] border border-[#d5d7db]/60 flex items-center gap-2">
            <span className="text-[#ffcf25] text-sm">★</span>
            <span className="text-[13px] font-bold text-black">{displayRating}</span>
          </div>
        )}
      </div>

      <div className="relative">
        <svg className="absolute -top-4 -left-2 w-8 h-8 text-[#f1f2f3] opacity-50 -z-10" fill="currentColor" viewBox="0 0 32 32">
          <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-2.2 1.8-4 4-4V8h-2zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8h-2z" />
        </svg>
        <p className="body-relaxed text-[15px] text-[#3b3d45] italic leading-[1.63]">
          "{displayContent}"
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
