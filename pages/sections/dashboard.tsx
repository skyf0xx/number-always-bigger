import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sparkles, Coins, PieChart } from 'lucide-react';
import {
    getStakedBalances,
    StakedBalances,
    getStakeOwnership,
} from '@/lib/wallet-actions';
import { useArweaveWalletStore } from '@/hooks/useArweaveWallet';
import Staker from './staker';
import { formatBalance } from '@/lib/utils';

const StakingDashboard = () => {
    const [stakedBalances, setStakedBalances] = useState<StakedBalances>([]);
    const [stakeOwnership, setStakeOwnership] = useState<number>(0);
    const [showStakePanel, setShowStakePanel] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const walletAddress = useArweaveWalletStore((state) => state.address);

    // Fetch staked balances and ownership
    const fetchStakingData = async () => {
        if (!walletAddress) return;

        try {
            setIsLoading(true);
            const [balances, ownership] = await Promise.all([
                getStakedBalances(walletAddress),
                getStakeOwnership(walletAddress),
            ]);
            setStakedBalances(balances);
            setStakeOwnership(ownership);
        } catch (err) {
            setError('Failed to fetch staking data');
            console.error('Error fetching data:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStakingData();
        // Refresh every 5 minutes
        const interval = setInterval(fetchStakingData, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [walletAddress]);

    // Calculate total staked value in smallest units
    const totalStaked = stakedBalances.reduce(
        (sum, balance) => sum + BigInt(balance.amount),
        BigInt(0)
    );

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto p-4 text-center">
                <Card className="bg-white/95 backdrop-blur-sm">
                    <CardContent className="pt-6">
                        <div className="animate-pulse flex gap-2 justify-center items-center">
                            <Sparkles className="animate-spin" />
                            <span>calculating ur numbers fren...</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <Alert className="bg-red-50 border-red-400">
                    <AlertTitle>oopsie!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    }

    const handleStakeComplete = () => {
        fetchStakingData();
    };

    return (
        <div id="staking-dashboard" className="max-w-4xl mx-auto p-4">
            {/* Ownership Stats Card */}
            <Card className="bg-white/95 backdrop-blur-sm border-2 border-tech-purple mb-6 transform hover:scale-105 transition-transform">
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <PieChart className="h-8 w-8 text-tech-purple" />
                            <div>
                                <h3 className="text-xl font-comic">
                                    your stake ownership
                                </h3>
                                <p className="text-sm text-gray-600">
                                    you earn this much of the total rewards
                                    every 5 minutes. Stake more to earn more
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-4xl font-bold font-comic text-tech-purple">
                                {stakeOwnership}%
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Column Headers */}
            <div className="flex items-center justify-between px-6 py-3 bg-meme-blue/10 rounded-lg border-2 border-meme-blue bg-white">
                <div className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-meme-blue" />
                    <h3 className="text-lg font-comic text-meme-blue">
                        allowed tokens
                    </h3>
                </div>
                <span className="text-lg font-comic text-meme-blue">
                    staked amount
                </span>
            </div>

            {/* Staked Balances Cards */}
            <div className="grid grid-cols-1 gap-4 mb-6">
                {stakedBalances.map((balance) => (
                    <Card
                        key={balance.name}
                        className="bg-white/95 backdrop-blur-sm border-2 border-meme-blue transform hover:scale-105 transition-transform"
                    >
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Coins className="h-5 w-5 text-meme-blue" />
                                    <h3 className="text-lg font-comic">
                                        {balance.name}
                                    </h3>
                                </div>
                                <span className="text-2xl font-bold font-comic">
                                    {formatBalance(balance.amount)}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {stakedBalances.length === 0 && (
                    <Card className="bg-white/95 backdrop-blur-sm border-2 border-moon-yellow">
                        <CardContent className="pt-6">
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
                )}
            </div>

            {/* Staking Interface */}
            <Card className="bg-white/95 backdrop-blur-sm border-2 border-moon-yellow">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="font-comic text-2xl">
                            stake to start earning
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    {showStakePanel && walletAddress && (
                        <Card className="bg-white/95 backdrop-blur-sm border-2 border-moon-yellow">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle className="font-comic text-2xl">
                                        stake to start earning
                                    </CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Staker
                                    walletAddress={walletAddress}
                                    stakedBalances={stakedBalances}
                                    onStakeComplete={handleStakeComplete}
                                />
                            </CardContent>
                        </Card>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default StakingDashboard;
