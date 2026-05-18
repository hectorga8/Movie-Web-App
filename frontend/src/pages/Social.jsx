import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FriendActivity from '../components/index/FriendActivity';
import watchlistService from '../services/watchlistService';

function Social() {
  const { user } = useAuth();
  const [feedLists, setFeedLists] = useState([]);
  const [loadingLists, setLoadingLists] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchFeedLists = async () => {
      if (user && user.following && user.following.length > 0) {
        try {
          const data = await watchlistService.getFeedLists(user.following);
          setFeedLists(data);
        } catch (err) {
          console.error('Error fetching feed lists', err);
        }
      }
      setLoadingLists(false);
    };
    fetchFeedLists();
  }, [user]);

  return (
    <div className="min-h-screen bg-transparent text-white pt-10 pb-20">
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* Header */}
        <div className="mb-10 flex items-center gap-4">
          <Link to="/perfil" className="text-[#8b9bb4] hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <div>
            <h1 className="text-white text-[32px] font-bold leading-none mb-1">Social</h1>
            <p className="text-[13px] uppercase font-normal">Actividad de tu red</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Feed */}
          <div className="flex-1 space-y-8">
            <div className="bg-[#1c2228] border border-[#2c3440] rounded-[4px] p-6">
              <h2 className="text-white font-bold text-lg mb-2">Reseñas de amigos</h2>
              <p className="text-[14px] text-[#8b9bb4] mb-4">
                Sigue a más amigos para ver sus reseñas, likes y listas aquí mismo.
              </p>
              
              {/* Reuse the FriendActivity component logic, or just place it here */}
              <FriendActivity />
            </div>

            <div className="bg-[#1c2228] border border-[#2c3440] rounded-[4px] p-6">
              <h2 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#00e054] rounded-full"></span>
                Listas Actualizadas
              </h2>
              {loadingLists ? (
                <div className="text-center py-4 text-white/30 text-xs uppercase animate-pulse">Cargando listas...</div>
              ) : feedLists.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-sm text-white/50 mb-2">Ningún amigo ha actualizado listas recientemente.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {feedLists.map(lista => (
                    <Link to={`/listas/${lista._id || lista.id}`} key={lista._id || lista.id} className="group cursor-pointer block border border-white/5 rounded-xl p-4 hover:bg-white/[0.02] transition-colors">
                      <div className="flex -space-x-6 mb-3 overflow-hidden">
                        {(lista.posters || []).slice(0, 4).map((poster, j) => (
                          <div key={j} className="w-12 h-16 border border-[#1c2228] rounded-[2px] overflow-hidden shadow-xl transform group-hover:-translate-y-1 transition-transform relative z-[1]">
                            <img loading="lazy" src={poster ? `https://image.tmdb.org/t/p/w200${poster.image || poster}` : 'https://via.placeholder.com/200x300?text=No+Poster'} alt="" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                      <h4 className="text-[14px] font-bold text-white group-hover:text-[#1060ff] transition-colors line-clamp-1">{lista.title}</h4>
                      <p className="text-white/40 text-[11px] uppercase mt-1 font-light">Por {lista.creator || 'Usuario'} · {lista.moviesCount} items</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-[320px] shrink-0 space-y-6">
            <div className="bg-[#1c2228] border border-[#2c3440] rounded-[4px] p-5">
              <h3 className="text-white font-bold text-[14px] uppercase mb-4">Sugerencias</h3>
              <p className="text-[13px] text-[#8b9bb4] italic mb-4">Encuentra a más cinéfilos como tú.</p>
              <Link to="/miembros" className="block text-center w-full py-2 bg-[#1060ff] text-white text-[13px] font-normal uppercase rounded-[3px] hover:bg-[#2b89ff] transition-colors">
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