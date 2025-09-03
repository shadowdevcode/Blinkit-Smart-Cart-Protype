
import React from 'react';

const CategoryGridSkeleton: React.FC = () => {
    return (
        <div className="w-full animate-pulse">
            <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="flex flex-col items-center justify-center text-center p-3 rounded-xl bg-white shadow-sm border border-slate-200">
                        <div className="w-12 h-12 rounded-full bg-slate-200 mb-2"></div>
                        <div className="h-3 bg-slate-200 rounded w-10/12"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryGridSkeleton;
