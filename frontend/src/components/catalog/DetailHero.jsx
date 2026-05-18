import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import movieService from '../../services/movieService';
import watchlistService from '../../services/watchlistService';
import { toggleFavoriteMovie } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import RatingCircle from '../common/RatingCircle';
import ReviewModal from '../common/ReviewModal';
import TrailerModal from '../common/TrailerModal';

const DetailHero = ({ item, type, providers, onActionClick, pegi }) => {
  const { user, updateUserLocally } = useAuth();
  const [inWatchlist, setInWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [status, setStatus] = useState('plan_to_watch');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    if (user && item) {
      watchlistService.checkStatus(item.id, type).then(data => {
        if (data.inList) {
          // Sync with global user profile for favorites if possible
          setIsFavorite(user.favoriteMovies?.includes(String(item.id)) || false);
          setStatus(data.status || 'none');
          setInWatchlist(data.inWatchlist || false);
        } else {
          setIsFavorite(user.favoriteMovies?.includes(String(item.id)) || false);
          setStatus('none');
          setInWatchlist(false);
        }
      }).catch(err => console.error("Error al comprobar watchlist", err));
    }
  }, [user, item, type]);

  const title = item.title || item.name;

  const handleFavoriteToggle = async () => {
    if (!user) return onActionClick();
    try {
      const newFav = !isFavorite;
      await watchlistService.addItem(item.id, type, status, newFav, null, title, item.poster_path, inWatchlist);
      const updatedUser = await toggleFavoriteMovie(item.id);
      updateUserLocally(updatedUser);
      setIsFavorite(newFav);
    } catch (err) {
      console.error(err);
    }
  };


  const handleWatchlistToggle = async () => {
    if (!user) return onActionClick();
    try {
      const newWatchlist = !inWatchlist;
      await watchlistService.addItem(item.id, type, status, isFavorite, null, title, item.poster_path, newWatchlist);
      setInWatchlist(newWatchlist);
    } catch (err) {
      console.error(err);
    }
  };

  const handleWatchedToggle = async () => {
    if (!user) return onActionClick();
    try {
      const newStatus = status === 'watched' ? 'none' : 'watched';
      await watchlistService.addItem(item.id, type, newStatus, isFavorite, null, title, item.poster_path, inWatchlist);
      setStatus(newStatus);
    } catch (err) {
      console.error(err);
    }
  };
  const releaseDate = item.release_date || item.first_air_date;
  const year = releaseDate?.split('-')[0] || 'N/R';
  
  const findResponsible = () => {
    if (type === 'tv' && item.created_by?.length > 0) return item.created_by[0];

    if (item.credits?.crew) {
      const roles = ['director', 'original story', 'author', 'writer', 'executive producer', 'series creator'];
      for (let role of roles) {
        const found = item.credits.crew.find(p => p.job?.toLowerCase().includes(role));
        if (found) return found;
      }
    }
    return null;
  };

  const creatorOrDirector = findResponsible();

  const trailer = item.videos?.results?.find(v => v.type === 'Trailer' && v.iso_639_1 === 'es') 
    || item.videos?.results?.find(v => v.type === 'Trailer') 
    || item.videos?.results?.[0];

  return (
    <section className="relative w-full bg-[#111419] pt-24 pb-16 overflow-hidden flex justify-center">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <img src={movieService.getBackdropUrl(item.backdrop_path)} className="w-full h-full object-cover grayscale brightness-50" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111419] via-[#0d0e12]/80 to-transparent"></div>
      </div>

      <div className="w-full max-w-[1200px] px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
          
          <div className="w-[200px] md:w-[280px] shrink-0 mx-auto md:mx-0">
            <div className="rounded-[12px] overflow-hidden shadow-2xl border border-white/10 aspect-[2/3] bg-black/40">
              <img src={movieService.getImageUrl(item.poster_path, 'w500')} className="w-full h-full object-cover" alt={title} />
            </div>
          </div>

          <div className="flex-1 text-white text-center md:text-left text-pretty">
            <nav className="label-uppercase text-[10px] md:text-[14px] mb-4 flex items-center justify-center md:justify-start gap-2  font-normal">
              <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-white/60 uppercase">{type === 'movie' ? 'Película' : 'TV'}</span>
            </nav>

            <h1 className="font-brand text-4xl md:text-6xl lg:text-[72px] leading-[1.1] mb-6 font-bold">{title}</h1>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 mb-8">
              <div className="scale-110"><RatingCircle rating={item.vote_average} size={60} /></div>
              <div className="h-6 w-px bg-white/10"></div>
              <div className="flex items-center gap-4">
                <span className="text-md text-white/60 font-normal">{year}</span>
                <div className="px-2 py-0.5 border border-white/20 rounded-[4px] text-[10px] font-normal bg-white/5">{pegi}</div>
              </div>

              {providers && (
                <a 
                  href={item.homepage || "#"} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-3 ml-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all cursor-pointer"
                >
                  <img src={`https://image.tmdb.org/t/p/original${providers.logo_path}`} className="w-6 h-6 rounded-[4px]" alt={providers.provider_name} />
                  <span className="text-[10px] font-normal label-uppercase text-white/80">Ver en {providers.provider_name}</span>
                </a>
              )}
            </div>

            <div className="mb-10 max-w-2xl text-left">
              <h3 className="label-uppercase md:text-[13px] mb-3 font-bold ">SINOPSIS</h3>
              <p className="body-relaxed text-[15px] md:text-[16px] text-white/70 leading-[1.7] italic opacity-90 line-clamp-4">
                {item.overview || "No hay sinopsis disponible en la red CineBox."}
              </p>
              {creatorOrDirector && (
                <div className="mt-6 flex items-center justify-center md:justify-start gap-4">
                  <div className="w-1 h-6 bg-[#1060ff] rounded-full shadow-[0_0_10px_rgba(16,96,255,0.5)]"></div>
                  <p className="text-[15px] font-normal text-white flex items-center">
                    <span className="opacity-40 font-normal uppercase text-[13px]  mr-2">
                      {type === 'movie' ? 'Director' : 'Creador'}
                    </span> 
                    <Link to={`/persona/${creatorOrDirector.id}`} className="hover:text-[#1060ff] transition-colors">
                      {creatorOrDirector.name}
                    </Link>
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              {/* Botón Favorito (Corazón) */}
              <button 
                onClick={handleFavoriteToggle} 
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all cursor-pointer group ${isFavorite ? 'bg-red-500 border-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'bg-white/5 border-white/10 text-white hover:bg-red-500 hover:border-transparent hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]'}`}
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </button>

              {/* Botón Watchlist (Reloj) */}
              <button 
                onClick={handleWatchlistToggle} 
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all cursor-pointer group ${inWatchlist ? 'bg-[#1060ff] border-[#1060ff] text-white shadow-[0_0_20px_rgba(16,96,255,0.3)]' : 'bg-white/5 border-white/10 text-white hover:bg-[#1060ff] hover:border-transparent hover:shadow-[0_0_20px_rgba(16,96,255,0.3)]'}`}
                title="Añadir a Watchlist"
              >
                {inWatchlist ? (
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 11.3V7h1.5v3.8l4.5 4.5-.8.9z"/></svg>
                ) : (
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"/></svg>
                )}
              </button>

              {/* Botón Vista (Ojo) */}
              <button 
                onClick={handleWatchedToggle} 
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all cursor-pointer group ${status === 'watched' ? 'bg-[#21d07a] border-[#21d07a] text-white shadow-[0_0_20px_rgba(33,208,122,0.3)]' : 'bg-white/5 border-white/10 text-white hover:bg-[#21d07a] hover:border-transparent hover:shadow-[0_0_20px_rgba(33,208,122,0.3)]'}`}
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </button>

              {trailer && (
                <button onClick={() => setTrailerKey(trailer.key)} className="ml-4 flex items-center gap-4 group text-[11px] md:text-[13px]
                font-normal label-uppercase opacity-60 hover:opacity-100 transition-all cursor-pointer">
                  <div className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center 
                  group-hover:border-[#1060ff] group-hover:bg-[#1060ff]/10 transition-all">
                    <svg className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  TRÁILER
                </button>
              )}

              <button 
                onClick={() => {
                  if (!user) return onActionClick();
                  setIsReviewModalOpen(true);
                }}
                className="ml-auto md:ml-4 px-6 py-2 bg-white/10 hover:bg-[#1060ff] border border-white/20 hover:border-transparent rounded-full text-[12px] md:text-[14px] font-normal label-uppercase transition-all cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(16,96,255,0.4)]"
              >
                Escribir Reseña
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {isReviewModalOpen && (
        <ReviewModal 
          media={item} 
          mediaType={type} 
          onClose={() => setIsReviewModalOpen(false)} 
        />
      )}

      {trailerKey && (
        <TrailerModal videoKey={trailerKey} onClose={() => setTrailerKey(null)} />
      )}
    </section>
  );
};

export default DetailHero;