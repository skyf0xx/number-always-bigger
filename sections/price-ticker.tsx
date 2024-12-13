import { Card, CardContent } from '@/components/ui/card';
import { ArrowUp, Rocket, Stars } from 'lucide-react';

interface PriceTickerProps {
    currentPrice: string;
    nextPrice: string;
}

// Price ticker component with enhanced animations
const PriceTicker: React.FC<PriceTickerProps> = ({
    currentPrice,
    nextPrice,
}) => {
    return (
        <Card className="bg-white/95 backdrop-blur-sm border-4 border-floor-pink shadow-xl transform hover:scale-[1.02] transition-all duration-300">
            <CardContent className="p-8">
                <div className="flex flex-col gap-6">
                    {/* Current Floor */}
                    <div className="relative group">
                        <div className="flex items-center justify-center gap-4">
                            <span className="text-xl text-tech-purple font-comic">
                                current floor:
                            </span>
                            <div className="relative">
                                <span className="text-6xl font-bold text-crypto-green font-comic animate-pulse">
                                    ${currentPrice}
                                </span>
                                <ArrowUp className="absolute -right-10 top-1/2 transform -translate-y-1/2 h-8 w-8 text-crypto-green animate-bounce" />
                            </div>
                        </div>
                        {/* Tooltip on hover */}
                        <div className="invisible group-hover:visible absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap">
                            only goes up
                        </div>
                    </div>

                    {/* Next Floor */}
                    <div className="flex items-center justify-center gap-4">
                        <span className="text-xl text-tech-purple font-comic">
                            next floor:
                        </span>
                        <span className="text-4xl font-bold text-meme-blue font-comic">
                            ${nextPrice}
                        </span>
                        <Rocket className="h-6 w-6 text-meme-blue animate-bounce" />
                    </div>

                    {/* Trust indicator */}
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 italic mt-2">
                        <Stars className="h-4 w-4" />
                        <span>(source: big number math)</span>
                        <Stars className="h-4 w-4" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PriceTicker;
