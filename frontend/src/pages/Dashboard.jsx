import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import watchlistService from '../services/watchlistService';
import movieService from '../services/movieService';
import MediaCard from '../components/common/MediaCard';

function Dashboard() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all'); // 'all', 'movie', 'tv'
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        setLoading(true);
        const data = await watchlistService.getUserList({ status: 'watched' });
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
  }, [user]);

  // Filtrar según la pestaña seleccionada
  const filteredItems = savedItems.filter(item => {
    if (filter === 'all') return true;
    return item.mediaType === filter;
  });

  return (
    <div className="min-h-screen bg-transparent text-[#8b9bb4] font-sans pt-10 pb-20">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-white text-[32px] font-bold mb-2">Mi Videoteca</h1>
          <p className="text-[14px]">Aquí están todas las películas y series que has guardado, <strong className="text-white">{user?.name?.split(' ')[0] || 'Usuario'}</strong>.</p>
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

        {/* Grid de Cards */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-4 border-[#00e054]/20 border-t-[#00e054] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[14px] text-[#8b9bb4] uppercase tracking-widest font-bold">Cargando tu videoteca...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 border border-[#2c3440] rounded-[4px] bg-[#1c2228]">
            <p className="text-[16px] text-[#8b9bb4]">No hay contenido para mostrar en esta categoría.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {filteredItems.map(item => (
              <MediaCard 
                key={item._id}
                id={item.mediaId}
                type={item.mediaType}
                imagePath={item.image}
                title={item.title}
                isFavorite={item.isFavorite}
                showTypeBadge={true}
                titlePosition="outside"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

