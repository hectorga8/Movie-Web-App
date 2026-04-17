// ─────────────────────────────────────────────────────────────
// ReadingStreak.jsx
// Sección de Racha de Lectura (Gamificación)
// ─────────────────────────────────────────────────────────────

function ReadingStreak() {
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
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#BC6C25]/10 flex items-center justify-center text-[#BC6C25]">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.66 11.5c-.21 0-.41.01-.61.03l.63-1.54L15.4 6H12v6.5l2.4 2.4.7-.7-1.1-1.1V8h2l1.6 4.3c-1.3-.2-2.5.3-3.2 1.3-.7 1-1 2.2-1 3.4 0 2.2 1.8 4 4 4s4-1.8 4-4c0-2-1.5-3.6-3.4-3.9zM16.5 20c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"/>
          </svg>
        </div>
        <h2 className="font-['Playfair_Display',Georgia,serif] text-xl lg:text-2xl font-bold text-[#283618]">
          Tu racha
        </h2>
      </div>

      <div className="rounded-2xl bg-white border border-[#606C38]/10 p-5 h-[calc(100%-2.5rem)] flex flex-col justify-between shadow-sm border-l-4 border-l-[#BC6C25]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-4xl lg:text-5xl font-bold text-[#283618]">3</span>
            <span className="text-sm lg:text-base font-medium text-[#606C38]/70">días seguidos</span>
          </div>
          <div className="text-2xl lg:text-3xl">🔥</div>
        </div>

        <p className="text-xs lg:text-sm text-[#606C38]/80 mb-4 leading-relaxed">
          ¡Vas por buen camino! Lee 10 minutos hoy para mantener tu racha viva.
        </p>

        <div className="flex justify-between items-center bg-[#F4F3ED]/50 p-3 rounded-xl">
          {days.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-bold text-[#606C38]/50 uppercase">{day.name}</span>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                day.active 
                ? 'bg-[#BC6C25] text-white shadow-md shadow-[#BC6C25]/20' 
                : 'bg-white border border-[#606C38]/10 text-[#606C38]/30'
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

export default ReadingStreak;
