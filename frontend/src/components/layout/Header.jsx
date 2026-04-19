// ─────────────────────────────────────────────────────────────
// Header.jsx - Versión CineBox (Inspirado en Hashicorp)
// ─────────────────────────────────────────────────────────────
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SearchBar from '../common/SearchBar';

function Header({ variant = "landing" }) {
  const { user, logout } = useAuth(); 
  const isApp = variant === "app";
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#d5d7db]/40 bg-white/95 backdrop-blur-sm">
      <div className="w-full max-w-[1150px] mx-auto px-6 h-16 flex items-center justify-between gap-8">

        {/* Logo - Solo Texto (Hashicorp Style) */}
        <Link 
          to={user ? "/inicio" : "/"} 
          className="shrink-0 group"
        >
          <span className="font-['Playfair_Display',Georgia,serif] text-3xl font-bold text-black tracking-tighter group-hover:text-[#1060ff] transition-colors">
            CineBox
          </span>
        </Link>

        {(isApp || user) && (
          <>
            {/* Buscador Central (Hashicorp Style) */}
            <div className="flex-1 max-w-md hidden md:block">
              <SearchBar />
            </div>

            {/* Nav Links (system-ui 15px weight 500) */}
            <nav className="hidden lg:flex items-center gap-6 text-[15px] font-medium text-[#3b3d45] shrink-0">
              <Link to="/inicio" className="hover:text-[#1060ff] transition-colors">Inicio</Link>
              <Link to="/dashboard" className="hover:text-[#1060ff] transition-colors">Explorar</Link>
              <Link to="/dashboard" className="hover:text-[#1060ff] transition-colors">Mis Películas</Link>
            </nav>

            {/* Acciones de Usuario */}
            <div className="flex items-center gap-4 shrink-0">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-black hidden sm:block">
                    {user.name}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-[5px] border border-[#d5d7db] text-[#3b3d45] text-[13px] font-bold hover:bg-[#f1f2f3] transition-all"
                  >
                    Salir
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link to="/login" className="text-[15px] font-medium text-[#3b3d45] hover:text-[#1060ff]">Entrar</Link>
                  <Link to="/registro" className="px-4 py-2 rounded-[5px] bg-black text-white text-[13px] font-bold hover:bg-[#3b3d45] transition-all shadow-sm">
                    Empezar
                  </Link>
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </header>
  );
}

export default Header;
