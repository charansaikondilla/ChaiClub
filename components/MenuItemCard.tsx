import React, { useState, memo } from 'react';
import { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onSelectItem: (item: MenuItem) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onSelectItem }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div 
      className="bg-light-cream rounded-2xl shadow-sm overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200 flex flex-col"
      onClick={() => onSelectItem(item)}
      role="button"
      aria-label={`View details for ${item.name}`}
    >
      <div className="p-2">
        {/* Container provides a placeholder background and holds the image */}
        <div className="w-full h-32 bg-button-cream rounded-xl overflow-hidden">
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${isImageLoaded ? 'scale-100 blur-0' : 'scale-110 blur-lg'}`}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
      </div>
      <div className="p-3 pt-1 flex flex-col flex-grow text-center">
        <h3 className="font-semibold text-deep-tea-brown text-lg leading-tight flex-grow">{item.name}</h3>
        <p className="text-charcoal-gray font-medium mt-1">₹{item.price}</p>
      </div>
    </div>
  );
};

// By wrapping with memo, this component will only re-render if its props change.
export default memo(MenuItemCard);