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
    <header className="sticky top-0 z-50 w-full border-b border-[#d5d7db]/40 bg-white/95 backdrop-blur-sm h-16">
      <div className="w-full max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Lado Izquierdo: Logo + Nav */}
        <div className="flex items-center">
          <Link to={user ? "/inicio" : "/"} className="mr-10 group">
            <span className="font-brand text-[28px] font-bold text-black tracking-tighter group-hover:text-[#1060ff] transition-colors leading-none">
              CineBox
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-12">
            <Link to="/inicio" className="text-[15px] font-bold text-[#3b3d45] hover:text-[#1060ff] transition-colors leading-none">
              Películas
            </Link>
            <Link to="/dashboard" className="text-[15px] font-bold text-[#3b3d45] hover:text-[#1060ff] transition-colors leading-none">
              Series
            </Link>
            <Link to="/dashboard" className="text-[15px] font-bold text-[#3b3d45] hover:text-[#1060ff] transition-colors leading-none">
              Explorar
            </Link>
            <Link to="/dashboard" className="text-[15px] font-bold text-[#3b3d45] hover:text-[#1060ff] transition-colors leading-none">
              Mis listas
            </Link>
            <Link to="/dashboard" className="text-[15px] font-bold text-[#3b3d45] hover:text-[#1060ff] transition-colors leading-none">
              Más
            </Link>
          </nav>
        </div>

        {/* Lado Derecho: Buscador + Acciones */}
        <div className="flex items-center gap-6">
          <div className="max-w-[280px] hidden md:block">
            <SearchBar />
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                <span className="text-sm font-semibold text-black hidden sm:block">
                  {user.name}
                </span>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-[5px] border border-[#d5d7db] text-[#3b3d45] text-[13px] font-bold hover:bg-[#f1f2f3] transition-all cursor-pointer"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-[15px] font-bold text-[#3b3d45] hover:text-[#1060ff] transition-colors">
                  Entrar
                </Link>
                <Link to="/registro" className="px-5 py-2.5 rounded-[5px] bg-[#1060ff] text-white text-[13px] 
                font-bold hover:bg-[#2b89ff] transition-all shadow-md shadow-[#1060ff]/20">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}

export default Header;
