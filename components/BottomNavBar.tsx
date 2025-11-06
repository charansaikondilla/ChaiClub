import React from 'react';
import { MenuBookIcon, GameControllerIcon, InfoIcon } from './Icons';

interface BottomNavBarProps {
  view: 'menu' | 'games' | 'info';
  setView: (view: 'menu' | 'games' | 'info') => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ view, setView }) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-20 max-w-md mx-auto border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => setView('menu')}
          className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
            view === 'menu' ? 'text-deep-tea-brown' : 'text-charcoal-gray opacity-70'
          }`}
          aria-label="Menu"
        >
          <MenuBookIcon />
          <span className={`text-xs mt-1 ${view === 'menu' ? 'font-bold' : 'font-medium'}`}>Menu</span>
        </button>
        <button
          onClick={() => setView('games')}
          className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
            view === 'games' ? 'text-deep-tea-brown' : 'text-charcoal-gray opacity-70'
          }`}
          aria-label="Games"
        >
          <GameControllerIcon />
          <span className={`text-xs mt-1 ${view === 'games' ? 'font-bold' : 'font-medium'}`}>Games</span>
        </button>
        <button
          onClick={() => setView('info')}
          className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
            view === 'info' ? 'text-deep-tea-brown' : 'text-charcoal-gray opacity-70'
          }`}
          aria-label="Info"
        >
          <InfoIcon />
          <span className={`text-xs mt-1 ${view === 'info' ? 'font-bold' : 'font-medium'}`}>Info</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNavBar;
