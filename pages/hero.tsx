import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Mascot from './mascot';
import { getNABPrice } from '@/lib/prices';
import CountUp from 'react-countup';

const NABHero = () => {
    const [currentPrice, setCurrentPrice] = useState(0);
    const [floor, setFloor] = useState(0);
    useEffect(() => {
        getNABPrice().then((price) => {
            if (price === false) return;
            setCurrentPrice(price);
            setFloor(price);
        });
    }, []);

    return (
        <div className="relative min-h-screen bg-meme-blue">
            {/* Radial background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)] animate-pulse" />

            {/* Sunburst background */}
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-[-100%] w-[300%] h-[300%] animate-spin-slow origin-center">
                    <Image
                        src="./sunburst.svg"
                        alt="Sunburst Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Main content wrapper - full height with flex */}
            <div className="relative min-h-screen flex flex-col">
                {/* Content container with responsive padding */}
                <div className="relative z-10 max-w-7xl mx-auto pt-20 md:pt-32 px-4 flex-grow">
                    {/* Top text section */}
                    <div className="text-center mb-8 md:mb-12 relative">
                        <div className="text-white mb-2 font-bold">
                            NAB token
                        </div>
                        <h1 className="font-sour-gummy text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-4 leading-tight">
                            number, always,
                            <br />
                            bigger
                        </h1>
                        {/* Responsive positioning for subtitle */}
                        <div className="absolute left-1/2 md:left-[80%] top-full md:top-[80%] transform -translate-x-1/2 md:-translate-x-0 -rotate-6 text-yellow-300 text-lg sm:text-xl md:text-2xl font-sour-gummy whitespace-nowrap mt-4 md:mt-0">
                            <p>(a token where the</p>
                            <p>price just goes up)</p>
                        </div>
                    </div>

                    {/* Main content area with prices - Stack on mobile, side-by-side on desktop */}
                    <div className="relative max-w-6xl mx-auto h-full">
                        {/* Price containers with responsive layout */}
                        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-0 mt-24 md:mt-0">
                            {/* Current price */}
                            <div className="md:absolute md:left-[-20%] md:mt-24 md:transform md:-translate-y-1/2">
                                <div className="flex flex-col items-center">
                                    <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 md:w-14 md:h-14">
                                                <Image
                                                    src="./arrow.svg"
                                                    alt="Up arrow"
                                                    width={14}
                                                    height={14}
                                                    className="w-full h-full"
                                                />
                                            </div>
                                            <span className="font-sour-gummy text-3xl md:text-5xl text-white">
                                                $
                                                <CountUp
                                                    end={currentPrice}
                                                    start={0}
                                                    easingFn={(t, b, c, d) =>
                                                        c * (t /= d) * t + b
                                                    }
                                                    separator=","
                                                    decimals={6}
                                                    decimal="."
                                                    duration={1}
                                                    preserveValue={true}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-yellow-300 font-sour-gummy text-2xl md:text-3xl">
                                        current price
                                    </div>
                                </div>
                            </div>

                            {/* Current floor */}
                            <div className="md:absolute md:-right-[25%] md:mt-48 md:transform md:-translate-y-1/2">
                                <div className="flex flex-col items-center">
                                    <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-sour-gummy text-3xl md:text-5xl text-white">
                                                $
                                                <CountUp
                                                    end={floor}
                                                    start={0}
                                                    easingFn={(t, b, c, d) =>
                                                        c * (t /= d) * t + b
                                                    }
                                                    separator=","
                                                    decimals={6}
                                                    decimal="."
                                                    duration={1}
                                                    preserveValue={true}
                                                />
                                            </span>
                                            <div className="w-10 h-10 md:w-14 md:h-14">
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
                                    <div className="text-yellow-300 font-sour-gummy text-2xl md:text-3xl">
                                        current floor
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mascot section - Responsive positioning */}
                <div className="absolute bottom-0 w-full flex justify-center">
                    <div className="max-w-sm md:max-w-xl -ml-8 md:-ml-32">
                        <Image
                            src="./pepe-up.png"
                            alt="NAB Mascot"
                            width={700}
                            height={700}
                            className="w-full h-auto"
                            priority
                        />
                    </div>
                </div>
            </div>
            <Mascot />
        </div>
    );
};

export default NABHero;
