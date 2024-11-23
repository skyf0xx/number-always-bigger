import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertTriangle, Brain, Shield, HeartHandshake } from 'lucide-react';

const RealityCheckSection = () => {
    return (
        <section className="max-w-4xl mx-auto my-16">
            <Card className="bg-white/95 backdrop-blur-sm transform hover:scale-[1.01] transition-all duration-500 border-4 border-floor-pink relative overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 animate-pulse">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute text-floor-pink text-9xl font-comic"
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    transform:
                                        'translate(-50%, -50%) rotate(15deg)',
                                }}
                            >
                                ⚠️
                            </div>
                        ))}
                    </div>
                </div>

                <CardHeader>
                    <CardTitle className="text-4xl font-comic text-center text-floor-pink flex items-center justify-center gap-2">
                        <AlertTriangle className="h-8 w-8" />
                        ok but for real tho...
                        <AlertTriangle className="h-8 w-8" />
                    </CardTitle>
                </CardHeader>

                <CardContent className="relative z-10">
                    <div className="space-y-6">
                        {/* Main message */}
                        <p className="text-xl text-center font-comic">
                            Listen fren, we need to have a serious talk about
                            number...
                        </p>

                        {/* Key points in cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white/50 p-4 rounded-lg border-2 border-floor-pink flex items-start gap-3">
                                <Brain className="h-6 w-6 text-floor-pink flex-shrink-0 mt-1" />
                                <p>
                                    While NAB&apos;s floor-adaptive mechanism
                                    tries its best to make number go up, its
                                    true value depends on trust, adoption, and
                                    market conditions (just like everything in
                                    crypto).
                                </p>
                            </div>

                            <div className="bg-white/50 p-4 rounded-lg border-2 border-floor-pink flex items-start gap-3">
                                <Shield className="h-6 w-6 text-floor-pink flex-shrink-0 mt-1" />
                                <p>
                                    Extreme market conditions could test our
                                    system. NAB is an experiment in token
                                    mechanics - a fun one with solid math behind
                                    it, but still an experiment!
                                </p>
                            </div>
                        </div>

                        {/* Bottom message */}
                        <div className="bg-floor-pink/10 p-6 rounded-lg border-2 border-floor-pink">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <HeartHandshake className="h-8 w-8 text-floor-pink" />
                                <h3 className="text-xl font-bold text-floor-pink">
                                    Fren Advice
                                </h3>
                            </div>
                            <div className="text-center space-y-2">
                                <p className="text-lg">
                                    Never stake more than you can afford to
                                    lose.
                                </p>
                                <p className="text-gray-600">
                                    Even though we say &apos;number always go
                                    up&apos; nothing in crypto is truly
                                    guaranteed.
                                </p>
                                <p className="font-bold text-floor-pink mt-4">
                                    Stay safe out there fren! 🤝
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};

export default RealityCheckSection;
