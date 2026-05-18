import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function ProfileNav({ profileUser }) {
  const location = useLocation();
  const baseUrl = `/perfil/${profileUser?.name}`;

  const navItems = [
    { label: 'Perfil', path: baseUrl },
    { label: 'Actividad', path: '/social' },
    { label: 'Películas', path: `${baseUrl}/films` },
    { label: 'Diario', path: `${baseUrl}/diary` },
    { label: 'Reseñas', path: `${baseUrl}/reviews` },
    { label: 'Pendientes', path: `${baseUrl}/watchlist` },
    { label: 'Listas', path: `${baseUrl}/lists` },
    { label: 'Me Gusta', path: `${baseUrl}/likes` },
    { label: 'Red', path: `${baseUrl}/network` },
  ];

  return (
    <nav className="border-y border-white/10 mb-6 overflow-x-auto no-scrollbar">
      <ul className="flex">
        {navItems.map((item, i) => {
          const isActive = location.pathname === item.path || 
                           (item.label === 'Perfil' && (location.pathname === baseUrl || location.pathname === '/perfil'));
          return (
            <li key={i}>
              <Link 
                to={item.path}
                className={`block px-4 py-3 text-[12px] font-normal uppercase transition-colors whitespace-nowrap ${ isActive ? 'text-white border-b-2 border-[#40bcf4]' : 'text-white/40 hover:text-white' }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default ProfileNav;
