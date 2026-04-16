// ─────────────────────────────────────────────────────────────
// DashboardBanner.jsx
// ─────────────────────────────────────────────────────────────

function DashboardBanner({ userName = "Usuario", booksRead = 0, booksGoal = 12, year = 2026 }) {
  const percentage = Math.min((booksRead / booksGoal) * 100, 100);
  const circumference = 276;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="fade-up delay-2 relative w-full bg-[#283618] rounded-3xl p-6 md:p-8 mb-10 overflow-hidden shadow-lg shadow-[#283618]/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="pointer-events-none absolute -right-10 -top-10 w-48 h-48 bg-[#606C38] rounded-full blur-3xl opacity-40"></div>
      <div className="relative z-10">
        <div className="inline-flex items-center gap-1.5 bg-[#BC6C25] text-white text-[0.65rem] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-4">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
          Reto de lectura {year}
        </div>
        <h2 className="font-['Playfair_Display',Georgia,serif] text-3xl font-bold text-[#FDFCF7] mb-2">¡Hola de nuevo, {userName}!</h2>
        <p className="text-[#FDFCF7]/80 text-sm max-w-sm leading-relaxed">Estás a {booksGoal - booksRead} libros de tu meta. ¡Sigue así!</p>
      </div>
      <div className="relative z-10 w-full md:w-auto shrink-0 flex flex-col items-center">
        <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-[#FDFCF7]/10 mb-2">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="4" fill="none" className="text-[#BC6C25]" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round"></circle>
          </svg>
          <div className="text-center">
            <span className="block text-2xl font-bold text-[#FDFCF7] leading-none">{booksRead}</span>
            <span className="block text-[10px] text-[#FDFCF7]/60 uppercase tracking-widest mt-1">de {booksGoal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardBanner;
