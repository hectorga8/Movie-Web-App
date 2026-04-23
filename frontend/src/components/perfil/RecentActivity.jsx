import React from 'react';

function RecentActivity() {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between border-b border-[#2c3440] pb-2 mb-4">
        <h2 className="text-[12px] text-[#8b9bb4] font-bold uppercase tracking-widest">Recent Activity</h2>
        <button className="text-[10px] text-[#8b9bb4] hover:text-white uppercase tracking-widest transition-colors">All</button>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {/* Tarjetas vacías (Placeholders) */}
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="aspect-[2/3] border border-[#2c3440] rounded-[3px] bg-transparent hover:border-[#445566] transition-colors cursor-pointer"></div>
        ))}
      </div>
    </section>
  );
}

export default RecentActivity;