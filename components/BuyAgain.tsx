
import React, { useMemo } from 'react';
import { Order, CartItem, Product } from '../types';
import GroceryIcon from './GroceryIcon';
import { PlusIcon } from './Icons';

interface BuyAgainProps {
    pastOrders: Order[];
    cartItems: CartItem[];
    onAddItem: (item: Product) => void;
    title: string;
}

const BuyAgain: React.FC<BuyAgainProps> = ({ pastOrders, cartItems, onAddItem, title }) => {
    const frequentlyPurchased = useMemo(() => {
        if (!pastOrders || pastOrders.length === 0) return [];
        
        const allItems = pastOrders.flatMap(order => order.items || []);
        const itemCounts = new Map<string, { item: Product, count: number }>();

        allItems.forEach(item => {
            if (itemCounts.has(item.id)) {
                itemCounts.get(item.id)!.count++;
            } else {
                itemCounts.set(item.id, { item, count: 1 });
            }
        });

        const cartItemIds = new Set(cartItems.map(item => item.id));

        return Array.from(itemCounts.values())
            .filter(entry => entry.count > 1) 
            .filter(entry => !cartItemIds.has(entry.item.id))
            .sort((a, b) => b.count - a.count)
            .slice(0, 10)
            .map(entry => entry.item);
    }, [pastOrders, cartItems]);

    if (frequentlyPurchased.length === 0) {
        return null;
    }

    return (
        <section className="w-full animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xl font-bold text-slate-700 mb-4">{title}</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 -mb-4">
                {frequentlyPurchased.map(item => (
                     <div key={item.id} className="flex-shrink-0 w-36 text-center p-3 rounded-xl bg-white shadow-sm border border-slate-200">
                        <div className="w-16 h-16 rounded-full bg-yellow-100/50 flex items-center justify-center mb-2 mx-auto">
                            <GroceryIcon name={item.name} className="w-8 h-8 text-yellow-600" />
                        </div>
                        <p className="text-sm font-medium text-slate-700 truncate w-full h-10 flex items-center justify-center">{item.name}</p>
                        <p className="text-xs text-slate-500 mb-2">₹{item.price.toFixed(2)}</p>
                        <button onClick={() => onAddItem(item)} className="mt-1 w-full flex items-center justify-center gap-1.5 text-sm bg-green-100 text-green-800 font-bold py-2 px-2 rounded-lg hover:bg-green-200 transition-colors">
                            <PlusIcon className="w-4 h-4" />
                            Add
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BuyAgain;
