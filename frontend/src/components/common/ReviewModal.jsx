import { useState } from 'react';
import { createOrUpdateReview } from '../../services/reviewService';
import { useAuth } from '../../context/AuthContext';
import { X, Heart } from 'lucide-react'; 

function ReviewModal({ media, mediaType, onClose }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [watchedOn, setWatchedOn] = useState(new Date().toISOString().split('T')[0]); // Formato YYYY-MM-DD
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const year = media.release_date ? media.release_date.split('-')[0] : (media.first_air_date ? media.first_air_date.split('-')[0] : '');
  const posterUrl = media.poster_path ? `https://image.tmdb.org/t/p/w500${media.poster_path}` : '';
  const title = media.title || media.name;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('Debes iniciar sesión para escribir una reseña.');
      return;
    }
    if (rating === 0) {
      setError('Por favor, selecciona una puntuación.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await createOrUpdateReview({
        mediaId: media.id,
        mediaType,
        mediaTitle: title,
        mediaPoster: media.poster_path,
        mediaYear: year,
        rating,
        reviewText,
        watchedOn,
        liked: isLiked,
        username: user?.name || user?.username || 'Usuario'
      });
      onClose(); // Cerrar al terminar
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#111419] border border-white/10 max-w-4xl w-full rounded-[8px] shadow-2xl overflow-hidden relative flex flex-col md:flex-row">
        
        {/* Botón Cerrar */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-white/40 hover:text-white transition-colors cursor-pointer">
          <X className="w-6 h-6" />
        </button>

        {/* Izquierda: Portada */}
        <div className="w-full md:w-1/3 bg-[#111419] border-r border-white/10 p-6 flex items-center justify-center relative">
          {posterUrl ? (
            <div className="relative w-[180px] md:w-full max-w-[240px]">
              <img 
                src={posterUrl} 
                alt={`Portada de ${title}`} 
                className="w-full rounded-[4px] shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-white/10"
              />
            </div>
          ) : (
            <div className="w-full aspect-[2/3] bg-white/5 border border-white/10 border-dashed rounded-[4px] flex items-center justify-center shadow-md">
              <span className="text-white/40 text-sm font-bold uppercase tracking-widest">Sin póster</span>
            </div>
          )}
        </div>

        {/* Derecha/Centro: Formulario */}
        <div className="w-full md:w-2/3 p-8 flex flex-col">
          <div className="mb-6 border-b border-white/10 pb-4">
            <h2 className="text-3xl font-brand text-white flex items-baseline gap-3 tracking-tighter">
              {title} <span className="text-xl text-white/40 font-normal font-sans">{year}</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-5">
            {/* Visto en */}
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-[2px] mb-2">Visto en</label>
              <input 
                type="date" 
                value={watchedOn}
                onChange={(e) => setWatchedOn(e.target.value)}
                className="px-4 py-2 bg-[#2c3440] border border-white/10 rounded-[4px] text-white focus:outline-none focus:border-[#1060ff] transition-colors w-max [color-scheme:dark]"
              />
            </div>

            {/* Texto de la Review */}
            <div className="flex flex-col flex-1">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-[2px] mb-2">Escribe tu reseña</label>
              <textarea 
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="¿Qué te pareció?"
                className="flex-1 px-4 py-3 bg-[#2c3440] border border-white/10 rounded-[4px] text-white placeholder-white/20 focus:outline-none focus:border-[#1060ff] transition-colors resize-none min-h-[150px]"
                required
              />
            </div>

            {/* Puntuación y Like */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-[2px] mb-2">Puntuación</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      type="button"
                      className={`text-3xl transition-colors cursor-pointer ${star <= (hoverRating || rating) ? "text-[#00e054]" : "text-white/10"}`}
                      onClick={() => setRating(star)} 
                      onMouseEnter={() => setHoverRating(star)} 
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  type="button"
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer border ${isLiked ? 'text-red-500 border-red-500/30 bg-red-500/10' : 'text-white/20 border-transparent hover:text-white/60 hover:bg-white/5'}`}
                  title="Me gusta"
                >
                  <Heart className={`w-7 h-7 ${isLiked ? 'fill-current' : ''}`} />
                </button>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="px-6 py-3 bg-[#1060ff] hover:bg-[#1060ff]/80 text-white text-[12px] font-bold uppercase tracking-[2px] rounded-[4px] shadow-lg transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Guardando...' : 'Guardar Reseña'}
                </button>
              </div>
            </div>
            
            {error && <p className="text-red-500 text-[13px] font-bold mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;