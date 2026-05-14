import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import watchlistService from '../services/watchlistService';
import movieService from '../services/movieService';
import { useAuth } from '../context/AuthContext';

function Watchlist() {
  const { user } = useAuth();
  const { username } = useParams(); // Puede venir de /perfil/:username/watchlist o similar
  const [filter, setFilter] = useState('all'); // 'all', 'movie', 'tv'
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        setLoading(true);
        // Obtener la watchlist completa (inWatchlist: true) del usuario logueado
        // Si estamos viendo la watchlist de otro usuario, usaríamos getUserWatchlistById(id)
        // Por ahora, usamos getUserList para el usuario actual.
        const data = await watchlistService.getUserList({ inWatchlist: 'true' });
        setSavedItems(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching watchlist', err);
        setLoading(false);
      }
    };
    
    if (user) {
      fetchWatchlist();
    }
    window.scrollTo(0, 0);
  }, [user, username]);

  // Filtrar según la pestaña seleccionada
  const filteredItems = savedItems.filter(item => {
    if (filter === 'all') return true;
    return item.mediaType === filter;
  });

  return (
    <div className="min-h-screen bg-[#111419] text-[#8b9bb4] font-sans pt-10 pb-20">
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* Header */}
        <div className="mb-10 flex items-center gap-4">
          <Link to="/perfil" className="text-[#8b9bb4] hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <div>
            <h1 className="text-white text-[32px] font-bold leading-none mb-1">Watchlist</h1>
            <p className="text-[13px] uppercase tracking-widest font-bold">Pendientes de ver</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-3 mb-8 border-b border-[#2c3440] pb-4">
          <button 
            onClick={() => setFilter('all')}
            className={`text-[13px] font-bold px-5 py-2.5 rounded-[3px] transition-colors uppercase tracking-widest ${filter === 'all' ? 'bg-[#00e054] text-white' : 'bg-[#2c3440] text-[#8b9bb4] hover:text-white hover:bg-[#445566]'}`}
          >
            Todo
          </button>
          <button 
            onClick={() => setFilter('movie')}
            className={`text-[13px] font-bold px-5 py-2.5 rounded-[3px] transition-colors uppercase tracking-widest ${filter === 'movie' ? 'bg-[#1060ff] text-white' : 'bg-[#2c3440] text-[#8b9bb4] hover:text-white hover:bg-[#445566]'}`}
          >
            Películas
          </button>
          <button 
            onClick={() => setFilter('tv')}
            className={`text-[13px] font-bold px-5 py-2.5 rounded-[3px] transition-colors uppercase tracking-widest ${filter === 'tv' ? 'bg-[#ff8000] text-white' : 'bg-[#2c3440] text-[#8b9bb4] hover:text-white hover:bg-[#445566]'}`}
          >
            Series
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-40">
            <div className="w-10 h-10 border-4 border-[#00e054]/20 border-t-[#00e054] rounded-full animate-spin"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 border border-[#2c3440] rounded-[4px] bg-[#1c2228]">
            <p className="text-[16px] text-[#8b9bb4]">No hay contenido pendiente para mostrar en esta categoría.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {filteredItems.map(item => (
              <div key={item._id} className="group relative">
                <Link to={`/${item.mediaType === 'movie' ? 'pelicula' : 'serie'}/${item.mediaId}`} className="block">
                  <div className="aspect-[2/3] bg-[#2c3440] rounded-[4px] border border-transparent group-hover:border-[#00e054] transition-all overflow-hidden shadow-md group-hover:shadow-lg relative">
                    <img 
                      src={item.image ? movieService.getImageUrl(item.image, 'w400') : "https://via.placeholder.com/400x600?text=No+Image"} 
                      alt={item.title || "Sin título"} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Indicador visual del tipo de contenido sobre la imagen */}
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">
                      {item.mediaType === 'movie' ? 'Cine' : 'TV'}
                    </div>
                  </div>
                  <div className="mt-2 px-1">
                    <h3 className="text-white text-[13px] font-bold truncate group-hover:text-[#00e054] transition-colors">{item.title || "Sin título"}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Watchlist;
