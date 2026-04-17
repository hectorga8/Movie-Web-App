// ─────────────────────────────────────────────────────────────
// FriendActivity.jsx
// Versión para Rejilla (Mitad de ancho)
// ─────────────────────────────────────────────────────────────

function FriendActivity() {
  return (
    <div className="fade-up delay-1 h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#606C38]/10 flex items-center justify-center text-[#606C38]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
        </div>
        <h2 className="font-['Playfair_Display',Georgia,serif] text-xl lg:text-2xl font-bold text-[#283618]">
          Actividad de amigos
        </h2>
      </div>

      <div className="rounded-2xl bg-white border border-[#606C38]/10 p-5 h-[calc(100%-2.5rem)] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
        <div className="mb-4">
          <p className="text-sm text-[#606C38]/80 mb-3">
            A <span className="text-[#283618] font-bold">Valentina</span> le gustó una trilogía y eso la llevó a descubrir algo nuevo:
          </p>
          
          <div className="flex items-center gap-3">
            <div className="flex -space-x-4">
              <img src="https://covers.openlibrary.org/b/id/8739161-M.jpg" alt="" className="book-cover w-10 h-14 object-cover border-2 border-white ring-1 ring-[#606C38]/10" />
              <img src="https://covers.openlibrary.org/b/id/8373426-M.jpg" alt="" className="book-cover w-10 h-14 object-cover border-2 border-white ring-1 ring-[#606C38]/10" />
              <img src="https://covers.openlibrary.org/b/id/8225261-M.jpg" alt="" className="book-cover w-10 h-14 object-cover border-2 border-white ring-1 ring-[#606C38]/10" />
            </div>
            <div className="text-[#606C38]/30">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </div>
            <img src="https://covers.openlibrary.org/b/id/9255566-M.jpg" alt="" className="book-cover w-12 h-16 object-cover shadow-md" />
          </div>
        </div>

        <div className="pt-4 border-t border-[#606C38]/5 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] font-bold uppercase py-1 px-2 rounded bg-[#283618] text-white">Ficción</span>
            <span className="text-[10px] font-bold uppercase py-1 px-2 rounded bg-[#F4F3ED] text-[#283618] border border-[#606C38]/10">Clásico</span>
          </div>
          <button className="text-[11px] lg:text-[13px] font-bold text-[#BC6C25] hover:underline">Ver más →</button>
        </div>
      </div>
    </div>
  );
}

export default FriendActivity;
