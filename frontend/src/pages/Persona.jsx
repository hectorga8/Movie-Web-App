import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import movieService from '../services/movieService';

function Persona() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        setLoading(true);
        const data = await movieService.getPersonDetail(id);
        setPerson(data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar la información de la persona.");
        setLoading(false);
      }
    };
    fetchPerson();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#0d0e12] text-white py-16 min-h-screen">
      <div className="w-8 h-8 border-4 border-[#1060ff]/20 border-t-[#1060ff] rounded-full animate-spin mb-4"></div>
      <p className="label-uppercase text-[10px] opacity-50 tracking-[2px]">Cargando...</p>
    </div>
  );

  if (error || !person) return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#0d0e12] text-white p-6 text-center min-h-[60vh]">
      <h2 className="font-brand text-3xl mb-4 text-white">Persona no encontrada</h2>
      <button onClick={() => navigate('/')} className="bg-white/10 px-4 py-2 hover:bg-white/20 transition-colors">VOLVER AL INICIO</button>
    </div>
  );

  const calculateAge = (birthday, deathday) => {
    if (!birthday) return 'Edad desconocida';
    const birthDate = new Date(birthday);
    const endDate = deathday ? new Date(deathday) : new Date();
    let age = endDate.getFullYear() - birthDate.getFullYear();
    const m = endDate.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && endDate.getDate() < birthDate.getDate())) {
      age--;
    }
    return age + (deathday ? ' (Fallecido)' : ' años');
  };

  const allCredits = person.combined_credits?.cast
    ? [...person.combined_credits.cast].sort((a, b) => b.popularity - a.popularity)
    : [];

  const knownFor = allCredits.slice(0, visibleCount);

  const participationsCount = allCredits.length;
  const highestRatedMovie = allCredits.filter(c => c.vote_count > 100).sort((a,b) => b.vote_average - a.vote_average)[0];
  const externals = person.external_ids || {};
  const hasSocials = externals.instagram_id || externals.twitter_id || externals.facebook_id || externals.tiktok_id || externals.imdb_id;

  return (
    <div className="flex-1 bg-[#14181c] text-[#8b9bb4] min-h-screen font-sans pb-20">
      <div className="max-w-[1200px] mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
        
        {/* Columna Izquierda: Foto e Info Personal */}
        <div className="w-full md:w-[300px] shrink-0">
          <div className="rounded-[8px] overflow-hidden shadow-2xl border border-[#2c3440] bg-[#1a1c23] mb-6">
            <img 
              src={movieService.getImageUrl(person.profile_path, 'w500')} 
              alt={person.name} 
              className="w-full object-cover"
            />
          </div>

          {hasSocials && (
            <div className="flex flex-wrap items-center gap-4 mb-8">
              {externals.instagram_id && (
                <a href={`https://instagram.com/${externals.instagram_id}`} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors" title="Instagram">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              )}
              {externals.twitter_id && (
                <a href={`https://twitter.com/${externals.twitter_id}`} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors" title="Twitter / X">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
              )}
              {externals.facebook_id && (
                <a href={`https://facebook.com/${externals.facebook_id}`} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors" title="Facebook">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
              {externals.tiktok_id && (
                <a href={`https://tiktok.com/@${externals.tiktok_id}`} target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition-colors" title="TikTok">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c-.01 2.45-.9 4.96-2.58 6.64-1.63 1.63-4.06 2.6-6.39 2.44-2.88-.17-5.5-2.12-6.54-4.83-1.03-2.6-.46-5.69 1.4-7.66 1.8-1.87 4.5-2.82 7.03-2.5v4.06c-1.28-.1-2.59.3-3.47 1.2-.82.84-1.2 2.1-1.02 3.27.18 1.18.97 2.18 2.06 2.64 1.25.5 2.8.31 3.86-.46.94-.69 1.48-1.85 1.5-3.04V.02z"/></svg>
                </a>
              )}
              {externals.imdb_id && (
                <a href={`https://www.imdb.com/name/${externals.imdb_id}`} target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#f5c518] transition-colors" title="IMDb">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.793 4v16h-21.586v-16h21.586zm-18.064 13.064h2.518v-10.13h-2.518v10.13zm12.35-4.32c-.067-1.08-.432-1.69-1.1-1.69-.536 0-.962.39-1.066 1.06-.051.35-.07.96-.07 1.86v1.17c0 .96.02 1.58.07 1.89.09.61.47 1.01.99 1.01.62 0 1.01-.58 1.09-1.63.05-.62.08-1.39.08-2.31v-1.36zm-8.87-5.81h-3.32v10.13h2.36v-5.91l.88 4.41h1.76l.89-4.41v5.9h2.36v-10.13h-3.34l-1.07 5.75-1.05-5.75zm12.87 6.13c0-2.34-.14-3.83-.43-4.54-.42-1.07-1.31-1.61-2.6-1.61-1.63 0-2.6.93-2.92 2.76h-.06v-2.53h-2.36v10.13h2.33v-1.17h.04c.32 1.02 1.25 1.53 2.76 1.53 1.31 0 2.22-.52 2.65-1.57.29-.71.43-2.19.43-4.43v-2.57z"/></svg>
                </a>
              )}
            </div>
          )}

          <h3 className="text-white text-xl font-bold mb-4 border-b border-[#2c3440] pb-2">Estadísticas de Carrera</h3>
          <div className="space-y-4 text-[14px] mb-8">
            <div>
              <strong className="block text-white">Créditos Totales</strong>
              <span className="text-[#1060ff] font-bold text-[20px]">{participationsCount}</span>
            </div>
            {highestRatedMovie && (
              <div>
                <strong className="block text-white mb-1">Obra Mejor Valorada</strong>
                <div 
                  className="bg-white/5 border border-white/10 rounded-[6px] p-2 hover:bg-white/10 transition-colors cursor-pointer group flex items-center gap-3"
                  onClick={() => navigate(`/${highestRatedMovie.media_type === 'movie' ? 'pelicula' : 'serie'}/${highestRatedMovie.id}`)}
                >
                  <img src={movieService.getImageUrl(highestRatedMovie.poster_path, 'w92')} className="w-8 h-12 object-cover rounded-[2px]" alt="" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold truncate group-hover:text-[#1060ff] transition-colors">{highestRatedMovie.title || highestRatedMovie.name}</p>
                    <p className="text-[12px] text-[#21d07a] font-bold mt-0.5 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                      {highestRatedMovie.vote_average.toFixed(1)} / 10
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <h3 className="text-white text-xl font-bold mb-4 border-b border-[#2c3440] pb-2">Información Personal</h3>
          <div className="space-y-4 text-[14px]">
            <div>
              <strong className="block text-white">Género</strong>
              <span>{person.gender === 1 ? 'Femenino' : person.gender === 2 ? 'Masculino' : 'No especificado'}</span>
            </div>
            <div>
              <strong className="block text-white">Fecha de nacimiento</strong>
              <span>{person.birthday ? new Date(person.birthday).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}</span>
              {person.birthday && <span className="block mt-1 text-[12px] opacity-70">({calculateAge(person.birthday, person.deathday)})</span>}
            </div>
            {person.deathday && (
              <div>
                <strong className="block text-white">Fecha de fallecimiento</strong>
                <span>{new Date(person.deathday).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            )}
            <div>
              <strong className="block text-white">Lugar de nacimiento</strong>
              <span>{person.place_of_birth || '-'}</span>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Biografía y Filmografía */}
        <div className="flex-1 min-w-0">
          <h1 className="text-white text-4xl md:text-5xl font-bold tracking-tight mb-8">
            {person.name}
          </h1>

          <div className="mb-12">
            <h2 className="text-white text-2xl font-bold mb-4">Biografía</h2>
            <div className="text-[15px] leading-relaxed text-white/80 whitespace-pre-line">
              {person.biography ? person.biography : `No hay biografía disponible para ${person.name}.`}
            </div>
          </div>

          <div>
            <h2 className="text-white text-2xl font-bold mb-6">Conocido/a por</h2>
            {knownFor.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
                  {knownFor.map(item => (
                    <div key={`${item.media_type}-${item.id}`} className="group cursor-pointer">
                      <div className="aspect-[2/3] bg-[#2c3440] rounded-[4px] overflow-hidden border border-[#445566] group-hover:border-white transition-all shadow-md relative">
                        <img 
                          src={movieService.getImageUrl(item.poster_path, 'w300')} 
                          alt={item.title || item.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div 
                          className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center"
                          onClick={() => navigate(`/${item.media_type === 'movie' ? 'pelicula' : 'serie'}/${item.id}`)}
                        >
                          <span className="text-white font-bold text-[13px] line-clamp-2">{item.title || item.name}</span>
                          <span className="text-[#8b9bb4] text-[11px] mt-1 line-clamp-2 italic">{movieService.translateRole(item.character, person.gender)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {visibleCount < allCredits.length && (
                  <div className="flex justify-center mt-8">
                    <button 
                      onClick={() => setVisibleCount(prev => Math.min(prev + 20, allCredits.length))}
                      className="bg-[#2c3440] hover:bg-[#445566] text-white px-6 py-2.5 rounded-[3px] text-[13px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      Mostrar más ({allCredits.length - visibleCount} restantes)
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-[14px]">No hay créditos destacados disponibles.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Persona;