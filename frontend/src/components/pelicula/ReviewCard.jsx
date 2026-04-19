// ─────────────────────────────────────────────────────────────
// ReviewCard.jsx
// ─────────────────────────────────────────────────────────────
function ReviewCard({ name, date, rating, comment, avatar }) {
  return (
    <article className="card-hover p-5 bg-white rounded-2xl border border-[#606C38]/10 shadow-sm">
      <div className="flex items-start gap-4 mb-3">
        <img src={avatar || `https://ui-avatars.com/api/?name=${name}&background=F4F3ED&color=283618&bold=true&size=40`} alt={name} className="w-10 h-10 rounded-full border border-[#606C38]/15 shrink-0"/>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2 flex-wrap">
            <p className="font-bold text-sm text-[#283618]">{name}</p>
            <time className="text-[10px] text-[#606C38]/50 uppercase tracking-wider shrink-0">{date}</time>
          </div>
          <div className="flex items-center gap-0.5 mt-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < rating ? "text-[#BC6C25] text-sm" : "text-[#BC6C25]/40 text-sm"}>★</span>
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm text-[#283618]/80 leading-relaxed">{comment}</p>
    </article>
  );
}
export default ReviewCard;
