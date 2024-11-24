import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    Sparkles,
    ArrowUpCircle,
    ArrowDownCircle,
    Percent,
    Timer,
    Coins,
} from 'lucide-react';

const StakingDashboard = () => {
    // State management for staking interface
    const [stakedAmount, setStakedAmount] = useState(0);
    const [stakeInput, setStakeInput] = useState('');
    const [unstakeInput, setUnstakeInput] = useState('');
    const [earnings, setEarnings] = useState(0);
    const [totalStaked, setTotalStaked] = useState(1000000);
    const [stakingPercentage, setStakingPercentage] = useState(0);
    const [showStakePanel, setShowStakePanel] = useState(true);

    // Calculate percentage of total stake
    useEffect(() => {
        const percentage = (stakedAmount / totalStaked) * 100;
        setStakingPercentage(percentage);
    }, [stakedAmount, totalStaked]);

    // Mock stake function
    const handleStake = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const amount = parseFloat(stakeInput);
        if (isNaN(amount) || amount <= 0) return;
        setStakedAmount((prev) => prev + amount);
        setStakeInput('');
    };

    // Mock unstake function
    const handleUnstake = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const amount = parseFloat(unstakeInput);
        if (isNaN(amount) || amount <= 0 || amount > stakedAmount) return;
        setStakedAmount((prev) => prev - amount);
        setUnstakeInput('');
    };

    return (
        <div id="staking-dashboard" className="max-w-4xl mx-auto p-4">
            {/* Main Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-white/95 backdrop-blur-sm border-2 border-meme-blue transform hover:scale-105 transition-transform">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Coins className="h-5 w-5 text-meme-blue" />
                                <h3
                                    className="text-lg font-comic"
                                    id="total-staked"
                                >
                                    Total Staked
                                </h3>
                            </div>
                            <span className="text-2xl font-bold font-comic">
                                {stakedAmount.toFixed(2)}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white/95 backdrop-blur-sm border-2 border-crypto-green transform hover:scale-105 transition-transform">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-crypto-green" />
                                <h3 className="text-lg font-comic">Earnings</h3>
                            </div>
                            <span className="text-2xl font-bold font-comic text-crypto-green">
                                +{earnings.toFixed(2)}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white/95 backdrop-blur-sm border-2 border-floor-pink transform hover:scale-105 transition-transform">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Percent className="h-5 w-5 text-floor-pink" />
                                <h3 className="text-lg font-comic">
                                    Your Share
                                </h3>
                            </div>
                            <span className="text-2xl font-bold font-comic text-floor-pink">
                                {stakingPercentage.toFixed(2)}%
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Staking Interface */}
            <Card className="bg-white/95 backdrop-blur-sm border-2 border-moon-yellow">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="font-comic text-2xl">
                            make ur number bigger
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
                                    max={stakedAmount}
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
