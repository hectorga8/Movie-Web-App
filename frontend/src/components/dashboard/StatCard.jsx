// ─────────────────────────────────────────────────────────────
// StatCard.jsx
// ─────────────────────────────────────────────────────────────

function StatCard({ icon, value, label, bgColor = "bg-[#f1f2f3]", iconColor = "text-[#656a76]" }) {
  return (
    <div className="bg-white border border-[#d5d7db]/60 rounded-[8px] p-5 shadow-whisper transition-all hover:shadow-medium">
      <div className={`w-9 h-9 rounded-[4px] ${bgColor} flex items-center justify-center mb-4`}>
        <span className={iconColor}>{icon}</span>
      </div>
      <p className="font-brand h-tight text-3xl text-black leading-none">{value}</p>
      <p className="label-uppercase text-[11px] mt-2 opacity-80">{label}</p>
    </div>
  );
}

export default StatCard;
