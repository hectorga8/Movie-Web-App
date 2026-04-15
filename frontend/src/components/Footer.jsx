// ─────────────────────────────────────────────
// Footer.jsx
// Pie de página compartido en todas las páginas
// ─────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#283618] text-[#FDFCF7]">

      {/* ── Grid principal ── */}
      <div className="w-full max-w-[1400px] mx-auto px-8 pt-16 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-40 text-center lg:text-left">

        {/* Marca + newsletter */}
        <div className="lg:col-span-2">
          <a href="#" className="flex items-center gap-3 mb-5 group w-fit lg:mx-0 mx-auto">
            <span className="font-['Playfair_Display',Georgia,serif] text-xl font-black text-[#FDFCF7] group-hover:text-white transition-colors">
              Folio
            </span>
          </a>
          <p className="text-sm text-[#FDFCF7]/70 leading-relaxed mb-6 max-w-xs text-center lg:text-left mx-auto lg:mx-0">
            Tu biblioteca personal inteligente. Descubre, organiza y disfruta más de tus lecturas con la ayuda de la IA.
          </p>

          <p className="text-xs font-bold text-[#FDFCF7]/60 uppercase tracking-widest mb-3">
            Newsletter semanal
          </p>
          <div className="flex gap-2 mb-6">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-3 py-2 rounded-lg bg-[#606C38]/30 border border-[#606C38]/30 text-white placeholder-[#FDFCF7]/40 text-xs focus:outline-none focus:border-[#606C38] transition-all"
            />
            <button className="px-3 py-2 rounded-lg bg-[#606C38] hover:bg-[#4A542B] text-white text-xs font-bold transition-all whitespace-nowrap">
              Suscribir
            </button>
          </div>

          {/* Redes sociales */}
          <div className="flex gap-3 justify-center lg:justify-start">
            <a href="#" className="w-9 h-9 rounded-lg bg-[#606C38]/30 hover:bg-[#606C38] flex items-center justify-center transition-all text-[#FDFCF7]/80 hover:text-white">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-[#606C38]/30 hover:bg-[#606C38] flex items-center justify-center transition-all text-[#FDFCF7]/80 hover:text-white">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Producto */}
        <div>
          <h4 className="font-['Playfair_Display',Georgia,serif] text-sm font-bold text-[#FDFCF7] uppercase tracking-widest mb-5">
            Producto
          </h4>
          <ul className="space-y-3 text-sm">
            {["Características", "Planes y precios", "Folio AI", "Reading Challenge", "Comunidad"].map((item) => (
              <li key={item}>
                <a href="#" className="text-[#FDFCF7]/70 hover:text-white transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Explorar */}
        <div>
          <h4 className="font-['Playfair_Display',Georgia,serif] text-sm font-bold text-[#FDFCF7] uppercase tracking-widest mb-5">
            Explorar
          </h4>
          <ul className="space-y-3 text-sm">
            {["Ficción", "No ficción", "Fantasía y Sci-Fi", "Misterio y thriller", "Todos los géneros →"].map((item) => (
              <li key={item}>
                <a href="#" className="text-[#FDFCF7]/70 hover:text-white transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Empresa + Soporte */}
        <div>
          <h4 className="font-['Playfair_Display',Georgia,serif] text-sm font-bold text-[#FDFCF7] uppercase tracking-widest mb-5">
            Empresa
          </h4>
          <ul className="space-y-3 text-sm mb-8">
            <li><a href="#" className="text-[#FDFCF7]/70 hover:text-white transition-colors">Sobre nosotros</a></li>
          </ul>
          <h4 className="font-['Playfair_Display',Georgia,serif] text-sm font-bold text-[#FDFCF7] uppercase tracking-widest mb-4">
            Soporte
          </h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="text-[#FDFCF7]/70 hover:text-white transition-colors">Contacto</a></li>
          </ul>
        </div>

      </div>

      {/* ── Separador ── */}
      <div className="w-full max-w-[1400px] mx-auto px-8">
        <div className="h-px bg-[#606C38]/30"></div>
      </div>

      {/* ── Barra inferior ── */}
      <div className="w-full max-w-[1400px] mx-auto px-8 py-6 flex flex-col sm:flex-row items-center justify-center lg:justify-between gap-4">
        <p className="text-xs text-[#FDFCF7]/50">© 2026 Folio. Todos los derechos reservados.</p>
        <div className="flex flex-wrap justify-center gap-5 text-xs text-[#FDFCF7]/60">
          {["Términos de servicio", "Política de privacidad", "Cookies"].map((item) => (
            <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-[#FDFCF7]/60">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>Español (ES)</span>
        </div>
      </div>

    </footer>
  )
}

export default Footer