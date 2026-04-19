// ─────────────────────────────────────────────────────────────
// Register.jsx - Versión Compacta CineBox (Hashicorp Style)
// ─────────────────────────────────────────────────────────────
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleRegister = useGoogleLogin({
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
        if (res.ok) { login(data.user, data.token); navigate('/inicio'); }
        else { setError(data.message || 'Error con Google'); }
      } catch (err) { setError('Error de red CineBox Cloud.'); }
      finally { setLoading(false); }
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) { setError('Campos obligatorios.'); return; }
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) { login(data.user, data.token); navigate('/inicio'); }
      else { setError(data.message || 'Error en el registro.'); }
    } catch (err) { setError('Error de conexión.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#0d0e12] py-8 px-6">
      <div className="fade-up w-full max-w-[420px]">
        
        <div className="w-full bg-white rounded-[8px] overflow-hidden shadow-2xl border border-white/10">
          <div className="h-1 w-full bg-[#7b42bc]"></div>
          
          <div className="p-8 md:p-10">
            <header className="mb-8 text-center">
              <h2 className="text-[28px] font-bold text-black h-tight mb-2 tracking-tight">
                Únete a CineBox
              </h2>
              <p className="text-[14px] text-[#656a76] leading-relaxed">
                Empieza a gestionar tu videoteca hoy mismo.
              </p>
            </header>

            <div className="space-y-6">
              <button 
                onClick={() => handleGoogleRegister()}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-[5px] bg-[#f1f2f3] hover:bg-[#d5d7db] border border-[#d5d7db] text-black text-[12px] font-bold transition-all active:scale-[0.98]"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 32 32">
                  <path d="M31.107 16.31c0-1.072-.096-2.102-.275-3.093H15.867v5.85h8.552c-.368 1.986-1.442 3.668-3.123 4.843v4.025h5.059c2.96-2.724 4.752-6.735 4.752-11.625z" fill="#4285F4"/>
                  <path d="M15.867 31.81c4.312 0 7.923-1.432 10.564-3.875l-5.059-4.025c-1.401.938-3.193 1.493-5.505 1.493-4.234 0-7.817-2.861-9.094-6.711H1.54v4.156c2.64 5.244 8.044 8.962 14.327 8.962z" fill="#34A853"/>
                  <path d="M6.773 18.692a9.605 9.605 0 0 1 0-6.113V8.423H1.54a15.875 15.875 0 0 0 0 14.425l5.233-4.156z" fill="#FBBC05"/>
                  <path d="M15.867 5.143c2.345 0 4.452.806 6.108 2.393l4.581-4.581C23.784.806 20.179 0 15.867 0 9.584 0 4.18 3.718 1.54 8.962l5.233 4.156c1.277-3.85 4.86-6.711 9.094-6.711z" fill="#EA4335"/>
                </svg>
                REGISTRAR CON GOOGLE
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-[1px] bg-[#d5d7db]/60"></div>
                <span className="text-[9px] font-bold text-[#b2b6bd] uppercase tracking-[2px]">o manual</span>
                <div className="flex-1 h-[1px] bg-[#d5d7db]/60"></div>
              </div>

              <form className="space-y-4 flex flex-col items-center" onSubmit={handleSubmit}>
                {error && (
                  <div className="w-full p-3 rounded-[4px] bg-red-50 border border-red-100 text-red-600 text-[11px] font-medium text-center">
                    {error}
                  </div>
                )}

                <div className="w-full space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#656a76] block text-center">Usuario</label>
                  <input 
                    type="text" 
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-[4px] bg-[#f8f9fa] border border-[#d5d7db] text-black text-sm focus:outline-none focus:border-[#7b42bc] transition-all text-center"
                    required
                  />
                </div>

                <div className="w-full space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#656a76] block text-center">Email</label>
                  <input 
                    type="email" 
                    placeholder="email@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-[4px] bg-[#f8f9fa] border border-[#d5d7db] text-black text-sm focus:outline-none focus:border-[#7b42bc] transition-all text-center"
                    required
                  />
                </div>

                <div className="w-full space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#656a76] block text-center">Contraseña</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-[4px] bg-[#f8f9fa] border border-[#d5d7db] text-black text-sm focus:outline-none focus:border-[#7b42bc] transition-all text-center"
                    required
                  />
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-[4px] bg-black hover:bg-[#3b3d45] text-white text-[12px] font-bold transition-all mt-4 tracking-[1.5px] uppercase active:scale-[0.99]"
                >
                  {loading ? 'PROCESANDO...' : 'CREAR CUENTA'}
                </button>
              </form>

              <div className="text-center pt-6 border-t border-[#f1f2f3]">
                <p className="text-[13px] text-[#3b3d45]">
                  ¿Tienes una cuenta?{' '}
                  <Link to="/login" className="text-[#1060ff] font-bold hover:underline">Entrar</Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        

      </div>
    </div>
  );
}

export default Register;
