import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const NABHero = () => {
    const [currentPrice, setCurrentPrice] = useState('812.92');
    const [floor, setFloor] = useState('891.99');

    // Simulate price updates
    useEffect(() => {
        const interval = setInterval(() => {
            const current = parseFloat(currentPrice);
            const increase = (Math.random() * 2 + 1).toFixed(2);
            setCurrentPrice((current + parseFloat(increase)).toFixed(2));
            setFloor((current + parseFloat(increase) + 79.07).toFixed(2));
        }, 5000);

        return () => clearInterval(interval);
    }, [currentPrice]);

    return (
        <div className="relative min-h-screen bg-meme-blue">
            {/* Radial background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)] animate-pulse" />

            {/* Sunburst background */}
            <div className="absolute inset-0 w-full h-full">
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

            {/* Main content wrapper - full height with flex */}
            <div className="relative min-h-screen flex flex-col">
                {/* Content container */}
                <div className="relative z-10 max-w-7xl mx-auto pt-32 px-4 flex-grow">
                    {/* Top text section */}
                    <div className="text-center mb-12 relative">
                        <div className="text-white mb-2 font-bold">
                            NAB token
                        </div>
                        <h1 className="font-sour-gummy text-white text-6xl md:text-8xl mb-4">
                            number, always,
                            <br />
                            bigger
                        </h1>
                        <div className="absolute left-[80%] top-[80%] transform -rotate-6 text-yellow-300 text-xl md:text-2xl font-sour-gummy whitespace-nowrap">
                            <p>(a token where the</p>
                            <p>price just goes up)</p>
                        </div>
                    </div>

                    {/* Main content area with prices */}
                    <div className="relative max-w-6xl mx-auto h-full">
                        {/* Current price - Left side */}
                        <div className="absolute left-[-20%] mt-24 transform -translate-y-1/2">
                            <div className="flex flex-col items-center">
                                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-14 h-14">
                                            <Image
                                                src="./arrow.svg"
                                                alt="Up arrow"
                                                width={14}
                                                height={14}
                                                className="w-full h-full"
                                            />
                                        </div>
                                        <span className="font-sour-gummy text-5xl text-white">
                                            ${currentPrice}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-yellow-300 font-sour-gummy text-3xl">
                                    current price
                                </div>
                            </div>
                        </div>

                        {/* Current floor - Right side */}
                        <div className="absolute -right-[25%] mt-48 transform -translate-y-1/2">
                            <div className="flex flex-col items-center">
                                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="font-sour-gummy text-5xl text-white">
                                            ${floor}
                                        </span>
                                        <div className="w-14 h-14">
                                            <Image
                                                src="./rocket.svg"
                                                alt="Rocket"
                                                width={14}
                                                height={14}
                                                className="w-full h-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-yellow-300 font-sour-gummy text-3xl">
                                    current floor
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mascot section - at bottom */}
                <div className="absolute bottom-0 w-full flex justify-center">
                    <div className="max-w-xl -ml-32">
                        <Image
                            src="/pepe-up.png"
                            alt="NAB Mascot"
                            width={700}
                            height={700}
                            className="w-full h-auto"
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NABHero;
