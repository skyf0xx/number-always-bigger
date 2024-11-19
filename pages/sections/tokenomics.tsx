import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { TrendingUp, Sparkles, Rocket, Lock, Calendar } from 'lucide-react';
import { useState } from 'react';

const Tokenomics: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section className="max-w-4xl mx-auto my-16">
            <div className="bg-white rounded-lg p-8 transform rotate-1 border-4 border-tech-purple">
                <h2 className="text-3xl font-bold mb-4 text-center">
                    numbers about the number
                </h2>
                <div className="space-y-6">
                    <div className="flex items-center justify-between text-xl">
                        <span className="font-bold">
                            total theoretical supply:
                        </span>
                        <span className="text-crypto-green">
                            21 Million (like Bitcoin)
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-xl">
                        <span className="font-bold">current supply:</span>
                        <span className="text-crypto-green">
                            exactly what it needs to be
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-xl">
                        <span className="font-bold">current price:</span>
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

                {/* Accordion Section */}
                <div className="mt-8">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full text-left p-4 bg-moon-yellow/20 rounded-lg hover:bg-moon-yellow/30 transition-all duration-300 flex items-center justify-between font-comic text-xl"
                    >
                        <span className="font-bold flex items-center gap-2">
                            <Sparkles className="h-6 w-6" />
                            tell me moar
                        </span>
                        <span
                            className={`transform transition-transform duration-300 ${
                                isExpanded ? 'rotate-180' : ''
                            }`}
                        >
                            ▼
                        </span>
                    </button>

                    <div
                        className={`grid transition-all duration-500 ease-in-out ${
                            isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                    >
                        <div className="overflow-hidden">
                            <div className="p-6 space-y-8">
                                {/* Fair Launch Section */}
                                <Alert className="border-4 border-crypto-green">
                                    <AlertTitle className="text-xl mb-2 flex items-center gap-2">
                                        <Rocket className="h-6 w-6 text-crypto-green" />
                                        100% Fair Launch
                                    </AlertTitle>
                                    <AlertDescription className="space-y-2">
                                        <p>
                                            • NO SALE! NAB is only generated
                                            through minting
                                        </p>
                                        <p>
                                            • Initial price: $0.00099 (5,050 NAB
                                            / $5.05 USD pool on{' '}
                                            <a
                                                target="_blank"
                                                className="text-meme-blue"
                                                href="https://botega.arweave.dev/#/pools"
                                            >
                                                Botega
                                            </a>
                                            )
                                        </p>
                                        <p className="text-sm text-gray-600 italic">
                                            hat tip to the{' '}
                                            <a
                                                target="_blank"
                                                href="https://x.com/marttimalmi/status/423455561703624704?"
                                                className="text-meme-blue"
                                            >
                                                first
                                            </a>{' '}
                                            Bitcoin transaction
                                        </p>
                                    </AlertDescription>
                                </Alert>

                                {/* Minting Benefits */}
                                <Alert className="border-4 border-moon-yellow">
                                    <AlertTitle className="text-xl mb-2">
                                        Minting Benefits
                                    </AlertTitle>
                                    <AlertDescription className="space-y-2">
                                        <p>
                                            • NAB follows Bitcoin&apos;s model:
                                            21M max supply, 4-year halving cycle
                                        </p>
                                        <p>
                                            • New tokens every 5 minutes to
                                            minters
                                        </p>
                                        <p>
                                            • qAR/AGENT LP stakers KEEP their LP
                                            gains + mint NAB for{' '}
                                            <span className="font-bold">
                                                free
                                            </span>
                                        </p>
                                        <p>
                                            • Other staking tokens: yields will
                                            be used to buy & burn NAB from
                                            Botega
                                        </p>
                                    </AlertDescription>
                                </Alert>

                                {/* Launch Timeline */}
                                <Alert className="border-4 border-floor-pink">
                                    <AlertTitle className="text-xl mb-2 flex items-center gap-2">
                                        <Calendar className="h-6 w-6 text-floor-pink" />
                                        Launch Timeline
                                    </AlertTitle>
                                    <AlertDescription className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Lock className="h-5 w-5 text-floor-pink" />
                                            <p>
                                                NAB transfers locked until FEB
                                                2025
                                            </p>
                                        </div>
                                        <p className="font-bold">
                                            After FEB 2025:
                                        </p>
                                        <ul className="list-disc pl-6 space-y-1">
                                            <li>
                                                Minters can freely trade NAB
                                            </li>
                                            <li>
                                                Additional staking tokens added
                                            </li>
                                            <li>
                                                Buy & burn contract activation
                                            </li>
                                        </ul>
                                    </AlertDescription>
                                </Alert>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Tokenomics;
