import React from 'react';
import { PosterStack } from './PosterStack';
import { ListMeta } from './ListMeta';

export const DetailedListCard = ({ list }) => (
  <div className="flex flex-col md:flex-row gap-6 items-start">
    {/* Box de imágenes: Tamaño normal */}
    <div className="shrink-0 border border-white/10 rounded-md overflow-hidden transition-all duration-300 hover:border-[#1060ff]/50 cursor-pointer w-fit">
      <PosterStack posters={list.posters} size="normal" wider={true} />
    </div>

    {/* Metadata y Descripción */}
    <div className="flex-1 pt-1 pr-8">
      <h3 className="text-[17px] font-bold text-white mb-2 leading-tight hover:text-[#1060ff] cursor-pointer transition-colors">
        {list.title}
      </h3>
      
      {/* Meta con Avatar (exacto como en la imagen) */}
      <ListMeta 
        creator={list.creator} 
        moviesCount={list.moviesCount} 
        likes={list.likes} 
        showAvatar={true}
        className="mb-3"
      />

      <p className="text-[#8b9bb4] text-[13px] leading-relaxed line-clamp-3 italic opacity-80">
        {list.description}
      </p>
    </div>
  </div>
);

export default DetailedListCard;
