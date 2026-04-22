import React from 'react';
import { Link } from 'react-router-dom';
import { PosterStack } from './PosterStack';
import { ListMeta } from './ListMeta';

export const MiniListCard = ({ list }) => (
  <div className="flex flex-col items-start w-full group">
    {/* Stack en escalera que llena exactamente 230px (full={true}) */}
    <Link 
      to={`/lista/${list.id}`}
      className="border border-white/10 rounded-md overflow-hidden mb-3 transition-all duration-300 group-hover:border-[#1060ff]/50 cursor-pointer w-full block"
    >
       <PosterStack posters={list.posters} size="normal" full={true} />
    </Link>

    {/* Título */}
    <Link to={`/lista/${list.id}`} className="hover:text-[#1060ff] transition-colors w-full">
      <h4 className="font-bold text-white text-[13px] mb-1 leading-tight">
        {list.title}
      </h4>
    </Link>
    
    <ListMeta 
      creator={list.creator} 
      moviesCount={list.moviesCount} 
      badge={true} 
      className="justify-start gap-4" 
    />
  </div>
);

export default MiniListCard;
