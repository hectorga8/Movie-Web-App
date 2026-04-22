import React from 'react';
import { PosterStack } from './PosterStack';
import { ListMeta } from './ListMeta';

export const DetailedListCard = ({ list }) => (
  <div className="flex flex-col md:flex-row gap-8 items-start">
    <div className="shrink-0 border border-white/10 rounded-md overflow-hidden transition-all duration-300 hover:border-[#1060ff]/50 cursor-pointer w-fit">
      <PosterStack posters={list.posters} size="normal" wider={true} />
    </div>

    <div className="flex-1 pt-1">
      <h3 className="text-[18px] font-bold text-white mb-2 leading-tight">
        {list.title}
      </h3>
      
      <ListMeta 
        creator={list.creator} 
        moviesCount={list.moviesCount} 
        likes={list.likes} 
        className="mb-3"
      />

      <p className="text-[#8b9bb4] text-[13px] leading-relaxed line-clamp-3 italic opacity-80">
        {list.description}
      </p>
    </div>
  </div>
);

export default DetailedListCard;
