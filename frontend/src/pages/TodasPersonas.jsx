import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import movieService from '../services/movieService';
import PersonGrid from '../components/common/PersonGrid';
import Pagination from '../components/common/Pagination';

function TodasPersonas() {
  const [persons, setPersons] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        setLoading(true);
        const data = await movieService.getAllPersons(page);
        setPersons(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching all persons", error);
        setLoading(false);
      }
    };
    fetchPersons();
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="min-h-screen bg-[#14181c] text-[#8b9bb4] font-sans pt-10 pb-20">
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* Header */}
        <div className="mb-10 flex items-center gap-4">
          <Link to="/inicio" className="text-[#8b9bb4] hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <div>
            <h1 className="text-white text-[32px] font-bold leading-none mb-1">Actores y Directores</h1>
            <p className="text-[13px] uppercase tracking-widest font-bold">Populares en CineBox</p>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-40">
            <div className="w-10 h-10 border-4 border-[#1060ff]/20 border-t-[#1060ff] rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <PersonGrid items={persons} />
            <Pagination 
              currentPage={page} 
              totalPages={totalPages} 
              onPageChange={setPage} 
              accentColor="bg-[#1060ff] hover:bg-[#2b89ff]"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default TodasPersonas;