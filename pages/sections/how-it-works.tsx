import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Sparkles, TrendingUp, ArrowUp, Rocket } from 'lucide-react';

interface Step {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
}

export const HowItWorks: React.FC = () => {
    const steps: Step[] = [
        {
            icon: <Sparkles className="h-8 w-8" />,
            title: 'number exists',
            description: 'very important first step',
            color: 'meme-blue',
        },
        {
            icon: <TrendingUp className="h-8 w-8" />,
            title: 'smart contract do a check',
            description: 'very technical here',
            color: 'crypto-green',
        },
        {
            icon: <ArrowUp className="h-8 w-8" />,
            title: 'if number trying to go down...',
            description: 'we make supply smol',
            color: 'floor-pink',
        },
        {
            icon: <Rocket className="h-8 w-8" />,
            title: "that's it!",
            description: 'number has no choice but to go up!',
            color: 'moon-yellow',
        },
    ];

    return (
        <section className="max-w-5xl mx-auto py-16 px-4" id="how-it-works">
            <Card className="bg-white/95 backdrop-blur-sm transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <CardHeader>
                    <CardTitle className="text-4xl font-comic text-center text-tech-purple">
                        how does number get bigger?
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
                        {steps.map((step, index) => (
                            <div key={index} className="group relative">
                                <div
                                    className={`bg-${step.color} rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:rotate-2 border-4 border-black shadow-lg`}
                                >
                                    <div className="flex flex-col items-center text-center space-y-4">
                                        <div className="bg-white rounded-full p-4">
                                            {step.icon}
                                        </div>
                                        <h3 className="text-xl font-bold">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                                {/* Connection line */}
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t-4 border-dashed border-black" />
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};
