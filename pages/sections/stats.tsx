import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
    TrendingUp,
    Users2,
    Coins,
    Printer,
    CandlestickChart,
    RefreshCw,
    Sparkles,
} from 'lucide-react';
import CountUp from 'react-countup';
import { getNABStats } from '@/lib/wallet-actions';

const EcosystemStats = () => {
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = async () => {
        try {
            setIsLoading(true);
            const stats = await getNABStats();
            if (!stats) {
                throw new Error('Failed to fetch stats');
            }
            setStats(stats);
            setError(null);
        } catch (err) {
            setError('oopsie! stats machine broke');
            console.error('Error fetching stats:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const statsItems = [
        {
            title: 'market cap',
            value: stats?.market_cap || '0',
            prefix: '$',
            icon: <TrendingUp className="h-6 w-6 text-crypto-green" />,
            tooltip: 'total NAB ecosystem value',
        },
        {
            title: 'total stakers',
            value: stats?.unique_stakers.toString() || '0',
            icon: <Users2 className="h-6 w-6 text-floor-pink" />,
            tooltip: 'number of frens making number bigger',
        },
        {
            title: 'total supply',
            value: stats?.total_supply || '0',
            icon: <Coins className="h-6 w-6 text-moon-yellow" />,
            tooltip: 'NAB tokens in existence',
        },
        {
            title: 'total $NAB rewards daily',
            value: stats?.daily_mint_rate || '0',
            suffix: ' NAB/day',
            icon: <Printer className="h-6 w-6 text-meme-blue" />,
            tooltip: 'printer prints less each day, like Bitcoin',
        },
        {
            title: 'current floor',
            value: 'Locked in on FEB 2025', //stats?.floor_price || '0',
            prefix: '$',
            icon: <CandlestickChart className="h-6 w-6 text-tech-purple" />,
            tooltip: 'lowest number can go (before supply reduction)',
        },
    ];

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto py-12">
                <div className="flex items-center justify-center gap-2 text-white">
                    <RefreshCw className="h-6 w-6 animate-spin" />
                    <span className="font-comic">
                        calculating big numbers...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <section className="max-w-6xl mx-auto py-12">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-sour-gummy text-white flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="h-8 w-8 text-moon-yellow" />
                    number status report
                    <Sparkles className="h-8 w-8 text-moon-yellow" />
                </h2>
                <p className="text-xl text-white/90 font-comic">
                    (how fast is $NAB growing?)
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {statsItems.map((item, index) => (
                    <Card
                        key={index}
                        className="bg-white/95 backdrop-blur-sm border-4 border-tech-purple hover:scale-105 hover:-rotate-1 transform transition-all duration-300"
                    >
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-comic">
                                    {item.title}
                                </h3>
                                {item.icon}
                            </div>
                            <div className="text-2xl font-bold font-comic">
                                {item.prefix}
                                <CountUp
                                    end={parseFloat(item.value)}
                                    decimals={2}
                                    duration={2}
                                    separator=","
                                />
                                {item.suffix}
                            </div>
                            <div className="text-sm text-gray-500 mt-2">
                                {item.tooltip}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default EcosystemStats;
