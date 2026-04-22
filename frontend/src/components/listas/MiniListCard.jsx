import React from 'react';
import { PosterStack } from './PosterStack';
import { ListMeta } from './ListMeta';

export const MiniListCard = ({ list }) => (
  <div className="flex flex-col items-start w-full">
    {/* Stack en escalera que llena exactamente 230px (full={true}) */}
    <div className="border border-white/10 rounded-md overflow-hidden mb-3 transition-all duration-300 hover:border-[#1060ff]/50 cursor-pointer w-full">
       <PosterStack posters={list.posters} size="normal" full={true} />
    </div>

    {/* Título */}
    <h4 className="font-bold text-white text-[13px] mb-1 leading-tight hover:text-[#1060ff] cursor-pointer transition-colors">
      {list.title}
    </h4>
    
    {/* Metadata agrupada a la izquierda */}
    <ListMeta 
      creator="Oscars" 
      moviesCount={list.moviesCount} 
      badge={true} 
      className="justify-start gap-4" 
    />
  </div>
);

export default MiniListCard;
