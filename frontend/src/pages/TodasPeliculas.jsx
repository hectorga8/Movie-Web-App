import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import movieService from '../services/movieService';
import MediaGrid from '../components/common/MediaGrid';
import Pagination from '../components/common/Pagination';
import ContentFilterBar from '../components/common/ContentFilterBar';

function TodasPeliculas() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        // Construimos el objeto de filtros a pasar
        const backendFilters = {};
        if (filters.year?.value) {
          if (String(filters.year.value).startsWith('Década')) {
            const decStart = parseInt(filters.year.value.match(/\d{4}/)[0]);
            backendFilters.yearStart = decStart;
            backendFilters.yearEnd = decStart + 9;
          } else {
            backendFilters.year = filters.year.value;
          }
        }
        if (filters.rating?.value) backendFilters.sort_by = filters.rating.value;
        if (filters.genre?.value) backendFilters.genre = filters.genre.value;
        if (filters.service?.value) backendFilters.watch_provider = filters.service.value;
        if (filters.others?.value === 'title') backendFilters.sort_by = 'original_title.asc'; // Override sort if alphabetical
        
        const data = await movieService.getAllMovies(page, backendFilters);
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
  }, [page, filters]);

  return (
    <div className="min-h-screen bg-[#111419] text-[#8b9bb4] font-sans pt-10 pb-20">
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/peliculas" className="text-[#8b9bb4] hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </Link>
            <div>
              <h1 className="text-white text-[32px] font-bold leading-none mb-1">Todas las Películas</h1>
              <p className="text-[13px] uppercase tracking-widest font-bold">Catálogo Completo</p>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <ContentFilterBar variant="peliculas" onFilterChange={(f) => { setFilters(f); setPage(1); }} />

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
                No hay películas que coincidan con estos filtros.
              </div>
            )}
            
            {totalPages > 1 && (
              <Pagination 
                currentPage={page} 
                totalPages={totalPages} 
                onPageChange={setPage} 
                accentColor="bg-[#00e054] hover:bg-[#00c048]"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default TodasPeliculas;