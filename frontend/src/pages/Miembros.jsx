import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSortedMembers, fillMembersArray } from '../services/membersService';
import FollowButton from '../components/common/FollowButton';

// Componente para la Tarjeta de Usuario Destacado / Popular
const TopUserCard = ({ user }) => {
  const avatarLetter = (user.username || 'U')[0].toUpperCase();
  const recentReviews = user.recentReviews || [];
  
  // Asegurarnos de que haya 4 huecos para posters (si no tiene suficientes, mostramos cajas vacías)
  const posters = [...recentReviews, null, null, null, null].slice(0, 4);

  return (
    <div className="flex flex-col items-center group">
      {/* Avatar */}
      <div className="relative mb-3">
        <Link to={`/perfil/${user._id}`}>
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-tr from-[#14181c] to-[#2c3440] border-2 border-transparent group-hover:border-[#00e054] transition-all flex items-center justify-center shadow-xl overflow-hidden">
            {user.avatar ? (
              <img loading="lazy" src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-4xl font-normal">{avatarLetter}</span>
            )}
          </div>
        </Link>
        {/* Botón de seguir (+) */}
        <FollowButton targetUserId={user._id} className="absolute bottom-0 right-0 w-7 h-7 bg-[#2c3440] border border-[#445566] text-[#8aa8c2] hover:bg-[#fff] hover:text-[#14181c] rounded-full flex items-center justify-center font-bold text-lg shadow-lg transition-colors cursor-pointer z-10 pb-0.5" />
      </div>
      
      {/* Info */}
      <Link to={`/perfil/${user._id}`} className="text-white font-normal text-[15px] md:text-[16px] mb-1 hover:text-[#40bcf4] transition-colors truncate w-full text-center">
        {user.username}
      </Link>
      <div className="text-[#8aa8c2] text-[11px] mb-3 uppercase font-light flex items-center gap-1">
        <span>{user.reviewCount || 0} reseñas</span>
        <span className="opacity-50">•</span>
        <span>{user.totalLikes || 0} likes</span>
      </div>

      {/* Posters Recientes */}
      <div className="flex -space-x-[1px]">
        {posters.map((review, i) => (
          <Link key={i} to={review ? `/movie/${review.mediaId}` : '#'} className="w-10 h-14 md:w-12 md:h-16 rounded-[2px] border border-[#445566] overflow-hidden hover:border-white transition-colors relative z-0 hover:z-10 bg-[#1c2228]">
            {review?.mediaPoster ? (
              <img loading="lazy" 
                src={`https://image.tmdb.org/t/p/w200${review.mediaPoster}`} 
                alt="Poster" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-[20%] h-full bg-white/5 skew-x-12"></div>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

// Componente para los usuarios en formato de lista
const ListItemUser = ({ user }) => {
  const avatarLetter = (user.username || 'U')[0].toUpperCase();

  return (
    <div className="flex items-center justify-between py-3 border-b border-[#2c3440] group">
      <div className="flex items-center gap-4">
        {/* Avatar pequeño */}
        <Link to={`/perfil/${user._id}`}>
          <div className="w-10 h-10 rounded-full bg-[#1c2228] border border-[#445566] group-hover:border-[#40bcf4] transition-colors flex items-center justify-center overflow-hidden">
            {user.avatar ? (
              <img loading="lazy" src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
            ) : (
              <span className="text-[#8aa8c2] text-lg font-normal">{avatarLetter}</span>
            )}
          </div>
        </Link>
        {/* Info */}
        <div className="flex flex-col">
          <Link to={`/perfil/${user._id}`} className="text-white font-normal text-[14px] hover:text-[#40bcf4] transition-colors">
            {user.username}
          </Link>
          <span className="text-[#8aa8c2] text-[11px] font-light">
            {user.reviewCount || 0} reseñas
          </span>
        </div>
      </div>
      
      {/* Estadísticas Derecha & Seguir */}
      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-4 text-[#8aa8c2] text-[12px] font-light">
          <span className="flex items-center gap-1.5"><span className="text-[#00e054]">👁</span> {user.totalWatched || 0}</span>
          <span className="flex items-center gap-1.5"><span className="text-[#40bcf4]">☷</span> {user.totalLists || 0}</span>
          <span className="flex items-center gap-1.5"><span className="text-[#ff8000]">❤</span> {user.totalLikes || 0}</span>
        </div>
        <FollowButton targetUserId={user._id} />
      </div>
    </div>
  );
};

function Miembros() {
  const [reviewers, setReviewers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviewers = async () => {
      try {
        const data = await getSortedMembers();
        // Generamos al menos 20 usuarios (repitiendo si es necesario) para replicar la UI
        const filledData = fillMembersArray(data, 20);
        setReviewers(filledData);
      } catch (error) {
        console.error("Error fetching popular reviewers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviewers();
  }, []);

  // Al ampliar el max-width, en desktop entran 5 tarjetas cómodamente
  const featuredMembers = reviewers.slice(0, 5);
  const popularMembers = reviewers.slice(5, 10);
  const otherMembers = reviewers.slice(10, 20);

  return (
    <div className="min-h-screen bg-transparent pb-20 pt-8">
      
      {/* Título Principal */}
      <div className="max-w-[1200px] mx-auto px-4 text-center mb-12">
        <h1 className="text-[#8aa8c2] text-[18px] md:text-[22px] font-light">
          Amantes del cine, críticos y amigos — encuentra miembros populares.
        </h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-4">
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-2 border-[#1060ff] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* SECCIÓN 1: MIEMBROS DESTACADOS */}
            <section className="mb-14">
              <div className="flex items-center mb-6">
                <h2 className="text-[#9ab] text-[12px] uppercase whitespace-nowrap">Miembros Destacados</h2>
                <div className="h-[1px] bg-[#2c3440] w-full ml-4"></div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-4">
                {featuredMembers.map(user => (
                  <TopUserCard key={user.uniqueKey} user={user} />
                ))}
              </div>
            </section>

            {/* SECCIÓN 2: POPULARES ESTA SEMANA */}
            <section className="mb-14">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[#9ab] text-[12px] uppercase whitespace-nowrap">Populares esta semana</h2>
                <div className="h-[1px] bg-[#2c3440] flex-1 mx-4"></div>
                <Link to="/miembros/populares" className="text-[#9ab] text-[11px] uppercase hover:text-white transition-colors">Más</Link>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-4">
                {popularMembers.map(user => (
                  <TopUserCard key={user.uniqueKey} user={user} />
                ))}
              </div>
            </section>

            {/* SECCIÓN 3: LISTA DE OTROS MIEMBROS */}
            <section className="mb-14">
              <div className="flex items-center mb-4">
                <h2 className="text-[#9ab] text-[12px] uppercase whitespace-nowrap">Todos los miembros</h2>
                <div className="h-[1px] bg-[#2c3440] w-full ml-4"></div>
              </div>

              <div className="flex flex-col">
                {otherMembers.map(user => (
                  <ListItemUser key={user.uniqueKey} user={user} />
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <Link to="/miembros/populares" className="bg-[#2c3440] hover:bg-[#445566] text-[#8aa8c2] hover:text-white transition-colors border border-[#445566] rounded-[3px] py-2 px-12 text-[13px] font-normal uppercase inline-block">
                  Ver más
                </Link>
              </div>
            </section>
          </>
        )}

      </div>
    </div>
  );
}

export default Miembros;
