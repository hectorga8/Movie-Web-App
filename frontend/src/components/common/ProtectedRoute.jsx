// ─────────────────────────────────────────────────────────────
// ProtectedRoute.jsx
// El guardia de seguridad de tus rutas
// ─────────────────────────────────────────────────────────────
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Mientras se comprueba si hay sesión en localStorage, mostramos un vacío o un spinner
  if (loading) return null;

  // Si no hay usuario, lo mandamos a la landing
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Si hay usuario, renderizamos la página protegida
  return children;
};

export default ProtectedRoute;
