import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, ShoppingCartIcon, ChevronDownIcon, XIcon } from './Icons';

interface HeaderProps {
  onCartClick: () => void;
  view: 'menu' | 'games' | 'info';
  setView: (view: 'menu' | 'games' | 'info') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ChaiClubLogo: React.FC = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-deep-tea-brown">
    <path d="M8 21H16C18.2091 21 20 19.2091 20 17V12C20 9.79086 18.2091 8 16 8H8C5.79086 8 4 9.79086 4 12V17C4 19.2091 5.79086 21 8 21Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M16 8V6C16 4.89543 15.1046 4 14 4H10C8.89543 4 8 4.89543 8 6V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 5C7.00005 4.99999 7.5 3.5 9 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 5C12 5 12.5 3.5 14 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);


const Header: React.FC<HeaderProps> = ({ onCartClick, view, setView, searchQuery, setSearchQuery }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
      if (isSearchOpen && searchInputRef.current) {
          searchInputRef.current.focus();
      }
  }, [isSearchOpen]);

  const handleViewChange = (newView: 'menu' | 'games' | 'info') => {
    setView(newView);
    setIsDropdownOpen(false);
  };

  const handleCloseSearch = () => {
      setIsSearchOpen(false);
      setSearchQuery('');
  };
  
  return (
    <header className="bg-creamy-beige sticky top-0 z-30 p-4 flex justify-between items-center h-20 overflow-hidden">
      {/* Search Bar Overlay */}
      <div className={`absolute inset-0 bg-creamy-beige flex items-center px-4 transition-all duration-300 ease-in-out ${isSearchOpen ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}>
          <SearchIcon />
          <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for chai, coffee..."
              className="w-full h-full bg-transparent px-4 py-2.5 text-lg text-deep-tea-brown placeholder-charcoal-gray focus:outline-none"
              disabled={!isSearchOpen}
          />
          <button onClick={handleCloseSearch} className="ml-2 p-2 text-charcoal-gray rounded-full hover:bg-button-cream">
              <XIcon />
          </button>
      </div>

      {/* Default Header Content */}
      <div className={`w-full flex justify-between items-center transition-opacity duration-200 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 cursor-pointer">
              <ChaiClubLogo />
              <h1 className="text-3xl font-bold text-deep-tea-brown tracking-tighter">CHAI CLUB</h1>
              <ChevronDownIcon className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-40">
                <a 
                  href="#"
                  onClick={(e) => { e.preventDefault(); handleViewChange('menu'); }}
                  className={`block px-4 py-2 text-charcoal-gray hover:bg-creamy-beige ${view === 'menu' ? 'font-bold' : ''}`}
                >
                  Menu
                </a>
                <a 
                  href="#"
                  onClick={(e) => { e.preventDefault(); handleViewChange('games'); }}
                  className={`block px-4 py-2 text-charcoal-gray hover:bg-creamy-beige ${view === 'games' ? 'font-bold' : ''}`}
                >
                  Games
                </a>
                <a 
                  href="#"
                  onClick={(e) => { e.preventDefault(); handleViewChange('info'); }}
                  className={`block px-4 py-2 text-charcoal-gray hover:bg-creamy-beige ${view === 'info' ? 'font-bold' : ''}`}
                >
                  Information
                </a>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {view === 'menu' && (
              <>
                <button onClick={() => setIsSearchOpen(true)} className="text-deep-tea-brown p-2 rounded-full hover:bg-button-cream">
                  <SearchIcon />
                </button>
                <button onClick={onCartClick} className="text-deep-tea-brown p-2 rounded-full hover:bg-button-cream">
                  <ShoppingCartIcon />
                </button>
              </>
            )}
          </div>
      </div>
    </header>
  );
};

export default Header;
