import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { TrendingUp, Sparkles, Rocket } from 'lucide-react';

const HowToGet: React.FC = () => {
    return (
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
                        <p>1. stake accepted tokens in our special contract</p>
                        <p>2. wait for number printer go brrr</p>
                        <p>3. profit</p>
                    </AlertDescription>
                </Alert>

                <Alert className="border-4 border-floor-pink">
                    <AlertTitle className="text-2xl mb-4">
                        accepted tokens:
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
                                    (mint NAB while still earning your LP
                                    rewards on Botega)
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Sparkles className="text-moon-yellow" />
                                qAR
                            </li>
                            <li className="flex items-center gap-2">
                                <Sparkles className="text-moon-yellow" />
                                wAR (soon)
                            </li>
                            <li className="flex items-center gap-2">
                                <Sparkles className="text-moon-yellow" />
                                ASTRO USD (soon)
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
                                more tokens coming soon™
                            </li>
                        </ul>
                    </AlertDescription>
                </Alert>
            </div>
        </section>
    );
};

export default HowToGet;
