// ─────────────────────────────────────────────────────────────
// Header.jsx
// Barra de navegación superior - Respetando diseño minimalista
// ─────────────────────────────────────────────────────────────
import { Link } from 'react-router-dom';

function Header({ variant = "landing" }) {
  const isApp = variant === "app";

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-[#606C38]/10 bg-[#FDFCF7]/85">
      <div className="w-full max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between gap-6">

        {/* Logo - Siempre a la izquierda */}
        <Link to="/" className="shrink-0 group">
          <span className="font-['Playfair_Display',Georgia,serif] text-3xl font-black text-[#283618] tracking-tight group-hover:text-[#606C38] transition-colors">
            Folio
          </span>
        </Link>

        {/* TODO LO DEMÁS solo aparece si es variante "app" */}
        {isApp && (
          <>
            {/* Buscador central (Desktop) */}
            <div className="flex-1 max-w-md hidden md:block">
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#606C38]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/>
                </svg>
                <input
                  type="search"
                  placeholder="Busca libros, autores…"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F4F3ED] border border-[#606C38]/15 text-[#283618] placeholder-[#606C38]/50 text-sm focus:outline-none focus:border-[#606C38]/50 transition-all"
                />
              </div>
            </div>

            {/* Nav links (App) */}
            <nav className="hidden lg:flex items-center gap-1 text-sm shrink-0">
              <Link to="/inicio" className="px-3.5 py-2 rounded-lg text-[#283618] hover:bg-[#606C38]/8 font-medium transition-all">Inicio</Link>
              <Link to="/dashboard" className="px-3.5 py-2 rounded-lg text-[#283618] hover:bg-[#606C38]/8 font-medium transition-all">Explorar</Link>
              <Link to="#" className="px-3.5 py-2 rounded-lg text-[#283618] hover:bg-[#606C38]/8 font-medium transition-all">Mis libros</Link>
            </nav>

            {/* Perfil (App) */}
            <div className="flex items-center gap-2 shrink-0">
              <button className="px-4 py-2 rounded-xl bg-[#283618] hover:bg-[#606C38] text-white text-sm font-bold transition-all">
                Mi perfil
              </button>
            </div>
          </>
        )}

      </div>
    </header>
  );
}

export default Header;
