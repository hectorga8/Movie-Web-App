import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function ProfileHeader() {
  const { user } = useAuth();

  const favoriteFilmsCount = user?.favoriteMovies?.length || 0;
  const followingCount = user?.following?.length || 0;
  const followersCount = user?.followers?.length || 0;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-6 pb-6 border-b border-[#2c3440] gap-6 md:gap-0">
      {/* Left Side: Avatar + Name + Edit Button */}
      <div className="flex items-center gap-6">
        <div className="w-[100px] h-[100px] rounded-full bg-[#2c3440] border border-[#445566] overflow-hidden shrink-0 flex items-center justify-center">
          <img 
            src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Usuario'}&backgroundColor=1a1c23`} 
            alt="Avatar" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-[28px] font-bold text-white leading-none m-0">
            {user?.name || 'Usuario'}
          </h1>
          <Link 
            to="/perfil/editar" 
            className="bg-[#445566] hover:bg-[#556677] text-[#8b9bb4] hover:text-white text-[10px] font-bold px-3 py-1.5 rounded-[3px] uppercase tracking-widest transition-colors inline-block text-center"
          >
            Editar Perfil
          </Link>
        </div>
      </div>

      {/* Right Side: Stats aligned vertically with the name (items-center) */}
      <div className="flex items-center gap-6 text-center">
        <div className="flex flex-col items-center group cursor-pointer">
          <span className="text-[22px] font-bold text-white group-hover:text-[#1060ff] transition-colors leading-none">{favoriteFilmsCount}</span>
          <span className="text-[10px] text-[#8b9bb4] uppercase tracking-widest mt-1">Películas</span>
        </div>
        <div className="w-[1px] h-8 bg-[#2c3440]"></div>
        <div className="flex flex-col items-center group cursor-pointer">
          <span className="text-[22px] font-bold text-white group-hover:text-[#1060ff] transition-colors leading-none">{followingCount}</span>
          <span className="text-[10px] text-[#8b9bb4] uppercase tracking-widest mt-1">Siguiendo</span>
        </div>
        <div className="w-[1px] h-8 bg-[#2c3440]"></div>
        <div className="flex flex-col items-center group cursor-pointer">
          <span className="text-[22px] font-bold text-white group-hover:text-[#1060ff] transition-colors leading-none">{followersCount}</span>
          <span className="text-[10px] text-[#8b9bb4] uppercase tracking-widest mt-1">Seguidores</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;