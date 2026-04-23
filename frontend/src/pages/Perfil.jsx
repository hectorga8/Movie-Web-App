import React from 'react';
import ProfileHeader from '../components/perfil/ProfileHeader';
import ProfileNav from '../components/perfil/ProfileNav';
import FavoriteFilms from '../components/perfil/FavoriteFilms';
import RecentActivity from '../components/perfil/RecentActivity';
import ProfileSidebar from '../components/perfil/ProfileSidebar';

function Perfil() {
  return (
    <div className="min-h-screen bg-[#14181c] text-[#8b9bb4] font-sans pt-10 pb-20">
      <div className="max-w-[950px] mx-auto px-6">
        
        {/* Header con Avatar y Stats */}
        <ProfileHeader />

        {/* Navegación (Tabs) */}
        <ProfileNav />

        {/* Contenido Principal a dos columnas */}
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* Columna Izquierda (Principal) */}
          <div className="flex-1">
            <FavoriteFilms />
            <RecentActivity />
          </div>

          {/* Columna Derecha (Sidebar) */}
          <aside className="w-full md:w-[300px] shrink-0">
            <ProfileSidebar />
          </aside>

        </div>

      </div>
    </div>
  );
}

export default Perfil;