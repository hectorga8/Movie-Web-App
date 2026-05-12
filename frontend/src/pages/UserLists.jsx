import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getUserProfile } from '../services/authService';
import watchlistService from '../services/watchlistService';
import { ListCard } from '../components/listas/ListCard';

function UserLists() {
  const { username } = useParams();
  const [lists, setLists] = useState([]);
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
          const userListsData = await watchlistService.getUserCustomLists(userProfile._id);
          setLists(userListsData);
        }
      } catch (err) {
        console.error('Error fetching user lists:', err);
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
      <div className="min-h-screen bg-[#14181c] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1060ff] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !profileUser) {
    return (
      <div className="min-h-screen bg-[#14181c] text-[#8b9bb4] flex flex-col items-center justify-center pb-20">
        <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
        <p>{error || 'Usuario no encontrado.'}</p>
        <Link to="/inicio" className="mt-4 text-[#1060ff] hover:text-white transition-colors">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#14181c] text-white min-h-screen font-['Inter',sans-serif]">
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
              <h1 className="text-2xl font-bold text-white leading-none mb-1">Listas de {profileUser.name}</h1>
              <p className="text-[12px] uppercase tracking-[1px] font-bold text-[#8b9bb4]">{lists.length} listas creadas</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          {lists.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12">
              {lists.map(list => (
                <ListCard key={list.id} list={list} showAvatar={false} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-white/40 italic bg-[#1c2228] border border-white/5 rounded">
              Este usuario aún no ha creado ninguna lista pública.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default UserLists;