
import React, { useState, useEffect } from 'react';
import { Order, CartItem } from './types';
import SmartCart from './components/SmartCart';
import OrderSuccess from './components/OrderSuccess';
import HomeScreen from './components/HomeScreen';
import { ChevronLeftIcon } from './components/Icons';

type View = 'home' | 'smartCart' | 'orderSuccess';

interface SmartCartData {
    predictedCart: CartItem[];
    pastOrders: Order[];
}

const App: React.FC = () => {
    const [view, setView] = useState<View>('home');
    const [smartCartData, setSmartCartData] = useState<SmartCartData | null>(null);
    const [finalOrder, setFinalOrder] = useState<{ items: CartItem[], total: number } | null>(null);

    const handleViewSmartCart = (data: SmartCartData) => {
        setSmartCartData(data);
        setView('smartCart');
    };

    const handleBackToHome = () => {
        setView('home');
    };
    
    const handleCheckout = (cart: CartItem[], total: number) => {
        setFinalOrder({ items: cart, total });
        setView('orderSuccess');
    };

    const handleNewOrder = () => {
        setFinalOrder(null);
        setSmartCartData(null); // This will cause HomeScreen to refetch next time
        setView('home');
    };


    const renderContent = () => {
        switch (view) {
            case 'home':
                return <HomeScreen onViewSmartCart={handleViewSmartCart} initialData={smartCartData} />;
            case 'smartCart':
                return smartCartData && (
                    <div className="w-full">
                         <SmartCart 
                            initialCart={smartCartData.predictedCart} 
                            pastOrders={smartCartData.pastOrders} 
                            onCheckout={handleCheckout} 
                        />
                    </div>
                );
            case 'orderSuccess':
                 return finalOrder && <OrderSuccess order={finalOrder} onNewOrder={handleNewOrder} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center p-0 sm:p-6 lg:p-8 font-sans">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                body { font-family: 'Inter', sans-serif; }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
                .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
                @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
                .animate-slide-in-up { animation: slide-in-up 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
                @keyframes slide-in-up { 0% { transform: translateY(100%); } 100% { transform: translateY(0); } }
                 .confetti { position: absolute; width: 8px; height: 8px; background-color: #facc15; opacity: 0.7; animation: confetti-fall 2s ease-out forwards; }
                @keyframes confetti-fall { 0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
            `}</style>
            
            {view !== 'orderSuccess' && (
                <header className="mb-8 w-full max-w-4xl mx-auto pt-4 sm:pt-0 px-4 sm:px-0">
                    {view === 'smartCart' ? (
                         <div className="relative text-center">
                            <button onClick={handleBackToHome} className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-slate-200 transition-colors">
                                <ChevronLeftIcon className="w-6 h-6 text-slate-600" />
                            </button>
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Your Smart Cart</h1>
                                <p className="text-slate-500 mt-2">Review your AI-predicted items</p>
                            </div>
                        </div>
                    ) : (
                         <div className="text-center">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Smart Repeat Cart</h1>
                            <p className="text-slate-500 mt-2">Inspired by <span className="font-semibold text-yellow-500">Blinkit</span></p>
                        </div>
                    )}
                </header>
            )}

            <main className="w-full max-w-4xl mx-auto">
                {renderContent()}
            </main>
        </div>
    );
};

export default App;
