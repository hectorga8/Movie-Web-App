// ─────────────────────────────────────────────────────────────
// FeatureCard.jsx
// ─────────────────────────────────────────────────────────────
function FeatureCard({ icon, title, description, dark = false, badge }) {
  return (
    <div className={`feature-card relative rounded-2xl p-7 shadow-sm overflow-hidden transition-all ${dark ? "bg-[#283618] border border-[#283618] shadow-lg shadow-[#283618]/20" : "bg-white border border-[#606C38]/10"}`}>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${dark ? "bg-white/10" : "bg-[#606C38]/10"}`}>
        <span className={dark ? "text-white" : "text-[#606C38]"}>{icon}</span>
      </div>
      {badge && <div className="inline-flex items-center gap-1.5 bg-[#BC6C25] text-white text-[0.65rem] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-3">{badge}</div>}
      <h3 className={`font-['Playfair_Display',Georgia,serif] text-xl font-bold mb-2 ${dark ? "text-white" : "text-[#283618]"}`}>{title}</h3>
      <p className={`text-sm leading-relaxed ${dark ? "text-white/70" : "text-[#606C38]/80"}`}>{description}</p>
    </div>
  );
}
export default FeatureCard;
