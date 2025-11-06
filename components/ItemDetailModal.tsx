
import React, { useState } from 'react';
import { MenuItem } from '../types';
import { XIcon, PlusIcon, MinusIcon } from './Icons';

interface ItemDetailModalProps {
  item: MenuItem;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, options: { [key: string]: string }) => void;
}

const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCartClick = () => {
    onAddToCart(item, quantity, {}); // Pass empty options object
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-40" onClick={onClose}>
      <div className="bg-white rounded-t-2xl w-full max-w-md p-6 relative animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 p-2 rounded-full bg-gray-100">
          <XIcon />
        </button>
        
        <div className="flex gap-4">
            <img src={item.imageUrl} alt={item.name} className="w-28 h-28 object-cover rounded-lg" />
            <div className="flex flex-col justify-center">
                 <h2 className="text-2xl font-bold text-charcoal-gray">{item.name}</h2>
                <p className="text-xl font-semibold text-deep-tea-brown mt-1">₹{item.price}</p>
            </div>
        </div>
        
        <p className="text-gray-600 mt-4">{item.description || 'A delicious beverage from Chai Club.'}</p>

        <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-4">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-charcoal-gray hover:bg-gray-100 disabled:opacity-50" disabled={quantity <= 1}>
                    <MinusIcon />
                </button>
                <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-charcoal-gray hover:bg-gray-100">
                    <PlusIcon />
                </button>
            </div>
            <button 
                onClick={handleAddToCartClick}
                className="bg-deep-tea-brown text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-opacity-90 transition-colors flex-1 ml-4"
            >
                Add to Cart
            </button>
        </div>
      </div>
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default ItemDetailModal;