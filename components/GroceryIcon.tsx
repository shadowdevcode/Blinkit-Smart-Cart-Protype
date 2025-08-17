import React from 'react';
import {
    DefaultGroceryIcon,
    MilkIcon,
    BreadIcon,
    EggIcon,
    TomatoIcon,
    OnionIcon,
    WheatIcon,
    LentilIcon,
    GheeIcon,
    PaneerIcon,
    YogurtIcon,
    RiceIcon,
    SnackIcon
} from './Icons';

interface GroceryIconProps {
  name: string;
  className?: string;
}

const GroceryIcon: React.FC<GroceryIconProps> = ({ name, className }) => {
    const lowerCaseName = (name || '').toLowerCase();

    if (lowerCaseName.includes('milk')) return <MilkIcon className={className} />;
    if (lowerCaseName.includes('bread')) return <BreadIcon className={className} />;
    if (lowerCaseName.includes('egg')) return <EggIcon className={className} />;
    if (lowerCaseName.includes('tomato')) return <TomatoIcon className={className} />;
    if (lowerCaseName.includes('onion')) return <OnionIcon className={className} />;
    if (lowerCaseName.includes('atta') || lowerCaseName.includes('flour')) return <WheatIcon className={className} />;
    if (lowerCaseName.includes('dal') || lowerCaseName.includes('lentil')) return <LentilIcon className={className} />;
    if (lowerCaseName.includes('ghee')) return <GheeIcon className={className} />;
    if (lowerCaseName.includes('paneer')) return <PaneerIcon className={className} />;
    if (lowerCaseName.includes('dahi') || lowerCaseName.includes('yogurt')) return <YogurtIcon className={className} />;
    if (lowerCaseName.includes('rice')) return <RiceIcon className={className} />;
    if (lowerCaseName.includes('kurkure') || lowerCaseName.includes('lays') || lowerCaseName.includes('chips') || lowerCaseName.includes('snack')) return <SnackIcon className={className} />;

    return <DefaultGroceryIcon className={className} />;
};

export default GroceryIcon;