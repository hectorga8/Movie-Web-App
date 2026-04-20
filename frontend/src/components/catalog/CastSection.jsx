import React, { useRef, useState } from 'react';
import CastCard from '../common/CastCard';

const CastSection = ({ cast }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(false);

  if (!cast || cast.length === 0) return null;

  const onScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
    }
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-16 relative">
      <h3 className="font-brand text-3xl text-black mb-8 leading-tight font-bold">Reparto Principal</h3>
      
      <div className="relative group/scroll">
        {showLeftArrow && (
          <button onClick={() => handleScroll('left')} className="absolute left-[-15px] top-[95px] z-30 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center border border-[#d5d7db]/40 hover:scale-110 transition-all cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>
        )}
        
        {!isAtEnd && (
          <button onClick={() => handleScroll('right')} className="absolute right-[-15px] top-[95px] z-30 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center border border-[#d5d7db]/40 hover:scale-110 transition-all cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
          </button>
        )}

        {!isAtEnd && <div className="absolute right-0 top-0 h-[200px] w-32 z-20 pointer-events-none bg-gradient-to-l from-white via-white/30 to-transparent"></div>}
        
        <div ref={scrollRef} onScroll={onScroll} className="flex overflow-x-auto gap-6 pb-6 no-scrollbar scroll-smooth snap-x">
          {cast.slice(0, 15).map(person => (
            <div key={person.id} className="snap-start scale-95 transition-transform hover:scale-100 origin-top">
              <CastCard person={person} />
            </div>
          ))}
          <div className="min-w-[140px] flex items-center justify-center h-[180px]">
            <button className="text-[11px] font-bold text-black underline underline-offset-8 hover:text-[#1060ff] transition-colors tracking-widest uppercase opacity-60 hover:opacity-100 cursor-pointer">
              Todo el reparto
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-[2px] bg-[#f1f2f3] rounded-full overflow-hidden mt-2">
        <div className="h-full bg-[#1060ff]/20 w-1/5 rounded-full"></div>
      </div>
    </div>
  );
};

export default CastSection;
