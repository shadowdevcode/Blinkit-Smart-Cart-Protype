
import React, { useState, useEffect } from 'react';
import { Order, CartItem } from './types';
import SmartCart from './components/SmartCart';
import OrderSuccess from './components/OrderSuccess';
import HomeScreen from './components/HomeScreen';
import Toast from './components/Toast';
import { ChevronLeftIcon, LocationPinIcon } from './components/Icons';

type View = 'home' | 'smartCart' | 'orderSuccess';

interface SmartCartData {
    predictedCart: CartItem[];
    pastOrders: Order[];
}

const App: React.FC = () => {
    const [view, setView] = useState<View>('home');
    const [smartCartData, setSmartCartData] = useState<SmartCartData | null>(null);
    const [finalOrder, setFinalOrder] = useState<{ items: CartItem[], total: number } | null>(null);
    const [toastMessage, setToastMessage] = useState<string>('');


    const showToast = (message: string) => {
        setToastMessage(message);
    };

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
        setSmartCartData(null); 
        setView('home');
    };


    const renderContent = () => {
        switch (view) {
            case 'home':
                return <HomeScreen onViewSmartCart={handleViewSmartCart} initialData={smartCartData} showToast={showToast} />;
            case 'smartCart':
                return smartCartData && (
                    <div className="w-full h-full">
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
                .animate-toast { animation: toast-in-out 3s ease-in-out forwards; }
                @keyframes toast-in-out { 0% { bottom: -100px; opacity: 0; } 10% { bottom: 24px; opacity: 1; } 90% { bottom: 24px; opacity: 1; } 100% { bottom: -100px; opacity: 0; } }
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
                            </div>
                        </div>
                    ) : (
                         <div className="text-left">
                            <div className="flex items-center gap-2">
                                <LocationPinIcon className="w-6 h-6 text-slate-600"/>
                                <h1 className="text-xl font-bold text-slate-800 tracking-tight">Delivering to <span className="underline decoration-dashed">Home</span></h1>
                            </div>
                        </div>
                    )}
                </header>
            )}

            <main className="w-full max-w-4xl mx-auto flex-grow">
                {renderContent()}
            </main>
            
            <Toast message={toastMessage} onDismiss={() => setToastMessage('')} />
        </div>
    );
};

export default App;
