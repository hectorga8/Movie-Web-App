import React from 'react';
import { Link } from 'react-router-dom';

function JoinSection() {
  return (
    <section className="w-full py-12 md:py-20 bg-[#0d0e12] relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 right-0 w-full md:w-[600px] h-full bg-[radial-gradient(circle_at_top_right,rgba(16,96,255,0.05),transparent_70%)] pointer-events-none"></div>
      
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-16 relative z-10">
        <div className="max-w-[650px] text-center lg:text-left">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-8 leading-tight tracking-tight">
            Únete hoy mismo.
          </h2>
          <div className="space-y-4 md:space-y-6 text-white/70 text-base md:text-[18px] leading-relaxed">
            <p>Disfruta de ventajas exclusivas en <span className="text-white font-bold">CineBox</span>:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-left max-w-md mx-auto lg:mx-0">
              <li className="flex items-start gap-3">
                <span className="text-[#1060ff] font-bold">✓</span>
                Sin publicidad y gratis
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1060ff] font-bold">✓</span>
                Lista de seguimiento
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1060ff] font-bold">✓</span>
                Filtros inteligentes
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#1060ff] font-bold">✓</span>
                Registro de actividad
              </li>
            </ul>
          </div>
          <div className="mt-8 md:mt-12">
            <Link to="/registro" className="w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 rounded-[8px] bg-[#1060ff] text-white font-bold text-base md:text-lg hover:bg-[#2b89ff] transition-all shadow-xl shadow-[#1060ff]/20 inline-block active:scale-95">
              Registrarse Gratis
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-[420px] shrink-0">
          <div className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-2xl md:rounded-3xl backdrop-blur-xl shadow-2xl">
             <div className="flex flex-col gap-6 md:gap-8">
                {[
                  { n: "1", t: "Crea tu cuenta", c: "rgba(16,96,255,0.2)", text: "#1060ff" },
                  { n: "2", t: "Añade tus favoritos", c: "rgba(123,66,188,0.2)", text: "#7b42bc" },
                  { n: "3", t: "Sincroniza datos", c: "rgba(20,198,203,0.2)", text: "#14c6cb" }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-4 md:gap-5 group">
                     <div 
                       className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-lg md:text-xl transition-transform group-hover:scale-110"
                       style={{ backgroundColor: step.c, color: step.text }}
                     >
                       {step.n}
                     </div>
                     <p className="text-white font-bold text-base md:text-lg">{step.t}</p>
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
