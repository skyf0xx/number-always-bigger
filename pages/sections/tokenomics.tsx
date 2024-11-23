import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
    TrendingUp,
    Sparkles,
    Rocket,
    Lock,
    Calendar,
    ChevronDown,
    Crown,
} from 'lucide-react';
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

                {/* Enhanced Accordion Section */}
                <div className="mt-8 relative">
                    {/* Attention-grabbing floating elements */}
                    <div className="absolute -top-6 -right-6 animate-bounce z-10">
                        <div className="bg-moon-yellow text-black px-4 py-2 rounded-full transform rotate-12 text-sm font-bold border-2 border-black">
                            important stuff here!
                        </div>
                    </div>

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full text-left p-6 bg-gradient-to-r from-moon-yellow via-crypto-green to-floor-pink rounded-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden border-4 border-black"
                    >
                        {/* Animated background */}
                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700" />

                        <div className="flex items-center justify-between relative z-10">
                            <span className="font-bold flex items-center gap-3 text-2xl">
                                <Sparkles className="h-8 w-8 animate-pulse" />
                                tell me moar
                                <span className="text-sm bg-black text-white px-3 py-1 rounded-full ml-2">
                                    super important!
                                </span>
                            </span>
                            <ChevronDown
                                className={`h-8 w-8 transition-transform duration-500 ${
                                    isExpanded ? 'rotate-180' : 'animate-bounce'
                                }`}
                            />
                        </div>
                    </button>

                    <div
                        className={`grid transition-all duration-500 ease-in-out ${
                            isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                    >
                        <div className="overflow-hidden">
                            <div className="p-6 space-y-8 border-x-4 border-b-4 border-black rounded-b-lg bg-white/95">
                                {/* Fair Launch Section */}
                                <Alert className="border-4 border-crypto-green transform hover:scale-[1.02] transition-transform">
                                    <AlertTitle className="text-xl mb-2 flex items-center gap-2">
                                        <Rocket className="h-6 w-6 text-crypto-green animate-bounce" />
                                        100% Fair Launch (and Ultra Rare!)
                                    </AlertTitle>
                                    <AlertDescription className="space-y-2">
                                        <div className="flex items-center gap-2 bg-floor-pink/10 p-2 rounded-lg border-2 border-dashed border-floor-pink">
                                            <Crown className="h-5 w-5 text-floor-pink" />
                                            <p className="font-bold">
                                                NO SALE! NAB is ultra rare and
                                                only generated through minting
                                            </p>
                                        </div>
                                        <p>
                                            • 5,050 NAB pre-minted for liquidity
                                            and LP{' '}
                                            <a
                                                target="_blank"
                                                className="text-meme-blue hover:text-crypto-green transition-colors"
                                                href="https://www.ao.link/#/entity/thisAddressEatsNAB0000000000000000000000000?tab=transfers"
                                            >
                                                burned
                                            </a>
                                        </p>
                                        <p>
                                            • Initial price: $0.00099 (5,050 NAB
                                            / $5.05 USD pool on{' '}
                                            <a
                                                target="_blank"
                                                className="text-meme-blue hover:text-crypto-green transition-colors"
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
                                                className="text-meme-blue hover:text-crypto-green transition-colors"
                                            >
                                                first
                                            </a>{' '}
                                            Bitcoin transaction
                                        </p>
                                    </AlertDescription>
                                </Alert>

                                {/* Minting Benefits */}
                                <Alert className="border-4 border-moon-yellow transform hover:scale-[1.02] transition-transform">
                                    <AlertTitle className="text-xl mb-2 flex items-center gap-2">
                                        <Sparkles className="h-6 w-6 text-moon-yellow" />
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
                                            <span className="font-bold bg-crypto-green/20 px-2 py-1 rounded">
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
                                <Alert className="border-4 border-floor-pink transform hover:scale-[1.02] transition-transform">
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
