import React from 'react';
import { Loader2 } from 'lucide-react';

interface PriceLoaderProps {
    type: 'price' | 'floor';
    size?: 'sm' | 'md' | 'lg';
    customIcon?: React.ReactNode;
    className?: string;
    showSymbol?: boolean;
    symbol?: string;
    pulseColor?: string;
    iconPosition?: 'left' | 'right';
}

const PriceLoader = ({
    type,
    size = 'md',
    customIcon,
    className = '',
    showSymbol = true,
    symbol = '$',
    pulseColor = 'bg-white/20',
    iconPosition = type === 'price' ? 'left' : 'right',
}: PriceLoaderProps) => {
    // Size mappings for consistent scaling
    const sizeClasses = {
        sm: {
            wrapper: 'p-2',
            icon: 'w-8 h-8',
            text: 'text-2xl',
            skeleton: 'h-6 w-24',
            label: 'text-xl',
        },
        md: {
            wrapper: 'p-3',
            icon: 'w-10 h-10 md:w-14 md:h-14',
            text: 'text-3xl md:text-5xl',
            skeleton: 'h-8 md:h-12 w-32 md:w-40',
            label: 'text-2xl md:text-3xl',
        },
        lg: {
            wrapper: 'p-4',
            icon: 'w-16 h-16',
            text: 'text-6xl',
            skeleton: 'h-14 w-48',
            label: 'text-4xl',
        },
    };

    // Default icon based on type
    const Icon = () => (
        <div className={sizeClasses[size].icon}>
            {customIcon || (
                <Loader2 className="w-full h-full animate-spin text-yellow-300" />
            )}
        </div>
    );

    return (
        <div className={`flex flex-col items-center ${className}`}>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg mb-4 relative overflow-hidden group transition-all hover:bg-white/15 cursor-wait">
                {/* Shimmer effect overlay */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div
                    className={`flex items-center gap-2 ${sizeClasses[size].wrapper}`}
                >
                    {iconPosition === 'left' && <Icon />}
                    <div className="flex items-center">
                        {showSymbol && (
                            <span
                                className={`font-sour-gummy ${sizeClasses[size].text} text-white opacity-50`}
                            >
                                {symbol}
                            </span>
                        )}
                        <div
                            className={`${sizeClasses[size].skeleton} ${pulseColor} rounded animate-pulse`}
                        />
                    </div>
                    {iconPosition === 'right' && <Icon />}
                </div>
            </div>

            <div className="text-yellow-300 font-sour-gummy text-center group-hover:scale-105 transition-transform">
                <div className={sizeClasses[size].label}>current {type}</div>
            </div>
        </div>
    );
};

export default PriceLoader;
