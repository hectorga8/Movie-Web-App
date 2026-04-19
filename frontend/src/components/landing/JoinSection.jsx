import React from 'react';
import { Link } from 'react-router-dom';

function JoinSection() {
  return (
    <section className="w-full py-20 bg-[#15181e] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-full bg-gradient-to-l from-[#01b4e4]/10 to-transparent pointer-events-none"></div>
      
      <div className="w-full max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
        <div className="max-w-[650px]">
          <h2 className="text-[36px] md:text-[48px] font-bold text-white mb-8 leading-tight tracking-tighter">
            Únete hoy mismo.
          </h2>
          <div className="space-y-6 text-white/80 text-[18px] leading-relaxed">
            <p>Disfruta de ventajas exclusivas al registrarte en <span className="text-white font-bold">CineBox</span>:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-start gap-3">
                <span className="text-[#1ed5a9] mt-1">✓</span>
                Sin publicidad y totalmente gratis
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1ed5a9] mt-1">✓</span>
                Lista de seguimiento personal
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1ed5a9] mt-1">✓</span>
                Filtros por suscripciones
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1ed5a9] mt-1">✓</span>
                Registro de series y películas
              </li>
            </ul>
          </div>
          <div className="mt-12">
            <Link to="/registro" className="px-10 py-4 rounded-[5px] bg-[#7b42bc] text-white font-bold text-lg hover:bg-[#8e5ad0] transition-all shadow-xl shadow-[#7b42bc]/30 inline-block active:scale-95">
              Registrarse Gratis
            </Link>
          </div>
        </div>

        <div className="hidden lg:block w-[420px] shrink-0">
          <div className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-xl shadow-2xl">
             <div className="flex flex-col gap-8">
                {[
                  { n: "1", t: "Crea tu cuenta", c: "#1ed5a9" },
                  { n: "2", t: "Añade tus favoritos", c: "#01b4e4" },
                  { n: "3", t: "Sincroniza tus dispositivos", c: "#7b42bc" }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-5 group">
                     <div 
                       className="w-14 h-14 rounded-2xl flex items-center justify-center text-black font-black text-xl transition-transform group-hover:scale-110 group-hover:rotate-3"
                       style={{ backgroundColor: step.c }}
                     >
                       {step.n}
                     </div>
                     <p className="text-white font-bold text-lg">{step.t}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JoinSection;
