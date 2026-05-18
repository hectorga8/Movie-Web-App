import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSortedMembers, fillMembersArray } from '../services/membersService';

function MembersList() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getSortedMembers();
        const filledData = fillMembersArray(data, 20);
        setMembers(filledData);
      } catch (error) {
        console.error("Error fetching popular reviewers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const popularMembersList = members; 
  const popularReviewersSidebar = members.slice(0, 5); 

  return (
    <div className="min-h-screen bg-transparent pb-24 pt-12 text-white">
      
      {/* Cabecera */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Link to="/miembros" className="text-[#1060ff] text-sm hover:underline mb-2 inline-block">← Volver a Comunidad</Link>
            <h1 className="text-3xl md:text-4xl font-bold">Ranking Semanal</h1>
            <p className="text-white/50 mt-2 font-light">Los miembros más activos de los últimos 7 días.</p>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-12">
        
        {/* COLUMNA IZQUIERDA: Tabla Minimalista */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-8 h-8 border-2 border-[#1060ff] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="flex flex-col">
              {/* Header Tabla */}
              <div className="flex text-[12px] uppercase font-normal text-white/40 border-b border-white/10 pb-4 mb-2 px-4">
                <div className="flex-1">Usuario</div>
                <div className="w-[100px] text-right hidden sm:block">Vistos</div>
                <div className="w-[100px] text-right hidden sm:block">Listas</div>
                <div className="w-[100px] text-right hidden sm:block">Likes</div>
                <div className="w-[100px]"></div>
              </div>

              {/* Filas */}
              {popularMembersList.map((user, i) => (
                <div key={user.uniqueKey} className="flex items-center py-4 px-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors rounded-xl -mx-4">
                  <div className="flex-1 flex items-center gap-4">
                    <span className="text-white/20 font-normal w-4 text-right shrink-0">{i + 1}</span>
                    <Link to={`/perfil/${user._id}`} className="shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[#1060ff]/10 border border-[#1060ff]/20 text-[#1060ff] flex items-center justify-center font-normal overflow-hidden">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                        ) : (
                          (user.username || 'U')[0].toUpperCase()
                        )}
                      </div>
                    </Link>
                    <div className="flex flex-col min-w-0">
                      <Link to={`/perfil/${user._id}`} className="text-white font-medium text-[15px] hover:text-[#1060ff] transition-colors truncate flex items-center gap-2">
                        {user.username}
                        {i === 0 && <span className="text-[10px] bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-full font-normal">#1</span>}
                      </Link>
                      <span className="text-white/40 text-[12px] font-light truncate">{user.reviewCount || 0} reseñas totales</span>
                    </div>
                  </div>
                  
                  <div className="w-[100px] text-right hidden sm:block text-[14px] font-light text-white/70">
                    {user.totalWatched || 0}
                  </div>
                  <div className="w-[100px] text-right hidden sm:block text-[14px] font-light text-white/70">
                    {user.totalLists || 0}
                  </div>
                  <div className="w-[100px] text-right hidden sm:block text-[14px] font-light text-white/70">
                    {user.totalLikes || 0}
                  </div>
                  <div className="w-[100px] flex justify-end">
                    <button className="text-[12px] font-medium text-[#1060ff] bg-[#1060ff]/10 hover:bg-[#1060ff]/20 px-5 py-2 rounded-full transition-colors">
                      Seguir
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Paginación */}
              <div className="flex justify-between items-center mt-8 pt-4">
                <button className="bg-white/5 text-white/40 px-6 py-2 rounded-full text-[13px] font-medium cursor-not-allowed">Anterior</button>
                <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full text-[13px] font-medium transition-colors">Siguiente</button>
              </div>
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA: Sidebar */}
        <div className="w-full lg:w-[320px] shrink-0">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 sticky top-28">
            <h2 className="text-[16px] font-bold text-white mb-6">Top Reseñadores Históricos</h2>
            <div className="flex flex-col gap-6">
              {popularReviewersSidebar.map((user, i) => (
                <div key={user.uniqueKey} className="flex items-center gap-4 group">
                  <Link to={`/perfil/${user._id}`} className="shrink-0">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/70 font-normal group-hover:bg-[#1060ff] group-hover:text-white transition-colors overflow-hidden">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                      ) : (
                        (user.username || 'U')[0].toUpperCase()
                      )}
                    </div>
                  </Link>
                  <div className="flex flex-col flex-1 min-w-0">
                    <Link to={`/perfil/${user._id}`} className="text-white font-medium text-[14px] hover:text-[#1060ff] transition-colors truncate">
                      {user.username}
                    </Link>
                    <span className="text-white/40 text-[12px] font-light truncate">
                      {user.totalWatched || 0} películas, {user.reviewCount || 0} reseñas
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default MembersList;