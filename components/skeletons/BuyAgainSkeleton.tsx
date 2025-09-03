
import React from 'react';

const BuyAgainSkeleton: React.FC = () => {
    return (
        <section className="w-full animate-pulse">
            <div className="h-6 bg-slate-200 rounded w-1/4 mb-4"></div>
            <div className="flex gap-4 overflow-x-hidden">
                {Array.from({ length: 4 }).map((_, index) => (
                     <div key={index} className="flex-shrink-0 w-36 text-center p-3 rounded-xl bg-white shadow-sm border border-slate-200">
                        <div className="w-16 h-16 rounded-full bg-slate-200 mb-2 mx-auto"></div>
                        <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                        <div className="h-3 bg-slate-200 rounded w-1/2 mx-auto mb-2"></div>
                        <div className="h-9 bg-slate-200 rounded-lg mt-1 w-full"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BuyAgainSkeleton;
