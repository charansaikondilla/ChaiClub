import React from 'react';
import { CartItem } from '../types';

interface ConfirmationModalProps {
  onClose: () => void;
  onStartNewOrder: () => void;
  orderItems: CartItem[];
  totalPrice: number;
}

const OrderSummaryIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-deep-tea-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);


const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onClose, onStartNewOrder, orderItems, totalPrice }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm flex flex-col max-h-[90vh]">
        <div className="p-6 text-center">
            <div className="mx-auto mb-4 flex justify-center">
                <OrderSummaryIcon />
            </div>
            <h2 className="text-2xl font-bold text-charcoal-gray">Your Order Summary</h2>
            <p className="text-gray-600 mt-2">Please show this to the waiter at the counter to place your order.</p>
        </div>

        <div className="border-t border-b border-gray-200 px-6 py-4 overflow-y-auto no-scrollbar">
            <h3 className="font-semibold text-deep-tea-brown mb-3 text-lg">Items to Order</h3>
            <ul className="space-y-3">
              {orderItems.map(item => (
                <li key={item.id} className="flex justify-between items-center text-sm">
                  <div>
                    <p className="font-semibold text-charcoal-gray">{item.name}</p>
                    <p className="text-gray-500">
                      {item.quantity} x ₹{item.price}
                    </p>
                  </div>
                  <p className="font-bold text-deep-tea-brown">₹{item.price * item.quantity}</p>
                </li>
              ))}
            </ul>
        </div>
        
        <div className="p-6 bg-gray-50 rounded-b-2xl space-y-3">
            <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-charcoal-gray">Total</span>
                <span className="text-2xl font-bold text-deep-tea-brown">₹{totalPrice}</span>
            </div>
            <button
              onClick={onClose}
              className="w-full bg-deep-tea-brown text-white font-bold py-3 rounded-lg shadow-md hover:bg-opacity-90 transition-colors"
            >
              Add More Items
            </button>
            <button
              onClick={onStartNewOrder}
              className="w-full bg-transparent text-charcoal-gray font-semibold py-2.5 rounded-lg hover:bg-button-cream transition-colors"
            >
              Start a New Order
            </button>
        </div>
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ConfirmationModal;