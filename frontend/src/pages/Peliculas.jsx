import React from 'react';
import { Link } from 'react-router-dom';
import PopularFilmsWeek from '../components/peliculas/PopularFilmsWeek';
import JustReviewed from '../components/peliculas/JustReviewed';
import PopularReviews from '../components/peliculas/PopularReviews';
import RightSidebarPeliculas from '../components/peliculas/RightSidebarPeliculas';

function Peliculas() {
  return (
    <div className="min-h-screen bg-transparent text-white pt-6 pb-20">
      <div className="max-w-[1200px] mx-auto px-4">
        
        <div className="mt-8 mb-4 flex justify-between items-end border-b border-[#445566] pb-2">
          <h2 className="text-[13px] md:text-[15px] font-light uppercase text-[#9ab] hover:text-[#fff] cursor-pointer transition-colors">
            Películas populares esta semana
          </h2>
          <Link to="/peliculas/todas" className="text-[11px] md:text-[13px] text-[#8aa8c2] hover:text-[#fff] transition-colors">MÁS</Link>
        </div>
        <PopularFilmsWeek />
        
        <div className="mt-8 mb-4 flex justify-between items-end border-b border-[#445566] pb-2">
          <h2 className="text-[13px] md:text-[15px] font-light uppercase text-[#9ab] hover:text-[#fff] cursor-pointer transition-colors">
            Recién reseñadas...
          </h2>
          <span className="text-[11px] text-[#8aa8c2]">3,543,460,029 películas vistas</span>
        </div>
        <JustReviewed />
        
        <div className="flex flex-col md:flex-row gap-10 mt-10">
          <div className="flex-1">
             <div className="mb-4 flex justify-between items-end border-b border-[#445566] pb-2">
              <h2 className="text-[13px] md:text-[15px] font-light uppercase text-[#9ab] hover:text-[#fff] cursor-pointer transition-colors">
                Reseñas populares esta semana
              </h2>
              <Link to="/peliculas/todas" className="text-[11px] text-[11px] md:text-[13px] text-[#8aa8c2] hover:text-[#fff] transition-colors">MÁS</Link>
            </div>
            <PopularReviews />
          </div>
          <div className="w-full md:w-[300px] shrink-0">
            <RightSidebarPeliculas />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Peliculas;