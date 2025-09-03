
import React from 'react';
import { CartItem } from '../types';
import GroceryIcon from './GroceryIcon';
import { ArrowRightIcon } from './Icons';

interface SmartCartPreviewProps {
    isLoading: boolean;
    error: string | null;
    cart: CartItem[] | undefined | null;
    onViewCart: () => void;
}

const SmartCartPreviewLoader: React.FC = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-slate-200 rounded w-1/2 mb-6"></div>
        <div className="flex items-center justify-between">
            <div className="flex -space-x-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-14 h-14 rounded-full bg-slate-200 border-2 border-white"></div>
                ))}
            </div>
            <div className="h-12 w-36 bg-slate-200 rounded-lg"></div>
        </div>
    </div>
);


const SmartCartPreview: React.FC<SmartCartPreviewProps> = ({ isLoading, error, cart, onViewCart }) => {
    if (isLoading) {
        return <SmartCartPreviewLoader />;
    }

    if (error) {
        return (
             <div className="w-full bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
                <p className="font-bold">Error</p>
                <p>{error}</p>
            </div>
        );
    }
    
    if (!cart || cart.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800">You're all stocked up!</h3>
                <p className="text-slate-500 mt-1">We couldn't find any items you're likely to need right now.</p>
            </div>
        );
    }

    const itemsToShow = cart.slice(0, 5);

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 animate-fade-in-up" style={{animationDelay: '100ms'}}>
            <h3 className="text-xl font-bold text-slate-800">Your weekly refill is ready!</h3>
            <p className="text-slate-500 mt-1 mb-6">We've predicted <span className="font-bold text-slate-700">{cart.length} items</span> based on your habits.</p>
            
            <div className="flex items-center justify-between">
                <div className="flex items-center -space-x-4">
                    {itemsToShow.map(item => (
                        <div key={item.id} className="w-14 h-14 rounded-full bg-yellow-100/50 flex items-center justify-center border-2 border-white shadow-sm" title={item.name}>
                             <GroceryIcon name={item.name} className="w-7 h-7 text-yellow-600" />
                        </div>
                    ))}
                    {cart.length > 5 && (
                         <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white shadow-sm text-slate-600 font-bold">
                            +{cart.length - 5}
                        </div>
                    )}
                </div>

                <button 
                    onClick={onViewCart}
                    className="bg-yellow-400 text-slate-900 font-bold py-3 px-5 rounded-xl shadow-md hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                >
                    <span>View & Edit Cart</span>
                    <ArrowRightIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default SmartCartPreview;
