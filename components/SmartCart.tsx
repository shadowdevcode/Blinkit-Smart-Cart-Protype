
import React, { useState, useMemo } from 'react';
import { CartItem, Order, Product } from '../types';
import { PlusIcon, MinusIcon, TrashIcon, ThumbsUpIcon, ThumbsDownIcon, RepeatOffIcon, ArrowUpIcon, ArrowDownIcon, SwitchHorizontalIcon, XMarkIcon } from './Icons';
import GroceryIcon from './GroceryIcon';

interface SmartCartProps {
    initialCart: CartItem[];
    pastOrders: Order[];
}

const GroceryIconWrapper: React.FC<{ name: string; className?: string; isOOS?: boolean }> = ({ name, className, isOOS }) => (
    <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center ${isOOS ? 'bg-slate-200' : 'bg-yellow-100/50'} ${className}`}>
        <GroceryIcon name={name} className={`w-8 h-8 ${isOOS ? 'text-slate-400' : 'text-yellow-600'}`} />
    </div>
);

const PriceChangeIndicator: React.FC<{ currentPrice: number; previousPrice?: number }> = ({ currentPrice, previousPrice }) => {
    if (previousPrice === undefined || previousPrice === currentPrice) {
        console.log('Analytics: smart_cart_price_change_viewed', { priceStatus: 'UNCHANGED' });
        return null;
    }
    
    const isIncrease = currentPrice > previousPrice;
    console.log('Analytics: smart_cart_price_change_viewed', { priceStatus: isIncrease ? 'INCREASE' : 'DECREASE' });

    return (
        <div className={`flex items-center gap-1 text-xs font-bold ${isIncrease ? 'text-red-500' : 'text-green-600'}`}>
            {isIncrease ? <ArrowUpIcon className="w-3 h-3"/> : <ArrowDownIcon className="w-3 h-3"/>}
            <span>was ₹{previousPrice.toFixed(2)}</span>
        </div>
    );
};

const FeedbackModal: React.FC<{ onClose: () => void; onSubmit: (reason: string) => void }> = ({ onClose, onSubmit }) => {
    const reasons = ["Already have this", "Don't need this week", "Wrong item"];
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 animate-fade-in z-50">
            <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-sm animate-slide-in-up">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-slate-800">Why was this inaccurate?</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200">
                        <XMarkIcon className="w-5 h-5 text-slate-500"/>
                    </button>
                </div>
                <p className="text-sm text-slate-600 mb-5">Your feedback helps improve future predictions.</p>
                <div className="space-y-3">
                    {reasons.map(reason => (
                        <button key={reason} onClick={() => onSubmit(reason)} className="w-full text-left p-3 bg-slate-100 rounded-lg font-medium text-slate-700 hover:bg-slate-200 transition-colors">
                            {reason}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};


const SmartCart: React.FC<SmartCartProps> = ({ initialCart, pastOrders }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCart.map(item => ({ ...item, doNotRepeat: false })));
    const [feedback, setFeedback] = useState<'good' | 'bad' | null>(null);
    const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);

    const handleQuantityChange = (id: string, delta: number) => {
        setCartItems(currentItems =>
            currentItems.map(item => {
                if (item.id === id) {
                    const newQuantity = item.quantity + delta;
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
                }
                return item;
            }).filter((item): item is CartItem => item !== null)
        );
    };

    const handleRemoveItem = (id: string) => {
        console.log('Analytics: smart_cart_item_removed', { itemId: id });
        setCartItems(currentItems => currentItems.filter(item => item.id !== id));
    };

    const handleToggleDoNotRepeat = (id: string) => {
        setCartItems(currentItems =>
            currentItems.map(item =>
                item.id === id ? { ...item, doNotRepeat: !item.doNotRepeat } : item
            )
        );
    };
    
    const handleAddItem = (itemToAdd: Product) => {
        console.log('Analytics: smart_cart_item_added_manually', { itemId: itemToAdd.id });
        setCartItems(currentItems => {
            const existingItem = currentItems.find(item => item.id === itemToAdd.id);
            if (existingItem) {
                return currentItems.map(item =>
                    item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1, doNotRepeat: false } : item
                );
            } else {
                return [...currentItems, { ...itemToAdd, quantity: 1, doNotRepeat: false, status: 'AVAILABLE' }];
            }
        });
    };

    const { subtotal, totalItems } = useMemo(() => {
        const activeItems = cartItems.filter(item => !item.doNotRepeat && item.status === 'AVAILABLE');
        return {
            subtotal: activeItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
            totalItems: activeItems.reduce((acc, item) => acc + item.quantity, 0),
        };
    }, [cartItems]);
    
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


    const handleCheckout = () => {
        alert(`Checkout initiated with ${totalItems} items for a total of ₹${subtotal.toFixed(2)}. Thank you for shopping!`);
    };

    const handleFeedback = (type: 'good' | 'bad') => {
        console.log('Analytics: smart_cart_feedback_given', { feedback: type });
        setFeedback(type);
        if (type === 'bad') {
            setShowFeedbackModal(true);
        }
    };
    
    const handleFeedbackReasonSubmit = (reason: string) => {
        console.log('Analytics: smart_cart_feedback_reason', { reason });
        setShowFeedbackModal(false);
    };


    const renderItem = (item: CartItem) => {
        const isOOS = item.status === 'OUT_OF_STOCK';
        const isUnavailable = isOOS || item.doNotRepeat;

        return (
            <div key={item.id} className={`flex items-center gap-4 p-3 rounded-xl transition-all ${isUnavailable ? 'bg-slate-100 opacity-70' : 'bg-white shadow-sm'}`}>
                <GroceryIconWrapper name={item.name} isOOS={isOOS} />
                <div className="flex-grow">
                    <p className={`font-semibold text-slate-800 ${isUnavailable ? 'line-through' : ''}`}>{item.name}</p>
                    <p className="text-sm text-slate-500">{item.unit}</p>
                    {isOOS ? (
                        <p className="font-bold text-orange-500 text-sm mt-1">Temporarily Unavailable</p>
                    ) : (
                        <div className="flex items-baseline gap-2">
                             <p className="font-bold text-slate-800">₹{item.price.toFixed(2)}</p>
                             <PriceChangeIndicator currentPrice={item.price} previousPrice={item.previousPrice} />
                        </div>
                    )}
                </div>
                {!isUnavailable && (
                    <div className="flex items-center gap-2">
                        <button onClick={() => handleQuantityChange(item.id, -1)} className="p-2 rounded-full bg-slate-100 hover:bg-slate-200"><MinusIcon className="w-4 h-4 text-slate-600"/></button>
                        <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.id, 1)} className="p-2 rounded-full bg-green-100 hover:bg-green-200"><PlusIcon className="w-4 h-4 text-green-700"/></button>
                    </div>
                )}
                 {isOOS && (
                    <button className="flex-shrink-0 bg-blue-100 text-blue-800 text-sm font-bold py-2 px-3 rounded-lg hover:bg-blue-200 flex items-center gap-1.5">
                        <SwitchHorizontalIcon className="w-4 h-4"/>
                        Substitute
                    </button>
                )}
                 <div className="flex flex-col gap-1.5 ml-2 border-l border-slate-200 pl-3">
                    <button onClick={() => handleToggleDoNotRepeat(item.id)} title={item.doNotRepeat ? "Re-enable suggestion for this item" : "Don't suggest this item again"} className="p-2 rounded-full hover:bg-slate-200">
                        <RepeatOffIcon className={`w-5 h-5 ${item.doNotRepeat ? 'text-red-500' : 'text-slate-400'}`} />
                    </button>
                    <button onClick={() => handleRemoveItem(item.id)} title="Remove item" className="p-2 rounded-full hover:bg-red-100">
                        <TrashIcon className="w-5 h-5 text-red-500" />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <>
        {showFeedbackModal && <FeedbackModal onClose={() => setShowFeedbackModal(false)} onSubmit={handleFeedbackReasonSubmit} />}
        <div className="w-full bg-white rounded-2xl shadow-lg animate-fade-in-up flex flex-col" style={{maxHeight: 'calc(100vh - 180px)'}}>
            <header className="p-4 sm:p-6 border-b border-slate-200 flex-shrink-0">
                <h2 className="text-xl font-bold text-slate-800">Your Smart Cart</h2>
                <p className="text-sm text-slate-500 mt-1">AI-predicted items are ready for your review.</p>
            </header>

            <main className="p-4 sm:p-6 space-y-3 flex-grow overflow-y-auto">
                {cartItems.map(renderItem)}
            </main>

            {frequentlyPurchased.length > 0 && (
                 <section className="p-4 sm:p-6 border-t border-slate-200 flex-shrink-0">
                    <h3 className="text-lg font-bold text-slate-700 mb-3">Add from your regulars</h3>
                    <div className="flex gap-3 overflow-x-auto pb-3 -mb-3">
                        {frequentlyPurchased.map(item => (
                             <div key={item.id} className="flex-shrink-0 w-32 text-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                                <div className="w-12 h-12 rounded-full bg-yellow-100/50 flex items-center justify-center mb-2 mx-auto">
                                    <GroceryIcon name={item.name} className="w-6 h-6 text-yellow-600" />
                                </div>
                                <p className="text-xs font-medium text-slate-700 truncate w-full h-8 flex items-center justify-center">{item.name}</p>
                                <button onClick={() => handleAddItem(item)} className="mt-2 w-full flex items-center justify-center gap-1 text-sm bg-green-100 text-green-800 font-bold py-1.5 px-2 rounded-lg hover:bg-green-200 transition-colors">
                                    <PlusIcon className="w-4 h-4" />
                                    Add
                                </button>
                            </div>
                        ))}
                    </div>
                 </section>
            )}

            <footer className="p-4 sm:p-6 border-t border-slate-200 bg-white rounded-b-2xl sticky bottom-0 flex-shrink-0">
                <div className="flex justify-center items-center gap-4 mb-4">
                    <p className="text-slate-600 font-medium">Was this prediction accurate?</p>
                    {feedback ? (
                       <p className="text-green-600 font-semibold">Thanks for your feedback!</p>
                    ) : (
                       <>
                        <button onClick={() => handleFeedback('good')} className="p-2 rounded-full hover:bg-green-100"><ThumbsUpIcon className="w-6 h-6 text-green-500"/></button>
                        <button onClick={() => handleFeedback('bad')} className="p-2 rounded-full hover:bg-red-100"><ThumbsDownIcon className="w-6 h-6 text-red-500"/></button>
                       </>
                    )}
                </div>
                <button
                    onClick={handleCheckout}
                    disabled={totalItems === 0}
                    className="w-full bg-yellow-400 text-slate-900 font-bold py-4 px-4 rounded-xl shadow-md hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:transform-none flex justify-between items-center"
                >
                   <span className="text-lg">Place Order</span>
                   <span className="text-lg font-extrabold">₹{subtotal.toFixed(2)}</span>
                </button>
            </footer>
        </div>
        </>
    );
};

export default SmartCart;