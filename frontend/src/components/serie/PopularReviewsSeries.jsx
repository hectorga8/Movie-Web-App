import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import movieService from '../../services/movieService';

const reviewsData = [
  {
    author: "sidduw",
    rating: 5,
    text: "El mejor episodio piloto que he visto en años.",
    likes: "51,914",
    avatar: "https://i.pravatar.cc/150?u=1",
    date: ""
  },
  {
    author: "J",
    rating: 3.5,
    text: "La temporada 2 fue un poco floja pero el final lo arregla.",
    likes: "44,610",
    avatar: "https://i.pravatar.cc/150?u=2",
    date: "04 Oct 2026"
  },
  {
    author: "Nibit",
    rating: 4,
    text: "increíble desarrollo de personajes",
    likes: "26,231",
    avatar: "https://i.pravatar.cc/150?u=3",
    date: ""
  },
  {
    author: "starstruck",
    rating: 4,
    text: "no puedo esperar a la siguiente temporada",
    likes: "42,113",
    avatar: "https://i.pravatar.cc/150?u=4",
    date: ""
  },
  {
    author: "carley :)",
    rating: 4.5,
    text: "maratón de 10 horas y no me arrepiento de nada",
    likes: "25,477",
    avatar: "https://i.pravatar.cc/150?u=5",
    date: ""
  },
  {
    author: "Yashley",
    rating: 4,
    text: "El cliffhanger del último episodio me va a quitar el sueño",
    likes: "34,009",
    avatar: "https://i.pravatar.cc/150?u=6",
    date: ""
  }
];

function PopularReviewsSeries() {
  const [serie, setSerie] = useState(null);

  useEffect(() => {
    const fetchSerie = async () => {
      try {
        const data = await movieService.getTVTrending();
        if (Array.isArray(data) && data.length > 0) {
          setSerie(data[0]);
        } else if (data && Array.isArray(data.results) && data.results.length > 0) {
          setSerie(data.results[0]);
        }
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchSerie();
  }, []);

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
    <div className="flex flex-col">
      {reviewsData.map((review, i) => (
        <div key={i} className="flex gap-4 py-4 border-b border-[#445566] last:border-0">
          <Link to={`/serie/${serie?.id}`} className="w-[70px] shrink-0 border border-[#445566] hover:border-[#00e054] rounded-[3px] overflow-hidden transition-colors aspect-[2/3] bg-[#2c3440]">
            {serie && (
              <img 
                src={movieService.getImageUrl(serie.poster_path, 'w185')} 
                alt={serie.name || serie.title}
                className="w-full h-full object-cover"
              />
            )}
          </Link>
          
          <div className="flex-1 pt-1">
            <Link to={`/serie/${serie?.id}`}>
              <h3 className="text-[20px] font-bold text-[#fff] leading-tight mb-1 hover:text-[#40bcf4] transition-colors">
                {serie?.name || serie?.title || "La Serie"} <span className="text-[18px] text-[#8aa8c2] font-normal">{serie?.first_air_date?.split('-')[0] || "2026"}</span>
              </h3>
            </Link>
            
            <div className="flex items-center gap-2 mb-3">
              <img src={review.avatar} alt={review.author} className="w-6 h-6 rounded-full" />
              <span className="text-[13px] text-[#9ab] font-bold">{review.author}</span>
              {renderStars(review.rating)}
            </div>
            
            <p className="text-[15px] text-[#8aa8c2] mb-4 font-serif">
              {review.text}
            </p>
            
            <div className="flex items-center gap-2 text-[12px] text-[#678] font-bold">
              <button className="flex items-center gap-1 hover:text-[#9ab] transition-colors">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                Me gusta
              </button>
              <span className="font-normal">{review.likes} me gusta</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PopularReviewsSeries;