import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieSearchAutocomplete from '../components/listas/MovieSearchAutocomplete';
import watchlistService from '../services/watchlistService';
import { useAuth } from '../context/AuthContext';

// Iconos SVG internos para estética exacta
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#445566" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hover:stroke-red-400 transition-colors">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const DotsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#445566">
    <circle cx="9" cy="5" r="1" />
    <circle cx="9" cy="12" r="1" />
    <circle cx="9" cy="19" r="1" />
    <circle cx="15" cy="5" r="1" />
    <circle cx="15" cy="12" r="1" />
    <circle cx="15" cy="19" r="1" />
  </svg>
);

const CrearLista = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tags: '',
    isPublic: true,
    isRanked: false
  });
  const [movies, setMovies] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectMovie = (movie) => {
    if (movies.find(m => m.movieId === movie.id)) return;
    
    setMovies(prev => [...prev, {
      movieId: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date
    }]);
  };

  const removeMovie = (id) => {
    setMovies(prev => prev.filter(m => m.movieId !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return;
    
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        movies
      };
      const response = await watchlistService.createList(payload);
      if (response && response._id) {
        navigate(`/listas/${response._id}`);
      }
    } catch (error) {
      console.error('Error creating list:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#14181c] text-[#8b9bb4] font-sans pb-20">
      <div className="max-w-[1200px] mx-auto px-6 py-10">
        <h1 className="text-white text-2xl font-serif mb-6 border-b border-[#2c3440] pb-2 uppercase tracking-wide">New List</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-10">
            {/* Columna Izquierda */}
            <div className="space-y-6">
              <div>
                <label className="block text-white text-[13px] font-bold mb-2 flex items-center gap-1">
                  <span className="text-[#00e054]">•</span> Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#2c3440] border border-[#2c3440] rounded-[3px] px-3 py-2 text-white focus:outline-none focus:bg-[#445566] transition-colors"
                />
              </div>

              <div>
                <label className="block text-white text-[13px] font-bold mb-2">
                  Tags <span className="text-[11px] font-normal text-[#8b9bb4] ml-2">Press Tab to complete, Enter to create</span>
                </label>
                <input
                  type="text"
                  name="tags"
                  placeholder="eg. top 10"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full bg-[#2c3440] border border-[#2c3440] rounded-[3px] px-3 py-2 text-white focus:outline-none focus:bg-[#445566] transition-colors"
                />
              </div>

              <div className="relative">
                <label className="block text-white text-[13px] font-bold mb-2 flex items-center gap-1">
                  Who can view <span className="text-[#8b9bb4] bg-[#445566] rounded-full w-4 h-4 flex items-center justify-center text-[10px] cursor-help">?</span>
                </label>
                <select
                  name="isPublic"
                  value={formData.isPublic}
                  onChange={handleChange}
                  className="w-full bg-[#2c3440] border border-[#2c3440] rounded-[3px] px-3 py-2 text-white focus:outline-none focus:bg-[#445566] transition-colors appearance-none cursor-pointer"
                >
                  <option value={true}>Anyone — Public list</option>
                  <option value={false}>Only you — Private list</option>
                </select>
                <div className="absolute right-3 top-[38px] pointer-events-none">
                   <svg className="w-4 h-4 text-[#8b9bb4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isRanked"
                  name="isRanked"
                  checked={formData.isRanked}
                  onChange={handleChange}
                  className="w-4 h-4 rounded bg-[#2c3440] border-[#445566] text-[#00e054] focus:ring-0 focus:ring-offset-0"
                />
                <label htmlFor="isRanked" className="text-white text-[13px] font-bold">
                  Ranked list <span className="text-[11px] font-normal text-[#8b9bb4] ml-2">Show position for each film.</span>
                </label>
              </div>
            </div>

            {/* Columna Derecha */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-white text-[13px] font-bold">Description</label>
                <span className="text-[11px] text-[#8b9bb4] hover:text-white cursor-pointer">Show supported HTML</span>
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full h-[220px] bg-[#2c3440] border border-[#2c3440] rounded-[3px] px-3 py-2 text-white focus:outline-none focus:bg-[#445566] transition-colors resize-none"
              ></textarea>
            </div>
          </div>

          {/* Buscador de Películas */}
          <div className="pt-6 border-t border-[#2c3440]">
            <div className="flex items-center gap-0 mb-6">
              <div className="flex items-center bg-[#00e054] text-black font-bold text-[11px] px-3 py-2 rounded-l-[3px] h-[36px] uppercase tracking-wider whitespace-nowrap">
                Add a film
              </div>
              <MovieSearchAutocomplete onSelect={handleSelectMovie} />
              <div className="flex items-center px-4 text-[#8b9bb4] text-[13px]">or</div>
              <button type="button" className="bg-[#445566] hover:bg-[#556677] text-white text-[11px] font-bold px-4 py-2 rounded-[3px] h-[36px] uppercase tracking-wider transition-colors">
                Import
              </button>
            </div>

            {/* Lista de Películas Añadidas (Rediseñada según la imagen) */}
            <div className="bg-[#1b2228] border border-white/5 rounded-[3px] overflow-hidden">
              {movies.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[300px] text-center p-10">
                  <p className="text-white text-lg font-bold mb-2">Your list is empty.</p>
                  <p className="text-[#8b9bb4] text-sm">Add films using the field above, or from the links on a film poster or page.</p>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {movies.map((movie, index) => (
                    <div key={movie.movieId} className="flex items-center p-3 hover:bg-[#242c34] transition-colors group">
                      {/* Poster */}
                      <img 
                        src={`https://image.tmdb.org/t/p/w92${movie.posterPath}`} 
                        alt="" 
                        className="w-[35px] h-[52px] object-cover rounded-sm border border-white/10"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/92x138?text=?'; }}
                      />
                      
                      {/* Info y Botón ADD NOTE */}
                      <div className="flex-1 ml-4">
                        <div className="flex items-baseline gap-2 mb-1">
                          <h3 className="text-white font-serif text-[19px] font-bold leading-none">{movie.title}</h3>
                          <span className="text-[#8b9bb4] font-sans text-[16px]">
                            {movie.releaseDate ? movie.releaseDate.split('-')[0] : 'N/A'}
                          </span>
                        </div>
                        <button type="button" className="bg-[#2c3440]/50 border border-white/5 text-[10px] font-bold text-[#8b9bb4] px-2 py-1 rounded-[2px] uppercase tracking-widest hover:bg-[#445566] hover:text-white transition-all">
                          Add Note
                        </button>
                      </div>

                      {/* Controles Derecha */}
                      <div className="flex items-center h-full">
                        <div className="px-4 border-r border-white/5 h-full flex items-center">
                          <button 
                            type="button"
                            onClick={() => removeMovie(movie.movieId)}
                            className="p-1 cursor-pointer"
                            title="Remove from list"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                        <div className="px-3 flex items-center cursor-move">
                           <DotsIcon />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex justify-end gap-3 pt-6 border-t border-[#2c3440]">
            <button
              type="button"
              onClick={() => navigate('/listas')}
              className="bg-[#445566] hover:bg-[#556677] text-[#8b9bb4] hover:text-white font-bold text-[12px] px-6 py-2 rounded-[3px] uppercase tracking-widest transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.name}
              className={`bg-[#00e054] hover:bg-[#00c048] text-black font-bold text-[12px] px-6 py-2 rounded-[3px] uppercase tracking-widest transition-colors ${
                (isSubmitting || !formData.name) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearLista;
