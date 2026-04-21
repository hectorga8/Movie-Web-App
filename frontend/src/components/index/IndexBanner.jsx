import React from 'react';
import { useAuth } from '../../context/AuthContext';

function IndexBanner() {
  const { user } = useAuth();

  return (
    <section className="w-full bg-[#0d0e12] pt-12 pb-8 border-b border-white/5">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Bienvenido, {user?.name.split(' ')[0]}.
            </h1>
            <p className="text-white/50 text-lg">
              Esto es lo que está pasando en tu comunidad hoy.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-5 py-2 rounded-[4px] border border-white/10 text-white/80 text-[13px] font-bold hover:bg-white/5 transition-all">
              Mi Actividad
            </button>
            <button className="px-5 py-2 rounded-[4px] bg-[#1060ff] text-white text-[13px] font-bold hover:bg-[#2b89ff] transition-all">
              Añadir Película
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IndexBanner;
