// ─────────────────────────────────────────────────────────────
// Sidebar.jsx - Versión CineBox
// Navegación lateral para gestión de Películas
// ─────────────────────────────────────────────────────────────

function Sidebar({ counts = { total: 0, reading: 0, pending: 0, read: 0 } }) {
  return (
    <aside className="w-full md:w-[240px] shrink-0 fade-up delay-1 font-sans text-[15px]">
      <div className="md:sticky md:top-24 space-y-10">

        {/* ── SECCIÓN: COLECCIONES ── */}
        <div>
          <h3 className="label-uppercase mb-4 px-3">Colecciones</h3>
          <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            
            <a href="#" className="flex items-center justify-between gap-3 px-3 py-2 rounded-[4px] bg-[#15181e] text-[#efeff1] font-bold transition-all shrink-0 shadow-whisper">
              <div className="flex items-center gap-3">
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h4m10 0h4M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>
                Todas las películas
              </div>
              <span className="text-[11px] font-bold bg-white/10 px-2 py-0.5 rounded-[2px]">{counts.total}</span>
            </a>

            <a href="#" className="flex items-center justify-between gap-3 px-3 py-2 rounded-[4px] text-[#3b3d45] hover:bg-[#f1f2f3] font-medium transition-all shrink-0">
              <div className="flex items-center gap-3">
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Viendo
              </div>
              <span className="text-[11px] font-bold text-[#656a76] bg-[#d5d7db]/30 px-2 py-0.5 rounded-[2px]">{counts.reading}</span>
            </a>

            <a href="#" className="flex items-center justify-between gap-3 px-3 py-2 rounded-[4px] text-[#3b3d45] hover:bg-[#f1f2f3] font-medium transition-all shrink-0">
              <div className="flex items-center gap-3">
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                Pendientes
              </div>
              <span className="text-[11px] font-bold text-[#656a76] bg-[#d5d7db]/30 px-2 py-0.5 rounded-[2px]">{counts.pending}</span>
            </a>

            <a href="#" className="flex items-center justify-between gap-3 px-3 py-2 rounded-[4px] text-[#3b3d45] hover:bg-[#f1f2f3] font-medium transition-all shrink-0">
              <div className="flex items-center gap-3">
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                Vistas
              </div>
              <span className="text-[11px] font-bold text-[#656a76] bg-[#d5d7db]/30 px-2 py-0.5 rounded-[2px]">{counts.read}</span>
            </a>

          </nav>
        </div>

        {/* ── SECCIÓN: MIS LISTAS ── */}
        <div className="hidden md:block">
          <h3 className="label-uppercase mb-4 px-3 flex items-center justify-between">
            Mis Listas
            <button className="hover:text-[#1060ff] transition-colors text-lg" title="Crear nueva lista">+</button>
          </h3>
          <nav className="flex flex-col gap-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-[4px] text-[#3b3d45] hover:bg-[#f1f2f3] font-medium transition-all">
              <svg className="w-[18px] h-[18px] text-[#1060ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
              Favoritos
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-[4px] text-[#3b3d45] hover:bg-[#f1f2f3] font-medium transition-all">
              <span className="w-2 h-2 rounded-full bg-[#7b42bc] ml-1.5 mr-1"></span>
              Ciencia Ficción
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-[4px] text-[#3b3d45] hover:bg-[#f1f2f3] font-medium transition-all">
              <span className="w-2 h-2 rounded-full bg-[#14c6cb] ml-1.5 mr-1"></span>
              Películas de Culto
            </a>
          </nav>
        </div>

        {/* ── SECCIÓN: TU AÑO CINÉFILO ── */}
        <div className="hidden md:block border-t border-[#d5d7db] pt-8">
          <p className="label-uppercase mb-4 px-3">Tu año cinéfilo</p>
          <div className="px-3 grid grid-cols-2 gap-4">
            <div className="bg-white border border-[#d5d7db]/60 rounded-[4px] p-3 text-center shadow-whisper">
              <p className="font-brand h-tight text-2xl text-black leading-none">{counts.read}</p>
              <p className="label-uppercase text-[10px] mt-2 opacity-70">Vistas</p>
            </div>
            <div className="bg-white border border-[#d5d7db]/60 rounded-[4px] p-3 text-center shadow-whisper">
              <p className="font-brand h-tight text-2xl text-[#1060ff] leading-none">
                {counts.read > 0 ? Math.round((counts.read / 24) * 100) : 0}%
              </p>
              <p className="label-uppercase text-[10px] mt-2 opacity-70">Meta</p>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
}

export default Sidebar;
