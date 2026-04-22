import React from 'react';
import { PosterStack } from './PosterStack';
import { ListMeta } from './ListMeta';

export const ListCard = ({ list, showAvatar = false, isWider = false }) => (
  <div className="flex flex-col items-start w-full h-full">
    <div className={`border border-white/10 rounded-md overflow-hidden mb-4 max-w-full w-fit transition-all duration-300 hover:border-[#1060ff]/50 cursor-pointer`}>
      <PosterStack 
        posters={list.posters} 
        size="large" 
        wider={isWider}
      />
    </div>

    <h3 className="font-bold text-white text-[16px] leading-tight mb-2 line-clamp-2">
      {list.title}
    </h3>
    
    <ListMeta 
      creator={list.creator} 
      likes={list.likes} 
      showAvatar={showAvatar} 
      className="mt-auto" 
    />
  </div>
);

export default ListCard;
