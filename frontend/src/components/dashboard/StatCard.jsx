// ─────────────────────────────────────────────────────────────
// StatCard.jsx
// ─────────────────────────────────────────────────────────────

function StatCard({ icon, value, label, bgColor = "bg-[#606C38]/10", iconColor = "text-[#606C38]" }) {
  return (
    <div className="feature-card bg-white border border-[#606C38]/10 rounded-2xl p-5 shadow-sm">
      <div className={`w-9 h-9 rounded-xl ${bgColor} flex items-center justify-center mb-3`}>
        <span className={iconColor}>{icon}</span>
      </div>
      <p className="font-['Playfair_Display',Georgia,serif] text-3xl font-bold text-[#283618] leading-none">{value}</p>
      <p className="text-xs text-[#606C38]/70 mt-1">{label}</p>
    </div>
  );
}

export default StatCard;
