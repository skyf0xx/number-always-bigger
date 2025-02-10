import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Coins, RefreshCw, ChevronDown, Search } from 'lucide-react';
import CountUp from 'react-countup';
import { formatTokenName } from '@/lib/utils';

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
    const [searchQuery, setSearchQuery] = useState('');
    const [sortKey, setSortKey] = useState<'stakers' | 'staked'>('staked');
    const [isExpanded, setIsExpanded] = useState(false);
    const maxVisible = 5;

    if (isLoading) {
        return (
            <Card className="bg-white/95 backdrop-blur-sm border-2 border-tech-purple">
                <CardContent className="p-4">
                    <div className="flex items-center justify-center gap-2">
                        <RefreshCw className="h-5 w-5 animate-spin" />
                        <span className="font-comic">counting tokens...</span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Filter out tokens with zero stakers, then apply search and sort
    const processedData = [...data]
        .filter((token) => token.num_stakers > 0) // Filter out tokens with zero stakers
        .filter((token) =>
            token.token_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) =>
            sortKey === 'stakers'
                ? b.num_stakers - a.num_stakers
                : parseFloat(b.total_staked) - parseFloat(a.total_staked)
        );

    // Show top 5 by default, all when expanded
    const visibleData = isExpanded
        ? processedData
        : processedData.slice(0, maxVisible);

    // If there are no tokens with stakers, show a message
    if (processedData.length === 0) {
        return (
            <Card className="bg-white/95 backdrop-blur-sm border-2 border-tech-purple">
                <CardContent className="p-4">
                    <div className="text-center font-comic">
                        <p>no tokens staked yet fren!</p>
                        <p className="text-sm text-gray-500">
                            connect wallet to start staking
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-white/95 backdrop-blur-sm border-2 border-tech-purple">
            <CardContent className="p-4">
                {/* Header with controls */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <Coins className="h-5 w-5 text-moon-yellow" />
                        <h3 className="font-comic text-lg">
                            staked tokens overview
                        </h3>
                    </div>
                    <div className="flex gap-3">
                        {/* Search */}
                        <div className="relative">
                            <Search className="h-4 w-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="find token..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-8 pr-3 py-1 text-sm border-2 rounded-md font-comic focus:outline-none focus:border-tech-purple"
                            />
                        </div>
                        {/* Sort Toggle */}
                        <button
                            onClick={() =>
                                setSortKey((prev) =>
                                    prev === 'stakers' ? 'staked' : 'stakers'
                                )
                            }
                            className="text-sm bg-gray-100 px-3 py-1 rounded-md font-comic hover:bg-gray-200 transition-colors"
                        >
                            sorted by:{' '}
                            {sortKey === 'stakers' ? 'stakers' : 'total staked'}
                        </button>
                    </div>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 py-2 border-b-2 border-gray-100 font-comic text-sm text-gray-600">
                    <div className="col-span-4">token</div>
                    <div className="col-span-4 text-right">total staked</div>
                    <div className="col-span-4 text-right">stakers</div>
                </div>

                {/* Token List */}
                <div className="space-y-2 mt-2">
                    {visibleData.map((token) => (
                        <div
                            key={token.token_address}
                            className="grid grid-cols-12 gap-4 py-2 hover:bg-gray-50 rounded-lg transition-colors items-center font-comic"
                        >
                            <div className="col-span-4 flex items-center gap-2">
                                <Coins className="h-4 w-4 text-tech-purple" />
                                {formatTokenName(token.token_name)}
                            </div>
                            <div className="col-span-4 text-right">
                                <CountUp
                                    end={parseFloat(token.total_staked)}
                                    duration={1}
                                    separator=","
                                    decimals={0}
                                />
                            </div>
                            <div className="col-span-4 text-right">
                                <CountUp
                                    end={token.num_stakers}
                                    duration={1}
                                    separator=","
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show More/Less Button */}
                {processedData.length > maxVisible && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full mt-4 py-2 flex items-center justify-center gap-2 text-sm font-comic text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        {isExpanded
                            ? 'show less'
                            : `show ${processedData.length - maxVisible} more`}
                        <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                                isExpanded ? 'rotate-180' : ''
                            }`}
                        />
                    </button>
                )}
            </CardContent>
        </Card>
    );
};

export default TokenDeets;
