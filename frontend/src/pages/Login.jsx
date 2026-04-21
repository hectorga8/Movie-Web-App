// ─────────────────────────────────────────────────────────────
// Login.jsx - Versión Compacta CineBox (Igual que Registro)
// ─────────────────────────────────────────────────────────────
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: tokenResponse.access_token })
        });
        const data = await res.json();
        if (res.ok) {
          login(data.user, data.token);
          navigate('/inicio');
        } else { setError(data.message || 'Error con Google'); }
      } catch (err) { setError('Error de red CineBox Cloud.'); }
      finally { setLoading(false); }
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Introduce tus credenciales.'); return; }
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) { login(data.user, data.token); navigate('/inicio'); }
      else { setError(data.message || 'Credenciales no reconocidas.'); }
    } catch (err) { setError('Error de conexión.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#0d0e12] py-8 px-6 relative overflow-hidden">
      {/* Fondo decorativo sutil */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,96,255,0.05),transparent_70%)] pointer-events-none"></div>

      <div className="fade-up w-full max-w-[420px] relative z-10">
        
        <div className="w-full bg-white/5 backdrop-blur-xl rounded-[12px] overflow-hidden shadow-2xl border border-white/10">
          {/* Línea de acento color Action Blue */}
          <div className="h-1.5 w-full bg-[#1060ff] shadow-[0_0_15px_rgba(16,96,255,0.4)]"></div>
          
          <div className="p-8 md:p-10">
            <header className="mb-8 text-center">
              <h2 className="text-[32px] font-bold text-white h-tight mb-3 tracking-tight">
                Inicia Sesión
              </h2>
              <p className="text-[14px] text-white/50 leading-relaxed">
                Accede a tu infraestructura de cine privada.
              </p>
            </header>

            <div className="space-y-6">
              <button 
                onClick={() => handleGoogleLogin()}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-[8px] bg-white/5 
                hover:bg-white/10 border border-white/10 text-white text-[12px] font-bold transition-all active:scale-[0.98] cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 32 32">
                  <path d="M31.107 16.31c0-1.072-.096-2.102-.275-3.093H15.867v5.85h8.552c-.368 1.986-1.442 3.668-3.123 4.843v4.025h5.059c2.96-2.724 4.752-6.735 4.752-11.625z" fill="#4285F4"/>
                  <path d="M15.867 31.81c4.312 0 7.923-1.432 10.564-3.875l-5.059-4.025c-1.401.938-3.193 1.493-5.505 1.493-4.234 0-7.817-2.861-9.094-6.711H1.54v4.156c2.64 5.244 8.044 8.962 14.327 8.962z" fill="#34A853"/>
                  <path d="M6.773 18.692a9.605 9.605 0 0 1 0-6.113V8.423H1.54a15.875 15.875 0 0 0 0 14.425l5.233-4.156z" fill="#FBBC05"/>
                  <path d="M15.867 5.143c2.345 0 4.452.806 6.108 2.393l4.581-4.581C23.784.806 20.179 0 15.867 0 9.584 0 4.18 3.718 1.54 8.962l5.233 4.156c1.277-3.85 4.86-6.711 9.094-6.711z" fill="#EA4335"/>
                </svg>
                INICIAR SESIÓN CON GOOGLE
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-[1px] bg-white/5"></div>
                <span className="text-[9px] font-bold text-white/20 uppercase tracking-[2px]">o acceso local</span>
                <div className="flex-1 h-[1px] bg-white/5"></div>
              </div>

              <form className="space-y-5 flex flex-col items-center" onSubmit={handleSubmit}>
                {error && (
                  <div className="w-full p-3 rounded-[6px] bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-medium text-center">
                    {error}
                  </div>
                )}

                <div className="w-full space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[1.5px] text-white/40 block text-center">Email</label>
                  <input 
                    type="email" 
                    placeholder="usuario@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-[8px] bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#1060ff] focus:bg-white/10 transition-all text-center placeholder:text-white/20"
                    required
                  />
                </div>

                <div className="w-full space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[1.5px] text-white/40 block text-center">Contraseña</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-[8px] bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#1060ff] focus:bg-white/10 transition-all text-center placeholder:text-white/20"
                    required
                  />
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-[8px] bg-[#1060ff] hover:bg-[#2b89ff] text-white text-[12px] font-bold transition-all mt-4 tracking-[1.5px] uppercase active:scale-[0.99] shadow-lg shadow-[#1060ff]/20 cursor-pointer"
                >
                  {loading ? 'AUTENTICANDO...' : 'INICIAR SESIÓN'}
                </button>
              </form>

              <div className="text-center pt-8 border-t border-white/5">
                <p className="text-[13px] text-white/40">
                  ¿No tienes una cuenta?{' '}
                  <Link to="/registro" className="text-[#1060ff] font-bold hover:text-[#2b89ff] transition-colors">Crear cuenta</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
