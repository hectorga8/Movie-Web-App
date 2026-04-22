import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import movieService from '../../services/movieService';
import watchlistService from '../../services/watchlistService';
import { useAuth } from '../../context/AuthContext';
import RatingCircle from '../common/RatingCircle';

const DetailHero = ({ item, type, providers, onActionClick, pegi }) => {
  const { user } = useAuth();
  const [inWatchlist, setInWatchlist] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [status, setStatus] = useState('plan_to_watch');

  useEffect(() => {
    if (user && item) {
      watchlistService.checkStatus(item.id, type).then(data => {
        setInWatchlist(data.inList);
        if (data.inList) {
          setIsFavorite(data.isFavorite);
          setStatus(data.status);
        }
      }).catch(err => console.error("Error al comprobar watchlist", err));
    }
  }, [user, item, type]);

  const handleFavoriteToggle = async () => {
    if (!user) return onActionClick();
    try {
      const newFav = !isFavorite;
      await watchlistService.addItem(item.id, type, status, newFav);
      setIsFavorite(newFav);
      setInWatchlist(true); 
    } catch (err) {
      console.error(err);
    }
  };

  const handleWatchlistToggle = async () => {
    if (!user) return onActionClick();
    try {
      if (inWatchlist && status === 'plan_to_watch' && !isFavorite) {
        await watchlistService.removeItem(item.id, type);
        setInWatchlist(false);
      } else {
        const newStatus = inWatchlist ? status : 'plan_to_watch';
        await watchlistService.addItem(item.id, type, newStatus, isFavorite);
        setInWatchlist(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleWatchedToggle = async () => {
    if (!user) return onActionClick();
    try {
      const newStatus = status === 'watched' ? 'plan_to_watch' : 'watched';
      await watchlistService.addItem(item.id, type, newStatus, isFavorite);
      setStatus(newStatus);
      setInWatchlist(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (!item) return null;

  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;
  const year = releaseDate?.split('-')[0] || 'N/R';
  
  const findResponsible = () => {
    if (type === 'tv' && item.created_by?.length > 0) return item.created_by[0].name;

    if (item.credits?.crew) {
      const roles = ['director', 'original story', 'author', 'writer', 'executive producer', 'series creator'];
      for (let role of roles) {
        const found = item.credits.crew.find(p => p.job?.toLowerCase().includes(role));
        if (found) return found.name;
      }
    }
    return null;
  };

  const creatorOrDirector = findResponsible();

  const trailer = item.videos?.results?.find(v => v.type === 'Trailer' && v.iso_639_1 === 'es') 
    || item.videos?.results?.find(v => v.type === 'Trailer') 
    || item.videos?.results?.[0];

  return (
    <section className="relative w-full bg-[#0d0e12] pt-24 pb-16 overflow-hidden flex justify-center">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <img src={movieService.getBackdropUrl(item.backdrop_path)} className="w-full h-full object-cover grayscale brightness-50" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e12] via-[#0d0e12]/80 to-transparent"></div>
      </div>

      <div className="w-full max-w-[1200px] px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-16">
          
          <div className="w-[200px] md:w-[280px] shrink-0 mx-auto md:mx-0">
            <div className="rounded-[12px] overflow-hidden shadow-2xl border border-white/10 aspect-[2/3] bg-black/40">
              <img src={movieService.getImageUrl(item.poster_path, 'w500')} className="w-full h-full object-cover" alt={title} />
            </div>
          </div>

          <div className="flex-1 text-white text-center md:text-left text-pretty">
            <nav className="label-uppercase text-[10px] mb-4 flex items-center justify-center md:justify-start gap-2 opacity-40 font-bold tracking-[2px]">
              <Link to="/" className="hover:text-white transition-colors">Infraestructura</Link>
              <span>/</span>
              <span className="text-white/60 uppercase">{type === 'movie' ? 'Película' : 'TV'}</span>
            </nav>

            <h1 className="font-brand text-4xl md:text-6xl lg:text-[72px] leading-[1.1] mb-6 tracking-tighter font-bold">{title}</h1>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 mb-8">
              <div className="scale-110"><RatingCircle rating={item.vote_average} size={60} /></div>
              <div className="h-6 w-px bg-white/10"></div>
              <div className="flex items-center gap-4">
                <span className="text-md text-white/60 font-bold">{year}</span>
                <div className="px-2 py-0.5 border border-white/20 rounded-[4px] text-[10px] font-bold bg-white/5">{pegi}</div>
              </div>

              {providers && (
                <a 
                  href={item.homepage || "#"} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-3 ml-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all cursor-pointer"
                >
                  <img src={`https://image.tmdb.org/t/p/original${providers.logo_path}`} className="w-6 h-6 rounded-[4px]" alt={providers.provider_name} />
                  <span className="text-[10px] font-bold label-uppercase tracking-wider text-white/80">Ver en {providers.provider_name}</span>
                </a>
              )}
            </div>

            <div className="mb-10 max-w-2xl text-left">
              <h3 className="label-uppercase text-[10px] mb-3 opacity-30 font-bold tracking-[2px]">SINOPSIS</h3>
              <p className="body-relaxed text-[15px] md:text-[16px] text-white/70 leading-[1.7] italic opacity-90 line-clamp-4">
                {item.overview || "No hay sinopsis disponible en la red CineBox."}
              </p>
              {creatorOrDirector && (
                <div className="mt-6 flex items-center justify-center md:justify-start gap-4">
                  <div className="w-1 h-6 bg-[#1060ff] rounded-full shadow-[0_0_10px_rgba(16,96,255,0.5)]"></div>
                  <p className="text-[13px] font-bold text-white"><span className="opacity-40 font-normal uppercase tracking-wider text-[11px] mr-2">{type === 'movie' ? 'Director' : 'Creador'}</span> {creatorOrDirector}</p>
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

              {/* Botón Lista (Pendientes) - Plus o Check */}
              <button 
                onClick={handleWatchlistToggle} 
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all cursor-pointer group ${inWatchlist ? 'bg-[#1060ff] border-[#1060ff] text-white shadow-[0_0_20px_rgba(16,96,255,0.3)]' : 'bg-white/5 border-white/10 text-white hover:bg-[#1060ff] hover:border-transparent hover:shadow-[0_0_20px_rgba(16,96,255,0.3)]'}`}
              >
                {inWatchlist ? (
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                ) : (
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
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
                <button onClick={() => window.open(`https://www.youtube.com/watch?v=${trailer.key}`)} className="ml-4 flex items-center gap-4 group text-[11px] font-bold label-uppercase tracking-[2px] opacity-60 hover:opacity-100 transition-all cursor-pointer">
                  <div className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#1060ff] group-hover:bg-[#1060ff]/10 transition-all"><svg className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
                  VER TRÁILER
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailHero;