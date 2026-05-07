import { useState } from 'react';
import { createOrUpdateReview } from '../../services/reviewService';
import { useAuth } from '../../context/AuthContext';
import { X, Heart } from 'lucide-react'; // Asumiendo lucide-react para iconos

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
        liked: isLiked // Si queremos guardar que le dio like en la review misma, aunque el backend tiene likedBy, mejor añadir "isLiked" a la review si fuera necesario, pero el esquema actual de Review no tiene "isLiked" del user a la peli, tiene likes a la review. Pero adaptemos esto: guardaremos un "like" de la pelicula si hace falta. Para simplificar, la "review" guardará rating y texto. Si quieres que el usuario "añada a favoritos" es otra cosa, pero dejemos el like visual como se pidio, y lo podemos mandar aunque el back no lo use (o modificar el back luego). Modificaremos el back para incluir "mediaLiked".
      });
      onClose(); // Cerrar al terminar
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#FAF8F5] max-w-4xl w-full rounded-2xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row">
        
        {/* Botón Cerrar */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-800 transition-colors">
          <X className="w-6 h-6" />
        </button>

        {/* Izquierda: Portada */}
        <div className="w-full md:w-1/3 bg-[#E8E6DF] p-6 flex items-center justify-center relative group">
          {posterUrl ? (
            <div className="relative">
              <img 
                src={posterUrl} 
                alt={`Portada de ${title}`} 
                className="w-full rounded-lg shadow-md transition-all duration-300 group-hover:shadow-[0_0_15px_5px_rgba(255,255,255,0.7)] group-hover:border group-hover:border-white"
              />
            </div>
          ) : (
            <div className="w-full aspect-[2/3] bg-gray-300 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-gray-500">Sin póster</span>
            </div>
          )}
        </div>

        {/* Derecha/Centro: Formulario */}
        <div className="w-full md:w-2/3 p-8 flex flex-col">
          <div className="mb-6 border-b border-gray-200 pb-4">
            <h2 className="text-3xl font-serif text-[#283618] flex items-baseline gap-3">
              {title} <span className="text-xl text-[#606C38] font-normal">{year}</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-5">
            {/* Visto en */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-[#606C38] mb-1">Visto en:</label>
              <input 
                type="date" 
                value={watchedOn}
                onChange={(e) => setWatchedOn(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#BC6C25] w-max"
              />
            </div>

            {/* Texto de la Review */}
            <div className="flex flex-col flex-1">
              <label className="text-sm font-bold text-[#606C38] mb-1">Escribe tu reseña:</label>
              <textarea 
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="¿Qué te pareció?"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#BC6C25] resize-none min-h-[150px]"
                required
              />
            </div>

            {/* Puntuación y Like */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex flex-col">
                <label className="text-sm font-bold text-[#606C38] mb-1">Puntuación:</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      type="button"
                      className={`text-3xl transition-colors ${star <= (hoverRating || rating) ? "text-[#BC6C25]" : "text-[#d1cfc6]"}`}
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
                  className={`flex items-center justify-center p-2 rounded-full transition-colors ${isLiked ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-400 bg-gray-100'}`}
                >
                  <Heart className={`w-8 h-8 ${isLiked ? 'fill-current' : ''}`} />
                </button>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="px-6 py-3 bg-[#DDA15E] hover:bg-[#BC6C25] text-white font-bold rounded-lg shadow transition-colors disabled:opacity-50"
                >
                  {loading ? 'Guardando...' : 'Guardar Reseña'}
                </button>
              </div>
            </div>
            
            {error && <p className="text-red-500 text-sm font-bold mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
