'use client';
import React, { useEffect, useState } from 'react';
import { TrendingUp, Wallet, Sparkles, Rocket, Heart } from 'lucide-react';

import NABHero from '../sections/hero';
import NABHeader from '../sections/header';
import HowItWorks from '../sections/how-it-works';
import PriceChart from '../sections/price-chart';
import Head from 'next/head';
import WhitepaperSection from '../sections/whitepaper';
import FAQSection from '../sections/faq';
import RealityCheckSection from '../sections/reality';
import AOSection from '../sections/ao';
import HowToGet from '../sections/how-to-get';
import Tokenomics from '../sections/tokenomics';
import StakingDashboard from '../sections/dashboard';
import {
    scrollToDashboard,
    useArweaveWalletInit,
    useArweaveWalletStore,
} from '@/hooks/useArweaveWallet';
import PartnershipsSection from '../sections/partnerships';
import EcosystemStats from '../sections/stats';
import { getNABStats, getNabTokenDeets } from '@/lib/wallet-actions';

export default function Home() {
    useArweaveWalletInit();

    const connected = useArweaveWalletStore((state) => state.connected);
    const connect = useArweaveWalletStore((state) => state.connect);
    const [isInitialRender, setIsInitialRender] = React.useState(true);

    const [stats, setStats] = useState<any>(null);
    const [tokenDeets, setTokenDeets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = async () => {
        try {
            setIsLoading(true);
            const [statsData, deetsData] = await Promise.all([
                getNABStats(),
                getNabTokenDeets(),
            ]);

            if (!statsData) {
                throw new Error('Failed to fetch stats');
            }

            setStats(statsData);
            setTokenDeets(deetsData as any);
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

    useEffect(() => {
        // Only scroll if it's not the initial render and wallet is connected
        if (!isInitialRender && connected) {
            scrollToDashboard();
        }
        // Mark initial render complete
        setIsInitialRender(false);
    }, [connected, isInitialRender]);

    const handleWalletConnection = () => {
        if (!connected) {
            connect();
        }
    };

    return (
        <>
            <Head>
                <title>
                    Number Always Bigger (NAB) - where number literally just
                    gets bigger
                </title>
                <title>
                    Number Always Bigger (NAB) - where number literally just
                    gets bigger
                </title>
                <meta
                    name="description"
                    content="NAB is a token where number go up. That's it. No fancy promises, just pure mathematic certainty that number get bigger."
                />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />

                <meta
                    property="og:title"
                    content="Number Always Bigger (NAB) 📈"
                />
                <meta
                    property="og:description"
                    content="The token where number literally just gets bigger. Up only, that's it!"
                />
                <meta property="og:image" content="./nab-preview.jpg" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />

                <meta
                    property="twitter:title"
                    content="Number Always Bigger (NAB) 📈"
                />
                <meta
                    property="twitter:description"
                    content="The token where number literally just gets bigger. Up only, that's it!"
                />
                <meta property="twitter:image" content="./nab-preview.jpg" />

                {/* Additional SEO */}
                <meta name="theme-color" content="#4287f5" />
                <link rel="icon" href="./favicon.ico" />
            </Head>
            <div className="min-h-screen bg-gradient-to-b from-meme-blue via-floor-pink to-moon-yellow p-4 font-comic w-full overflow-x-hidden">
                {' '}
                <NABHeader />
                <NABHero />
                <EcosystemStats
                    stats={stats}
                    tokenDeets={tokenDeets}
                    isLoading={isLoading}
                    error={error}
                />
                {/* Staking Dashboard - only shown when wallet is connected */}
                {connected && (
                    <section className="py-16 px-4 relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-meme-blue to-transparent opacity-50" />
                        <div className="relative">
                            <StakingDashboard />
                        </div>
                    </section>
                )}
                {/* Hero Section */}
                <header className="max-w-6xl mx-auto pt-8 text-center">
                    <div className="animate-bounce mb-4">
                        <Sparkles className="h-12 w-12 inline-block text-moon-yellow" />
                    </div>
                    <h1 className="text-6xl font-bold mb-8 text-white transform -rotate-1">
                        Up only?
                    </h1>

                    {/* What is this section */}
                    <div className="bg-white rounded-lg p-8 mb-8transform -rotate-1 border-4 border-floor-pink">
                        <h2 className="text-3xl font-bold mb-4">
                            what even is this?
                        </h2>
                        <p className="text-xl mb-4">
                            hey fren! welcome to NAB (Number Always Bigger) -
                            the token that only goes up. no fancy promises, just
                            pure mathematic certainty that number go up.
                        </p>
                        <p className="text-xl">
                            why? because we said &quot;what if number... but
                            bigger?&quot; and then actually did it
                        </p>
                    </div>

                    <button
                        onClick={handleWalletConnection}
                        className="bg-moon-yellow hover:bg-yellow-400 text-black font-bold py-6 px-12 rounded-full text-2xl transform hover:scale-105 transition-all hover:-rotate-2 border-4 border-black shadow-lg"
                    >
                        {connected ? (
                            <span className="flex items-center gap-2">
                                <Rocket className="animate-pulse" />
                                printer go brrrrrrrr!!!!!
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Wallet />
                                connect wallet & print ur money
                            </span>
                        )}
                    </button>
                </header>
                {/* How it Works */}
                <section className="max-w-4xl mx-auto my-16">
                    <HowItWorks />
                </section>
                <section className="max-w-4xl mx-auto my-16">
                    <PriceChart />
                </section>
                {/* Utility Section */}
                <section className="max-w-4xl mx-auto my-16">
                    <div className="bg-white rounded-lg p-8 transform rotate-1 border-4 border-meme-blue">
                        <h2 className="text-4xl font-bold mb-6 text-center">
                            wen utility?
                        </h2>
                        <p className="text-2xl text-center mb-6">
                            utility is number go up. But also other things:
                        </p>
                        <div className="space-y-4 text-xl">
                            <p className="flex items-center gap-2">
                                <Sparkles className="text-moon-yellow" />
                                staking that makes more number (done)
                            </p>
                            <p className="flex items-center gap-2">
                                <Rocket className="text-crypto-green" />
                                transfer fees that make u money (soon)
                            </p>
                            <p className="flex items-center gap-2">
                                <Heart className="text-floor-pink" />
                                yield that buys and burns tokens (soon)
                            </p>
                            <p className="flex items-center gap-2">
                                <TrendingUp className="text-tech-purple" />
                                Even more features
                            </p>
                        </div>
                    </div>
                </section>
                {/* How to Get NAB */}
                <HowToGet data={tokenDeets} isLoading={isLoading} />
                {/* Tokenomics */}
                <Tokenomics />
                <AOSection />
                <WhitepaperSection />
                <FAQSection />
                <RealityCheckSection />
                <PartnershipsSection />
                {/* Footer */}
                <footer className="max-w-6xl mx-auto text-center py-8">
                    <p className="mb-4 text-2xl">
                        come watch number get bigger with us:
                    </p>
                    <div className="flex justify-center gap-8 mb-8">
                        <a
                            target="_blank"
                            href="https://x.com/Mithril_Labs"
                            className="bg-white px-6 py-3 rounded-full font-bold transform hover:scale-110 transition-transform hover:-rotate-2 border-2 border-black"
                        >
                            Twitter: @Mithril_Labs
                        </a>
                        <a
                            target="_blank"
                            href="https://t.me/+kbiXF8FXhI9hZTUx"
                            className="bg-white px-6 py-3 rounded-full font-bold transform hover:scale-110 transition-transform hover:-rotate-2 border-2 border-black"
                        >
                            Telegram: @NumberAlwaysBigger
                        </a>
                        <a
                            target="_blank"
                            href="https://discord.gg/RSXg24mCrJ"
                            className="bg-white px-6 py-3 rounded-full font-bold transform hover:scale-110 transition-transform hover:-rotate-2 border-2 border-black"
                        >
                            Discord: NAB Fren Zone
                        </a>
                    </div>
                    <p className="mt-8 text-sm bg-white inline-block px-4 py-2 rounded-full transform rotate-1">
                        powered by <span className="font-bold">mithril.</span>{' '}
                        (the serious stuff is hiding here:{' '}
                        <a
                            href="./Mithril_Whitepaper.pdf"
                            target="_blank"
                            className="text-meme-blue hover:underline decoration-dotted hover:decoration-solid transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-1"
                        >
                            whitepaper
                        </a>
                        )
                    </p>
                    <div className="text-lg mt-4 text-gray-800 mb-56">
                        🌈 remember: number cannot go down. it&apos;s not just a
                        meme, it&apos;s mathematic certainty
                        <br />
                        (but also yes, it&apos;s a meme) - and nothing is
                        certain
                    </div>
                </footer>
            </div>
        </>
    );
}
