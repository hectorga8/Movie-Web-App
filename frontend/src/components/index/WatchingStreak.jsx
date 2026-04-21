import React from 'react';

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
    <div className="h-auto flex flex-col">
      <h2 className="text-[11px] font-bold uppercase tracking-[1px] text-white/30 mb-4">
        Tu Racha Cinéfila
      </h2>

      <div className="rounded-lg bg-white/5 border border-white/5 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white leading-none">3</span>
            <span className="text-[12px] font-medium text-white/40 uppercase">días</span>
          </div>
          <div className="text-2xl opacity-80">🍿</div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                day.active 
                ? 'bg-[#1060ff] text-white' 
                : 'bg-white/5 border border-white/10 text-white/10'
              }`}>
                {day.active ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-[10px] font-bold">{day.name}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WatchingStreak;
