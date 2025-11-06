import React from 'react';
import { ShoppingCartIcon } from './Icons';

interface CartBarProps {
  itemCount: number;
  totalPrice: number;
  onViewCart: () => void;
}

const CartBar: React.FC<CartBarProps> = ({ itemCount, totalPrice, onViewCart }) => {
  return (
    <div className="fixed bottom-20 inset-x-4 z-20">
      <div className="bg-deep-tea-brown text-white rounded-2xl shadow-2xl flex items-center justify-between p-3.5 pl-5">
        <div className="flex items-center gap-4">
            <ShoppingCartIcon />
            <div>
              <span className="block text-sm font-medium text-gray-200">{itemCount} item{itemCount !== 1 ? 's' : ''}</span>
              <span className="block font-bold text-lg">₹{totalPrice}</span>
            </div>
        </div>
        <button 
          onClick={onViewCart}
          className="bg-button-cream text-deep-tea-brown font-bold py-3 px-6 rounded-xl shadow-md hover:bg-opacity-90 transition-all"
        >
          View Cart
        </button>
      </div>
    </div>
  );
};

export default CartBar;