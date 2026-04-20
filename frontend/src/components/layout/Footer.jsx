// ─────────────────────────────────────────────────────────────
// Footer.jsx - Versión CineBox (Inspirado en Hashicorp)
// ─────────────────────────────────────────────────────────────
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#15181e] text-[#efeff1] border-t border-[#d5d7db]/10 pt-16 pb-8">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        
        {/* Grid Principal de Navegación */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Columna 1: Brand & Status */}
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-white rounded-[4px] flex items-center justify-center text-black font-bold text-xl">C</div>
              <span className="font-brand text-2xl font-bold text-white">
                CineBox
              </span>
            </Link>
            <p className="text-[15px] text-[#d5d7db] leading-[1.63] max-w-[300px]">
              La infraestructura definitiva para la gestión de colecciones cinematográficas a escala global.
            </p>
            
          </div>

          {/* Columna 2: Plataforma */}
          <div>
            <h3 className="mb-6">Plataforma</h3>
            <ul className="space-y-4">
              <li><Link to="/inicio" className="text-[15px] text-[#d5d7db] hover:text-[#1060ff] transition-colors">Inicio</Link></li>
              <li><Link to="/dashboard" className="text-[15px] text-[#d5d7db] hover:text-[#1060ff] transition-colors">Explorar</Link></li>
              <li><Link to="/dashboard" className="text-[15px] text-[#d5d7db] hover:text-[#1060ff] transition-colors">Mi Biblioteca</Link></li>
            </ul>
          </div>

          {/* Columna 3: Ecosistema */}
          <div>
            <h3 className="mb-6">Ecosistema</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-[15px] text-[#d5d7db] hover:text-[#1060ff] transition-colors">CineBox API</a></li>
              <li><a href="#" className="text-[15px] text-[#d5d7db] hover:text-[#1060ff] transition-colors">Documentación</a></li>
              <li><a href="#" className="text-[15px] text-[#d5d7db] hover:text-[#1060ff] transition-colors">TMDb Integration</a></li>
            </ul>
          </div>

          {/* Columna 4: Compañía */}
          <div>
            <h3 className="mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-[15px] text-[#d5d7db] hover:text-[#1060ff] transition-colors">Privacidad</a></li>
              <li><a href="#" className="text-[15px] text-[#d5d7db] hover:text-[#1060ff] transition-colors">Términos</a></li>
              <li><a href="#" className="text-[15px] text-[#d5d7db] hover:text-[#1060ff] transition-colors">Seguridad</a></li>
            </ul>
          </div>

        </div>

        {/* Línea Final: Copyright & Social */}
        <div className="pt-8 border-t border-[#d5d7db]/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-[13px] text-[#656a76]">
            <span>© {currentYear} CineBox, Inc.</span>
            <span className="hidden md:inline">·</span>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
          <div className="text-[11px] font-bold uppercase tracking-[1px] text-[#656a76] flex items-center gap-4">
            <span>Built by Hector G.</span>
            <span className="w-4 h-4 text-white">
              <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
