import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getFullProfile } from '../services/authService';
import ProfileHeader from '../components/perfil/ProfileHeader';
import ProfileNav from '../components/perfil/ProfileNav';
import FavoriteFilms from '../components/perfil/FavoriteFilms';
import RecentActivity from '../components/perfil/RecentActivity';
import ProfileSidebar from '../components/perfil/ProfileSidebar';

function Perfil() {
  const { username } = useParams();
  const { user: currentUser, loading: authLoading } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      // Si no hay username en la URL, intentamos mostrar el perfil del usuario logueado
      const targetIdentifier = username || currentUser?._id;

      if (!targetIdentifier) {
        if (!authLoading) setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // SUPER-ENDPOINT: Carga TODO en una sola petición HTTP
        const data = await getFullProfile(targetIdentifier);
        
        if (!data || !data.user) {
          throw new Error('Usuario no encontrado');
        }

        // Combinamos la info del usuario con sus estadísticas para mantener compatibilidad con los componentes hijos
        const finalProfileUser = { ...data.user, ...data.stats };
        
        setReviews(data.reviews || []);
        setProfileUser(finalProfileUser);
        setError(null);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('No se pudo encontrar el perfil de usuario solicitado.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [username, currentUser, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1060ff] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!username && !currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (error || !profileUser) {
    return (
      <div className="min-h-screen bg-transparent text-white flex flex-col items-center justify-center pb-20">
        <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
        <p>{error || 'Perfil no encontrado.'}</p>
      </div>
    );
  }

  const isOwnProfile = currentUser?._id === profileUser?._id;

  return (
    <div className="min-h-screen bg-transparent text-white pb-20">
      {/* El fondo oscuro y la estructura max-width de Letterboxd */}
      <div className="max-w-[1200px] mx-auto px-4 pt-8">
        
        {/* Header con Avatar, Stats (FILMS, THIS YEAR, LISTS, etc.) */}
        <ProfileHeader profileUser={profileUser} isOwnProfile={isOwnProfile} />

        {/* Navegación (Profile, Activity, Films, Diary, etc.) */}
        <ProfileNav profileUser={profileUser} />

        {/* Contenido Principal a dos columnas: Izquierda (65%) | Derecha (35%) */}
        <div className="flex flex-col md:flex-row gap-8 mt-6">
          
          {/* Columna Izquierda (Principal) */}
          <div className="flex-1 min-w-0">
            <FavoriteFilms profileUser={profileUser} isOwnProfile={isOwnProfile} />
            <RecentActivity profileUser={profileUser} isOwnProfile={isOwnProfile} reviews={reviews} />
          </div>

          {/* Columna Derecha (Sidebar) */}
          <aside className="w-full md:w-[280px] shrink-0">
            <ProfileSidebar profileUser={profileUser} isOwnProfile={isOwnProfile} reviews={reviews} />
          </aside>

        </div>

      </div>
    </div>
  );
}

export default Perfil;
