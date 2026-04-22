import React from 'react';

export const SectionHeader = ({ title, linkText }) => (
  <div className="flex items-center justify-between border-b border-[#2c3440] pb-2 mb-8">
    <h2 className="text-[#8b9bb4] text-[11px] font-light uppercase tracking-[0.2em]">{title}</h2>
    {linkText && (
      <span className="text-[#67778b] text-[11px] font-light uppercase cursor-pointer hover:text-white transition-colors">
        {linkText}
      </span>
    )}
  </div>
);

export default SectionHeader;
