import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import movieService from '../services/movieService';
import MediaGrid from '../components/common/MediaGrid';
import Pagination from '../components/common/Pagination';

function TodasPeliculas() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await movieService.getAllMovies(page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching all movies", error);
        setLoading(false);
      }
    };
    fetchMovies();
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="min-h-screen bg-[#14181c] text-[#8b9bb4] font-sans pt-10 pb-20">
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* Header */}
        <div className="mb-10 flex items-center gap-4">
          <Link to="/peliculas" className="text-[#8b9bb4] hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <div>
            <h1 className="text-white text-[32px] font-bold leading-none mb-1">Todas las Películas</h1>
            <p className="text-[13px] uppercase tracking-widest font-bold">Catálogo Completo</p>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-40">
            <div className="w-10 h-10 border-4 border-[#00e054]/20 border-t-[#00e054] rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <MediaGrid items={movies} type="pelicula" />
            <Pagination 
              currentPage={page} 
              totalPages={totalPages} 
              onPageChange={setPage} 
              accentColor="bg-[#00e054] hover:bg-[#00c048]"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default TodasPeliculas;