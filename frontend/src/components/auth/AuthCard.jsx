// ─────────────────────────────────────────────────────────────
// AuthCard.jsx - Versión CineBox (Inspirado en Hashicorp)
// ─────────────────────────────────────────────────────────────

function AuthCard({ children, title, subtitle }) {
  return (
    <div className="w-full max-w-[460px] bg-[#15181e] border border-[#d5d7db]/15 rounded-[12px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300">
      
      {/* Línea de acento superior estilo infraestructura */}
      <div className="h-1 w-full bg-[#1060ff]"></div>
      
      <div className="p-10 md:p-12 flex flex-col items-center">
        <header className="mb-10 text-center w-full">
          <h2 className="text-[28px] font-bold text-white h-tight mb-3 tracking-tight">
            {title}
          </h2>
          <p className="text-[15px] text-[#b2b6bd] leading-relaxed max-w-[300px] mx-auto">
            {subtitle}
          </p>
        </header>

        <div className="w-full">
          {children}
        </div>
      </div>
      
      {/* Footer de tarjeta con estilo de estado de sistema */}
      <div className="px-10 py-5 bg-black/30 border-t border-white/5 flex justify-center">
        <span className="text-[10px] font-bold text-[#656a76] uppercase tracking-[3px]">
          CineBox Security Protocol v1.0
        </span>
      </div>
    </div>
  );
}

export default AuthCard;
