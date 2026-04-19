// ─────────────────────────────────────────────────────────────
// WatchingStreak.jsx - Versión CineBox
// Sección de Racha de Visualización (Gamificación cinéfila)
// ─────────────────────────────────────────────────────────────

function WatchingStreak() {
  const days = [
    { name: 'L', active: true },
    { name: 'M', active: true },
    { name: 'X', active: true },
    { name: 'J', active: false },
    { name: 'V', active: false },
    { name: 'S', active: false },
    { name: 'D', active: false },
  ];

  return (
    <div className="fade-up delay-2 h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-[4px] bg-[#14c6cb]/10 flex items-center justify-center text-[#14c6cb] shadow-whisper">
          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
             <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="font-brand h-tight text-3xl text-black">
          Tu racha cinéfila
        </h2>
      </div>

      <div className="rounded-[8px] bg-white border border-[#d5d7db]/60 p-6 h-[calc(100%-2.5rem)] flex flex-col justify-between shadow-whisper border-l-4 border-l-[#14c6cb]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="font-brand text-5xl text-black">3</span>
            <span className="text-sm font-medium text-[#656a76] tracking-tight">días seguidos</span>
          </div>
          <div className="text-3xl filter drop-shadow-sm">🍿</div>
        </div>

        <p className="body-relaxed text-sm mb-6">
          ¡Vas por buen camino! Mira 20 minutos de una película hoy para mantener tu racha viva.
        </p>

        <div className="flex justify-between items-center bg-[#f1f2f3]/50 p-4 rounded-[4px] border border-[#d5d7db]/40">
          {days.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className="label-uppercase text-[10px] opacity-60 tracking-tighter">{day.name}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                day.active 
                ? 'bg-[#14c6cb] text-white shadow-md shadow-[#14c6cb]/20' 
                : 'bg-white border border-[#d5d7db] text-[#d5d7db]'
              }`}>
                {day.active ? '✓' : ''}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WatchingStreak;
