import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { TrendingUp, Sparkles, Rocket } from 'lucide-react';
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
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Column - Text Content */}
                                <div className="space-y-4">
                                    <p className="text-lg">
                                        NAB follows Bitcoin&apos;s economic
                                        model with a maximum supply of 21
                                        million tokens and a similar 4-year
                                        halving cycle.
                                    </p>
                                    <p className="text-lg">
                                        New tokens are distributed every 5
                                        minutes to minters who stake approved
                                        yield-bearing tokens like stETH or LP
                                        tokens.
                                    </p>
                                    <p className="text-lg">
                                        The yield earned from staked tokens
                                        belongs to NAB&apos;s contract and is
                                        used to buy and burn NAB from its AMM,
                                        making number go even bigger!
                                    </p>
                                    <p className="text-lg font-bold text-crypto-green">
                                        remember: number always bigger because
                                        math said so
                                    </p>
                                </div>

                                {/* Right Column - Professor Image */}
                                <div className="flex items-center justify-center">
                                    <img
                                        src="./teacher_pepe.jpg"
                                        alt="Professor explaining tokenomics"
                                        className="rounded-lg border-4 border-tech-purple transform rotate-2 hover:rotate-0 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Tokenomics;
