import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPopularReviewers } from '../services/reviewService';

function Miembros() {
  const [reviewers, setReviewers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviewers = async () => {
      try {
        const data = await getPopularReviewers();
        setReviewers(data);
      } catch (error) {
        console.error("Error fetching popular reviewers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviewers();
  }, []);

  return (
    <div className="min-h-screen bg-[#14181c] text-[#8aa8c2] font-sans pt-6 pb-20">
      <div className="max-w-[1200px] mx-auto px-4">
        
        <div className="mt-8 mb-4 flex justify-between items-end border-b border-[#445566] pb-2">
          <h2 className="text-[14px] uppercase tracking-[1px] text-[#9ab] cursor-pointer transition-colors">
            Miembros Populares
          </h2>
          <span className="text-[11px] text-[#8aa8c2] tracking-[0.5px]">Nuestra comunidad de críticos</span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-2 border-[#1060ff] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : reviewers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviewers.map(user => (
              <div key={user._id} className="bg-[#2c3440] p-4 rounded-[4px] border border-[#445566] hover:border-[#1060ff] transition-colors flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#1060ff] flex items-center justify-center font-bold text-white text-2xl shrink-0">
                  {(user.username || user._id)[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <Link to={`/perfil/${user._id}`} className="text-[#fff] font-bold text-[18px] hover:text-[#40bcf4] transition-colors block truncate">
                    {user.username || user._id}
                  </Link>
                  <p className="text-[13px] text-[#8aa8c2]">
                    <span className="font-bold text-[#fff]">{user.reviewCount}</span> reseñas
                  </p>
                  <p className="text-[13px] text-[#8aa8c2]">
                    <span className="font-bold text-[#fff]">{user.totalLikes}</span> likes recibidos
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-[#8aa8c2] text-[15px] italic text-center py-10">
            Todavía no hay miembros populares. ¡Escribe algunas reseñas y recibe me gusta!
          </div>
        )}

      </div>
    </div>
  );
}

export default Miembros;