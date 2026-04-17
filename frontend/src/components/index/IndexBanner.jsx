// ─────────────────────────────────────────────────────────────
// IndexBanner.jsx
// Banner principal de la página de inicio (Reading Challenge + Continue Reading)
// ─────────────────────────────────────────────────────────────

function IndexBanner() {
  return (
    <section className="w-full relative border-b border-[#606C38]/10 overflow-hidden bg-[radial-gradient(ellipse_70%_80%_at_30%_50%,rgba(96,108,56,0.08)_0%,transparent_60%),radial-gradient(ellipse_50%_60%_at_75%_40%,rgba(244,243,237,0.8)_0%,transparent_55%),linear-gradient(135deg,#FDFCF7_0%,#F4F3ED_100%)]">
      <div className="w-full max-w-[1400px] mx-auto px-6 flex flex-col lg:flex-row items-stretch min-h-[340px]">
        
        {/* Reading Challenge */}
        <div className="flex-1 flex flex-col justify-center py-12 lg:py-16 pr-0 lg:pr-16 relative">
          <div className="fade-up flex items-center gap-6 mb-5">
            <div className="relative flex flex-col items-center justify-center w-28 h-28 rounded-2xl bg-white border border-[#606C38]/15 shadow-xl shrink-0">
              <span className="font-['Playfair_Display',Georgia,serif] text-2xl font-bold text-[#283618] leading-none">2026</span>
              <svg className="w-10 h-10 text-[#606C38] mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-[#BC6C25] tracking-widest uppercase mb-1">Reto anual de lectura</p>
              <h1 className="font-['Playfair_Display',Georgia,serif] text-4xl lg:text-5xl font-bold text-[#283618] leading-tight">
                Reading<br /><em className="text-[#606C38] italic">Challenge</em>
              </h1>
            </div>
          </div>

          <p className="fade-up delay-1 text-[#283618]/80 text-base max-w-sm leading-relaxed mb-6">
            ¿Cuántos libros leerás este año? Llevas 7 de 12 libros leídos. Estás un 15% por delante de tu objetivo.
          </p>
          <a href="#" className="fade-up delay-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#BC6C25] hover:bg-[#9A581E] text-white text-sm font-bold transition-all self-start shadow-lg shadow-[#BC6C25]/20">
            Ver mis estadísticas →
          </a>
        </div>

        {/* Continue Reading */}
        <div className="lg:w-80 xl:w-96 shrink-0 lg:border-l border-[#606C38]/10 flex items-center justify-center py-8 lg:py-0 lg:pl-12">
          <div className="fade-up delay-3 w-full max-w-sm bg-white/80 backdrop-blur-sm border border-[#606C38]/15 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-['Playfair_Display',Georgia,serif] text-xl font-bold text-[#283618]">
                Continuar leyendo
              </h2>
              <span className="text-[#BC6C25] text-xs font-bold">🔥 3 días seguidos</span>
            </div>
            
            <div className="flex gap-4">
              <img src="https://covers.openlibrary.org/b/id/10527843-M.jpg" alt="Dune" className="book-cover w-16 h-24 lg:w-20 lg:h-28 object-cover shrink-0" />
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="font-bold text-[#283618] text-sm lg:text-base xl:text-lg line-clamp-1 hover:text-[#606C38] cursor-pointer transition-colors">Dune</h3>
                <p className="text-xs lg:text-sm text-[#606C38]/80 mb-3">Frank Herbert</p>
                <div className="w-full bg-[#606C38]/10 rounded-full h-1.5 mb-1.5">
                  <div className="bg-[#606C38] h-full rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="text-[10px] lg:text-xs text-[#606C38]/60 font-medium">45% completado (Pág. 312)</p>
              </div>
            </div>

            <button className="w-full mt-5 py-2.5 rounded-xl bg-[#283618] hover:bg-[#606C38] text-white text-sm font-bold transition-all shadow-md shadow-[#283618]/20">
              Actualizar progreso
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default IndexBanner;
