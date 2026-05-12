import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { followUser, unfollowUser } from '../../services/authService';
import { Link } from 'react-router-dom';

function ProfileHeader({ profileUser, isOwnProfile }) {
  const { user: currentUser } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser && profileUser) {
      setIsFollowing(profileUser.followers?.includes(currentUser._id));
    }
  }, [currentUser, profileUser]);

  const handleFollow = async () => {
    if (!currentUser || loading) return;
    setLoading(true);
    try {
      if (isFollowing) {
        await unfollowUser(profileUser._id);
        setIsFollowing(false);
      } else {
        await followUser(profileUser._id);
        setIsFollowing(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'Películas', value: profileUser?.filmsCount || 0 },
    { label: 'Este año', value: profileUser?.thisYearCount || 0 },
    { label: 'Listas', value: profileUser?.listsCount || 0 },
    { label: 'Siguiendo', value: profileUser?.following?.length || 0 },
    { label: 'Seguidores', value: profileUser?.followers?.length || 0 },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-white/10 bg-[#2c3440] flex items-center justify-center">
        {profileUser?.avatar ? (
          <img src={profileUser.avatar} alt={profileUser.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-3xl font-bold text-white/20">{profileUser?.name?.substring(0, 1).toUpperCase()}</span>
        )}
      </div>

      {/* Info & Stats */}
      <div className="flex-1 min-w-0 pt-2">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">{profileUser?.name}</h1>
            {!isOwnProfile && currentUser && (
              <button
                onClick={handleFollow}
                disabled={loading}
                className={`px-4 py-1 rounded text-[12px] font-bold uppercase tracking-widest transition-all ${
                  isFollowing 
                    ? 'bg-white/10 text-white/60 hover:bg-white/20' 
                    : 'bg-[#00e054] text-[#14181c] hover:bg-[#00c048]'
                }`}
              >
                {isFollowing ? 'Siguiendo' : 'Seguir'}
              </button>
            )}
            {isOwnProfile && (
              <Link to="/perfil/editar" className="text-[11px] font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors">Editar Perfil</Link>
            )}
          </div>
          
          {/* Stats bar */}
          <div className="flex gap-6 md:ml-auto">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group cursor-pointer">
                <div className="text-lg font-bold text-white group-hover:text-[#40bcf4] transition-colors">{stat.value.toLocaleString()}</div>
                <div className="text-[10px] uppercase tracking-[1.5px] text-white/30 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bio & Links */}
        <div className="space-y-2">
          <p className="text-white/60 text-[14px] leading-relaxed max-w-2xl italic">
            {profileUser?.bio || 'Este usuario aún no ha escrito una biografía.'}
          </p>
          <div className="flex flex-wrap gap-4 text-[12px] text-white/40">
            {profileUser?.location && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                {profileUser.location}
              </span>
            )}
            {profileUser?.website && (
              <a href={profileUser.website.startsWith('http') ? profileUser.website : `https://${profileUser.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>
                {profileUser.website.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
