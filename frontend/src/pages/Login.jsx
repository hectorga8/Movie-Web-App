// ─────────────────────────────────────────────────────────────
// Login.jsx
// Página de inicio de sesión con Estado Controlado
// ─────────────────────────────────────────────────────────────
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';

function Login() {
  // 1. Estado para los campos de login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. Manejo del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('--- Intento de Login ---');
    console.log('Email:', email);
    console.log('Password:', password);
    
    alert(`Intentando entrar con: ${email}. El siguiente paso es validar esto en el Backend.`);
  };

  return (
    <div className="grain bg-[#FDFCF7]">
      <AuthCard 
        title="Bienvenido de nuevo" 
        subtitle="Tu biblioteca personal te está esperando."
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#606C38]/60 uppercase tracking-widest ml-1">
              Email
            </label>
            <input 
              type="email" 
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-[#F4F3ED] border border-[#606C38]/15 text-[#283618] placeholder-[#606C38]/40 text-sm focus:outline-none focus:border-[#606C38]/50 focus:ring-4 focus:ring-[#606C38]/5 transition-all"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="text-xs font-bold text-[#606C38]/60 uppercase tracking-widest ml-1">
                Contraseña
              </label>
              <Link to="#" className="text-[10px] font-bold text-[#BC6C25] hover:underline uppercase tracking-wider">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-[#F4F3ED] border border-[#606C38]/15 text-[#283618] placeholder-[#606C38]/40 text-sm focus:outline-none focus:border-[#606C38]/50 focus:ring-4 focus:ring-[#606C38]/5 transition-all"
              required
            />
          </div>

          {/* Botón Entrar */}
          <button 
            type="submit"
            className="w-full py-4 rounded-2xl bg-[#283618] hover:bg-[#606C38] text-white text-sm font-bold transition-all shadow-lg shadow-[#283618]/20 mt-2"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Footer de la tarjeta */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#606C38]/70">
            ¿Aún no tienes cuenta?{' '}
            <Link to="/registro" className="text-[#BC6C25] font-bold hover:underline">
              Crear una ahora
            </Link>
          </p>
        </div>
      </AuthCard>
    </div>
  );
}

export default Login;
