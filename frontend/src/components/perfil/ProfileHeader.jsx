import React from 'react';
import { useAuth } from '../../context/AuthContext';

function ProfileHeader() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-6 pb-6 border-b border-[#2c3440]">
      <div className="flex items-center gap-6">
        <div className="w-[100px] h-[100px] rounded-full bg-[#2c3440] border border-[#445566] overflow-hidden shrink-0 flex items-center justify-center">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Usuario'}&backgroundColor=1a1c23`} 
            alt="Avatar" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div>
          <div className="flex items-center gap-4 mb-1">
            <h1 className="text-[28px] font-bold text-white leading-none">
              {user?.name || 'Usuario'}
            </h1>
            <button className="bg-[#445566] hover:bg-[#556677] text-[#8b9bb4] hover:text-white text-[10px] font-bold px-3 py-1.5 rounded-[3px] uppercase tracking-widest transition-colors">
              Edit Profile
            </button>
            <button className="w-8 h-[26px] bg-[#445566] hover:bg-[#556677] text-[#8b9bb4] hover:text-white rounded-[3px] flex items-center justify-center transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="5" cy="12" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="19" cy="12" r="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-6 md:mt-0 text-center">
        <div className="flex flex-col items-center group cursor-pointer">
          <span className="text-[22px] font-bold text-white group-hover:text-[#1060ff] transition-colors leading-none">0</span>
          <span className="text-[10px] text-[#8b9bb4] uppercase tracking-widest mt-1">Films</span>
        </div>
        <div className="w-[1px] h-8 bg-[#2c3440]"></div>
        <div className="flex flex-col items-center group cursor-pointer">
          <span className="text-[22px] font-bold text-white group-hover:text-[#1060ff] transition-colors leading-none">0</span>
          <span className="text-[10px] text-[#8b9bb4] uppercase tracking-widest mt-1">Following</span>
        </div>
        <div className="w-[1px] h-8 bg-[#2c3440]"></div>
        <div className="flex flex-col items-center group cursor-pointer">
          <span className="text-[22px] font-bold text-white group-hover:text-[#1060ff] transition-colors leading-none">0</span>
          <span className="text-[10px] text-[#8b9bb4] uppercase tracking-widest mt-1">Followers</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;