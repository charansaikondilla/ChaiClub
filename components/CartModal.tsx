
import React from 'react';
import { CartItem } from '../types';
import { XIcon, PlusIcon, MinusIcon } from './Icons';

interface CartModalProps {
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onCheckout: () => void;
  totalPrice: number;
}

const CartModal: React.FC<CartModalProps> = ({ cartItems, onClose, onUpdateQuantity, onCheckout, totalPrice }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50" onClick={onClose}>
      <div className="bg-creamy-beige rounded-t-2xl w-full max-w-md h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <header className="p-4 flex justify-between items-center border-b border-gray-200 bg-white rounded-t-2xl">
          <h2 className="text-xl font-bold text-charcoal-gray">My Cart</h2>
          <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
            <XIcon />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <p>Your cart is empty.</p>
              <p className="text-sm">Add some delicious chai to get started!</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cartItems.map(item => (
                <li key={item.id} className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-sm">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md"/>
                  <div className="flex-1">
                    <h3 className="font-semibold text-charcoal-gray">{item.name}</h3>
                    {Object.keys(item.options).length > 0 && (
                      <p className="text-sm text-gray-500">
                        {Object.values(item.options).join(', ')}
                      </p>
                    )}
                    <p className="font-bold text-deep-tea-brown mt-1">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-charcoal-gray hover:bg-gray-100">
                      <MinusIcon />
                    </button>
                    <span className="font-bold w-6 text-center">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-charcoal-gray hover:bg-gray-100">
                      <PlusIcon />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="p-4 border-t border-gray-200 bg-white">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium text-charcoal-gray">Total</span>
            <span className="text-2xl font-bold text-deep-tea-brown">₹{totalPrice}</span>
          </div>
          <button
            onClick={onCheckout}
            disabled={cartItems.length === 0}
            className="w-full bg-deep-tea-brown text-white font-bold py-3 rounded-lg shadow-md hover:bg-opacity-90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Proceed to Checkout
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CartModal;