import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { RefreshCw, Coins, Info, Layers, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface TokenBreakdown {
    num_stakers: number;
    token_name: string;
    token_address: string;
    total_staked: string;
}

interface HowToGetProps {
    data?: TokenBreakdown[];
    isLoading?: boolean;
}

const HowToGet: React.FC<HowToGetProps> = ({
    data = [],
    isLoading = false,
}) => {
    const singleTokens = ['NAB', 'MINT', 'qAR', 'wAR', 'USDA'];
    const singleTokenAddresses = {
        NAB: 'OsK9Vgjxo0ypX_HLz2iJJuh4hp3I80yA9KArsJjIloU',
        MINT: 'SWQx44W-1iMwGFBSHlC3lStCq3Z7O2WZrx9quLeZOu0',
        qAR: 'NG-0lVX882MG5nhARrSzyprEK6ejonHpdUmaaMPsHE8',
        wAR: 'xU9zFkq3X2ZQ6olwNVvr1vUWIjc3kXTWr7xKQD6dh10',
        USDA: '',
    };

    return (
        <section className="max-w-4xl mx-auto my-16" id="stake">
            <div className="bg-white rounded-lg p-8 transform -rotate-1 border-4 border-crypto-green">
                <h2 className="text-4xl font-bold mb-6 text-center">
                    how 2 get NAB?
                </h2>

                {/* Two paths card */}
                <Card className="border-4 border-moon-yellow mb-8 hover:scale-[1.01] transition-transform">
                    <CardContent className="p-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Quick path */}
                            <div className="p-4 rounded-lg bg-gray-50">
                                <h3 className="text-xl font-bold mb-2">
                                    Quick Path
                                </h3>
                                <p className="text-lg mb-3">
                                    Grab some on{' '}
                                    <Link
                                        href="https://dexi.arweave.dev/#/token/OsK9Vgjxo0ypX_HLz2iJJuh4hp3I80yA9KArsJjIloU"
                                        target="_blank"
                                        className="text-meme-blue font-bold hover:underline"
                                    >
                                        Dexi
                                    </Link>
                                </p>
                            </div>

                            {/* Chad path */}
                            <div className="p-4 rounded-lg bg-crypto-green/10 border-2 border-crypto-green">
                                <h3 className="text-xl font-bold mb-2">
                                    Chad Path
                                </h3>
                                <p className="text-lg">
                                    <span className="font-bold">
                                        Make it yourself
                                    </span>{' '}
                                    and earn rewards
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Alert className="border-4 border-moon-yellow mb-8">
                    <AlertTitle className="text-2xl mb-4">
                        how to make NAB:
                    </AlertTitle>
                    <AlertDescription className="text-xl space-y-4">
                        <p className="flex items-center gap-2">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-moon-yellow text-black font-bold flex items-center justify-center">
                                1
                            </span>
                            stake accepted tokens in our special contract
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-moon-yellow text-black font-bold flex items-center justify-center">
                                2
                            </span>
                            wait for number printer go brrr
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-moon-yellow text-black font-bold flex items-center justify-center">
                                3
                            </span>
                            profit
                        </p>
                    </AlertDescription>
                </Alert>

                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
                        <Coins className="h-6 w-6 text-moon-yellow" />
                        stake & earn: accepted tokens
                    </h3>

                    {isLoading ? (
                        <div className="flex items-center justify-center gap-2 py-8">
                            <RefreshCw className="h-6 w-6 animate-spin text-moon-yellow" />
                            <span className="text-xl">
                                loading accepted tokens...
                            </span>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Single Tokens Card */}
                            <Card className="border-4 border-floor-pink hover:scale-[1.02] transition-transform">
                                <CardContent className="p-6">
                                    <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <Coins className="h-5 w-5 text-moon-yellow" />
                                        Single Tokens
                                    </h4>
                                    <div className="flex flex-wrap gap-3">
                                        {singleTokens.map((token) =>
                                            singleTokenAddresses[
                                                token as keyof typeof singleTokenAddresses
                                            ] ? (
                                                <Link
                                                    key={token}
                                                    href={`https://dexi.ar.io/#/token/${
                                                        singleTokenAddresses[
                                                            token as keyof typeof singleTokenAddresses
                                                        ]
                                                    }`}
                                                    target="_blank"
                                                    className="bg-gray-100 px-3 py-1 rounded-full font-medium text-lg hover:bg-gray-200 transition-colors cursor-pointer"
                                                >
                                                    {token}
                                                </Link>
                                            ) : (
                                                <span
                                                    key={token}
                                                    className="bg-gray-100 px-3 py-1 rounded-full font-medium text-lg"
                                                >
                                                    {token}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* LP Tokens Card */}
                            <Card className="border-4 border-tech-purple hover:scale-[1.02] transition-transform">
                                <CardContent className="p-6">
                                    <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <Layers className="h-5 w-5 text-tech-purple" />
                                        LP Tokens
                                    </h4>
                                    <p className="text-lg mb-4">
                                        Any{' '}
                                        <Link
                                            href="https://botega.arweave.net/#/swap"
                                            target="_blank"
                                            className="text-meme-blue font-bold hover:underline"
                                        >
                                            Botega
                                        </Link>{' '}
                                        or{' '}
                                        <Link
                                            href="https://www.permaswap.network/#/ao"
                                            target="_blank"
                                            className="text-meme-blue font-bold hover:underline"
                                        >
                                            Permaswap
                                        </Link>{' '}
                                        LP that pairs with NAB e.g.{' '}
                                        <Link
                                            href="https://botega.arweave.net/#/swap?from=OsK9Vgjxo0ypX_HLz2iJJuh4hp3I80yA9KArsJjIloU&to=0syT13r0s0tgPmIed95bJnuSqaD29HQNN8D3ElLSrsc"
                                            target="_blank"
                                            className="text-meme-blue font-bold hover:underline"
                                        >
                                            AO/ NAB
                                        </Link>{' '}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Info Note */}
                            <div className="bg-gray-50 rounded-lg p-4 text-gray-600 flex items-start gap-3">
                                <Info className="h-5 w-5 mt-1 flex-shrink-0" />
                                <p className="text-sm">
                                    New LP tokens may take up to 24 hours to be
                                    stakeable. Can&apos;t find one? Ask us on{' '}
                                    <Link
                                        href="https://discord.gg/RSXg24mCrJ"
                                        target="_blank"
                                        className="text-meme-blue hover:underline"
                                    >
                                        Discord
                                    </Link>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HowToGet;
