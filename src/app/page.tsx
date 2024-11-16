'use client';
import React, { useState, useEffect } from 'react';
import { TrendingUp, Wallet, Sparkles, Rocket, Heart } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import dynamic from 'next/dynamic';
const LineChart = dynamic(
    () => import('recharts').then((mod) => mod.LineChart),
    { ssr: false }
);
import { Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Head from 'next/head';
import NABHero from './hero';
import NABHeader from './header';

const mockPriceData = [
    { time: '1h', price: 100 },
    { time: '2h', price: 102 },
    { time: '3h', price: 105 },
    { time: '4h', price: 108 },
    { time: '5h', price: 112 },
    { time: '6h', price: 115 },
];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 border-2 border-dashed border-meme-blue rounded-lg">
                <p className="font-comic">
                    trust me fren, price is {payload[0].value}
                </p>
            </div>
        );
    }
    return null;
};

export default function Home() {
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [currentPrice, setCurrentPrice] = useState(420.69);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPrice((prev) => +(prev + Math.random()).toFixed(2));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-meme-blue via-floor-pink to-moon-yellow p-4 font-comic">
                <NABHeader />
                <NABHero />

                {/* Hero Section */}
                <header className="max-w-6xl mx-auto pt-8 text-center">
                    <div className="animate-bounce mb-4">
                        <Sparkles className="h-12 w-12 inline-block text-moon-yellow" />
                    </div>
                    <h1 className="text-6xl font-bold mb-4 text-white transform -rotate-1">
                        where number literally just gets bigger lol
                    </h1>

                    {/* What is this section */}
                    <div className="bg-white rounded-lg p-8 mb-8 transform -rotate-1 border-4 border-floor-pink">
                        <h2 className="text-3xl font-bold mb-4">
                            what even is this?
                        </h2>
                        <p className="text-xl mb-4">
                            hey fren! welcome to NAB (Number Always Bigger) -
                            the token that literally only goes up. no fancy
                            promises, just pure mathematic certainty that number
                            go up (probably).
                        </p>
                        <p className="text-xl">
                            why? because we said &quot;what if number... but
                            bigger?&quot; and then actually did it lol
                        </p>
                    </div>

                    <button
                        onClick={() => setIsWalletConnected(!isWalletConnected)}
                        className="bg-moon-yellow hover:bg-yellow-400 text-black font-bold py-6 px-12 rounded-full text-2xl transform hover:scale-105 transition-all hover:-rotate-2 border-4 border-black shadow-lg"
                    >
                        {isWalletConnected ? (
                            <span className="flex items-center gap-2">
                                <Rocket className="animate-pulse" />
                                ur vibing with us now!
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Wallet />
                                connect wallet & vibe
                            </span>
                        )}
                    </button>
                </header>

                {/* How it Works */}
                <section className="max-w-4xl mx-auto my-16">
                    <div className="bg-white rounded-lg p-8 transform -rotate-1 border-4 border-floor-pink">
                        <h2 className="text-4xl font-bold mb-8 text-center text-tech-purple">
                            how does number get bigger?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {[
                                {
                                    step: 1,
                                    title: 'number exists',
                                    desc: 'very important first step',
                                    color: 'meme-blue',
                                },
                                {
                                    step: 2,
                                    title: 'smart contract do a check',
                                    desc: 'very technical, much wow',
                                    color: 'crypto-green',
                                },
                                {
                                    step: 3,
                                    title: 'if number trying to go down...',
                                    desc: 'we make supply smol',
                                    color: 'floor-pink',
                                },
                                {
                                    step: 4,
                                    title: "that's literally it",
                                    desc: 'number has no choice but go up',
                                    color: 'moon-yellow',
                                },
                            ].map(({ step, title, desc, color }) => (
                                <div
                                    key={step}
                                    className="text-center p-4 transform hover:scale-105 transition-transform"
                                >
                                    <div
                                        className={`bg-${color} text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-xl border-4 border-black shadow-lg`}
                                    >
                                        {step}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">
                                        {title}
                                    </h3>
                                    <p className="text-gray-600">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="max-w-4xl mx-auto my-16">
                    <div className="mb-8 h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={mockPriceData}>
                                <XAxis dataKey="time" stroke="#8b008b" />
                                <YAxis stroke="#8b008b" />
                                <Tooltip
                                    content={
                                        <CustomTooltip
                                            active={undefined}
                                            payload={undefined}
                                            label={undefined}
                                        />
                                    }
                                />
                                <Line
                                    type="monotone"
                                    dataKey="price"
                                    stroke="#00ff98"
                                    strokeWidth={4}
                                    dot={{ fill: '#ff69b4', strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </section>
                {/* Utility Section */}
                <section className="max-w-4xl mx-auto my-16">
                    <div className="bg-white rounded-lg p-8 transform rotate-1 border-4 border-meme-blue">
                        <h2 className="text-4xl font-bold mb-6 text-center">
                            wen utility?
                        </h2>
                        <p className="text-2xl text-center mb-6">
                            utility is number go up
                        </p>
                        <div className="space-y-4 text-xl">
                            <p className="flex items-center gap-2">
                                <Sparkles className="text-moon-yellow" />
                                transfer fees that make u money
                            </p>
                            <p className="flex items-center gap-2">
                                <Rocket className="text-crypto-green" />
                                staking that makes more number
                            </p>
                            <p className="flex items-center gap-2">
                                <Heart className="text-floor-pink" />
                                yield that buys and burns tokens
                            </p>
                            <p className="flex items-center gap-2">
                                <TrendingUp className="text-tech-purple" />
                                smart contract that does big brain math
                            </p>
                        </div>
                    </div>
                </section>

                {/* How to Get NAB */}
                <section className="max-w-4xl mx-auto my-16">
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
                                <p>3. profit (literally)</p>
                            </AlertDescription>
                        </Alert>

                        <Alert className="border-4 border-floor-pink">
                            <AlertTitle className="text-2xl mb-4">
                                accepted fren tokens:
                            </AlertTitle>
                            <AlertDescription className="text-xl">
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-2">
                                        <Sparkles className="text-moon-yellow" />
                                        stETH (such premium, such yield)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Rocket className="text-crypto-green" />
                                        stSOL (much speed, very efficiency)
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
                            very serious disclaimer
                        </h2>
                        <p className="text-xl mb-4">
                            this is literally a token where number go up.
                            that&apos;s the whole point. if you&apos;re looking
                            for complex tokenomics and multi-paragraph
                            explanations, you&apos;re in the wrong place fren.
                            we keep it simple:
                        </p>
                        <ul className="list-disc pl-8 text-xl mb-4">
                            <li>number exists</li>
                            <li>number gets bigger</li>
                            <li>you smile</li>
                        </ul>
                        <p className="text-xl italic">
                            (but also yes, we&apos;re actually built on super
                            solid math that makes this work. we just don&apos;t
                            like to brag about it)
                            <a
                                href="#"
                                className="text-meme-blue hover:underline"
                            >
                                {' '}
                                read whitepaper here
                            </a>
                        </p>
                    </div>
                </section>

                {/* Footer */}
                <footer className="max-w-6xl mx-auto text-center py-8">
                    <p className="mb-4 text-2xl">
                        come watch number get bigger with us:
                    </p>
                    <div className="flex justify-center gap-8 mb-8">
                        <a
                            href="#"
                            className="bg-white px-6 py-3 rounded-full font-bold transform hover:scale-110 transition-transform hover:-rotate-2 border-2 border-black"
                        >
                            Twitter: NumberAlwaysBigger
                        </a>
                        <a
                            href="#"
                            className="bg-white px-6 py-3 rounded-full font-bold transform hover:scale-110 transition-transform hover:-rotate-2 border-2 border-black"
                        >
                            Discord: NAB Fren Zone
                        </a>
                        <a
                            href="#"
                            className="bg-white px-6 py-3 rounded-full font-bold transform hover:scale-110 transition-transform hover:-rotate-2 border-2 border-black"
                        >
                            Telegram: Number Watchers
                        </a>
                    </div>
                    <p className="mt-8 text-sm bg-white inline-block px-4 py-2 rounded-full transform rotate-1">
                        powered by mithril (the serious stuff is hiding here
                        somewhere)
                    </p>
                    <div className="text-lg mt-4 text-gray-800">
                        🌈 remember: number literally cannot go down. it&apos;s
                        not just a meme, it&apos;s mathematic certainty
                        <br />
                        (but also yes, it&apos;s a meme) - and nothing is
                        certain
                    </div>
                </footer>
            </div>
        </>
    );
}
