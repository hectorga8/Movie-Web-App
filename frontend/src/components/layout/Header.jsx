import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SearchBar from '../common/SearchBar';

function Header({ variant = "landing" }) {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout(); 
    navigate('/');
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const navLinks = [
    { name: 'Películas', path: '/peliculas' },
    { name: 'Series', path: '/dashboard' },
    { name: 'Explorar', path: '/dashboard' },
    { name: 'Mis listas', path: '/dashboard' },
    { name: 'Más', path: '/dashboard' },
  ];

  const logoPath = user ? "/inicio" : "/";

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0d0e12]/80 backdrop-blur-md h-16 md:h-20">
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-6 h-full flex items-center justify-between gap-4">
          
          {/* Lado Izquierdo: Logo + Nav Desktop */}
          <div className="flex items-center shrink-0">
            <Link 
              to={logoPath}
              className="mr-2 md:mr-10 group" 
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="font-brand text-[20px] md:text-[28px] font-bold text-white tracking-tighter group-hover:text-[#1060ff] transition-colors leading-none">
                CineBox
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} className="text-[15px] font-bold text-white/80 hover:text-white transition-colors leading-none">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* CENTRO: Buscador */}
          <div className="flex-1 max-w-[260px] px-4 md:mx-8">
            <SearchBar />
          </div>

          {/* Lado Derecho: Acciones Desktop */}
          <div className="flex items-center gap-2 md:gap-6 shrink-0">
            <div className="hidden lg:flex items-center gap-6">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 text-sm font-semibold text-white hover:text-[#1060ff] transition-colors cursor-pointer uppercase tracking-wider"
                  >
                    {user.name}
                    <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-4 w-56 bg-[#1a1c23] border border-white/10 rounded-md shadow-xl py-2 z-[60]">
                      <Link to="/perfil" className="block px-4 py-2 text-sm text-white/80 hover:bg-[#1060ff] hover:text-white transition-colors">Mi perfil</Link>
                      <Link to="/mis-peliculas" className="block px-4 py-2 text-sm text-white/80 hover:bg-[#1060ff] hover:text-white transition-colors">Mis películas</Link>
                      <Link to="/mis-series" className="block px-4 py-2 text-sm text-white/80 hover:bg-[#1060ff] hover:text-white transition-colors">Mis series</Link>
                      <Link to="/mis-reviews" className="block px-4 py-2 text-sm text-white/80 hover:bg-[#1060ff] hover:text-white transition-colors">Mis reviews</Link>
                      <Link to="/pendientes" className="block px-4 py-2 text-sm text-white/80 hover:bg-[#1060ff] hover:text-white transition-colors">Pendientes</Link>
                      <Link to="/listas" className="block px-4 py-2 text-sm text-white/80 hover:bg-[#1060ff] hover:text-white transition-colors">Listas</Link>
                      <Link to="/me-gusta" className="block px-4 py-2 text-sm text-white/80 hover:bg-[#1060ff] hover:text-white transition-colors">Me gusta</Link>
                      <Link to="/tags" className="block px-4 py-2 text-sm text-white/80 hover:bg-[#1060ff] hover:text-white transition-colors">Tags</Link>
                      <Link to="/social" className="block px-4 py-2 text-sm text-white/80 hover:bg-[#1060ff] hover:text-white transition-colors">Social</Link>
                      
                      <div className="my-2 border-t border-white/5"></div>
                      
                      <Link to="/ajustes" className="block px-4 py-2 text-sm text-white/80 hover:bg-white/5 transition-colors">Ajustes</Link>
                      <Link to="/subscripciones" className="block px-4 py-2 text-sm text-white/80 hover:bg-white/5 transition-colors">Subscripciones</Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-[15px] font-bold text-white/80 hover:text-white transition-colors">
                    Entrar
                  </Link>
                  <Link to="/registro" className="px-5 py-2.5 rounded-[5px] bg-[#1060ff] text-white text-[13px] font-bold hover:bg-[#2b89ff] transition-all shadow-md shadow-[#1060ff]/20">
                    Empezar
                  </Link>
                </>
              )}
            </div>

            {/* Burger Button (Mobile) */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Menú Móvil */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-[#0d0e12]/95 backdrop-blur-xl pt-24 px-6 pb-10 flex flex-col h-full">
          <nav className="flex flex-col gap-6 mb-12">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-bold text-white/90"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-10 border-t border-white/10">
            {user ? (
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#1060ff] flex items-center justify-center font-bold text-white text-xl">
                    {user.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">{user.name}</p>
                    <p className="text-white/40 text-sm">{user.email}</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-center">Entrar</Link>
                <Link to="/registro" onClick={() => setIsMenuOpen(false)} className="w-full py-4 rounded-xl bg-[#1060ff] text-white font-bold text-center">Registrarse Gratis</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
