import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FriendActivity from '../components/index/FriendActivity';

function Social() {
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#14181c] text-[#8b9bb4] font-sans pt-10 pb-20">
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* Header */}
        <div className="mb-10 flex items-center gap-4">
          <Link to="/perfil" className="text-[#8b9bb4] hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <div>
            <h1 className="text-white text-[32px] font-bold leading-none mb-1">Social</h1>
            <p className="text-[13px] uppercase tracking-widest font-bold">Actividad de tu red</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Feed */}
          <div className="flex-1">
            <div className="bg-[#1c2228] border border-[#2c3440] rounded-[4px] p-6 mb-8">
              <h2 className="text-white font-bold text-lg mb-2">Tu Feed</h2>
              <p className="text-[14px] text-[#8b9bb4] mb-4">
                Sigue a más amigos para ver sus reseñas, likes y listas aquí mismo.
              </p>
              
              {/* Reuse the FriendActivity component logic, or just place it here */}
              <FriendActivity />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-[320px] shrink-0 space-y-6">
            <div className="bg-[#1c2228] border border-[#2c3440] rounded-[4px] p-5">
              <h3 className="text-white font-bold text-[14px] uppercase tracking-widest mb-4">Sugerencias</h3>
              <p className="text-[13px] text-[#8b9bb4] italic mb-4">Encuentra a más cinéfilos como tú.</p>
              <Link to="/miembros" className="block text-center w-full py-2 bg-[#1060ff] text-white text-[13px] font-bold uppercase tracking-widest rounded-[3px] hover:bg-[#2b89ff] transition-colors">
                Explorar Miembros
              </Link>
            </div>
          </aside>
        </div>

      </div>
    </div>
  );
}

export default Social;