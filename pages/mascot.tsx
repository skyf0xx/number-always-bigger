import React, { useState } from 'react';
import Image from 'next/image';

const NABMascot = () => {
    const [isLaunching, setIsLaunching] = useState(false);
    const [hasLaunched, setHasLaunched] = useState(false);

    const handleMascotClick = () => {
        if (!isLaunching && !hasLaunched) {
            setIsLaunching(true);
            // Reset after animation completes
            setTimeout(() => {
                setHasLaunched(true);
                setIsLaunching(false);
            }, 2000);
        }
    };

    return (
        <div
            className={`
                fixed bottom-8 right-8 lg:right-12 z-10
                ${isLaunching ? 'animate-mascot-launch' : 'animate-bounce'}
                ${hasLaunched ? 'opacity-0 pointer-events-none' : ''}
                transition-opacity duration-500
            `}
            onClick={handleMascotClick}
        >
            <div
                className={`
                relative group cursor-pointer
                transform transition-transform duration-300
                hover:scale-110 active:scale-95
            `}
            >
                {/* Rainbow glow effect */}
                <div
                    className={`
                    absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-700 to-crypto-green
                    rounded-full blur opacity-50 group-hover:opacity-75
                    transition duration-1000 group-hover:duration-200
                    ${
                        isLaunching
                            ? 'animate-glow-intensify'
                            : 'animate-glow-pulse'
                    }
                `}
                ></div>

                {/* Mascot image container */}
                <div className="relative">
                    <div
                        className={`
                        w-20 h-20 lg:w-28 lg:h-28 rounded-full
                        bg-white border-4 border-moon-yellow
                        shadow-xl overflow-hidden
                        ${isLaunching ? 'animate-mascot-spin' : ''}
                    `}
                    >
                        <Image
                            width={100}
                            height={100}
                            src="/nab.jpg"
                            alt="NAB Mascot"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Rocket flames effect */}
                    {isLaunching && (
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                            <div className="w-8 h-12 bg-gradient-to-t from-crypto-green via-moon-yellow to-transparent animate-flame" />
                        </div>
                    )}
                </div>

                {/* Hover tooltip */}
                <div
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-200
                               bg-black text-white px-4 py-2 rounded-full text-sm whitespace-nowrap"
                >
                    {hasLaunched ? "he's gone to the moon!" : 'ready!!'}
                </div>
            </div>
        </div>
    );
};

export default NABMascot;
