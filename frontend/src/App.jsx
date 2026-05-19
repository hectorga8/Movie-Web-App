import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import ErrorBoundary from './components/common/ErrorBoundary';
import { useAuth } from './context/AuthContext';

// --- Code Splitting (Lazy Loading) para las Páginas ---
const Landing = React.lazy(() => import('./pages/Landing'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Peliculas = React.lazy(() => import('./pages/Peliculas'));
const TodasPeliculas = React.lazy(() => import('./pages/TodasPeliculas'));
const Series = React.lazy(() => import('./pages/Series'));
const TodasSeries = React.lazy(() => import('./pages/TodasSeries'));
const Pelicula = React.lazy(() => import('./pages/Pelicula'));
const Serie = React.lazy(() => import('./pages/Serie'));
const Persona = React.lazy(() => import('./pages/Persona'));
const TodasPersonas = React.lazy(() => import('./pages/TodasPersonas'));
const SearchResults = React.lazy(() => import('./pages/SearchResults'));
const Index = React.lazy(() => import('./pages/Index'));
const PopularReviews = React.lazy(() => import('./pages/PopularReviews'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Listas = React.lazy(() => import('./pages/Listas'));
const CrearLista = React.lazy(() => import('./pages/CrearLista'));
const DetalleLista = React.lazy(() => import('./pages/DetalleLista'));
const Perfil = React.lazy(() => import('./pages/Perfil'));
const Miembros = React.lazy(() => import('./pages/Miembros'));
const MembersList = React.lazy(() => import('./pages/MembersList'));
const NetworkList = React.lazy(() => import('./pages/NetworkList'));
const EditarPerfil = React.lazy(() => import('./pages/EditarPerfil'));
const Watchlist = React.lazy(() => import('./pages/Watchlist'));
const Recomendaciones = React.lazy(() => import('./pages/Recomendaciones'));
const UserPopularReviews = React.lazy(() => import('./pages/UserPopularReviews'));
const UserFilms = React.lazy(() => import('./pages/UserFilms'));
const UserReviews = React.lazy(() => import('./pages/UserReviews'));
const UserLists = React.lazy(() => import('./pages/UserLists'));
const UserLikes = React.lazy(() => import('./pages/UserLikes'));
const Social = React.lazy(() => import('./pages/Social'));
const Onboarding = React.lazy(() => import('./pages/Onboarding'));

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
    <div className="min-h-screen bg-gradient-to-b from-[#0d0e12] to-[#1a1c23] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#1060ff] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#0d0e12] to-[#1a1c23]">
        <HeaderWrapper />
        
        <main className="flex-1 flex flex-col">
          <Suspense fallback={
            <div className="flex-1 flex items-center justify-center bg-transparent">
              <div className="w-8 h-8 border-2 border-[#1060ff] border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <Routes>
              {/* Ruta Raíz Inteligente: Si está logueado va al Index, si no a la Landing */}
              <Route path="/" element={
                user ? <Navigate to="/inicio" replace /> : <Landing />
              } />

              {/* Rutas de Autenticación */}
              <Route path="/login" element={
                user ? <Navigate to="/inicio" replace /> : <Login />
              } />
              
              <Route path="/registro" element={
                user ? (
                  user.onboardingCompleted === false ? <Navigate to="/onboarding" replace /> : <Navigate to="/inicio" replace />
                ) : <Register />
              } />

              {/* Rutas Protegidas */}
              <Route path="/onboarding" element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              } />
              <Route path="/inicio" element={
                <ProtectedRoute>
                  <ErrorBoundary>
                    <Index />
                  </ErrorBoundary>
                </ProtectedRoute>
              } />

              <Route path="/recomendaciones" element={
                <ProtectedRoute>
                  <Recomendaciones />
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

              <Route path="/perfil/:username" element={<Perfil />} />
              <Route path="/perfil/:userId/network" element={<NetworkList />} />

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
              <Route path="/miembros" element={<Miembros />} />
              <Route path="/miembros/populares" element={<MembersList />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/listas" element={<Listas />} />
              <Route path="/listas/nueva" element={
                <ProtectedRoute>
                  <CrearLista />
                </ProtectedRoute>
              } />
              <Route path="/listas/editar/:id" element={
                <ProtectedRoute>
                  <CrearLista />
                </ProtectedRoute>
              } />
              <Route path="/listas/:id" element={<DetalleLista />} />
              <Route path="/reviews-populares" element={<PopularReviews />} />
              <Route path="/watchlist" element={
                <ProtectedRoute>
                  <Watchlist />
                </ProtectedRoute>
              } />
              <Route path="/perfil/:username/watchlist" element={<Watchlist />} />
              <Route path="/perfil/:username/reviews/populares" element={<UserPopularReviews />} />
              <Route path="/perfil/:username/films" element={<UserFilms />} />
              <Route path="/perfil/:username/reviews" element={<UserReviews />} />
              <Route path="/perfil/:username/lists" element={<UserLists />} />
              <Route path="/perfil/:username/likes" element={<UserLikes />} />
              <Route path="/social" element={
                <ProtectedRoute>
                  <Social />
                </ProtectedRoute>
              } />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

