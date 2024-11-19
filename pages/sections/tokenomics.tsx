import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { TrendingUp, Sparkles, Rocket } from 'lucide-react';

const Tokenomics: React.FC = () => {
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
            </div>
        </section>
    );
};

export default Tokenomics;
