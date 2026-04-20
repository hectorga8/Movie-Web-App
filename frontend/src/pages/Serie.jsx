import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import movieService from '../services/movieService';
import { useAuth } from '../context/AuthContext';
import DetailHero from '../components/catalog/DetailHero';
import CastSection from '../components/catalog/CastSection';
import ReviewCard from '../components/common/ReviewCard';
import SeasonSection from '../components/serie/SeasonSection';
import RecommendationsGrid from '../components/catalog/RecommendationsGrid';
import DetailSidebar from '../components/catalog/DetailSidebar';

function Serie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [serie, setSerie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await movieService.getTVDetail(id);
        setSerie(data);
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
      <p className="label-uppercase text-[10px] opacity-50 tracking-[2px]">Cargando Serie...</p>
    </div>
  );

  if (error || !serie) return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#0d0e12] text-white p-6 text-center min-h-[60vh]">
      <h2 className="font-brand text-3xl mb-4 text-white">Error de Sistema</h2>
      <button onClick={() => navigate('/')} className="btn-secondary-white text-[12px]">VOLVER AL INICIO</button>
    </div>
  );

  const trailer = serie.videos?.results?.find(v => v.type === 'Trailer') || serie.videos?.results?.[0];
  const providers = serie["watch/providers"]?.results?.ES?.flatrate?.[0];
  
  const pegi = serie.content_ratings?.results?.find(r => r.iso_3166_1 === 'ES')?.rating 
            || serie.content_ratings?.results?.find(r => r.iso_3166_1 === 'US')?.rating 
            || 'N/R';

  return (
    <div className="flex-1 bg-white flex flex-col items-center">
      
      <DetailHero 
        item={serie} 
        type="tv" 
        providers={providers} 
        trailer={trailer} 
        onActionClick={handleActionClick}
        pegi={pegi}
      />

      <div className="w-full max-w-[1200px] px-6 py-12 flex flex-col lg:flex-row gap-12 lg:gap-16">
        <div className="flex-1 min-w-0">
          
          <div className="mb-10 py-3 px-5 bg-[#7b42bc]/5 border-l-4 border-[#7b42bc] rounded-r-[3px] flex items-center gap-4 text-[13px] font-medium text-[#3b3d45]">
            <span className="text-xl">🏆</span>
            <p><span className="font-bold text-[#7b42bc] uppercase mr-2 tracking-widest text-[11px]">Reconocimiento</span>Esta obra es contenido premium CineBox.</p>
          </div>

          <hr className="border-[#f1f2f3] mb-12" />

          <CastSection cast={serie.credits?.cast} />

          <hr className="border-[#f1f2f3] mb-12" />

          <SeasonSection seasons={serie.seasons} seriesOverview={serie.overview} />

          <hr className="border-[#f1f2f3] mb-12" />

          <div className="mb-16">
            <h3 className="font-brand text-3xl text-black mb-8 leading-tight font-bold">Reseñas de Usuarios</h3>
            {serie.reviews?.results?.length > 0 ? (
              <div className="space-y-4">
                {serie.reviews.results.slice(0, 2).map(rev => <ReviewCard key={rev.id} review={rev} />)}
              </div>
            ) : <p className="text-[14px] text-[#656a76] italic opacity-60">Aún no hay reseñas registradas.</p>}
          </div>

          <hr className="border-[#f1f2f3] mb-12" />

          <RecommendationsGrid 
            items={serie.recommendations?.results} 
            type="serie" 
            currentItemName={serie.name} 
          />
        </div>

        <DetailSidebar item={serie} type="tv" externalIds={serie.external_ids} />
      </div>
    </div>
  );
}

export default Serie;
