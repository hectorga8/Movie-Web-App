// ─────────────────────────────────────────────────────────────
// Sidebar.jsx
// Navegación lateral completa con Colecciones, Listas y Estadísticas
// ─────────────────────────────────────────────────────────────

function Sidebar({ counts = { total: 0, reading: 0, pending: 0, read: 0 } }) {
  return (
    <aside className="w-full md:w-[240px] shrink-0 fade-up delay-1">
      <div className="md:sticky md:top-24 space-y-8">

        {/* ── SECCIÓN: COLECCIONES ── */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#606C38]/60 mb-4 px-3">Colecciones</h3>
          <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            
            <a href="#" className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-[#283618] text-[#FDFCF7] font-medium transition-all shrink-0">
              <div className="flex items-center gap-3">
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10-2a2 2 0 012 2v11a2 2 0 01-2 2h-2a2 2 0 01-2-2V6a2 2 0 012-2h2z"/></svg>
                Todos los libros
              </div>
              <span className="text-xs font-bold bg-[#FDFCF7]/20 px-2 py-0.5 rounded-full">{counts.total}</span>
            </a>

            <a href="#" className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-[#283618] hover:bg-[#F4F3ED] font-medium transition-all shrink-0">
              <div className="flex items-center gap-3">
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Leyendo
              </div>
              <span className="text-xs font-bold text-[#606C38] bg-[#606C38]/10 px-2 py-0.5 rounded-full">{counts.reading}</span>
            </a>

            <a href="#" className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-[#283618] hover:bg-[#F4F3ED] font-medium transition-all shrink-0">
              <div className="flex items-center gap-3">
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                Pendientes
              </div>
              <span className="text-xs font-bold text-[#606C38] bg-[#606C38]/10 px-2 py-0.5 rounded-full">{counts.pending}</span>
            </a>

            <a href="#" className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-[#283618] hover:bg-[#F4F3ED] font-medium transition-all shrink-0">
              <div className="flex items-center gap-3">
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                Leídos
              </div>
              <span className="text-xs font-bold text-[#606C38] bg-[#606C38]/10 px-2 py-0.5 rounded-full">{counts.read}</span>
            </a>

          </nav>
        </div>

        {/* ── SECCIÓN: MIS LISTAS ── */}
        <div className="hidden md:block">
          <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#606C38]/60 mb-4 px-3 flex items-center justify-between">
            Mis Listas
            <button className="hover:text-[#BC6C25] transition-colors text-lg" title="Crear nueva lista">+</button>
          </h3>
          <nav className="flex flex-col gap-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#283618] hover:bg-[#F4F3ED] font-medium transition-all">
              <svg className="w-[18px] h-[18px] text-[#BC6C25]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
              Favoritos
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#283618] hover:bg-[#F4F3ED] font-medium transition-all">
              <span className="w-2 h-2 rounded-full bg-[#606C38] ml-1.5 mr-1"></span>
              Ciencia Ficción
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#283618] hover:bg-[#F4F3ED] font-medium transition-all">
              <span className="w-2 h-2 rounded-full bg-[#BC6C25] ml-1.5 mr-1"></span>
              Clásicos
            </a>
          </nav>
        </div>

        {/* ── SECCIÓN: TU AÑO LECTOR ── */}
        <div className="hidden md:block border-t border-[#606C38]/10 pt-6">
          <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#606C38]/60 mb-4 px-3">Tu año lector</p>
          <div className="px-3 grid grid-cols-2 gap-3">
            <div className="bg-white border border-[#606C38]/10 rounded-xl p-3 text-center shadow-sm">
              <p className="font-['Playfair_Display',Georgia,serif] text-2xl font-bold text-[#283618] leading-none">{counts.read}</p>
              <p className="text-[10px] text-[#606C38]/70 mt-1 uppercase tracking-wide">Leídos</p>
            </div>
            <div className="bg-white border border-[#606C38]/10 rounded-xl p-3 text-center shadow-sm">
              <p className="font-['Playfair_Display',Georgia,serif] text-2xl font-bold text-[#BC6C25] leading-none">
                {counts.read > 0 ? Math.round((counts.read / 12) * 100) : 0}%
              </p>
              <p className="text-[10px] text-[#606C38]/70 mt-1 uppercase tracking-wide">Meta</p>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
}

export default Sidebar;
