import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import movieService from '../services/movieService';
import MediaGrid from '../components/common/MediaGrid';
import Pagination from '../components/common/Pagination';
import { useAuth } from '../context/AuthContext';

function Recomendaciones() {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get('type') || 'general';

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        let data = { results: [], total_pages: 1 };

        if (type === 'generos' && user?.genres?.length > 0) {
          const genreIds = user.genres.join('|');
          data = await movieService.getAllMovies(page, { genre: genreIds });
        } else if (type === 'similares' && user?.favoriteMovies?.length > 0) {
          // getRecommendations usually returns one page of results (20 items)
          const randomFavId = user.favoriteMovies[Math.floor(Math.random() * user.favoriteMovies.length)];
          const results = await movieService.getRecommendations(randomFavId);
          data = { results: results, total_pages: 1 }; // Simulated pagination
        } else {
          data = await movieService.getAllMovies(page); // Fallback
        }

        // For `getRecommendations`, it might return array directly instead of { results: [] }
        if (Array.isArray(data)) {
           setMovies(data);
           setTotalPages(1);
        } else {
           setMovies(data.results || []);
           setTotalPages(data.total_pages || 1);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching recommendations", error);
        setLoading(false);
      }
    };

    if (user !== undefined) {
      fetchRecommendations();
    }
  }, [page, type, user]);

  return (
    <div className="min-h-screen bg-transparent text-[#8b9bb4] font-sans pt-10 pb-20">
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-[#8b9bb4] hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </Link>
            <div>
              <h1 className="text-white text-[32px] font-bold leading-none mb-1">
                {type === 'generos' ? 'Para ti: Tus géneros' : (type === 'similares' ? 'Porque te gustaron' : 'Recomendaciones')}
              </h1>
              <p className="text-[13px] uppercase tracking-widest font-bold text-[#00e054]">Sugerencias Personalizadas</p>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-40">
            <div className="w-10 h-10 border-4 border-[#00e054]/20 border-t-[#00e054] rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {movies.length > 0 ? (
              <MediaGrid items={movies} type="pelicula" />
            ) : (
              <div className="py-20 text-center text-white/40 italic bg-[#1c2228] border border-white/5 rounded">
                No hay recomendaciones disponibles en este momento.
              </div>
            )}
            
            {totalPages > 1 && (
              <div className="mt-10">
                <Pagination 
                  currentPage={page} 
                  totalPages={totalPages} 
                  onPageChange={setPage} 
                  accentColor="bg-[#00e054] hover:bg-[#00c048]"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Recomendaciones;