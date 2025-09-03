
import React from 'react';

interface IconProps {
    className?: string;
}

export const PlusIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

export const MinusIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09 1.02-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
);

export const ThumbsUpIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558-.587 1.08-.94 1.567a4.48 4.48 0 0 1-1.431 1.332A4.48 4.48 0 0 1 12.75 12.75h-2.583m-4.583 0H5.25a2.25 2.25 0 0 0-2.25 2.25v8.25c0 1.242 1.008 2.25 2.25 2.25h3.75a2.25 2.25 0 0 0 2.25-2.25V15m-4.5-4.5v-1.5c0-.621.504-1.125 1.125-1.125h1.5" />
    </svg>
);

export const ThumbsDownIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558-.587 1.08-.94 1.567a4.48 4.48 0 0 1-1.431 1.332A4.48 4.48 0 0 1 12.75 12.75h-2.583m-4.583 0H5.25a2.25 2.25 0 0 0-2.25 2.25v8.25a2.25 2.25 0 0 0 2.25 2.25h3.75a2.25 2.25 0 0 0 2.25-2.25V15m-4.5-4.5v-1.5c0-.621.504-1.125 1.125-1.125h1.5" transform="rotate(180 12 12)" />
    </svg>
);

export const XMarkIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);

export const RepeatOffIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3M6.75 20.25 3 16.5m0 0 3.75-3.75M3 16.5h18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
    </svg>
);

export const ReceiptIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-1.5h5.25m-5.25 0h3m-3 0h-1.5m3 0h.75M9 12.75h9.75M16.5 12.75h-1.5m-1.5 0h-1.5m-1.5 0h-1.5m-1.5 0h-1.5M5.25 4.5h13.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25H5.25a2.25 2.25 0 0 1-2.25-2.25V6.75a2.25 2.25 0 0 1 2.25-2.25Z" />
    </svg>
);

export const ArrowUpIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
    </svg>
);
  
export const ArrowDownIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
    </svg>
);

export const SwitchHorizontalIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18m-7.5-12L21 9m0 0L16.5 4.5M21 9H3" />
    </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
);


// --- CORE GROCERY ICONS ---

export const DefaultGroceryIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
    </svg>
);

export const MilkIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5h7.5m-7.5 3H12m-3.75 3h7.5M3 7.5L4.5 3h15L21 7.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 21V7.5Z" />
    </svg>
);

export const BreadIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563A2.25 2.25 0 0 1 11.25 7.5h1.5A2.25 2.25 0 0 1 15 9.563V16.5h-6V9.563Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 16.5v1.875a2.25 2.25 0 0 0 2.25 2.25h1.5A2.25 2.25 0 0 0 15 18.375V16.5" />
    </svg>
);

export const EggIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 0 0 9-9c0-4.968-4.032-9-9-9s-9 4.032-9 9a9 9 0 0 0 9 9Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-3.14 0-6-2.23-6-5s2.86-5 6-5 6 2.23 6 5-2.86 5-6 5Z" />
  </svg>
);

export const TomatoIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 8.618a4.5 4.5 0 0 1-6.364 0M15.182 8.618a4.5 4.5 0 0 0-6.364 0M11.25 18.375a3.375 3.375 0 0 0-3.375-3.375H6.375a3.375 3.375 0 0 0-3.375 3.375V20.25a1.125 1.125 0 0 0 1.125 1.125H10.5a1.125 1.125 0 0 0 1.125-1.125v-1.875Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 18.375a3.375 3.375 0 0 1 3.375-3.375h1.5a3.375 3.375 0 0 1 3.375 3.375V20.25a1.125 1.125 0 0 1-1.125 1.125H13.5a1.125 1.125 0 0 1-1.125-1.125v-1.875Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5L12 3l1.5-1.5" />
    </svg>
);

export const OnionIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c-3.26 0-6-2.69-6-6V9a6 6 0 0 1 12 0v6.75c0 3.31-2.74 6-6 6Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c.66 0 1.25.22 1.75.58M12 2.25A2.25 2.25 0 0 0 9.75 4.5v.92c0 .41-.19.8-.49 1.07" />
    </svg>
);

