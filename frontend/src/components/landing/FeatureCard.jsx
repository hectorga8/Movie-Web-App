// ─────────────────────────────────────────────────────────────
// FeatureCard.jsx - Versión CineBox (Inspirado en Hashicorp)
// ─────────────────────────────────────────────────────────────

function FeatureCard({ icon, title, description, accentColor = "#1060ff" }) {
  return (
    <div className="card-mds group hover:border-[#b2b6bd] transition-all duration-300 flex flex-col items-start h-full">
      {/* Icono con color de acento de producto */}
      <div 
        className="w-12 h-12 rounded-[5px] flex items-center justify-center mb-6 transition-transform group-hover:scale-110 shadow-sm"
        style={{ backgroundColor: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}40` }}
      >
        {icon}
      </div>

      {/* Título de tarjeta (26px tight) */}
      <h3 className="text-[22px] lg:text-[26px] font-bold text-black h-tight mb-4 group-hover:text-[#1060ff] transition-colors">
        {title}
      </h3>

      {/* Cuerpo de texto (16px relaxed) */}
      <p className="text-[16px] text-[#3b3d45] leading-[1.63]">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;
