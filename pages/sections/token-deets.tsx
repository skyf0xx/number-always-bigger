import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Coins, RefreshCw, ChevronDown } from 'lucide-react';
import CountUp from 'react-countup';

interface TokenBreakdown {
    num_stakers: number;
    token_name: string;
    token_address: string;
    total_staked: string;
}

interface TokenDeetsProps {
    data?: TokenBreakdown[];
    isLoading?: boolean;
}

const TokenDeets = ({ data = [], isLoading = false }: TokenDeetsProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (isLoading) {
        return (
            <Card className="bg-white/95 backdrop-blur-sm border-4 border-tech-purple hover:scale-105 hover:-rotate-1 transform transition-all duration-300">
                <CardContent className="p-6">
                    <div className="flex items-center justify-center gap-2">
                        <RefreshCw className="h-6 w-6 animate-spin" />
                        <span className="font-comic">counting tokens...</span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {/* Accordion Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full text-left p-6 bg-gradient-to-r from-moon-yellow via-crypto-green to-floor-pink rounded-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden border-4 border-black"
            >
                {/* Animated background */}
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700" />

                <div className="flex items-center justify-between relative z-10">
                    <span className="font-bold flex items-center gap-3 text-2xl">
                        <Coins className="h-8 w-8 animate-pulse" />
                        staked tokens details
                        <span className="text-sm bg-black text-white px-3 py-1 rounded-full ml-2">
                            we&apos;re getting bigger!
                        </span>
                    </span>
                    <ChevronDown
                        className={`h-8 w-8 transition-transform duration-500 ${
                            isExpanded ? 'rotate-180' : 'animate-bounce'
                        }`}
                    />
                </div>
            </button>

            {/* Accordion Content */}
            <div
                className={`grid transition-all duration-500 ease-in-out ${
                    isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
            >
                <div className="overflow-hidden">
                    <div className="p-6 space-y-4 border-x-4 border-b-4 border-black rounded-b-lg bg-white/95">
                        {data.map((token) => (
                            <Card
                                key={token.token_address}
                                className="bg-white/95 backdrop-blur-sm border-4 border-tech-purple"
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <Coins className="h-6 w-6 text-moon-yellow" />
                                            <h3 className="text-lg font-comic">
                                                {token.token_name}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                                total staked
                                            </div>
                                            <div className="text-2xl font-bold font-comic">
                                                <CountUp
                                                    end={parseFloat(
                                                        token.total_staked
                                                    )}
                                                    decimals={0}
                                                    duration={2}
                                                    separator=","
                                                />
                                                <span className="text-sm text-gray-500 ml-2">
                                                    tokens
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">
                                                number of stakers
                                            </div>
                                            <div className="text-2xl font-bold font-comic">
                                                <CountUp
                                                    end={token.num_stakers}
                                                    duration={2}
                                                    separator=","
                                                />
                                                <span className="text-sm text-gray-500 ml-2">
                                                    frens
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TokenDeets;
