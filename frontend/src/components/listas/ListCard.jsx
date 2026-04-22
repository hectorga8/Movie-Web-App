import React from 'react';
import { Link } from 'react-router-dom';
import { PosterStack } from './PosterStack';
import { ListMeta } from './ListMeta';

export const ListCard = ({ list, showAvatar = false, isWider = false }) => (
  <div className="flex flex-col items-start w-full h-full group">
    {/* Box de imágenes con Link al detalle */}
    <Link 
      to={`/lista/${list.id}`}
      className={`border border-white/10 rounded-md overflow-hidden mb-4 max-w-full w-fit transition-all duration-300 group-hover:border-[#1060ff]/50 cursor-pointer block`}
    >
      <PosterStack 
        posters={list.posters} 
        size="large" 
        wider={isWider}
      />
    </Link>

    {/* Metadata */}
    <Link to={`/lista/${list.id}`} className="hover:text-[#1060ff] transition-colors">
      <h3 className="font-bold text-white text-[16px] leading-tight mb-2 line-clamp-2">
        {list.title}
      </h3>
    </Link>
    
    <ListMeta 
      creator={list.creator} 
      likes={list.likes} 
      showAvatar={showAvatar} 
      className="mt-auto" 
    />
  </div>
);

export default ListCard;
