import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPopularReviews, getPopularReviewers, toggleLikeReview } from '../services/reviewService';
import { useAuth } from '../context/AuthContext';
import movieService from '../services/movieService';

function PopularReviewCard({ initialReview }) {
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
          <Link to={`/perfil/${review.username}`} className="flex items-center gap-2 group/user">
            <div className="w-6 h-6 rounded-full bg-white/10 overflow-hidden flex items-center justify-center border border-white/5 group-hover/user:border-[#00e054] transition-colors">
              {review.avatar ? (
                <img src={review.avatar} alt={review.username} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10px] font-bold uppercase">{review.username.substring(0, 1)}</span>
              )}
            </div>
            <span className="text-white/60 text-[13px] font-bold group-hover/user:text-white transition-colors">{review.username}</span>
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
            Like review
          </button>
          <span className="text-white/30 font-normal normal-case">{review.likes.toLocaleString()} likes</span>
        </div>
      </div>
    </div>
  );
}

function PopularReviews() {
  const [reviews, setReviews] = useState([]);
  const [reviewers, setReviewers] = useState([]);
  const [period, setPeriod] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const periods = {
    all: 'Todo el tiempo',
    week: 'Esta semana',
    month: 'Este mes',
    year: 'Este año'
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [reviewsData, reviewersData] = await Promise.all([
          getPopularReviews(period, page, 10),
          getPopularReviewers()
        ]);
        setReviews(reviewsData.reviews);
        setTotalPages(reviewsData.totalPages);
        setReviewers(reviewersData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [period, page]);

  return (
    <div className="w-full bg-[#111419] text-white min-h-screen font-['Inter',sans-serif]">
      <div className="max-w-[950px] mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2 border-b border-white/10 pb-2">
              <h2 className="text-[14px] font-light uppercase tracking-[1.5px] text-white/50">Popular Reviews</h2>
              
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="text-[11px] font-light uppercase tracking-[1px] text-white/30 hover:text-white transition-colors flex items-center gap-1"
                >
                  Sort by <span className="text-white font-bold">{periods[period]}</span>
                  <svg className={`w-3 h-3 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#2c3440] border border-white/10 rounded shadow-xl z-50 overflow-hidden">
                    {Object.entries(periods).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setPeriod(key);
                          setPage(1);
                          setShowDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#40bcf4] hover:text-white transition-colors ${period === key ? 'text-[#40bcf4] font-bold' : 'text-white/70'}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {loading && page === 1 ? (
              <div className="py-20 text-center text-white/20">Cargando reseñas...</div>
            ) : (
              <div className="flex flex-col">
                {reviews.length > 0 ? (
                  reviews.map(review => (
                    <PopularReviewCard key={review._id} initialReview={review} />
                  ))
                ) : (
                  <div className="py-20 text-center text-white/20">No se encontraron reseñas para este periodo.</div>
                )}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/10">
                <button 
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className={`px-4 py-2 text-[13px] font-bold uppercase tracking-widest rounded border border-white/10 hover:bg-white/5 transition-all ${page === 1 ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  Anterior
                </button>
                <button 
                  disabled={page === totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className={`px-4 py-2 text-[13px] font-bold uppercase tracking-widest rounded border border-white/10 hover:bg-white/5 transition-all ${page === totalPages ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-[280px] shrink-0">
            <div className="flex items-center justify-between mb-2 border-b border-white/10 pb-2">
              <h2 className="text-[14px] font-light uppercase tracking-[1.5px] text-white/50">Popular Reviewers</h2>
              <button className="text-[11px] font-light uppercase tracking-[1px] text-white/30 hover:text-white transition-colors">More</button>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              {reviewers.map((reviewer, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <Link to={`/perfil/${reviewer.username}`} className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden flex items-center justify-center border border-white/10 group-hover:border-[#00e054] transition-colors shrink-0">
                      <span className="text-sm font-bold uppercase">{reviewer.username.substring(0, 1)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[14px] font-bold text-white group-hover:text-[#40bcf4] transition-colors truncate">{reviewer.username}</h4>
                      <p className="text-[11px] text-white/40 uppercase tracking-wider">
                        {reviewer.reviewCount} reviews, {reviewer.totalLikes} likes
                      </p>
                    </div>
                  </Link>
                  <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer shrink-0">
                    <span className="text-[20px] leading-none">+</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PopularReviews;
