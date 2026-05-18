import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { watchlistService } from '../services/watchlistService';
import { getUserProfile } from '../services/authService';
import movieService from '../services/movieService';
import MediaCard from '../components/common/MediaCard';

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
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1060ff] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !profileUser) {
    return (
      <div className="min-h-screen bg-transparent text-white flex flex-col items-center justify-center pb-20">
        <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
        <p>{error || 'Usuario no encontrado.'}</p>
        <Link to="/inicio" className="mt-4 text-[#1060ff] hover:text-white transition-colors">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-transparent text-white min-h-screen font-['Arimo',sans-serif]">
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
                <div className="w-full h-full flex items-center justify-center text-white/40 font-normal">
                  {profileUser.name.substring(0,1).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white leading-none mb-1">Películas vistas por {profileUser.name}</h1>
              <p className="text-[12px] uppercase font-normal text-[#8b9bb4]">{movies.length} películas</p>
            </div>
          </div>
        </div>

        {/* Grid de Películas */}
        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {movies.map(item => (
              <MediaCard 
                key={item._id}
                id={item.mediaId}
                type={item.mediaType || 'movie'}
                imagePath={item.image}
                title={item.title}
                isFavorite={item.isFavorite}
                showTypeBadge={false}
                titlePosition="outside"
              />
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
