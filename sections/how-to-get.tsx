import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { TrendingUp, Sparkles, Rocket } from 'lucide-react';

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
    if (isLoading) {
        return (
            <section className="max-w-4xl mx-auto my-16" id="stake">
                <div className="bg-white rounded-lg p-8 transform -rotate-1 border-4 border-crypto-green">
                    <h2 className="text-4xl font-bold mb-6 text-center">
                        loading accepted tokens...
                    </h2>
                </div>
            </section>
        );
    }

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
                            {data.map((token) => (
                                <li
                                    key={token.token_address}
                                    className="flex items-center gap-2"
                                >
                                    <Sparkles className="text-moon-yellow" />
                                    {token.token_name}
                                </li>
                            ))}
                        </ul>
                    </AlertDescription>
                </Alert>
            </div>
        </section>
    );
};

export default HowToGet;
