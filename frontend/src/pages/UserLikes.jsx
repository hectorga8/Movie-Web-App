import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUserProfile } from '../services/authService';
import movieService from '../services/movieService';
import Pagination from '../components/common/Pagination';
import MediaCard from '../components/common/MediaCard';

function UserLikes() {
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [likedMovies, setLikedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const userProfile = await getUserProfile(username);
        setProfileUser(userProfile);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('No se pudo cargar la información del usuario.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
    window.scrollTo(0, 0);
  }, [username]);

  useEffect(() => {
    const fetchMoviesPage = async () => {
      if (profileUser && profileUser.favoriteMovies?.length > 0) {
        setMoviesLoading(true);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageIds = profileUser.favoriteMovies.slice(startIndex, endIndex);

        try {
          const moviePromises = pageIds.map(id => 
            movieService.getMovieDetail(id).catch(() => null)
          );
          const results = await Promise.all(moviePromises);
          setLikedMovies(results.filter(m => m !== null));
        } catch (err) {
          console.error('Error fetching user likes:', err);
        } finally {
          setMoviesLoading(false);
        }
      }
    };
    fetchMoviesPage();
  }, [profileUser, currentPage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1060ff] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !profileUser) {
    return (
      <div className="min-h-screen bg-transparent text-[#8b9bb4] flex flex-col items-center justify-center pb-20">
        <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
        <p>{error || 'Usuario no encontrado.'}</p>
        <Link to="/inicio" className="mt-4 text-[#1060ff] hover:text-white transition-colors">Volver al inicio</Link>
      </div>
    );
  }

  const totalPages = Math.ceil((profileUser.favoriteMovies?.length || 0) / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full bg-transparent text-white min-h-screen font-['Inter',sans-serif]">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        
        {/* Header */}
        <div className="mb-8 flex items-center gap-4 border-b border-white/10 pb-6">
          <Link to={`/perfil/${profileUser.name}`} className="text-[#8b9bb4] hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-[#2c3440]">
              {profileUser.avatar ? (
                <img src={profileUser.avatar} alt={profileUser.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/40 font-bold">
                  {profileUser.name.substring(0,1).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white leading-none mb-1">Películas que le gustan a {profileUser.name}</h1>
              <p className="text-[12px] uppercase tracking-[1px] font-bold text-[#8b9bb4]">{profileUser.favoriteMovies?.length || 0} películas</p>
            </div>
          </div>
        </div>

        {/* Grid de Películas Favoritas / Liked */}
        {moviesLoading ? (
           <div className="py-20 flex justify-center">
             <div className="w-8 h-8 border-2 border-[#1060ff] border-t-transparent rounded-full animate-spin"></div>
           </div>
        ) : likedMovies.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 mb-10">
              {likedMovies.map(item => (
                <MediaCard 
                  key={item.id}
                  id={item.id}
                  type="movie"
                  imagePath={item.poster_path}
                  title={item.title || item.name}
                  isFavorite={true}
                  showTypeBadge={false}
                  titlePosition="inside"
                />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="py-20 text-center text-white/40 italic bg-[#1c2228] border border-white/5 rounded">
            Este usuario aún no le ha dado "Me gusta" a ninguna película.
          </div>
        )}

      </div>
    </div>
  );
}

export default UserLikes;