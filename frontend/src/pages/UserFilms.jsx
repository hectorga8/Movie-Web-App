import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { watchlistService } from '../services/watchlistService';
import { getUserProfile } from '../services/authService';
import movieService from '../services/movieService';

function UserFilms() {
  const { username } = useParams();
  const [movies, setMovies] = useState([]);
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userProfile = await getUserProfile(username);
        setProfileUser(userProfile);

        if (userProfile && userProfile._id) {
          const userWatched = await watchlistService.getUserWatchlistById(userProfile._id, { status: 'watched' });
          setMovies(userWatched.filter(item => item.mediaType === 'movie'));
        }
      } catch (err) {
        console.error('Error fetching user films:', err);
        setError('No se pudo cargar la información del usuario.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111419] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1060ff] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !profileUser) {
    return (
      <div className="min-h-screen bg-[#111419] text-[#8b9bb4] flex flex-col items-center justify-center pb-20">
        <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
        <p>{error || 'Usuario no encontrado.'}</p>
        <Link to="/inicio" className="mt-4 text-[#1060ff] hover:text-white transition-colors">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#111419] text-white min-h-screen font-['Inter',sans-serif]">
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
              <h1 className="text-2xl font-bold text-white leading-none mb-1">Películas vistas por {profileUser.name}</h1>
              <p className="text-[12px] uppercase tracking-[1px] font-bold text-[#8b9bb4]">{movies.length} películas</p>
            </div>
          </div>
        </div>

        {/* Grid de Películas */}
        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {movies.map(item => (
              <div key={item._id} className="group relative">
                <Link to={`/pelicula/${item.mediaId}`} className="block">
                  <div className="aspect-[2/3] bg-[#2c3440] rounded-[4px] border border-transparent group-hover:border-[#00e054] transition-all overflow-hidden shadow-md group-hover:shadow-lg relative">
                    <img 
                      src={item.image ? movieService.getImageUrl(item.image, 'w400') : "https://via.placeholder.com/400x600?text=No+Image"} 
                      alt={item.title || "Sin título"} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.isFavorite && (
                       <div className="absolute top-2 left-2 bg-red-500 text-white p-1 rounded-full shadow-md">
                         <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                       </div>
                    )}
                  </div>
                  <div className="mt-2 px-1">
                    <h3 className="text-white text-[13px] font-bold truncate group-hover:text-[#00e054] transition-colors">{item.title || "Sin título"}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-white/40 italic bg-[#1c2228] border border-white/5 rounded">
            Este usuario aún no ha marcado ninguna película como vista.
          </div>
        )}

      </div>
    </div>
  );
}

export default UserFilms;
