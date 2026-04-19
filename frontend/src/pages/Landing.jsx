import { Link } from 'react-router-dom';
import FeatureCard from '../components/landing/FeatureCard';

function Landing() {
  return (
    <div className="w-full bg-white overflow-hidden">
      
      {/* ─────────────────────────────────────────────────────────────
          SECTION: HERO (DRAMATIC DARK MODE)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full bg-[#15181e] text-[#efeff1] py-24 lg:py-32 xl:py-40">
        
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(123,66,188,0.12),transparent_70%)] pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(20,198,203,0.08),transparent_70%)] pointer-events-none"></div>

        <div className="w-full max-w-[1150px] mx-auto px-6 relative z-10">
          <div className="max-w-[850px]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] border border-[#7b42bc]/40 bg-[#7b42bc]/5 text-[#d5d7db] text-[13px] font-bold uppercase tracking-[1.3px] mb-8">
              <span className="w-2 h-2 bg-[#7b42bc] rounded-full shadow-[0_0_8px_#7b42bc]"></span>
              CineBox Cloud Infrastructure
            </div>

            <h1 className="text-[48px] md:text-[64px] lg:text-[82px] font-bold text-white leading-[1.17] mb-8 tracking-tighter fade-up">
              Manage your cinema lifecycle <span className="text-[#14c6cb]">at scale.</span>
            </h1>

            <p className="text-[18px] lg:text-[22px] font-normal text-[#d5d7db] leading-[1.50] max-w-2xl mb-12 fade-up delay-1">
              La plataforma definitiva para coleccionistas de cine. Automatiza tu catálogo, analiza tus hábitos de visualización y despliega tu biblioteca en cualquier dispositivo.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5 fade-up delay-2">
              <Link to="/registro" className="w-full sm:w-auto px-8 py-4 rounded-[5px] bg-[#1060ff] text-white text-[15px] font-bold hover:bg-[#2b89ff] transition-all shadow-lg shadow-[#1060ff]/20 text-center">
                Empezar gratis
              </Link>
              {/* CAMBIO: Documentación -> Iniciar Sesión */}
              <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-[5px] border border-[#d5d7db]/40 text-[#efeff1] text-[15px] font-bold hover:bg-white/5 transition-all text-center">
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="w-full bg-[#f1f2f3] border-b border-[#d5d7db]/50 py-12 overflow-hidden">
        <div className="w-full max-w-[1150px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          <p className="text-[13px] font-bold uppercase tracking-[1.3px] text-[#656a76]">Trusted by cinema lovers at</p>
          <div className="flex flex-wrap justify-center gap-10 lg:gap-16 grayscale opacity-60">
            <span className="font-brand text-2xl font-black text-black">METACRITIC</span>
            <span className="font-brand text-2xl font-black text-black">TMDB</span>
            <span className="font-brand text-2xl font-black text-black">LETTERBOXD</span>
            <span className="font-brand text-2xl font-black text-black">CINEBOX</span>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="w-full bg-white py-24 lg:py-32">
        <div className="w-full max-w-[1150px] mx-auto px-6">
          <div className="text-center mb-20 max-w-[800px] mx-auto">
            <h2 className="text-[34px] lg:text-[52px] font-bold text-black h-tight mb-6">
              Una plataforma construida para la <em className="italic font-normal">estabilidad.</em>
            </h2>
            <p className="text-[18px] lg:text-[20px] text-[#3b3d45] leading-[1.63]">
              CineBox automatiza los flujos de trabajo de tu colección privada, permitiéndote centrarte en lo que importa: disfrutar del cine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              accentColor="#7b42bc" 
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 01-2-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
              title="Gestión de Catálogo"
              description="Infraestructura escalable para gestionar miles de títulos con metadatos enriquecidos y sincronización automática."
            />
            <FeatureCard 
              accentColor="#ffcf25" 
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
              title="Seguridad y Privacidad"
              description="Tus datos de visualización y listas privadas están protegidos bajo cifrado de grado empresarial. Tú eres el dueño de tus datos."
            />
            <FeatureCard 
              accentColor="#14c6cb" 
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
              title="Despliegue Multiplataforma"
              description="Accede a tu videoteca desde cualquier lugar: web, móvil o tablet. La racha cinéfila se sincroniza en tiempo real."
            />
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="w-full py-20 lg:py-32 bg-[#15181e] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(16,96,255,0.05),transparent_60%)] pointer-events-none"></div>
        <div className="w-full max-w-[1150px] mx-auto px-6 text-center relative z-10">
          <h2 className="text-[32px] lg:text-[42px] font-bold text-white mb-8 h-tight">
            ¿Listo para elevar tu experiencia cinéfila?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/registro" className="w-full sm:w-auto px-10 py-4 rounded-[5px] bg-[#1060ff] text-white text-[15px] font-bold hover:bg-[#2b89ff] transition-all shadow-xl shadow-[#1060ff]/30">
              Crear cuenta ahora
            </Link>
            <p className="text-[13px] font-bold uppercase tracking-[1.3px] text-[#656a76] ml-4">
              Join 1,240+ Cinephiles
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Landing;
