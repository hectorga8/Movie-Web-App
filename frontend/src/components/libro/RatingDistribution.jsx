// ─────────────────────────────────────────────────────────────
// RatingDistribution.jsx
// ─────────────────────────────────────────────────────────────
function RatingDistribution({ average, totalReviews, distribution }) {
  return (
    <div className="flex flex-col sm:flex-row gap-8 items-start mb-8 p-6 bg-[#F4F3ED] rounded-2xl border border-[#606C38]/10">
      <div className="text-center shrink-0 w-full sm:w-auto">
        <p className="font-['Playfair_Display',Georgia,serif] text-7xl font-bold text-[#283618] leading-none">{average}</p>
        <p className="text-xs text-[#606C38]/60 mt-2">{totalReviews} valoraciones</p>
      </div>
      <div className="flex-1 w-full space-y-2.5">
        {distribution.map((item) => (
          <div key={item.stars} className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#283618] w-6 text-right shrink-0">{item.stars}</span>
            <div className="flex-1 bg-[#283618]/8 rounded-full h-2.5 overflow-hidden">
              <div className="bg-[#BC6C25] h-full rounded-full" style={{ width: `${item.percentage}%` }}></div>
            </div>
            <span className="text-xs text-[#606C38]/70 w-8 shrink-0">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default RatingDistribution;
