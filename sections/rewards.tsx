import React, { useState, useEffect } from 'react';
import { RefreshCw, Gift, Sparkles, ArrowRight } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { getBalance, TokenBalance } from '@/lib/wallet-actions';
import { formatBalance } from '@/lib/utils';
import Link from 'next/link';

const NAB_TOKEN = 'OsK9Vgjxo0ypX_HLz2iJJuh4hp3I80yA9KArsJjIloU';

interface RewardsDisplayProps {
    walletAddress: string;
}

const RewardsDisplay = ({ walletAddress }: RewardsDisplayProps) => {
    const [rewards, setRewards] = useState<TokenBalance | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRewards = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const balance = await getBalance(walletAddress, NAB_TOKEN);
                setRewards(balance);
            } catch (err) {
                setError('failed to fetch rewards');
                console.error('Error fetching rewards:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRewards();
        // Refresh every 5 minutes
        const interval = setInterval(fetchRewards, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [walletAddress]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-4 bg-white/80 rounded-lg border-2 border-moon-yellow mt-6">
                <RefreshCw className="animate-spin h-5 w-5 mr-2 text-moon-yellow" />
                <span className="font-comic">calculating your rewards...</span>
            </div>
        );
    }

    if (error) {
        return (
            <Alert className="bg-red-50 border-red-400">
                <AlertTitle className="font-comic">oopsie!</AlertTitle>
                <AlertDescription className="font-comic">
                    {error}
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="p-4 bg-white/80 rounded-lg border-2 border-moon-yellow mt-6">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                    <Gift className="h-5 w-5 text-moon-yellow" />
                    <div>
                        <p className="font-comic text-sm text-gray-600">
                            your NAB rewards
                        </p>
                        <p className="font-comic font-bold text-lg">
                            {rewards ? formatBalance(rewards.balance) : '0'} NAB
                        </p>
                    </div>
                </div>
                <div className="text-xs text-gray-500 font-comic">
                    auto-updates every 5 min
                </div>
            </div>

            {/* Staking promotion - integrated into the same box */}
            <div className="mt-3 pt-3 border-t border-moon-yellow/30">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-tech-purple" />
                        <p className="font-comic text-sm text-gray-600">
                            use ur NAB to earn more here:
                        </p>
                    </div>
                    <Link
                        href="https://mithril-mint-token.ar.io/"
                        target="_blank"
                        className="group flex items-center gap-1 bg-moon-yellow/20 hover:bg-moon-yellow/30 px-3 py-1 rounded-full font-comic text-sm text-gray-700 hover:text-gray-900 transition-all"
                    >
                        MINT Liquidity Protocol
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RewardsDisplay;
