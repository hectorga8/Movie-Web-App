// ─────────────────────────────────────────────────────────────
// IndexBanner.jsx - Versión CineBox (Inspirado en Hashicorp)
// Banner principal - Hero Mode Oscuro (#15181e)
// ─────────────────────────────────────────────────────────────

function IndexBanner() {
  return (
    <section className="w-full relative overflow-hidden bg-[#15181e] text-[#efeff1] py-20 lg:py-24">
      {/* Elementos Decorativos - Gradientes Estilo Vault/Terraform */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(123,66,188,0.15),transparent_70%)] pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(255,207,37,0.1),transparent_70%)] pointer-events-none"></div>

      <div className="w-full max-w-[1150px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Lado Izquierdo: Mensaje de Marca (Hero Headline 82px tight) */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[5px] border border-[#ffcf25]/40 bg-[#ffcf25]/5 text-[#ffcf25] text-[13px] font-bold uppercase tracking-[1.3px] mb-8">
            <span className="w-2 h-2 bg-[#ffcf25] rounded-full animate-pulse shadow-[0_0_8px_#ffcf25]"></span>
            CineBox Infrastructure
          </div>
          
          <h1 className="font-['Playfair_Display',Georgia,serif] text-5xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] mb-8 tracking-tighter">
            Build your<br />
            <span className="text-[#ffcf25]">Watchlist.</span>
          </h1>

          <p className="text-[20px] font-normal text-[#d5d7db] leading-[1.50] max-w-xl mb-10">
            Gestiona tu colección de cine con el rigor de un ingeniero. Sincroniza, analiza y descubre nuevas obras maestras en la red de CineBox.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <a href="#" className="px-6 py-3 rounded-[5px] bg-[#1060ff] text-white text-[15px] font-bold hover:bg-[#2b89ff] transition-all shadow-lg shadow-[#1060ff]/20">
              Ver cartelera hoy
            </a>
            <a href="#" className="px-6 py-3 rounded-[5px] border border-[#d5d7db]/40 text-[#efeff1] text-[15px] font-bold hover:bg-white/5 transition-all">
              Documentación API →
            </a>
          </div>
        </div>

        {/* Lado Derecho: Preview de "Continuar Viendo" (Vault Yellow accent) */}
        <div className="w-full max-w-[400px] shrink-0">
          <div className="bg-[#0d0e12] border border-[#d5d7db]/10 rounded-lg p-6 shadow-2xl relative overflow-hidden group">
            {/* Destello de color Vault */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#ffcf25]/10 blur-2xl group-hover:bg-[#ffcf25]/20 transition-all"></div>
            
            <h3 className="text-[13px] font-bold uppercase tracking-[1.3px] text-[#ffcf25] mb-6">Continuar Visualización</h3>
            
            <div className="flex gap-5 mb-8">
              <img src="https://image.tmdb.org/t/p/w200/kuf6evRbcS3UOAfmHqnZ1O0uUQC.jpg" alt="Dune" className="w-24 h-36 object-cover rounded shadow-2xl border border-white/5" />
              <div className="flex-1 flex flex-col justify-center">
                <h4 className="text-xl font-bold text-white leading-tight mb-2">Dune: Parte Dos</h4>
                <p className="text-[14px] text-[#d5d7db] mb-4">Denis Villeneuve</p>
                
                <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden mb-2">
                  <div className="bg-[#ffcf25] h-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-[11px] font-medium text-[#d5d7db]/60">65% COMPLETADO</p>
              </div>
            </div>

            <button className="w-full py-3 rounded-[5px] bg-white text-[#15181e] text-[13px] font-bold hover:bg-[#f1f2f3] transition-all flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              RESUMIR SESIÓN
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default IndexBanner;
