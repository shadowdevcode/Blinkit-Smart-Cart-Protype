import React, { useState, useEffect } from 'react';
import { generatePastOrders, predictSmartCart } from './services/geminiService';
import { Order, CartItem } from './types';
import SmartCart from './components/SmartCart';
import PastOrders from './components/PastOrders';

const Spinner = () => (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium text-lg">Your smart cart is being prepared...</p>
    </div>
);

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [predictedCart, setPredictedCart] = useState<CartItem[] | null>(null);
    const [pastOrders, setPastOrders] = useState<Order[] | null>(null);

    useEffect(() => {
        const fetchAndPredict = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const pastOrdersData: Order[] = await generatePastOrders();
                setPastOrders(pastOrdersData);
                
                const smartCartPrediction: CartItem[] = await predictSmartCart(pastOrdersData);
                setPredictedCart(smartCartPrediction);
            } catch (err) {
                if (err instanceof Error) {
                    setError(`Failed to load smart cart. ${err.message}. Please check if your API key is configured correctly.`);
                } else {
                    setError("An unknown error occurred.");
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchAndPredict();
    }, []);

    const renderContent = () => {
        if (isLoading) {
            return <Spinner />;
        }

        if (error) {
            return (
                <div className="w-full max-w-2xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                </div>
            );
        }

        if (predictedCart && pastOrders) {
            return (
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
                    <div className="lg:col-span-2">
                        {predictedCart.length === 0 ? (
                             <div className="w-full bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-lg" role="alert">
                                <p className="font-bold">All Set!</p>
                                <p>It looks like you're all stocked up! We couldn't find any items you're likely to need right now.</p>
                            </div>
                        ) : (
                            <SmartCart initialCart={predictedCart} pastOrders={pastOrders} />
                        )}
                    </div>
                    <div className="lg:col-span-1 mt-8 lg:mt-0">
                         {pastOrders.length > 0 && <PastOrders orders={pastOrders} />}
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                body { font-family: 'Inter', sans-serif; }
                .animate-fade-in { animation: fade-in 0.3s ease-out; }
                @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
                .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
                @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
                .animate-slide-in-up { animation: slide-in-up 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
                @keyframes slide-in-up { 0% { transform: translateY(100%); } 100% { transform: translateY(0); } }
            `}</style>
            <header className="text-center mb-8 w-full max-w-6xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Smart Repeat Cart</h1>
                <p className="text-slate-500 mt-2">Inspired by <span className="font-semibold text-yellow-500">Blinkit</span></p>
            </header>
            <main className="w-full max-w-6xl mx-auto">
                {renderContent()}
            </main>
        </div>
    );
};

export default App;
