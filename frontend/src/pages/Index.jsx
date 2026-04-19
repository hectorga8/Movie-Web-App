// ─────────────────────────────────────────────────────────────
// Index.jsx - Versión CineBox
// Página principal para usuarios registrados
// ─────────────────────────────────────────────────────────────
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import IndexBanner from "../components/index/IndexBanner";
import FriendActivity from "../components/index/FriendActivity";
import TrendingGrid from "../components/index/TrendingGrid";
import AIRecommendation from "../components/index/AIRecommendation";
import IndexAside from "../components/index/IndexAside";
import WatchingStreak from "../components/index/WatchingStreak";

function Index() {
  return (
    <div className="grain bg-[#FDFCF7] text-[#606C38] font-['DM_Sans',sans-serif] min-h-screen">
      
      {/* Banner con Reto de Cine y Continuar Viendo */}
      <IndexBanner />

      {/* Contenido Principal */}
      <div className="w-full max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Feed */}
          <main className="flex-1 min-w-0 space-y-12">
            
            {/* Cards Informativas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 fade-up">
              <div className="p-6 rounded-2xl bg-white border border-[#606C38]/15 hover:border-[#606C38]/40 transition-all group cursor-pointer shadow-sm">
                <h3 className="font-['Playfair_Display',Georgia,serif] text-lg lg:text-xl font-bold text-[#283618] group-hover:text-[#606C38] transition-colors mb-2">
                  ¿Decidiendo qué ver esta noche?
                </h3>
                <p className="text-sm text-[#606C38]/80 leading-relaxed">
                  Revisa tu lista de pendientes, CineBox ha ordenado automáticamente las películas que mejor encajan con tu estado de ánimo actual.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-[#606C38]/15 hover:border-[#606C38]/40 transition-all group cursor-pointer shadow-sm">
                <h3 className="font-['Playfair_Display',Georgia,serif] text-lg lg:text-xl font-bold text-[#283618] group-hover:text-[#606C38] transition-colors mb-2">
                  ¿Qué están viendo tus amigos?
                </h3>
                <p className="text-sm text-[#606C38]/80 leading-relaxed">
                  Descubre qué títulos están discutiendo tus amigos en nuestra comunidad cinéfila.
                </p>
              </div>
            </div>

            {/* Rejilla de Actividad y Racha */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FriendActivity />
              <WatchingStreak />
            </div>

            {/* Tendencias */}
            <TrendingGrid />

            {/* Recomendaciones IA */}
            <AIRecommendation />

          </main>

          {/* Barra Lateral */}
          <IndexAside />
        </div>
      </div>
    </div>
  );
}

export default Index;
