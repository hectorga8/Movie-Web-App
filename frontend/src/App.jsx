import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Libro from './pages/Libro';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';

// Creamos un pequeño componente para decidir qué Header mostrar
function HeaderWrapper() {
  const location = useLocation();
  // Si estamos en la raíz (/), el login o el registro, usamos la variante "landing"
  const landingPaths = ['/', '/login', '/registro'];
  const variant = landingPaths.includes(location.pathname) ? 'landing' : 'app';
  
  return <Header variant={variant} />;
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#FDFCF7]">
        
        {/* El Header ahora vive aquí, fuera de las rutas, para que sea global */}
        <HeaderWrapper />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/inicio" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/libro/:id" element={<Libro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
          </Routes>
        </main>

        {/* El Footer también es global */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
