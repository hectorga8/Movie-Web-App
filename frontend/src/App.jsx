import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Peliculas from './pages/Peliculas';
import TodasPeliculas from './pages/TodasPeliculas';
import Series from './pages/Series';
import TodasSeries from './pages/TodasSeries';
import Pelicula from './pages/Pelicula';
import Serie from './pages/Serie';
import Persona from './pages/Persona';
import TodasPersonas from './pages/TodasPersonas';
import SearchResults from './pages/SearchResults';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Listas from './pages/Listas';
import CrearLista from './pages/CrearLista';
import DetalleLista from './pages/DetalleLista';
import Perfil from './pages/Perfil';
import EditarPerfil from './pages/EditarPerfil';
import ProtectedRoute from './components/common/ProtectedRoute';
import { useAuth } from './context/AuthContext';

// Utilidad para subir al inicio en cada cambio de ruta
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Componente para decidir qué Header mostrar según la página
function HeaderWrapper() {
  const location = useLocation();
  const landingPaths = ['/', '/login', '/registro'];
  const variant = landingPaths.includes(location.pathname) ? 'landing' : 'app';
  
  return <Header variant={variant} />;
}

function App() {
  const { user, loading } = useAuth();

  // Mientras se carga el estado de autenticación (JWT check), no renderizamos nada para evitar parpadeos
  if (loading) return (
    <div className="min-h-screen bg-[#0d0e12] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#1060ff] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#0d0e12]">
        <HeaderWrapper />
        
        <main className="flex-1 flex flex-col">
          <Routes>
            {/* Ruta Raíz Inteligente: Si está logueado va al Index, si no a la Landing */}
            <Route path="/" element={
              user ? <Navigate to="/inicio" replace /> : <Landing />
            } />

            {/* Rutas de Autenticación: Redirigen al inicio si ya hay sesión */}
            <Route path="/login" element={
              user ? <Navigate to="/inicio" replace /> : <Login />
            } />
            
            <Route path="/registro" element={
              user ? <Navigate to="/inicio" replace /> : <Register />
            } />

            {/* Rutas Protegidas */}
            <Route path="/inicio" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/perfil" element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            } />

            <Route path="/perfil/editar" element={
              <ProtectedRoute>
                <EditarPerfil />
              </ProtectedRoute>
            } />

            {/* Rutas Públicas / De Contenido */}
            <Route path="/peliculas" element={<Peliculas />} />
            <Route path="/peliculas/todas" element={<TodasPeliculas />} />
            <Route path="/series" element={<Series />} />
            <Route path="/series/todas" element={<TodasSeries />} />
            <Route path="/pelicula/:id" element={<Pelicula />} />
            <Route path="/serie/:id" element={<Serie />} />
            <Route path="/persona/:id" element={<Persona />} />
            <Route path="/personas/todas" element={<TodasPersonas />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/listas" element={<Listas />} />
            <Route path="/listas/nueva" element={
              <ProtectedRoute>
                <CrearLista />
              </ProtectedRoute>
            } />
            <Route path="/listas/:id" element={<DetalleLista />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

