import React, { useState } from 'react';
import { Info, Lock, TrendingUp } from 'lucide-react';
import CountUp from 'react-countup';
import TextScramble from './text-scramble';

interface FloorDisplayProps {
    floor: number;
    isLoading: boolean;
}

const FloorDisplay: React.FC<FloorDisplayProps> = ({ floor, isLoading }) => {
    const [showInfo, setShowInfo] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    // Function to toggle info panel
    const toggleInfo = () => setShowInfo(!showInfo);

    return (
        <div className="relative">
            <div className="flex flex-col items-center">
                <div
                    onClick={toggleInfo}
                    className="bg-white/10 backdrop-blur-sm p-3 rounded-lg mb-4 cursor-help transition-all duration-300 hover:bg-white/20 group relative"
                >
                    <div className="flex items-center gap-2">
                        <span className="font-sour-gummy text-3xl md:text-5xl text-white relative">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-6 w-6 text-yellow-300 animate-pulse" />
                                <span className="font-sour-gummy text-3xl md:text-5xl text-white relative group-hover:text-yellow-300 transition-colors">
                                    <TextScramble
                                        text="moon.now.lua"
                                        duration={2000}
                                    />
                                </span>
                            </div>
                            <Info className="absolute -right-6 top-0 h-4 w-4 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                    </div>
                </div>
                <div className="text-yellow-300 font-sour-gummy text-2xl md:text-3xl flex items-center gap-2">
                    <TextScramble text="current floor" duration={1500} />
                    <Lock className="h-4 w-4" />
                </div>
            </div>

            {/* Info Panel */}
            {showInfo && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-72 bg-white/95 backdrop-blur-md p-4 rounded-lg border-2 border-yellow-300 shadow-xl z-50">
                    <div className="relative">
                        <button
                            onClick={toggleInfo}
                            className="absolute -right-2 -top-2 bg-yellow-300 text-black rounded-full w-6 h-6 flex items-center justify-center hover:bg-yellow-400 transition-colors"
                        >
                            ×
                        </button>

                        <h3 className="font-sour-gummy text-lg mb-2 text-tech-purple">
                            Floor Monitoring Coming Soon!
                        </h3>
                        <p className="text-sm mb-3">
                            Floor tracking will be activated in February 2025
                            along with:
                        </p>
                        <ul className="text-sm space-y-2 text-gray-700">
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-crypto-green rounded-full" />
                                New staking tokens
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-crypto-green rounded-full" />
                                Buy & burn activation
                            </li>
                        </ul>
                        <a
                            href="https://x.com/AlwaysBigger/status/1864157843886362959"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block mt-3 text-xs text-meme-blue hover:text-tech-purple transition-colors text-center"
                        >
                            Read more about the timeline →
                        </a>
                    </div>
                </div>
            )}

            {/* Backdrop for closing */}
            {showInfo && (
                <div className="fixed inset-0 z-40" onClick={toggleInfo} />
            )}
        </div>
    );
};

export default FloorDisplay;
