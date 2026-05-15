import React from 'react';
import MediaCard from './MediaCard';

function MediaGrid({ items, type }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-10">
      {items.map(item => (
        <MediaCard 
          key={item.id}
          id={item.id}
          type={type}
          imagePath={item.poster_path}
          title={item.title || item.name}
          titlePosition="inside"
        />
      ))}
    </div>
  );
}

export default MediaGrid;
