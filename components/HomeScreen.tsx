
import React, { useState, useEffect } from 'react';
import { generateAndPredictCart } from '../services/geminiService';
import { Order, CartItem, Product } from '../types';
import SearchBar from './SearchBar';
import SmartCartPreview from './SmartCartPreview';
import PastOrders from './PastOrders';
import CategoryGrid from './CategoryGrid';
import BuyAgain from './BuyAgain';

interface SmartCartData {
    predictedCart: CartItem[];
    pastOrders: Order[];
}

interface HomeScreenProps {
    onViewSmartCart: (data: SmartCartData) => void;
    initialData: SmartCartData | null;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onViewSmartCart, initialData }) => {
    const [isLoading, setIsLoading] = useState<boolean>(!initialData);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<SmartCartData | null>(initialData);

    useEffect(() => {
        const fetchCartData = async () => {
            if (data) return; // Don't refetch if we already have data (e.g., from navigating back)
            
            setIsLoading(true);
            setError(null);
            try {
                const cartData = await generateAndPredictCart();
                setData(cartData);
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

        fetchCartData();
    }, [data]);

    const handleBuyAgainAdd = (item: Product) => {
        alert(`"${item.name}" would be added to your cart.\n\nFor this demo, please proceed to the 'View & Edit Cart' to manage all your items.`);
        console.log('Analytics: homescreen_buy_again_add_clicked', { itemId: item.id });
    };

    return (
        <div className="w-full animate-fade-in space-y-6 sm:space-y-8 p-4 sm:p-0">
            <SearchBar />
            <SmartCartPreview
                isLoading={isLoading}
                error={error}
                cart={data?.predictedCart}
                onViewCart={() => data && onViewSmartCart(data)}
            />
            {!isLoading && <CategoryGrid />}
            {!isLoading && data && (
                <BuyAgain
                    pastOrders={data.pastOrders}
                    cartItems={data.predictedCart || []}
                    onAddItem={handleBuyAgainAdd}
                    title="Buy it Again"
                />
            )}
            {!isLoading && data?.pastOrders && <PastOrders orders={data.pastOrders} />}
        </div>
    );
};

export default HomeScreen;
