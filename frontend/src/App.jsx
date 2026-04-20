import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Pelicula from './pages/Pelicula';
import Serie from './pages/Serie';
import SearchResults from './pages/SearchResults';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/common/ProtectedRoute';

// Componente para decidir qué Header mostrar según la página
function HeaderWrapper() {
  const location = useLocation();
  const landingPaths = ['/', '/login', '/registro'];
  const variant = landingPaths.includes(location.pathname) ? 'landing' : 'app';
  
  return <Header variant={variant} />;
}

function App() {
  return (
    <Router>
      {/* Contenedor principal flex para asegurar centrado vertical y footer al fondo */}
      <div className="flex flex-col min-h-screen bg-[#0d0e12]">
        <HeaderWrapper />
        
        {/* El main crece para ocupar todo el espacio, permitiendo centrar su contenido */}
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />

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
            <Route path="/pelicula/:id" element={<Pelicula />} />
            <Route path="/serie/:id" element={<Serie />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
