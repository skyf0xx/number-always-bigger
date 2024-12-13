import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Coins, ChevronDown, ChevronUp } from 'lucide-react';
import { formatBalance } from '@/lib/utils';
import { StakedBalance } from '@/lib/wallet-actions';

interface StakedDisplayProps {
    balances: StakedBalance[];
}

const StakedDisplay = ({ balances }: StakedDisplayProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (balances.length === 0) {
        return (
            <Card className="bg-white/95 backdrop-blur-sm border-2 border-moon-yellow">
                <CardContent className="py-4">
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

    // Separate non-zero and zero balances
    const nonZeroBalances = balances
        .filter((b) => parseFloat(b.amount) > 0)
        .sort((a, b) => a.name.localeCompare(b.name));

    const zeroBalances = balances
        .filter((b) => parseFloat(b.amount) === 0)
        .sort((a, b) => a.name.localeCompare(b.name));

    // Calculate what to show based on expanded state
    const visibleNonZeroBalances = isExpanded
        ? nonZeroBalances
        : nonZeroBalances.slice(0, 2);
    const visibleZeroBalances = isExpanded ? zeroBalances : [];

    const hiddenCount = nonZeroBalances.length - 2 + zeroBalances.length;
    const hasHiddenItems = hiddenCount > 0;

    return (
        <Card className="bg-white/95 backdrop-blur-sm border-2 border-meme-blue">
            <CardContent className="py-4">
                {/* Active stakes section */}
                {visibleNonZeroBalances.length > 0 && (
                    <div className="space-y-3">
                        {visibleNonZeroBalances.map((balance) => (
                            <div
                                key={balance.name}
                                className="flex items-center justify-between py-2 border-b border-gray-100"
                            >
                                <div className="flex items-center gap-2">
                                    <Coins className="h-5 w-5 text-meme-blue" />
                                    <span className="font-comic">
                                        {balance.name}
                                    </span>
                                </div>
                                <span className="font-comic font-bold">
                                    {formatBalance(balance.amount)}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Zero balances section - only shown when expanded */}
                {isExpanded && visibleZeroBalances.length > 0 && (
                    <div className="space-y-3">
                        <div className="pt-2 border-t border-gray-200">
                            <p className="text-sm text-gray-500 font-comic mb-2">
                                inactive stakes
                            </p>
                            {visibleZeroBalances.map((balance) => (
                                <div
                                    key={balance.name}
                                    className="flex items-center justify-between py-2 border-b border-gray-100 opacity-60"
                                >
                                    <div className="flex items-center gap-2">
                                        <Coins className="h-5 w-5 text-gray-400" />
                                        <span className="font-comic">
                                            {balance.name}
                                        </span>
                                    </div>
                                    <span className="font-comic">
                                        {formatBalance(balance.amount)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Expand/Collapse button */}
                {hasHiddenItems && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full flex items-center justify-center gap-2 py-2 mt-2 text-sm font-comic text-gray-600 hover:text-gray-800 transition-colors"
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
                <div className="pt-3 mt-3 border-t border-gray-100">
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <span className="font-comic">total active stakes:</span>
                        <span className="font-comic font-bold">
                            {nonZeroBalances.length}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default StakedDisplay;
