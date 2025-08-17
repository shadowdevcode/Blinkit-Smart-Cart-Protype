import React from 'react';
import { Order } from '../types';
import { ReceiptIcon } from './Icons';
import GroceryIcon from './GroceryIcon';

interface PastOrdersProps {
    orders: Order[];
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

const PastOrders: React.FC<PastOrdersProps> = ({ orders }) => {
    if (!orders || orders.length === 0) {
        return null;
    }

    const recentOrders = orders.slice(-2).reverse();

    const calculateOrderTotal = (order: Order) => {
        return (order.items || []).reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
    };

    return (
        <div className="w-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-xl font-bold text-slate-700 mb-4 flex items-center gap-2">
                <ReceiptIcon className="w-6 h-6" />
                Recent Order History
            </h2>
            <div className="space-y-4">
                {recentOrders.map((order) => (
                    <div key={order.orderId} className="bg-white rounded-xl shadow-md p-4 border border-slate-200">
                        <div className="flex justify-between items-start mb-3 pb-3 border-b border-slate-100">
                            <div>
                                <p className="font-semibold text-slate-800">Order #{order.orderId.substring(0, 8)}</p>
                                <p className="text-sm text-slate-500">{formatDate(order.date)}</p>
                            </div>
                            <p className="text-lg font-bold text-slate-900 shrink-0 ml-4">
                                ₹{calculateOrderTotal(order).toFixed(2)}
                            </p>
                        </div>
                        <ul className="space-y-3">
                            {(order.items || []).slice(0, 4).map((item) => (
                                <li key={item.id} className="flex items-center gap-3 text-sm">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100">
                                      <GroceryIcon name={item.name} className="w-5 h-5 text-slate-500" />
                                    </div>
                                    <span className="text-slate-600 flex-grow truncate">{item.name}</span>
                                    <span className="text-slate-500">x{item.quantity}</span>
                                    <span className="font-medium text-slate-700 w-16 text-right">₹{((item.price || 0) * (item.quantity || 0)).toFixed(2)}</span>
                                </li>
                            ))}
                            {(order.items || []).length > 4 && (
                                 <li className="text-sm text-slate-500 font-medium pt-2 text-center">
                                    + {(order.items || []).length - 4} more items
                                </li>
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PastOrders;