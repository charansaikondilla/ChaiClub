
import React from 'react';
import { MenuItem } from '../types';
import MenuItemCard from './MenuItemCard';

interface MenuGridProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
}

const MenuGrid: React.FC<MenuGridProps> = ({ items, onSelectItem }) => {
  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} onSelectItem={onSelectItem} />
      ))}
    </div>
  );
};

export default MenuGrid;
