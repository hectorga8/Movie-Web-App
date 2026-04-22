import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import movieService from '../services/movieService';
import { useAuth } from '../context/AuthContext';
import DetailHero from '../components/catalog/DetailHero';
import CastSection from '../components/catalog/CastSection';
import ReviewCard from '../components/common/ReviewCard';
import RecommendationsGrid from '../components/catalog/RecommendationsGrid';
import DetailSidebar from '../components/catalog/DetailSidebar';

function Pelicula() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await movieService.getMovieDetail(id);
        setMovie(data);
        setLoading(false);
      } catch (err) {
        setError("Error de red CineBox Cloud.");
        setLoading(false);
      }
    };
    fetchDetail();
    window.scrollTo(0, 0);
  }, [id]);

  const handleActionClick = () => {
    if (!user) navigate('/registro');
  };

  if (loading) return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#0d0e12] text-white py-16">
      <div className="w-8 h-8 border-4 border-[#1060ff]/20 border-t-[#1060ff] rounded-full animate-spin mb-4"></div>
      <p className="label-uppercase text-[10px] opacity-50 tracking-[2px]">Cargando Película...</p>
    </div>
  );

  if (error || !movie || movie.error) return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#0d0e12] text-white p-6 text-center min-h-[60vh]">
      <h2 className="font-brand text-3xl mb-4">Película no encontrada</h2>
      <button onClick={() => navigate('/')} className="bg-white/10 px-4 py-2 hover:bg-white/20 transition-colors">VOLVER AL INICIO</button>
    </div>
  );

  const trailer = movie.videos?.results?.find(v => v.type === 'Trailer') || movie.videos?.results?.[0];
  const providers = movie["watch/providers"]?.results?.ES?.flatrate?.[0];
  
  // PEGI para Cine (Release Dates)
  const pegi = movie.release_dates?.results?.find(r => r.iso_3166_1 === 'ES')?.release_dates?.[0]?.certification 
            || movie.release_dates?.results?.find(r => r.iso_3166_1 === 'US')?.release_dates?.[0]?.certification 
            || 'N/R';

  return (
    <div className="flex-1 bg-[#0d0e12] flex flex-col items-center text-white">
      
      <DetailHero 
        item={movie} 
        type="movie" 
        providers={providers} 
        trailer={trailer} 
        onActionClick={handleActionClick}
        pegi={pegi}
      />

      <div className="w-full max-w-[1200px] px-6 py-12 flex flex-col lg:flex-row gap-12 lg:gap-16">
        <div className="flex-1 min-w-0">
          
          <div className="mb-10 py-4 px-6 bg-white/5 border-l-4 border-[#7b42bc] rounded-r-[8px] flex items-center gap-4 text-[14px] font-medium text-white/80">
            <span className="text-2xl">🏆</span>
            <p><span className="font-bold text-[#7b42bc] uppercase mr-2 tracking-widest text-[11px]">CineBox Pick</span>Esta película ha sido destacada por su excelencia técnica.</p>
          </div>

          <hr className="border-white/5 mb-12" />

          <CastSection cast={movie.credits?.cast} />

          <hr className="border-white/5 mb-12" />

          <div className="mb-16">
            <h3 className="font-brand text-3xl text-white mb-8 leading-tight font-bold">Reseñas de Usuarios</h3>
            {movie.reviews?.results?.length > 0 ? (
              <div className="space-y-4">
                {movie.reviews.results.slice(0, 2).map(rev => <ReviewCard key={rev.id} review={rev} />)}
              </div>
            ) : <p className="text-[14px] text-white/40 italic">Aún no hay reseñas registradas para esta película.</p>}
          </div>

          <hr className="border-white/5 mb-12" />

          <RecommendationsGrid 
            items={movie.recommendations?.results} 
            type="pelicula" 
            currentItemName={movie.title} 
          />
        </div>

        <DetailSidebar item={movie} type="movie" externalIds={movie.external_ids} />
      </div>
    </div>
  );
}

export default Pelicula;
