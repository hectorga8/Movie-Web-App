// ─────────────────────────────────────────────────────────────
// Register.jsx
// Versión con Validaciones Visuales
// ─────────────────────────────────────────────────────────────
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // Estado para el mensaje de error
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpiamos errores anteriores

    // 1. Validación de campos vacíos
    if (!name || !email || !password) {
      setError('Por favor, rellena todos los campos obligatorios.');
      return;
    }

    // 2. Validación de formato de email (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, introduce un email con formato válido.');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user, data.token);
        navigate('/inicio');
      } else {
        setError(data.message || 'Error al crear la cuenta.');
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grain bg-[#FDFCF7]">
      <AuthCard 
        title="Crea tu biblioteca" 
        subtitle="Únete a Folio y organiza tus lecturas de forma inteligente."
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* BLOQUE DE ERROR (Solo aparece si hay error) */}
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2 animate-shake">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#606C38]/60 uppercase tracking-widest ml-1">Nombre completo</label>
            <input 
              type="text" 
              placeholder="Juan Pérez"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-3 rounded-2xl bg-[#F4F3ED] border ${error && !name ? 'border-red-300' : 'border-[#606C38]/15'} text-[#283618] text-sm focus:outline-none focus:border-[#606C38]/50 transition-all`}
            />
          </div>

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
            <label className="text-xs font-bold text-[#606C38]/60 uppercase tracking-widest ml-1">Contraseña</label>
            <input 
              type="password" 
              placeholder="Crea una contraseña segura"
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
            {loading ? 'Procesando...' : 'Empezar gratis'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-[#606C38]/70">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-[#BC6C25] font-bold hover:underline">Iniciar Sesión</Link>
          </p>
        </div>
      </AuthCard>
    </div>
  );
}

export default Register;
