// ─────────────────────────────────────────────────────────────
// Login.jsx
// Inicio de sesión con Email y Google
// ─────────────────────────────────────────────────────────────
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';
import { useAuth } from '../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  // Función para manejar el login de Google
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: tokenResponse.access_token })
        });

        const data = await res.json();
        if (res.ok) {
          login(data.user, data.token);
          navigate('/inicio');
        } else {
          setError(data.message || 'Error al autenticar con Google');
        }
      } catch (err) {
        setError('Error al conectar con el servidor.');
      } finally {
        setLoading(false);
      }
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, introduce tu email y contraseña.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, introduce un email con formato válido.');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user, data.token);
        navigate('/inicio');
      } else {
        setError(data.message || 'Error al iniciar sesión.');
      }
    } catch (err) {
      setError('Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grain bg-[#FDFCF7]">
      <AuthCard 
        title="Bienvenido de nuevo" 
        subtitle="Tu biblioteca personal te está esperando."
      >
        <div className="space-y-6">
          {/* Botón de Google */}
          <button 
            onClick={() => handleGoogleLogin()}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl bg-white hover:bg-[#F4F3ED] border border-[#606C38]/20 text-[#283618] text-sm font-bold transition-all shadow-sm shadow-[#283618]/5"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 32 32">
              <path d="M31.107 16.31c0-1.072-.096-2.102-.275-3.093H15.867v5.85h8.552c-.368 1.986-1.442 3.668-3.123 4.843v4.025h5.059c2.96-2.724 4.752-6.735 4.752-11.625z" fill="#4285F4"/>
              <path d="M15.867 31.81c4.312 0 7.923-1.432 10.564-3.875l-5.059-4.025c-1.401.938-3.193 1.493-5.505 1.493-4.234 0-7.817-2.861-9.094-6.711H1.54v4.156c2.64 5.244 8.044 8.962 14.327 8.962z" fill="#34A853"/>
              <path d="M6.773 18.692a9.605 9.605 0 0 1 0-6.113V8.423H1.54a15.875 15.875 0 0 0 0 14.425l5.233-4.156z" fill="#FBBC05"/>
              <path d="M15.867 5.143c2.345 0 4.452.806 6.108 2.393l4.581-4.581C23.784.806 20.179 0 15.867 0 9.584 0 4.18 3.718 1.54 8.962l5.233 4.156c1.277-3.85 4.86-6.711 9.094-6.711z" fill="#EA4335"/>
            </svg>
            Continuar con Google
          </button>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[#606C38]/10"></div>
            <span className="text-[10px] font-bold text-[#606C38]/40 uppercase tracking-widest">o con email</span>
            <div className="flex-1 h-px bg-[#606C38]/10"></div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#606C38]/60 uppercase tracking-widest ml-1">Email</label>
              <input 
                type="email" 
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-2xl bg-[#F4F3ED] border ${error && !email ? 'border-red-300' : 'border-[#606C38]/15'} text-[#283618] text-sm focus:outline-none focus:border-[#606C38]/50 transition-all`}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <label className="text-xs font-bold text-[#606C38]/60 uppercase tracking-widest ml-1">Contraseña</label>
                <Link to="#" className="text-[10px] font-bold text-[#BC6C25] hover:underline uppercase tracking-wider">¿Olvidaste tu contraseña?</Link>
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 rounded-2xl bg-[#F4F3ED] border ${error && !password ? 'border-red-300' : 'border-[#606C38]/15'} text-[#283618] text-sm focus:outline-none focus:border-[#606C38]/50 transition-all`}
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl text-white text-sm font-bold transition-all shadow-lg mt-2 ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#283618] hover:bg-[#606C38] shadow-[#283618]/20'
              }`}
            >
              {loading ? 'Entrando...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-[#606C38]/70">
              ¿Aún no tienes cuenta?{' '}
              <Link to="/registro" className="text-[#BC6C25] font-bold hover:underline">Crear una ahora</Link>
            </p>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}

export default Login;
