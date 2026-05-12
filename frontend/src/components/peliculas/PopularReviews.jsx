import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getWeeklyPopularReviews, toggleLikeReview } from '../../services/reviewService';
import { useAuth } from '../../context/AuthContext';

function ReviewItem({ initialReview }) {
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
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-[#00e054]">★</span>);
    }
    if (hasHalf) {
      stars.push(<span key="half" className="text-[#00e054]">½</span>);
    }
    return <span className="text-[14px] leading-none">{stars}</span>;
  };

  return (
    <div className="flex gap-4 py-4 border-b border-[#445566] last:border-0">
      <Link to={`/${review.mediaType}/${review.mediaId}`} className="w-[70px] shrink-0 border border-[#445566] hover:border-[#00e054] rounded-[3px] overflow-hidden transition-colors aspect-[2/3] bg-[#2c3440]">
        <img 
          src={review.mediaPoster ? `https://image.tmdb.org/t/p/w185${review.mediaPoster}` : 'https://via.placeholder.com/185x278?text=No+Poster'} 
          alt={review.mediaTitle}
          className="w-full h-full object-cover"
        />
      </Link>
      
      <div className="flex-1 pt-1 min-w-0">
        <Link to={`/${review.mediaType}/${review.mediaId}`}>
          <h3 className="text-[20px] font-bold text-[#fff] leading-tight mb-1 hover:text-[#40bcf4] transition-colors truncate">
            {review.mediaTitle} <span className="text-[18px] text-[#8aa8c2] font-normal">{review.mediaYear}</span>
          </h3>
        </Link>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[13px] text-[#9ab] font-bold">{review.username}</span>
          {renderStars(review.rating || 0)}
        </div>
        
        <p className="text-[15px] text-[#8aa8c2] mb-4 font-serif break-words">
          {review.reviewText}
        </p>
        
        <div className="flex items-center gap-2 text-[12px] text-[#678] font-bold">
          <button 
            onClick={handleLike}
            disabled={!user || loadingLike}
            className={`flex items-center gap-1 transition-colors cursor-pointer ${isLiked ? 'text-[#ff4e4e]' : 'hover:text-[#9ab]'}`}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            Me gusta
          </button>
          <span className="font-normal">{review.likes} me gusta</span>
        </div>
      </div>
    </div>
  );
}

function PopularReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getWeeklyPopularReviews();
        // Filtramos solo películas
        const moviesReviews = data.filter(r => r.mediaType === 'movie');
        setReviews(moviesReviews.slice(0, 6)); // Mostrar hasta 6
      } catch (error) {
        console.error("Error fetching popular reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  if (reviews.length === 0) {
    return <div className="text-[#8aa8c2] text-[13px] italic mt-4">Aún no hay reseñas populares esta semana.</div>;
  }

  return (
    <div className="flex flex-col">
      {reviews.map(review => (
        <ReviewItem key={review._id} initialReview={review} />
      ))}
    </div>
  );
}

export default PopularReviews;