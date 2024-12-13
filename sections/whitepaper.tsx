import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BookOpen, ArrowRight, Brain, Lock, TrendingUp } from 'lucide-react';

const WhitepaperSection = () => {
    return (
        <section className="max-w-4xl mx-auto my-16" id="paper">
            <Card className="bg-white/95 backdrop-blur-sm transform hover:scale-[1.01] transition-all duration-500 border-4 border-tech-purple">
                <CardHeader>
                    <CardTitle className="text-4xl font-comic text-center text-tech-purple flex items-center justify-center gap-2">
                        <BookOpen className="h-8 w-8 text-floor-pink" />
                        the slightly more serious stuff
                        <Brain className="h-8 w-8 text-floor-pink" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* Intro section */}
                    <div className="text-xl text-center mb-8">
                        NAB is powered by some big brain math called
                        <span className="font-bold"> Mithril</span>.
                        <br />
                    </div>

                    {/* How it works breakdown */}
                    <div className="grid grid-cols-1 gap-6">
                        {[
                            {
                                icon: (
                                    <TrendingUp className="h-6 w-6 text-crypto-green" />
                                ),
                                text: "Mithril watches NAB's price and remembers the highest low",
                            },
                            {
                                icon: (
                                    <Lock className="h-6 w-6 text-moon-yellow" />
                                ),
                                text: "If the price drops below this, NAB's global supply is reduced to push the price back up",
                            },
                            {
                                icon: (
                                    <ArrowRight className="h-6 w-6 text-floor-pink" />
                                ),
                                text: 'This makes NAB rarer, so frens buy it quickly before the price adjusts (profit)',
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 p-4 bg-white/50 rounded-lg border-2 border-tech-purple/20 hover:border-tech-purple transition-all duration-300"
                            >
                                <div className="flex-shrink-0">{item.icon}</div>
                                <p className="text-lg">{item.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Result explanation */}
                    <div className="bg-gradient-to-r from-crypto-green/10 via-moon-yellow/10 to-floor-pink/10 p-6 rounded-lg">
                        <p className="text-xl text-center">
                            Over time, this creates a token that only goes up,
                            combining the stability of a stablecoin with the
                            growth potential of your favorite moon shot.
                        </p>
                    </div>

                    {/* Whitepaper link */}
                    <div className="flex flex-col items-center gap-4 pt-4">
                        <a
                            href="./Mithril_Whitepaper.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-tech-purple text-white px-8 py-4 rounded-full font-comic text-xl transform hover:scale-105 transition-all hover:-rotate-2 border-4 border-black flex items-center gap-3"
                        >
                            <BookOpen className="h-6 w-6 group-hover:animate-pulse" />
                            read the full whitepaper
                            <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                        </a>
                        <p className="text-sm text-gray-600 italic">
                            (warning: contains actual mathematics)
                        </p>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};

export default WhitepaperSection;
