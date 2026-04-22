import React from 'react';
import { PosterStack } from './PosterStack';
import { ListMeta } from './ListMeta';

export const MiniListCard = ({ list }) => (
  <div className="flex flex-col items-start w-full">
    <div className="border border-white/10 rounded-md overflow-hidden mb-3 transition-all duration-300 hover:border-[#1060ff]/50 cursor-pointer w-fit">
       <PosterStack posters={list.posters} size="normal" wider={true} />
    </div>

    <h4 className="font-bold text-white text-[13px] mb-1 leading-tight">
      {list.title}
    </h4>
    
    <ListMeta 
      creator={list.creator} 
      moviesCount={list.moviesCount} 
      badge={true} 
    />
  </div>
);

export default MiniListCard;
