// ─────────────────────────────────────────────────────────────
// AuthCard.jsx
// Contenedor minimalista para Login y Registro
// ─────────────────────────────────────────────────────────────

function AuthCard({ children, title, subtitle }) {
  return (
    <div className="min-h-[calc(100vh-64px-300px)] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white border border-[#606C38]/15 rounded-3xl p-8 md:p-10 shadow-xl shadow-[#283618]/5 fade-up">
        
        {/* Cabecera de la tarjeta */}
        <div className="text-center mb-8">
          <h1 className="font-['Playfair_Display',Georgia,serif] text-3xl font-bold text-[#283618] mb-2">
            {title}
          </h1>
          <p className="text-sm text-[#606C38]/70">
            {subtitle}
          </p>
        </div>

        {/* Contenido (Formularios) */}
        {children}
        
      </div>
    </div>
  );
}

export default AuthCard;
