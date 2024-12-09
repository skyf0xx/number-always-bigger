import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Coins, RefreshCw } from 'lucide-react';
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
    // Format number with commas and fixed decimal places
    const formatNumber = (value: string) => {
        return parseFloat(value).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

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
        <div className="grid grid-cols-1 gap-4">
            {data.map((token, index) => (
                <Card
                    key={token.token_address}
                    className="bg-white/95 backdrop-blur-sm border-4 border-tech-purple hover:scale-105 hover:-rotate-1 transform transition-all duration-300"
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
                                        end={parseFloat(token.total_staked)}
                                        decimals={2}
                                        duration={2}
                                        separator=","
                                    />
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
    );
};

export default TokenDeets;
