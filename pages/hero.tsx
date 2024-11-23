import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const NABHero = () => {
    const [currentFloor, setCurrentFloor] = useState('812.92');
    const [nextFloor, setNextFloor] = useState('891.99');

    // Simulate price updates
    useEffect(() => {
        const interval = setInterval(() => {
            const current = parseFloat(currentFloor);
            const increase = (Math.random() * 2 + 1).toFixed(2);
            setCurrentFloor((current + parseFloat(increase)).toFixed(2));
            setNextFloor((current + parseFloat(increase) + 79.07).toFixed(2));
        }, 5000);

        return () => clearInterval(interval);
    }, [currentFloor]);

    // Add the tailwind class to your styles
    const styles = {
        '@keyframes spin-slow': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
        },
        '.animate-spin-slow': {
            animation: 'spin-slow 60s linear infinite',
        },
    };

    return (
        <div className="relative min-h-screen bg-meme-blue overflow-hidden">
            {/* Radial background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)] animate-pulse" />
            {/* Sunburst background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="absolute inset-[-100%] w-[300%] h-[300%] animate-spin-slow origin-center">
                    <Image
                        src="/sunburst.svg"
                        alt="Sunburst Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Content container */}
            <div className="relative z-10 max-w-7xl mx-auto pt-32 px-4">
                {/* Top text section */}
                <div className="text-center mb-12">
                    <div className="text-white text-sm mb-2">NAB token</div>
                    <h1 className="font-sour-gummy text-white text-6xl md:text-8xl mb-4">
                        number, always,
                        <br />
                        bigger
                    </h1>
                    <p className="text-yellow-300 text-xl md:text-2xl font-sour-gummy">
                        (a token where the price just goes up)
                    </p>
                </div>

                {/* Main content area with prices and mascot */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Current floor - Left side */}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
                        <div className="flex flex-col items-center">
                            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6">
                                        <Image
                                            src="./arrow.svg"
                                            alt="Up arrow"
                                            width={24}
                                            height={24}
                                            className="w-full h-full"
                                        />
                                    </div>
                                    <span className="font-sour-gummy text-5xl text-white">
                                        ${currentFloor}
                                    </span>
                                </div>
                            </div>
                            <div className="text-yellow-300 font-sour-gummy text-2xl">
                                current floor
                            </div>
                        </div>
                    </div>

                    {/* Mascot - Center */}
                    <div className="flex justify-center">
                        <Image
                            src="/pepe-up.png"
                            alt="NAB Mascot"
                            width={400}
                            height={400}
                            className="w-96"
                        />
                    </div>

                    {/* Next floor - Right side */}
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                        <div className="flex flex-col items-center">
                            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="font-sour-gummy text-5xl text-white">
                                        ${nextFloor}
                                    </span>
                                    <div className="w-6 h-6">
                                        <Image
                                            src="./rocket.svg"
                                            alt="Rocket"
                                            width={24}
                                            height={24}
                                            className="w-full h-full"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="text-yellow-300 font-sour-gummy text-2xl">
                                next floor
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NABHero;
