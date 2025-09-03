
import React from 'react';
import { SearchIcon } from './Icons';

const SearchBar: React.FC = () => {
    return (
        <div className="relative animate-fade-in-up">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon className="w-5 h-5 text-slate-500" />
            </div>
            <input
                type="text"
                placeholder="Search for groceries & essentials"
                className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-12 pr-4 text-slate-800 placeholder-slate-500 focus:ring-2 focus:ring-yellow-400 focus:outline-none shadow-sm transition-shadow focus:shadow-md"
                aria-label="Search for groceries"
            />
        </div>
    );
};

export default SearchBar;
