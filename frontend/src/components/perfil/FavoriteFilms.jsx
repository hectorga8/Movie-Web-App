import React from 'react';

function FavoriteFilms() {
  return (
    <section className="mb-12">
      <div className="border-b border-[#2c3440] pb-2 mb-4">
        <h2 className="text-[12px] text-[#8b9bb4] font-bold uppercase tracking-widest">Favorite Films</h2>
      </div>
      <p className="text-[#8b9bb4] text-[14px] font-serif">
        Don't forget to select your <button className="text-white hover:text-[#1060ff] font-bold transition-colors">favorite films!</button>
      </p>
    </section>
  );
}

export default FavoriteFilms;