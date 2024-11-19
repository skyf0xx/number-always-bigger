import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Database, Lock, Zap, Cpu, ArrowUpRight } from 'lucide-react';

const AOSection = () => {
    const features = [
        {
            icon: <Database className="h-8 w-8 text-crypto-green" />,
            title: 'permanent like diamond hands',
            description:
                'every NAB transaction and record is stored forever on Arweave. no take-backsies, just pure transparent history that cannot be changed!',
        },
        {
            icon: <Lock className="h-8 w-8 text-moon-yellow" />,
            title: 'decentralized (for real)',
            description:
                "no single point of failure = no single point of oopsie. NAB lives on AO's network, making it as distributed as your mom's spaghetti recipe",
        },
        {
            icon: <Zap className="h-8 w-8 text-floor-pink" />,
            title: 'lightning quick',
            description:
                'AO makes NAB super efficient and reliable. low costs, high speed, much wow! your transactions flow like butter on a hot pancake',
        },
        {
            icon: <Cpu className="h-8 w-8 text-meme-blue" />,
            title: 'built different',
            description:
                "NAB's galaxy brain mechanics only possible on AO. thanks to its big brain programmability, we can make number go up in ways never before possible",
        },
    ];

    return (
        <section className="max-w-4xl mx-auto my-16">
            <Card className="bg-white/95 backdrop-blur-sm transform hover:scale-[1.01] transition-all duration-500 border-4 border-tech-purple">
                <CardHeader>
                    <CardTitle className="text-4xl font-comic text-center text-tech-purple flex items-center justify-center gap-2 flex-wrap">
                        <span>forged on</span>
                        <span className="bg-gradient-to-r from-floor-pink via-moon-yellow to-crypto-green bg-clip-text text-transparent">
                            Arweave&apos;s AO
                        </span>
                        <span>✨</span>
                    </CardTitle>
                    <p className="text-center text-xl mt-2 font-comic">
                        (where number go up and dreams become reality)
                    </p>
                </CardHeader>

                <CardContent className="space-y-8">
                    {/* AO Link Banner */}
                    <div className="bg-gradient-to-r from-tech-purple/10 via-floor-pink/10 to-crypto-green/10 p-6 rounded-lg text-center">
                        <p className="text-lg mb-4">
                            NAB isn&apos;t just another token that makes number
                            go up. it&apos;s built on something way cooler...
                        </p>
                        <a
                            href="https://ao.arweave.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-tech-purple text-white px-6 py-3 rounded-full hover:scale-105 transition-transform font-comic"
                        >
                            learn about AO
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group bg-white/50 p-6 rounded-lg border-2 border-tech-purple/20 hover:border-tech-purple transition-all duration-300"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="transform group-hover:scale-110 transition-transform">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-bold font-comic">
                                        {feature.title}
                                    </h3>
                                </div>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Note */}
                    <div className="text-center text-gray-600 italic font-comic">
                        big brain + permanent storage = number always bigger
                        🧠✨
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};

export default AOSection;
