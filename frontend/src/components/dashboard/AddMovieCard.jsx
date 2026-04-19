// ─────────────────────────────────────────────────────────────
// AddMovieCard.jsx - Versión CineBox
// Componente para añadir nuevas películas a la colección
// ─────────────────────────────────────────────────────────────
function AddMovieCard({ onClick }) {
  return (
    <button onClick={onClick} className="group flex flex-col items-center justify-center w-full aspect-[2/3] mb-3 rounded-[8px] border border-dashed border-[#d5d7db] bg-[#f1f2f3]/30 hover:bg-[#f1f2f3] hover:border-[#1060ff]/50 transition-all cursor-pointer shadow-whisper">
      <div className="w-12 h-12 rounded-full bg-white border border-[#d5d7db] flex items-center justify-center text-black shadow-whisper mb-4 group-hover:scale-110 transition-transform">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
      </div>
      <span className="label-uppercase text-[11px] opacity-70">Añadir película</span>
    </button>
  );
}
export default AddMovieCard;
