import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import NABMascot from './mascot';
import PriceTicker from './sections/price-ticker';

const NABHero = () => {
    const [currentFloor, setCurrentFloor] = useState('420.69');
    const [nextFloor, setNextFloor] = useState('429.42');

    // Simulate price updates
    useEffect(() => {
        const interval = setInterval(() => {
            const current = parseFloat(currentFloor);
            const increase = (Math.random() * 2).toFixed(2);
            setCurrentFloor((current + parseFloat(increase)).toFixed(2));
            setNextFloor((current + parseFloat(increase) + 8.73).toFixed(2));
        }, 5000);

        return () => clearInterval(interval);
    }, [currentFloor]);

    return (
        <div className="relative overflow-hidden">
            <NABMascot />
            {/* Animated background with floating elements */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-floor-pink opacity-20 animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    >
                        {i % 2 === 0 ? '📈' : '🚀'}
                    </div>
                ))}
            </div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-4xl mx-auto pt-8 md:pt-16 pb-12 md:pb-24 px-4 text-center mt-20 md:mt-40">
                {/* Sparkly Header */}
                <div className="flex justify-center items-center gap-2 mb-6">
                    <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-moon-yellow animate-pulse" />
                    <h1 className="text-4xl md:text-8xl font-comic font-bold text-moon-yellow transform -rotate-2">
                        number, always, bigger
                    </h1>
                    <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-moon-yellow animate-pulse" />
                </div>

                <p className="text-xl md:text-2xl text-black mb-8 md:mb-12 transform rotate-1">
                    (NAB)
                </p>

                <PriceTicker
                    currentPrice={currentFloor}
                    nextPrice={nextFloor}
                />

                {/* Tagline */}
                <div className="text-xl md:text-2xl text-black font-comic space-y-6 md:space-y-8">
                    <p className="transform rotate-1 mt-8 md:mt-12">
                        a token where the price just goes up
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NABHero;
