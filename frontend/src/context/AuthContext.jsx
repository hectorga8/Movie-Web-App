// ─────────────────────────────────────────────────────────────
// AuthContext.jsx
// Gestión global de la sesión del usuario
// ─────────────────────────────────────────────────────────────
import { createContext, useState, useEffect, useContext, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para Cerrar Sesión
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const fetchUserProfile = useCallback(async (currentToken) => {
    try {
      const res = await fetch('http://localhost:5001/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${currentToken}`
        }
      });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else if (res.status === 401) {
        logout();
      }
    } catch (error) {
      console.error("Error fetching user profile", error);
    } finally {
      setLoading(false);
    }
  }, [logout]);

  // Al cargar la app, miramos si hay una sesión guardada
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        fetchUserProfile(savedToken);
      } catch (error) {
        console.error("Error parsing saved user", error);
        logout();
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [fetchUserProfile, logout]);

  // Función para Iniciar Sesión
  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    fetchUserProfile(userToken); // Get full profile right after login
  };

  const updateUserLocally = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, updateUserLocally, fetchUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);
