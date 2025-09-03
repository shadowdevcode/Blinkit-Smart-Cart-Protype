
import React, { useState, useMemo } from 'react';
import { CartItem, Order, Product } from '../types';
import { PlusIcon, MinusIcon, TrashIcon, ThumbsUpIcon, ThumbsDownIcon, RepeatOffIcon, ArrowUpIcon, ArrowDownIcon, SwitchHorizontalIcon, XMarkIcon, DotsVerticalIcon, XCircleIcon } from './Icons';
import GroceryIcon from './GroceryIcon';
import BuyAgain from './BuyAgain';

interface SmartCartProps {
    initialCart: CartItem[];
    pastOrders: Order[];
    onCheckout: (cart: CartItem[], total: number) => void;
}

const GroceryIconWrapper: React.FC<{ name: string; className?: string; isOOS?: boolean }> = ({ name, className, isOOS }) => (
    <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center ${isOOS ? 'bg-slate-200' : 'bg-yellow-100/50'} ${className}`}>
        <GroceryIcon name={name} className={`w-8 h-8 ${isOOS ? 'text-slate-400' : 'text-yellow-600'}`} />
    </div>
);

const PriceChangeIndicator: React.FC<{ currentPrice: number; previousPrice?: number }> = ({ currentPrice, previousPrice }) => {
    if (previousPrice === undefined || previousPrice === currentPrice) {
        return null;
    }
    
    const isIncrease = currentPrice > previousPrice;
    
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
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200" aria-label="Close feedback modal">
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

const getSubstitutes = (itemName: string): Product[] => {
    const lowerName = itemName.toLowerCase();
    if (lowerName.includes('paneer')) {
        return [
            { id: 'sub-p-1', name: 'Amul Malai Paneer', price: 110, unit: '200g', image: '' },
            { id: 'sub-p-2', name: 'ID Fresho Paneer', price: 125, unit: '200g', image: '' },
        ];
    }
    // Add more substitution logic here for other products
    return [];
};


const SmartCart: React.FC<SmartCartProps> = ({ initialCart, pastOrders, onCheckout }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCart.map(item => ({ ...item, doNotRepeat: false })));
    const [feedback, setFeedback] = useState<'good' | 'bad' | null>(null);
    const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [cartSessionId] = useState(() => `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);

    const handleQuantityChange = (id: string, delta: number) => {
        setCartItems(currentItems => {
            const newItems = currentItems.map(item => {
                if (item.id === id) {
                    const newQuantity = item.quantity + delta;
                    console.log('ANALYTICS: item_quantity_changed', { cartSessionId, skuId: id, oldQuantity: item.quantity, newQuantity });
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
                }
                return item;
            }).filter((item): item is CartItem => item !== null);
            
            if (newItems.length < currentItems.length) {
                // This means an item was removed by setting quantity to 0
                const removedItem = currentItems.find(item => item.id === id);
                 if (removedItem) {
                    console.log('ANALYTICS: item_removed_from_smart_cart', { cartSessionId, skuId: id, wasSuggested: true, method: 'quantity_decrease' });
                }
            }
            return newItems;
        });
        setOpenMenuId(null);
    };

    const handleRemoveItem = (id: string) => {
        console.log('ANALYTICS: item_removed_from_smart_cart', { cartSessionId, skuId: id, wasSuggested: true, method: 'button_click' });
        setCartItems(currentItems => currentItems.filter(item => item.id !== id));
        setOpenMenuId(null);
    };

    const handleToggleDoNotRepeat = (id: string) => {
        setCartItems(currentItems =>
            currentItems.map(item =>
                item.id === id ? { ...item, doNotRepeat: !item.doNotRepeat } : item
            )
        );
        setOpenMenuId(null);
    };
    
    const handleAddItem = (itemToAdd: Product) => {
        console.log('ANALYTICS: item_added_to_smart_cart', { cartSessionId, skuId: itemToAdd.id, source: 'regulars' });
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

    const { subtotal, totalItems, finalCart } = useMemo(() => {
        const activeItems = cartItems.filter(item => !item.doNotRepeat && item.status === 'AVAILABLE');
        return {
            subtotal: activeItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
            totalItems: activeItems.reduce((acc, item) => acc + item.quantity, 0),
            finalCart: activeItems
        };
    }, [cartItems]);

    const handleCheckout = () => {
        console.log('ANALYTICS: smart_cart_checkout', { cartSessionId, finalItemCount: totalItems, finalValue: subtotal, itemsModifiedCount: initialCart.length - finalCart.length });
        onCheckout(finalCart, subtotal);
    };

    const handleFeedback = (type: 'good' | 'bad') => {
        console.log('ANALYTICS: smart_cart_feedback', { cartSessionId, feedbackType: type });
        setFeedback(type);
        if (type === 'bad') {
            setShowFeedbackModal(true);
        }
    };
    
    const handleFeedbackReasonSubmit = (reason: string) => {
        console.log('ANALYTICS: smart_cart_feedback_reason', { cartSessionId, reason });
        setShowFeedbackModal(false);
    };

    const renderOOSItem = (item: CartItem) => {
        const substitutes = getSubstitutes(item.name);
        return (
            <div key={item.id} className="bg-slate-100 rounded-xl p-3 opacity-80">
                <div className="flex items-center gap-4">
                    <GroceryIconWrapper name={item.name} isOOS />
                    <div className="flex-grow">
                        <p className="font-semibold text-slate-800 line-through">{item.name}</p>
                        <p className="text-sm text-slate-500">{item.unit}</p>
                        <p className="font-bold text-orange-500 text-sm mt-1">Temporarily Unavailable</p>
                    </div>
                    <div className="flex flex-col gap-1.5 ml-2 border-l border-slate-200 pl-3">
                         <button onClick={() => handleRemoveItem(item.id)} title="Remove item" aria-label={`Remove unavailable item ${item.name}`} className="p-2 rounded-full hover:bg-red-100">
                            <TrashIcon className="w-5 h-5 text-red-500" />
                        </button>
                    </div>
                </div>
                {substitutes.length > 0 && (
                     <div className="mt-3">
                        <h4 className="text-sm font-bold text-slate-600 mb-2 pl-1">Suggested substitutes:</h4>
                        <div className="flex gap-3 overflow-x-auto pb-2 -mb-2">
                             {substitutes.map(sub => (
                                <div key={sub.id} className="flex-shrink-0 w-48 text-left p-3 rounded-lg bg-white shadow-sm border border-slate-200">
                                    <p className="text-sm font-semibold text-slate-800 truncate">{sub.name}</p>
                                    <p className="text-xs text-slate-500">{sub.unit}</p>
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="font-bold text-sm">₹{sub.price.toFixed(2)}</p>
                                        <button onClick={() => alert(`${sub.name} substitute added!`)} aria-label={`Add substitute: ${sub.name}`} className="text-sm bg-blue-100 text-blue-800 font-bold py-1.5 px-3 rounded-md hover:bg-blue-200">
                                            Add
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    const renderDelistedItem = (item: CartItem) => (
        <div key={item.id} className="bg-red-50 border-l-4 border-red-400 rounded-r-lg p-3">
            <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center bg-red-100">
                    <XCircleIcon className="w-8 h-8 text-red-500" />
                </div>
                <div className="flex-grow">
                    <p className="font-semibold text-slate-800 line-through">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.unit}</p>
                    <p className="font-bold text-red-600 text-sm mt-1">No Longer Available</p>
                </div>
                <div className="ml-2 border-l border-red-200 pl-3">
                    <button 
                        onClick={() => handleRemoveItem(item.id)} 
                        title="Remove item" 
                        aria-label={`Remove delisted item ${item.name}`}
                        className="p-2 rounded-full hover:bg-red-200"
                    >
                        <TrashIcon className="w-5 h-5 text-red-600" />
                    </button>
                </div>
            </div>
            <p className="text-xs text-slate-600 mt-2 pl-1">This item is no longer in our catalog and cannot be ordered.</p>
        </div>
    );
    
    const renderAvailableItem = (item: CartItem) => {
        const isMenuOpen = openMenuId === item.id;
        return (
            <div key={item.id} className={`flex items-center gap-4 p-3 rounded-xl transition-all ${item.doNotRepeat ? 'bg-slate-100 opacity-70' : 'bg-white shadow-sm'}`}>
                <GroceryIconWrapper name={item.name} />
                <div className="flex-grow">
                    <p className={`font-semibold text-slate-800 ${item.doNotRepeat ? 'line-through' : ''}`}>{item.name}</p>
                    <p className="text-sm text-slate-500">{item.unit}</p>
                    <div className="flex items-baseline gap-2">
                         <p className="font-bold text-slate-800">₹{item.price.toFixed(2)}</p>
                         <PriceChangeIndicator currentPrice={item.price} previousPrice={item.previousPrice} />
                    </div>
                </div>

                {!item.doNotRepeat && (
                    <div className="flex items-center gap-2">
                        <button onClick={() => handleQuantityChange(item.id, -1)} aria-label={`Decrease quantity of ${item.name}`} className="p-2 rounded-full bg-slate-100 hover:bg-slate-200"><MinusIcon className="w-4 h-4 text-slate-600"/></button>
                        <span className="font-bold text-lg w-8 text-center" aria-live="polite">{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.id, 1)} aria-label={`Increase quantity of ${item.name}`} className="p-2 rounded-full bg-green-100 hover:bg-green-200"><PlusIcon className="w-4 h-4 text-green-700"/></button>
                    </div>
                )}
                
                 <div className="relative ml-2 border-l border-slate-200 pl-2">
                    <button onClick={() => setOpenMenuId(isMenuOpen ? null : item.id)} aria-label={`More options for ${item.name}`} className="p-2 rounded-full hover:bg-slate-200">
                        <DotsVerticalIcon className="w-5 h-5 text-slate-500" />
                    </button>
                    {isMenuOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 z-10 animate-fade-in">
                            <button onClick={() => handleToggleDoNotRepeat(item.id)} className="w-full text-left flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-100">
                                <RepeatOffIcon className={`w-5 h-5 ${item.doNotRepeat ? 'text-red-500' : 'text-slate-400'}`} />
                                <span>{item.doNotRepeat ? 'Suggest again' : 'Don\'t suggest'}</span>
                            </button>
                            <button onClick={() => handleRemoveItem(item.id)} className="w-full text-left flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50">
                                <TrashIcon className="w-5 h-5" />
                                <span>Remove item</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <>
            {showFeedbackModal && <FeedbackModal onClose={() => setShowFeedbackModal(false)} onSubmit={handleFeedbackReasonSubmit} />}
            <div className="w-full bg-slate-50 rounded-2xl shadow-lg animate-fade-in-up flex flex-col h-full md:max-h-[calc(100vh-180px)]" onClick={() => openMenuId && setOpenMenuId(null)}>
                <header className="p-4 sm:p-6 border-b border-slate-200 flex-shrink-0 bg-white rounded-t-2xl">
                    <h2 className="text-xl font-bold text-slate-800">Your Smart Cart</h2>
                    <p className="text-sm text-slate-500 mt-1">AI-predicted items are ready for your review.</p>
                </header>

                <main className="p-4 sm:p-6 space-y-3 flex-grow overflow-y-auto bg-white">
                    {cartItems.map(item => {
                         if (item.status === 'OUT_OF_STOCK') return renderOOSItem(item);
                         if (item.status === 'DELISTED') return renderDelistedItem(item);
                         return renderAvailableItem(item);
                    })}
                </main>

                <div className="p-4 sm:p-6 border-t border-slate-200 flex-shrink-0 bg-slate-50">
                    <BuyAgain
                        pastOrders={pastOrders}
                        cartItems={cartItems}
                        onAddItem={handleAddItem}
                        title="Add from your regulars"
                    />
                </div>

                <footer className="p-4 sm:p-6 border-t border-slate-200 bg-white/80 backdrop-blur-sm rounded-b-2xl sticky bottom-0 flex-shrink-0">
                    <div className="flex justify-center items-center gap-4 mb-4">
                        <p className="text-slate-600 font-medium">Was this prediction accurate?</p>
                        {feedback ? (
                           <p className="text-green-600 font-semibold">Thanks for your feedback!</p>
                        ) : (
                           <>
                            <button onClick={() => handleFeedback('good')} aria-label="Prediction was accurate" className="p-2 rounded-full hover:bg-green-100"><ThumbsUpIcon className="w-6 h-6 text-green-500"/></button>
                            <button onClick={() => handleFeedback('bad')} aria-label="Prediction was inaccurate" className="p-2 rounded-full hover:bg-red-100"><ThumbsDownIcon className="w-6 h-6 text-red-500"/></button>
                           </>
                        )}
                    </div>
                    <button
                        onClick={handleCheckout}
                        disabled={totalItems === 0}
                        aria-disabled={totalItems === 0}
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