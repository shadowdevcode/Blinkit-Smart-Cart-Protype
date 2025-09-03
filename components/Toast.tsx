
import React, { useEffect, useState } from 'react';
import { PlusIcon, XMarkIcon } from './Icons';

interface ToastProps {
    message: string;
    onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onDismiss }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                // Allow time for fade-out animation before clearing the message
                setTimeout(onDismiss, 300); 
            }, 2700);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [message, onDismiss]);

    if (!message) return null;

    return (
        <div 
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-sm p-4 bg-slate-800 text-white rounded-xl shadow-lg flex items-center justify-between transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            role="alert"
            aria-live="assertive"
        >
            <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <PlusIcon className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">{message}</span>
            </div>
            <button onClick={() => setIsVisible(false)} className="p-1 rounded-full hover:bg-slate-700">
                <XMarkIcon className="w-5 h-5" />
            </button>
        </div>
    );
};

export default Toast;
