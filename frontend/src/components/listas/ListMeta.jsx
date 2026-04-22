import React from 'react';

const HeartIcon = ({ count }) => (
  <div className="flex items-center gap-1 shrink-0">
    <svg className="w-3 h-3 text-[#00e054]" fill="currentColor" viewBox="0 0 20 20">
      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"></path>
    </svg>
    <span className="text-white font-light">
      {count >= 1000 ? (count / 1000).toFixed(1) + 'k' : count}
    </span>
  </div>
);

export const ListMeta = ({ 
  creator, 
  moviesCount, 
  likes, 
  showAvatar = false, 
  badge = false,
  className = "" 
}) => {
  return (
    <div className={`flex items-center gap-2 text-[11px] text-[#8b9bb4] w-full ${className}`}>
      {showAvatar ? (
        <img 
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${creator}`} 
          className="w-4 h-4 rounded-full bg-white/10" 
          alt="avatar" 
        />
      ) : badge ? (
        <div className="w-3.5 h-3.5 rounded-full bg-orange-600 flex items-center justify-center text-[7px] text-white font-black">
          A
        </div>
      ) : (
        <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#00e054] to-[#00b0ff]" />
      )}

      <span className="truncate">
        {!showAvatar && !badge && <span className="text-[#67778b] mr-1 font-light">Creado por</span>}
        <span className="font-bold text-white">{creator}</span>
      </span>

      {moviesCount !== undefined && (
        <span className="text-[#67778b] ml-1 font-light">{moviesCount} films</span>
      )}

      {likes > 0 && <HeartIcon count={likes} />}
    </div>
  );
};

export default ListMeta;
