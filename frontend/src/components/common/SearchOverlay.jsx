import { createPortal } from 'react-dom';

function SearchOverlay({ visible }) {
  if (!visible) return null;
  
  return createPortal(
    <div 
      className="fixed inset-0 bg-[#111419]/70 transition-opacity duration-300 pointer-events-none"
      style={{ zIndex: 45 }}
    />,
    document.body
  );
}

export default SearchOverlay;