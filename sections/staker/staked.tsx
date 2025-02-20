import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Coins, ChevronDown, ChevronUp, Sparkles, Layers } from 'lucide-react';
import { formatBalance, formatTokenName } from '@/lib/utils';
import { StakedBalance } from '@/lib/wallet-actions';
import Link from 'next/link';

interface StakedDisplayProps {
    balances: StakedBalance[];
    tokenWeights: Record<string, string>;
}

// Special token display component
const TokenNameDisplay = ({ name }: { name: string }) => {
    if (name === 'MINT') {
        return (
            <Link
                href="http://mithril-mint-token.ar.io"
                target="_blank"
                className="relative group inline-flex items-center gap-2 bg-gradient-to-r from-[#6B46C1] via-[#9F7AEA] to-[#D69E2E] px-3 py-1 rounded-full font-medium text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
                <Sparkles className="h-3 w-3 text-white animate-pulse" />
                {name}
                <span className="absolute -inset-0.5 bg-gradient-to-r from-[#6B46C1] via-[#9F7AEA] to-[#D69E2E] opacity-0 group-hover:opacity-30 rounded-full blur transition duration-300"></span>
            </Link>
        );
    }
    return <span className="font-comic">{formatTokenName(name)}</span>;
};

const StakedDisplay = ({ balances, tokenWeights }: StakedDisplayProps) => {
    const [isRegularExpanded, setIsRegularExpanded] = useState(true);
    const [isLPExpanded, setIsLPExpanded] = useState(false);

    const getRewardMultiplier = (tokenName: string): string => {
        const weight = tokenWeights[tokenName];
        if (!weight || weight === '0') return '0X';
        return `${weight}X`;
    };

    const calculateTotalWeight = (balance: StakedBalance): number => {
        const weight = parseInt(tokenWeights[balance.name] || '0');
        return weight * parseFloat(balance.amount);
    };

    const isLPToken = (tokenName: string): boolean => {
        return (
            tokenName.startsWith('Botega LP') ||
            /^[^-]+-NAB-\d+$/.test(tokenName) ||
            /^NAB-[^-]+-\d+$/.test(tokenName)
        );
    };

    const validBalances = balances.filter(
        (balance) =>
            tokenWeights[balance.name] && tokenWeights[balance.name] !== '0'
    );

    const sortTokens = (tokens: StakedBalance[]) => {
        return tokens.sort((a, b) => {
            // First sort MINT token to the top
            if (a.name === 'MINT') return -1;
            if (b.name === 'MINT') return 1;

            // Then sort by staked amount
            const aHasStake = parseFloat(a.amount) > 0;
            const bHasStake = parseFloat(b.amount) > 0;
            if (aHasStake && !bHasStake) return -1;
            if (!aHasStake && bHasStake) return 1;

            // Finally sort alphabetically
            return a.name.localeCompare(b.name);
        });
    };

    const lpTokens = sortTokens(validBalances.filter((b) => isLPToken(b.name)));
    const regularTokens = sortTokens(
        validBalances.filter((b) => !isLPToken(b.name))
    );

    if (validBalances.length === 0) {
        return (
            <Card className="bg-white/95 backdrop-blur-sm border-2 border-moon-yellow">
                <CardContent className="py-6">
                    <div className="text-center">
                        <p className="text-lg font-comic">
                            no tokens staked yet fren!
                        </p>
                        <p className="text-sm text-gray-600">
                            stake some tokens to start earning rewards
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const TokenList = ({
        tokens,
        title,
        icon: Icon,
        isExpanded,
        onToggle,
    }: {
        tokens: StakedBalance[];
        title: string;
        icon: React.ElementType;
        isExpanded: boolean;
        onToggle: () => void;
    }) => (
        <div className="mb-4">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors mb-2"
            >
                <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-tech-purple" />
                    <span className="font-comic">
                        {title} (
                        {tokens.filter((t) => parseFloat(t.amount) > 0).length})
                    </span>
                </div>
                {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-gray-600" />
                ) : (
                    <ChevronDown className="h-4 w-4 text-gray-600" />
                )}
            </button>

            {isExpanded && (
                <div className="space-y-2">
                    {tokens.map((balance) => (
                        <div
                            key={balance.name}
                            className={`grid grid-cols-12 gap-4 py-3 px-2 hover:bg-gray-50 rounded-lg transition-all duration-200 items-center ${
                                parseFloat(balance.amount) === 0
                                    ? 'opacity-60'
                                    : ''
                            }`}
                        >
                            <div className="col-span-3 flex items-center gap-2">
                                <Icon
                                    className={`h-5 w-5 ${
                                        parseFloat(balance.amount) === 0
                                            ? 'text-gray-400'
                                            : 'text-meme-blue'
                                    } flex-shrink-0`}
                                />
                                <TokenNameDisplay name={balance.name} />
                            </div>
                            <div className="col-span-3 flex items-center justify-center gap-1">
                                <Sparkles
                                    className={`h-4 w-4 text-moon-yellow ${
                                        parseFloat(balance.amount) === 0
                                            ? 'opacity-50'
                                            : ''
                                    } flex-shrink-0`}
                                />
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
            )}
        </div>
    );

    return (
        <Card className="bg-white/95 backdrop-blur-sm border-2 border-meme-blue">
            <CardContent className="p-6">
                <div className="grid grid-cols-12 gap-4 mb-4 px-2 border-b border-gray-100 pb-4">
                    <div className="col-span-3 text-sm font-comic text-gray-600">
                        token
                    </div>
                    <div className="col-span-3 text-sm font-comic text-gray-600 text-center">
                        rewards multiplier
                    </div>
                    <div className="col-span-3 text-sm font-comic text-gray-600 text-right">
                        staked amount
                    </div>
                    <div className="col-span-3 text-sm font-comic text-gray-600 text-right">
                        total stake weight
                    </div>
                </div>

                <TokenList
                    tokens={regularTokens}
                    title="Regular Tokens"
                    icon={Coins}
                    isExpanded={isRegularExpanded}
                    onToggle={() => setIsRegularExpanded(!isRegularExpanded)}
                />

                <TokenList
                    tokens={lpTokens}
                    title="LP Tokens"
                    icon={Layers}
                    isExpanded={isLPExpanded}
                    onToggle={() => setIsLPExpanded(!isLPExpanded)}
                />

                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                        <div className="font-comic text-gray-600">
                            total active stakes:{' '}
                            {
                                validBalances.filter(
                                    (b) => parseFloat(b.amount) > 0
                                ).length
                            }
                        </div>
                        <div className="font-comic text-meme-blue">
                            total weight:{' '}
                            {validBalances
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
