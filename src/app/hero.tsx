import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowUp, Rocket } from 'lucide-react';

const NABHero = () => {
    const [currentFloor, setCurrentFloor] = useState('420.69');
    const [nextFloor, setNextFloor] = useState('429.42');
    const [arrowBounce, setArrowBounce] = useState(false);

    // Simulate price updates
    useEffect(() => {
        const interval = setInterval(() => {
            const current = parseFloat(currentFloor);
            const increase = (Math.random() * 2).toFixed(2);
            setCurrentFloor((current + parseFloat(increase)).toFixed(2));
            setNextFloor((current + parseFloat(increase) + 8.73).toFixed(2));
            setArrowBounce(true);
            setTimeout(() => setArrowBounce(false), 500);
        }, 5000);

        return () => clearInterval(interval);
    }, [currentFloor]);

    return (
        <div className="relative overflow-hidden">
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
            <div className="relative z-10 max-w-4xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8 text-center">
                {/* Sparkly Header */}
                <div className="flex justify-center items-center gap-2 mb-6">
                    <Sparkles className="h-8 w-8 text-moon-yellow animate-pulse" />
                    <h1 className="text-6xl font-comic font-bold text-white transform -rotate-2">
                        number always bigger
                    </h1>
                    <Sparkles className="h-8 w-8 text-moon-yellow animate-pulse" />
                </div>

                <p className="text-2xl text-white mb-12 transform rotate-1">
                    (it&apos;s literally that simple fren)
                </p>

                {/* Price Display */}
                <div className="bg-white rounded-xl p-8 transform -rotate-1 border-4 border-floor-pink shadow-xl mb-12">
                    <div className="space-y-4">
                        <div className="flex items-center justify-center gap-4">
                            <span className="text-xl text-tech-purple">
                                current floor:
                            </span>
                            <span className="text-5xl font-bold text-crypto-green font-comic">
                                ${currentFloor}
                            </span>
                            <ArrowUp
                                className={`h-8 w-8 text-crypto-green transform transition-transform ${
                                    arrowBounce ? 'translate-y-[-8px]' : ''
                                }`}
                            />
                        </div>

                        <div className="flex items-center justify-center gap-4">
                            <span className="text-xl text-tech-purple">
                                next floor:
                            </span>
                            <span className="text-3xl font-bold text-meme-blue font-comic">
                                ${nextFloor}
                            </span>
                            <Rocket className="h-6 w-6 text-meme-blue animate-bounce" />
                        </div>

                        <div className="text-sm text-gray-500 italic mt-4">
                            (source: trust me bro)
                        </div>
                    </div>
                </div>

                {/* Tagline */}
                <div className="text-2xl text-white font-comic space-y-2">
                    <p className="transform rotate-1">
                        a token where number literally just gets bigger
                    </p>
                    <p className="transform -rotate-1">
                        that&apos;s it. that&apos;s the whole thing.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NABHero;
