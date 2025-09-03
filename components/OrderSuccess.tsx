
import React, { useEffect } from 'react';
import { CartItem } from '../types';
import GroceryIcon from './GroceryIcon';
import Confetti from './Confetti';

interface OrderSuccessProps {
    order: {
        items: CartItem[];
        total: number;
    };
    onNewOrder: () => void;
}

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
    </svg>
);

const OrderSuccess: React.FC<OrderSuccessProps> = ({ order, onNewOrder }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-slate-50 text-slate-900 flex flex-col font-sans animate-fade-in z-50">
            <Confetti />
            <header className="flex-shrink-0 p-4 text-center border-b border-slate-200 bg-white">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <CheckIcon className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight">Order Placed Successfully!</h1>
                <p className="text-slate-500 mt-1">Your order summary is below.</p>
            </header>

            <main className="flex-grow p-4 overflow-y-auto">
                <div className="max-w-md mx-auto">
                    <ul className="space-y-3">
                        {order.items.map(item => (
                            <li key={item.id} className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-yellow-100/50">
                                    <GroceryIcon name={item.name} className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-slate-500">{item.unit}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                                    <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>

            <footer className="flex-shrink-0 bg-white/80 backdrop-blur-sm border-t border-slate-200 p-4 sticky bottom-0">
                <div className="max-w-md mx-auto">
                    <div className="flex justify-between items-center text-xl font-bold mb-4">
                        <span>Total Paid:</span>
                        <span>₹{order.total.toFixed(2)}</span>
                    </div>
                    <button
                        onClick={onNewOrder}
                        className="w-full bg-yellow-400 text-slate-900 font-bold py-4 px-4 rounded-xl shadow-md hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105"
                    >
                       Start a New Smart Cart
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default OrderSuccess;
