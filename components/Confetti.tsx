
import React from 'react';

const ConfettiPiece: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
    <div className="confetti" style={style}></div>
);

const Confetti: React.FC = () => {
    const colors = ['#facc15', '#fbbf24', '#f59e0b']; // Yellows and ambers
    const confettiCount = 50;
    
    const confetti = Array.from({ length: confettiCount }).map((_, index) => {
        const style: React.CSSProperties = {
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 2}s`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            width: `${Math.floor(Math.random() * 6) + 6}px`,
            height: `${Math.floor(Math.random() * 6) + 6}px`,
        };
        return <ConfettiPiece key={index} style={style} />;
    });

    return <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">{confetti}</div>;
};

export default Confetti;
