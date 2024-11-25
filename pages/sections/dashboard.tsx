import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    Sparkles,
    ArrowUpCircle,
    ArrowDownCircle,
    Timer,
    Coins,
} from 'lucide-react';
import { getStakedBalances, StakedBalances } from '@/lib/wallet-actions';
import { useArweaveWalletStore } from '@/hooks/useArweaveWallet';

const StakingDashboard = () => {
    const [stakedBalances, setStakedBalances] = useState<StakedBalances>([]);
    const [stakeInput, setStakeInput] = useState('');
    const [unstakeInput, setUnstakeInput] = useState('');
    const [showStakePanel, setShowStakePanel] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const walletAddress = useArweaveWalletStore((state) => state.address);

    // Fetch staked balances
    useEffect(() => {
        if (!walletAddress) return;

        const fetchBalances = async () => {
            try {
                setIsLoading(true);
                const balances = await getStakedBalances(walletAddress);
                setStakedBalances(balances);
            } catch (err) {
                setError('Failed to fetch staked balances');
                console.error('Error fetching balances:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBalances();
        // Refresh every 5 minutes
        const interval = setInterval(fetchBalances, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [walletAddress]);

    // Calculate total staked value in smallest units
    const totalStaked = stakedBalances.reduce(
        (sum, balance) => sum + BigInt(balance.amount),
        BigInt(0)
    );

    // Format balance for display (converting from smallest units to full tokens)
    const formatBalance = (amount: string) => {
        const value = BigInt(amount);
        const integerPart = value / BigInt(1e8);
        const decimalPart = value % BigInt(1e8);
        return `${integerPart}.${decimalPart.toString().padStart(8, '0')}`;
    };

    // Mock stake function
    const handleStake = (e: React.FormEvent) => {
        e.preventDefault();
        const amount = parseFloat(stakeInput);
        if (isNaN(amount) || amount <= 0) return;
        setStakeInput('');
        // TODO: Implement actual staking
    };

    // Mock unstake function
    const handleUnstake = (e: React.FormEvent) => {
        e.preventDefault();
        const amount = parseFloat(unstakeInput);
        if (isNaN(amount) || amount <= 0) return;
        setUnstakeInput('');
        // TODO: Implement actual unstaking
    };

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

    return (
        <div id="staking-dashboard" className="max-w-4xl mx-auto p-4">
            {/* Column Headers */}
            <div className="flex items-center justify-between px-6 py-3 bg-meme-blue/10 rounded-lg border-2 border-meme-blue bg-white">
                <div className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-meme-blue" />
                    <h3 className="text-lg font-comic text-meme-blue">
                        allowed tokens
                    </h3>
                </div>
                <span className="text-lg font-comic text-meme-blue">
                    ur staked amount
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
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowStakePanel(true)}
                                className={`px-4 py-2 rounded-full font-comic ${
                                    showStakePanel
                                        ? 'bg-crypto-green text-white'
                                        : 'bg-gray-200'
                                }`}
                            >
                                stake
                            </button>
                            <button
                                onClick={() => setShowStakePanel(false)}
                                className={`px-4 py-2 rounded-full font-comic ${
                                    !showStakePanel
                                        ? 'bg-floor-pink text-white'
                                        : 'bg-gray-200'
                                }`}
                            >
                                unstake
                            </button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {showStakePanel ? (
                        <form onSubmit={handleStake} className="space-y-4">
                            <div className="flex gap-4">
                                <input
                                    type="number"
                                    value={stakeInput}
                                    onChange={(e) =>
                                        setStakeInput(e.target.value)
                                    }
                                    placeholder="enter amount to stake"
                                    className="flex-1 p-3 rounded-lg border-2 border-crypto-green font-comic focus:outline-none focus:ring-2 focus:ring-crypto-green"
                                />
                                <button
                                    type="submit"
                                    className="bg-crypto-green text-white px-6 py-3 rounded-lg font-comic hover:bg-opacity-90 transition-colors flex items-center gap-2"
                                >
                                    <ArrowUpCircle className="h-5 w-5" />
                                    stake it!
                                </button>
                            </div>
                            <Alert className="bg-crypto-green/10 border-crypto-green">
                                <Sparkles className="h-4 w-4" />
                                <AlertTitle className="font-comic">
                                    protip:
                                </AlertTitle>
                                <AlertDescription className="font-comic">
                                    the more u stake, the bigger ur share of the
                                    rewards!
                                </AlertDescription>
                            </Alert>
                        </form>
                    ) : (
                        <form onSubmit={handleUnstake} className="space-y-4">
                            <div className="flex gap-4">
                                <input
                                    type="number"
                                    value={unstakeInput}
                                    onChange={(e) =>
                                        setUnstakeInput(e.target.value)
                                    }
                                    placeholder="enter amount to unstake"
                                    className="flex-1 p-3 rounded-lg border-2 border-floor-pink font-comic focus:outline-none focus:ring-2 focus:ring-floor-pink"
                                />
                                <button
                                    type="submit"
                                    className="bg-floor-pink text-white px-6 py-3 rounded-lg font-comic hover:bg-opacity-90 transition-colors flex items-center gap-2"
                                >
                                    <ArrowDownCircle className="h-5 w-5" />
                                    unstake
                                </button>
                            </div>
                            <Alert className="bg-floor-pink/10 border-floor-pink">
                                <Timer className="h-4 w-4" />
                                <AlertTitle className="font-comic">
                                    heads up fren:
                                </AlertTitle>
                                <AlertDescription className="font-comic">
                                    unstaking takes 24 hours to process. number
                                    still go up during this time!
                                </AlertDescription>
                            </Alert>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default StakingDashboard;
