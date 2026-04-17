// ─────────────────────────────────────────────────────────────
// Register.jsx
// Página de registro con Estado Controlado
// ─────────────────────────────────────────────────────────────
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';

function Register() {
  // 1. Definimos el "Estado" para cada campo
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. Función que se ejecuta al pulsar el botón
  const handleSubmit = (e) => {
    // Evitamos que la página se recargue (comportamiento por defecto de HTML)
    e.preventDefault();
    
    // De momento, solo mostramos los datos por consola
    console.log('--- Datos de Registro ---');
    console.log('Nombre:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    
    alert(`¡Hola ${name}! Datos capturados. Próximo paso: enviarlos al Backend.`);
  };

  return (
    <div className="grain bg-[#FDFCF7]">
      <AuthCard 
        title="Crea tu biblioteca" 
        subtitle="Únete a Folio y organiza tus lecturas de forma inteligente."
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#606C38]/60 uppercase tracking-widest ml-1">
              Nombre completo
            </label>
            <input 
              type="text" 
              placeholder="Juan Pérez"
              value={name} // Enlazamos el valor con el estado
              onChange={(e) => setName(e.target.value)} // Actualizamos el estado al escribir
              className="w-full px-4 py-3 rounded-2xl bg-[#F4F3ED] border border-[#606C38]/15 text-[#283618] placeholder-[#606C38]/40 text-sm focus:outline-none focus:border-[#606C38]/50 focus:ring-4 focus:ring-[#606C38]/5 transition-all"
              required
            />
          </div>

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
            <label className="text-xs font-bold text-[#606C38]/60 uppercase tracking-widest ml-1">
              Contraseña
            </label>
            <input 
              type="password" 
              placeholder="Crea una contraseña segura"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-[#F4F3ED] border border-[#606C38]/15 text-[#283618] placeholder-[#606C38]/40 text-sm focus:outline-none focus:border-[#606C38]/50 focus:ring-4 focus:ring-[#606C38]/5 transition-all"
              required
            />
          </div>

          {/* Botón Registrar */}
          <button 
            type="submit"
            className="w-full py-4 rounded-2xl bg-[#283618] hover:bg-[#606C38] text-white text-sm font-bold transition-all shadow-lg shadow-[#283618]/20 mt-2"
          >
            Empezar gratis
          </button>
        </form>

        {/* Footer de la tarjeta */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#606C38]/70">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-[#BC6C25] font-bold hover:underline">
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </AuthCard>
    </div>
  );
}

export default Register;
