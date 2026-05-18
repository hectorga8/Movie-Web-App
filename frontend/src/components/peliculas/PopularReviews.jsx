import React, { useEffect, useState } from 'react';
import { getWeeklyPopularReviews } from '../../services/reviewService';
import PopularReviewItem from '../index/PopularReviewItem';

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
    <div className="flex flex-col space-y-4 pt-4">
      {reviews.map(review => (
        <PopularReviewItem key={review._id} initialReview={review} />
      ))}
    </div>
  );
}

export default PopularReviews;