export const WheatIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5.25c3.6 0 6.5 2.91 6.5 6.5s-2.9 6.5-6.5 6.5S5.5 15.39 5.5 11.75 8.4 5.25 12 5.25Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5.25V3m0 2.25c-2.33 0-4.25 1.88-4.25 4.25S9.67 14 12 14s4.25-1.88 4.25-4.25S14.33 5.25 12 5.25Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.25 18.5-2.25 2.25-2.25-2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.5 16-4.5 4.5-4.5-4.5" />
    </svg>
);

export const LentilIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12.75h16.5m-16.5-3.75h16.5M3.75 6.75h16.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.75c0 2.485-4.03 4.5-9 4.5s-9-2.015-9-4.5" />
    </svg>
);

export const GheeIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 5.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 .75.75v14.25a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V5.25Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5V3a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 3v1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 8.25h12" />
    </svg>
);

export const PaneerIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9 5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25m0 0L3 16.5m-1.5-9L12 3l10.5 4.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9 5.25L3 7.5" />
    </svg>
);

export const YogurtIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 8.25v9.75a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V8.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 8.25a2.25 2.25 0 0 1 2.25-2.25h10.5a2.25 2.25 0 0 1 2.25 2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75v4.5" />
    </svg>
);

export const RiceIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 15.75c0 2.485-4.03 4.5-9 4.5s-9-2.015-9-4.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12.75h3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 10.5h7.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25h0" />
    </svg>
);

export const SnackIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5a3.75 3.75 0 0 0 3.75 3.75h7.5a3.75 3.75 0 0 0 3.75-3.75V11.25s0-2.25-2.25-2.25h-9S4.5 9 4.5 11.25v8.25Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a3.75 3.75 0 0 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" />
    </svg>
);


// --- CATEGORY ICONS ---

export const FruitsVegIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 7.9c.7 1.3 1.5 2.5 2.5 3.6 1-1.1 1.8-2.3 2.5-3.6-1.5-.9-3.5-.9-5 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 0 1-9-9c0-2.1.7-4 2-5.6M12 21a9 9 0 0 0 9-9c0-2.1-.7-4-2-5.6M12 21V11.5M4.9 15.1c-.4.8-1.1 1.2-2 1.2" />
    </svg>
);

export const DairyBreadIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 21V9.9c0-.5.2-.9.5-1.3l2-2.6c.3-.4.7-.6 1.2-.6h5.6c.5 0 .9.2 1.2.6l2 2.6c.3.4.5.8.5 1.3V21M5 21h14M5 21H3v-4.5c0-.8.7-1.5 1.5-1.5h15c.8 0 1.5.7 1.5 1.5V21h-2M9 13.5h6" />
    </svg>
);

export const BeveragesIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8c1.1 0 2-.9 2-2V7H6v12c0 1.1.9 2 2 2Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12V5c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v2Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 5V4c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v1" />
    </svg>
);

export const MeatFishIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.1 11.2c-.4-.4-1-.4-1.4 0L17 13.9c-1.1 1.1-2.9 1.1-4 0-1.1-1.1-1.1-2.9 0-4l2.8-2.8c.4-.4.4-1 0-1.4l-1.4-1.4c-.4-.4-1-.4-1.4 0L4.5 12.8c-2.3 2.3-2.3 6.1 0 8.5 2.3 2.3 6.1 2.3 8.5 0l8.1-8.1Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 19c-1.1 0-2.1-.4-2.8-1.2" />
    </svg>
);

export const CleaningIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.1 14.3c.5-.5.5-1.3 0-1.8l-4.6-4.6c-.5-.5-1.3-.5-1.8 0L3.5 19.1c-.5.5-.5 1.3 0 1.8l4.6 4.6c.5.5 1.3.5 1.8 0l11.2-11.2Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m14 4-1 1 4 4 1-1-4-4Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 10.5c.3 0 .5-.2.5-.5V5.2c0-.7-.5-1.2-1.2-1.2H12c-.3 0-.5.2-.5.5s.2.5.5.5h4.5v4.3c0 .3.2.5.5.5Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 15.5c-.3 0-.5.2-.5.5v2.8c0 .7.5 1.2 1.2 1.2h4.8c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H10.2c-.1 0-.2-.1-.2-.2v-2.8c0-.3-.2-.5-.5-.5Z" />
    </svg>
);
