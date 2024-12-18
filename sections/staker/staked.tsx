import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Coins, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { formatBalance } from '@/lib/utils';
import { StakedBalance } from '@/lib/wallet-actions';

interface StakedDisplayProps {
    balances: StakedBalance[];
    tokenWeights: Record<string, string>;
}

const StakedDisplay = ({ balances, tokenWeights }: StakedDisplayProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const getRewardMultiplier = (tokenName: string): string => {
        const weight = tokenWeights[tokenName];
        if (!weight) return '1X';
        return `${weight}X`;
    };

    const calculateTotalWeight = (balance: StakedBalance): number => {
        const weight = parseInt(tokenWeights[balance.name] || '1');
        return weight * parseFloat(balance.amount);
    };

    if (balances.length === 0) {
        return (
            <Card className="bg-white/95 backdrop-blur-sm border-2 border-moon-yellow">
                <CardContent className="py-6">
                    <div className="text-center">
                        <p className="text-lg font-comic">
                            no tokens staked yet fren!
                        </p>
                        <p className="text-sm text-gray-600">
                            stake some tokens to see them here
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Sort by weight (highest first)
    const getWeight = (tokenName: string) => {
        const weight = tokenWeights[tokenName];
        return weight ? parseInt(weight) : 0;
    };

    // Separate non-zero and zero balances
    const nonZeroBalances = balances
        .filter((b) => parseFloat(b.amount) > 0)
        .sort((a, b) => getWeight(b.name) - getWeight(a.name));

    const zeroBalances = balances
        .filter((b) => parseFloat(b.amount) === 0)
        .sort((a, b) => getWeight(b.name) - getWeight(a.name));

    // Calculate what to show based on expanded state
    const visibleNonZeroBalances = isExpanded
        ? nonZeroBalances
        : nonZeroBalances.slice(0, 2);
    const visibleZeroBalances = isExpanded ? zeroBalances : [];

    const hiddenCount = nonZeroBalances.length - 2 + zeroBalances.length;
    const hasHiddenItems = hiddenCount > 0;

    return (
        <Card className="bg-white/95 backdrop-blur-sm border-2 border-meme-blue">
            <CardContent className="p-6">
                {/* Header */}
                <div className="grid grid-cols-12 gap-4 mb-4 px-2 border-b border-gray-100 pb-4">
                    <div className="col-span-3 text-sm font-comic text-gray-600">
                        token
                    </div>
                    <div className="col-span-3 text-sm font-comic text-gray-600 text-center">
                        rewards per token
                    </div>
                    <div className="col-span-3 text-sm font-comic text-gray-600 text-right">
                        staked amount
                    </div>
                    <div className="col-span-3 text-sm font-comic text-gray-600 text-right">
                        total stake weight
                    </div>
                </div>

                {/* Active stakes section */}
                <div className="space-y-2">
                    {visibleNonZeroBalances.map((balance) => (
                        <div
                            key={balance.name}
                            className="grid grid-cols-12 gap-4 py-3 px-2 hover:bg-gray-50 rounded-lg transition-all duration-200 items-center"
                        >
                            <div className="col-span-3 flex items-center gap-2">
                                <Coins className="h-5 w-5 text-meme-blue flex-shrink-0" />
                                <span className="font-comic truncate">
                                    {balance.name}
                                </span>
                            </div>
                            <div className="col-span-3 flex items-center justify-center gap-1">
                                <Sparkles className="h-4 w-4 text-moon-yellow flex-shrink-0" />
                                <span className="font-comic text-tech-purple">
                                    {getRewardMultiplier(balance.name)}
                                </span>
                            </div>
                            <div className="col-span-3 font-comic text-right">
                                {formatBalance(balance.amount)}
                            </div>
                            <div className="col-span-3 font-comic text-right text-meme-blue">
                                {calculateTotalWeight(balance).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Zero balances section - only shown when expanded */}
                {isExpanded && visibleZeroBalances.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500 font-comic mb-2 px-2">
                            you can also stake these fren
                        </p>
                        <div className="space-y-2">
                            {visibleZeroBalances.map((balance) => (
                                <div
                                    key={balance.name}
                                    className="grid grid-cols-12 gap-4 py-3 px-2 hover:bg-gray-50 rounded-lg transition-all duration-200 items-center opacity-60"
                                >
                                    <div className="col-span-3 flex items-center gap-2">
                                        <Coins className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                        <span className="font-comic truncate">
                                            {balance.name}
                                        </span>
                                    </div>
                                    <div className="col-span-3 flex items-center justify-center gap-1">
                                        <Sparkles className="h-4 w-4 text-moon-yellow opacity-50 flex-shrink-0" />
                                        <span className="font-comic text-tech-purple">
                                            {getRewardMultiplier(balance.name)}
                                        </span>
                                    </div>
                                    <div className="col-span-3 font-comic text-right">
                                        0
                                    </div>
                                    <div className="col-span-3 font-comic text-right text-meme-blue">
                                        0
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Show more/less button */}
                {hasHiddenItems && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full flex items-center justify-center gap-2 py-3 mt-4 text-sm font-comic text-gray-600 hover:text-gray-800 transition-colors border-t border-gray-100"
                    >
                        {isExpanded ? (
                            <>
                                <ChevronUp className="h-4 w-4" />
                                show less
                            </>
                        ) : (
                            <>
                                <ChevronDown className="h-4 w-4" />
                                show {hiddenCount} more token
                                {hiddenCount > 1 ? 's' : ''}
                            </>
                        )}
                    </button>
                )}

                {/* Summary footer */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                        <div className="font-comic text-gray-600">
                            total active stakes: {nonZeroBalances.length}
                        </div>
                        <div className="font-comic text-meme-blue">
                            total weight:{' '}
                            {nonZeroBalances
                                .reduce(
                                    (sum, balance) =>
                                        sum + calculateTotalWeight(balance),
                                    0
                                )
                                .toLocaleString()}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default StakedDisplay;
