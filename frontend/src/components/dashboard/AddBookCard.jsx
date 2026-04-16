// ─────────────────────────────────────────────────────────────
// AddBookCard.jsx
// ─────────────────────────────────────────────────────────────
function AddBookCard({ onClick }) {
  return (
    <button onClick={onClick} className="group flex flex-col items-center justify-center w-full aspect-[2/3] mb-3 rounded-md border-2 border-dashed border-[#606C38]/30 bg-[#606C38]/5 hover:bg-[#606C38]/10 hover:border-[#606C38] transition-all cursor-pointer">
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#283618] shadow-sm mb-3 group-hover:scale-110 transition-transform">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
      </div>
      <span className="font-bold text-[#283618] text-sm">Añadir libro</span>
    </button>
  );
}
export default AddBookCard;
