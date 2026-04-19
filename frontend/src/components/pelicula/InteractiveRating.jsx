import { useState } from 'react';
// ─────────────────────────────────────────────────────────────
// InteractiveRating.jsx
// ─────────────────────────────────────────────────────────────
function InteractiveRating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="fade-up delay-4 w-full">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#606C38]/60 mb-3">Tu valoración</p>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} className={`text-2xl transition-colors ${star <= (hover || rating) ? "text-[#BC6C25]" : "text-[#d1cfc6]"}`}
            onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}>★</button>
        ))}
      </div>
    </div>
  );
}
export default InteractiveRating;
