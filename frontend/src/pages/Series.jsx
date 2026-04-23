import React from 'react';
import SeriesFilterBar from '../components/serie/SeriesFilterBar';
import PopularSeriesWeek from '../components/serie/PopularSeriesWeek';
import AdBannerSerie from '../components/serie/AdBannerSerie';
import JustReviewedSeries from '../components/serie/JustReviewedSeries';
import PopularReviewsSeries from '../components/serie/PopularReviewsSeries';
import RightSidebarSeries from '../components/serie/RightSidebarSeries';

function Series() {
  return (
    <div className="min-h-screen bg-[#14181c] text-[#8aa8c2] font-sans pt-6 pb-20">
      <div className="max-w-[950px] mx-auto px-4">
        <SeriesFilterBar />
        
        <div className="mt-8 mb-4 flex justify-between items-end border-b border-[#445566] pb-2">
          <h2 className="text-[14px] uppercase tracking-[1px] text-[#9ab] hover:text-[#fff] cursor-pointer transition-colors">
            Series populares esta semana
          </h2>
          <a href="#" className="text-[11px] text-[#8aa8c2] hover:text-[#fff] transition-colors">MÁS</a>
        </div>
        <PopularSeriesWeek />
        
        <AdBannerSerie />
        
        <div className="mt-8 mb-4 flex justify-between items-end border-b border-[#445566] pb-2">
          <h2 className="text-[14px] uppercase tracking-[1px] text-[#9ab] hover:text-[#fff] cursor-pointer transition-colors">
            Recién reseñadas...
          </h2>
          <span className="text-[11px] text-[#8aa8c2] tracking-[0.5px]">843,460,029 episodios vistos</span>
        </div>
        <JustReviewedSeries />
        
        <div className="flex flex-col md:flex-row gap-10 mt-10">
          <div className="flex-1">
             <div className="mb-4 flex justify-between items-end border-b border-[#445566] pb-2">
              <h2 className="text-[14px] uppercase tracking-[1px] text-[#9ab] hover:text-[#fff] cursor-pointer transition-colors">
                Reseñas populares esta semana
              </h2>
              <a href="#" className="text-[11px] text-[#8aa8c2] hover:text-[#fff] transition-colors">MÁS</a>
            </div>
            <PopularReviewsSeries />
          </div>
          <div className="w-full md:w-[300px] shrink-0">
            <RightSidebarSeries />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Series;