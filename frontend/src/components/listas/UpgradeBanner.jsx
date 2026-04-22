import React from 'react';

export const UpgradeBanner = () => {
  return (
    <div className="upgrade-banner mb-16 px-6 py-5 flex items-center justify-between gap-4 relative overflow-hidden bg-gradient-to-r from-[#1a2535] via-[#1e2d40] to-[#1a2535] border border-bb-border rounded-sm">
      {/* Decorative gradient overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-[280px] bg-gradient-to-r from-transparent to-black/30 pointer-events-none"></div>

      <div className="relative z-10 max-w-[480px]">
        <p className="text-bb-white font-bold text-[18px] leading-tight mb-1 uppercase tracking-tight">
          AD-FREE. STATS. FILTERS. NOTIFICATIONS.
        </p>
        <p className="text-bb-label text-[12px] leading-relaxed">
          Get annual and all-time stats, filtering by your favorite streaming services, watchlist notifications, no third-party ads and more...
        </p>
      </div>

      <div className="flex items-center gap-3 relative z-10 shrink-0">
        <div className="hidden sm:flex gap-1">
          <img src="https://image.tmdb.org/t/p/w200/8739161.jpg" className="w-10 h-[58px] object-cover rounded-sm opacity-60" alt="" />
          <img src="https://image.tmdb.org/t/p/w200/7222246.jpg" className="w-10 h-[58px] object-cover rounded-sm opacity-80" alt="" />
          <img src="https://image.tmdb.org/t/p/w200/8231856.jpg" className="w-10 h-[58px] object-cover rounded-sm" alt="" />
        </div>
        <button className="flex items-center gap-2 bg-[#1a2535] border border-bb-border hover:border-bb-blue/50 px-4 py-2 rounded-sm text-[11px] font-black tracking-widest uppercase text-bb-white transition-all">
          UPGRADE TO <span className="pro-badge">PRO</span>
        </button>
      </div>
    </div>
  );
};

export default UpgradeBanner;
