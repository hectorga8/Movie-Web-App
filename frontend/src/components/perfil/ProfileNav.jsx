import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function ProfileNav() {
  const location = useLocation();
  
  const navItems = [
    { name: 'Profile', path: '/perfil' },
    { name: 'Activity', path: '/perfil/activity' },
    { name: 'Films', path: '/perfil/films' },
    { name: 'Diary', path: '/perfil/diary' },
    { name: 'Reviews', path: '/perfil/reviews' },
    { name: 'Watchlist', path: '/perfil/watchlist' },
    { name: 'Lists', path: '/listas' }, 
    { name: 'Likes', path: '/perfil/likes' },
    { name: 'Tags', path: '/perfil/tags' },
    { name: 'Network', path: '/perfil/network' },
  ];

  return (
    <div className="flex items-center justify-between border-b border-[#2c3440] mb-10 overflow-x-auto no-scrollbar 
    relative bg-[#1c2228] px-4 rounded-[4px]">
      <nav className="flex items-center gap-5 mx-auto md:mx-0">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`text-[13px] py-2.5 border-b-2 transition-colors whitespace-nowrap mt-[2px] ${
                isActive 
                  ? 'text-white border-[#00e054] font-bold' 
                  : 'text-[#8b9bb4] border-transparent hover:text-white hover:border-white/30'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
      {/* Iconos a la derecha */}
      <div className="hidden md:flex items-center gap-4 ml-auto text-[#8b9bb4]">
        <button className="hover:text-white transition-colors" title="Search profile">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
        <button className="hover:text-[#ff8000] transition-colors" title="RSS Feed">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4 11a9 9 0 019 9h-2a7 7 0 00-7-7v-2zm0 4a5 5 0 015 5h-2a3 3 0 00-3-3v-2zm2 5a2 2 0 11-4 0 2 2 0 014 0zM4 4a16 16 0 0116 16h-2A14 14 0 004 6V4z" /></svg>
        </button>
      </div>
    </div>
  );
}

export default ProfileNav;