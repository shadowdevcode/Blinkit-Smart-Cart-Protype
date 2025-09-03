
import React from 'react';
import { FruitsVegIcon, DairyBreadIcon, SnackIcon, CleaningIcon, BeveragesIcon, MeatFishIcon } from './Icons';

const categories = [
    { name: 'Fruits & Veg', Icon: FruitsVegIcon },
    { name: 'Dairy & Bread', Icon: DairyBreadIcon },
    { name: 'Snacks', Icon: SnackIcon },
    { name: 'Beverages', Icon: BeveragesIcon },
    { name: 'Meat & Fish', Icon: MeatFishIcon },
    { name: 'Cleaning', Icon: CleaningIcon },
];

const CategoryGrid: React.FC = () => {
    return (
        <div className="w-full animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-xl font-bold text-slate-700 mb-4">Shop by Category</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {categories.map(({ name, Icon }) => (
                    <button key={name} className="flex flex-col items-center justify-center text-center p-3 rounded-xl bg-white shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400">
                        <div className="w-12 h-12 rounded-full bg-yellow-100/50 flex items-center justify-center mb-2">
                            <Icon className="w-6 h-6 text-yellow-600" />
                        </div>
                        <p className="text-xs font-semibold text-slate-700">{name}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryGrid;
