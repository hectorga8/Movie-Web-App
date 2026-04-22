import React from 'react';
import { Link } from 'react-router-dom';
import { PosterStack } from './PosterStack';
import { ListMeta } from './ListMeta';

export const DetailedListCard = ({ list }) => (
  <div className="flex flex-col md:flex-row gap-6 items-start group">
    {/* Box de imágenes: Link al detalle */}
    <Link 
      to={`/lista/${list.id}`}
      className="shrink-0 border border-white/10 rounded-md overflow-hidden transition-all duration-300 group-hover:border-[#1060ff]/50 cursor-pointer w-fit block"
    >
      <PosterStack posters={list.posters} size="normal" wider={true} />
    </Link>

    {/* Metadata y Descripción */}
    <div className="flex-1 pt-1 pr-8">
      <Link to={`/lista/${list.id}`} className="hover:text-[#1060ff] transition-colors">
        <h3 className="text-[17px] font-bold text-white mb-2 leading-tight">
          {list.title}
        </h3>
      </Link>
      
      <ListMeta 
        creator={list.creator} 
        moviesCount={list.moviesCount} 
        likes={list.likes} 
        showAvatar={true}
        className="mb-3"
      />

      <p className="text-[#8b9bb4] text-[13px] leading-relaxed line-clamp-3 italic opacity-80 font-light">
        {list.description}
      </p>
    </div>
  </div>
);

export default DetailedListCard;
