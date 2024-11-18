'use client';
import React, { useState } from 'react';
import { TrendingUp, Wallet, Sparkles, Rocket, Heart } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

import NABHero from './hero';
import NABHeader from './header';
import HowItWorks from './sections/how-it-works';
import PriceChart from './sections/price-chart';
import Head from 'next/head';
import WhitepaperSection from './sections/whitepaper';
import FAQSection from './sections/faq';
import RealityCheckSection from './sections/reality';

export default function Home() {
    const [isWalletConnected, setIsWalletConnected] = useState(false);

    return (
        <>
            <Head>
                <title>
                    Number Always Bigger (NAB) - where number literally just
                    gets bigger
                </title>
            </Head>
            <div className="min-h-screen bg-gradient-to-b from-meme-blue via-floor-pink to-moon-yellow p-4 font-comic w-full overflow-x-hidden">
                {' '}
                <NABHeader />
                <NABHero />
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
                        onClick={() => setIsWalletConnected(!isWalletConnected)}
                        className="bg-moon-yellow hover:bg-yellow-400 text-black font-bold py-6 px-12 rounded-full text-2xl transform hover:scale-105 transition-all hover:-rotate-2 border-4 border-black shadow-lg"
                    >
                        {isWalletConnected ? (
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
                <section className="max-w-4xl mx-auto my-16" id="stake">
                    <div className="bg-white rounded-lg p-8 transform -rotate-1 border-4 border-crypto-green">
                        <h2 className="text-4xl font-bold mb-6 text-center">
                            how 2 get NAB?
                        </h2>
                        <p className="text-2xl text-center mb-8">
                            u can&apos;t buy NAB directly fren (we&apos;re built
                            different)
                        </p>

                        <Alert className="border-4 border-moon-yellow mb-8">
                            <AlertTitle className="text-2xl mb-4">
                                to make NAB exist:
                            </AlertTitle>
                            <AlertDescription className="text-xl space-y-4">
                                <p>
                                    1. stake fren tokens in our special contract
                                </p>
                                <p>2. wait for number printer go brrr</p>
                                <p>3. profit</p>
                            </AlertDescription>
                        </Alert>

                        <Alert className="border-4 border-floor-pink">
                            <AlertTitle className="text-2xl mb-4">
                                accepted fren tokens:
                            </AlertTitle>
                            <AlertDescription className="text-xl">
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-2">
                                        <TrendingUp className="text-crypto-green" />
                                        <a
                                            target="_blank"
                                            href="https://www.ao.link/#/token/lmaw9BhyycEIyxWhr0kF_tTcfoSoduDX8fChpHn2eQM"
                                            className="text-meme-blue hover:text-crypto-green underline decoration-dotted hover:decoration-solid transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-1"
                                        >
                                            Botega LP qAR/AGENT
                                        </a>{' '}
                                        <span className="text-sm">
                                            (mint NAB while still earning your
                                            LP rewards on Botega)
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Sparkles className="text-moon-yellow" />
                                        stETH (soon)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Rocket className="text-crypto-green" />
                                        stSOL (soon)
                                    </li>
                                    <li className="text-center mt-4">
                                        more frens coming soon™
                                    </li>
                                </ul>
                            </AlertDescription>
                        </Alert>
                    </div>
                </section>
                {/* Disclaimer */}
                <section className="max-w-4xl mx-auto my-16">
                    <div className="bg-white rounded-lg p-8 transform rotate-1 border-4 border-tech-purple">
                        <h2 className="text-3xl font-bold mb-4 text-center">
                            numbers about the number
                        </h2>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between text-xl">
                                <span className="font-bold">total supply:</span>
                                <span className="text-crypto-green">
                                    exactly what it needs to be
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xl">
                                <span className="font-bold">
                                    current price:
                                </span>
                                <span className="text-crypto-green">
                                    bigger than yesterday
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xl">
                                <span className="font-bold">
                                    tomorrow&apos;s price:
                                </span>
                                <span className="text-crypto-green">
                                    even bigger probably
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xl">
                                <span className="font-bold">trust level:</span>
                                <span className="text-crypto-green">yes</span>
                            </div>
                        </div>
                    </div>
                </section>
                <WhitepaperSection />
                <FAQSection />
                <RealityCheckSection />
                {/* Footer */}
                <footer className="max-w-6xl mx-auto text-center py-8">
                    <p className="mb-4 text-2xl">
                        come watch number get bigger with us:
                    </p>
                    <div className="flex justify-center gap-8 mb-8">
                        <a
                            href="https://x.com/AlwaysBigger"
                            className="bg-white px-6 py-3 rounded-full font-bold transform hover:scale-110 transition-transform hover:-rotate-2 border-2 border-black"
                        >
                            Twitter: @AlwaysBigger
                        </a>
                        <span className="bg-white px-6 py-3 rounded-full font-bold transform hover:scale-110 transition-transform hover:-rotate-2 border-2 border-black">
                            Discord: NAB Fren Zone (soon)
                        </span>
                        <span className="bg-white px-6 py-3 rounded-full font-bold transform hover:scale-110 transition-transform hover:-rotate-2 border-2 border-black">
                            Telegram: Number Watchers (soon)
                        </span>
                    </div>
                    <p className="mt-8 text-sm bg-white inline-block px-4 py-2 rounded-full transform rotate-1">
                        powered by <span className="font-bold">mithril.</span>{' '}
                        (the serious stuff is hiding here:{' '}
                        <a
                            href="https://fde7mye2jlxwd44ljgpwh2iyjrqany55bjxgsn36fnelftwhdo2q.arweave.net/KMn2YJpK72Hzi0mfY-kYTGAG470Kbmk3fitIss7HG7U"
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
