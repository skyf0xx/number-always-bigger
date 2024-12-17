import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { HandshakeIcon, Users2, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const PartnershipsSection = () => {
    const partners = [
        {
            name: 'Astro USD',
            description: 'Stable, Reliable, and Yours on Astro.',
            imageUrl: './astro.avif',
            link: 'https://www.astrousd.com',
        },
        {
            name: 'AOX',
            description: 'The Bridge to AO.',
            imageUrl: './AOX-Avatar.svg',
            link: 'https://aox.xyz',
        },
    ];

    return (
        <section className="max-w-4xl mx-auto my-16">
            <Card className="bg-white/95 backdrop-blur-sm transform hover:scale-[1.01] transition-all duration-500 border-4 border-moon-yellow">
                <CardHeader>
                    <CardTitle className="text-4xl font-comic text-center text-tech-purple flex items-center justify-center gap-2">
                        <HandshakeIcon className="h-8 w-8 text-moon-yellow" />
                        frens helping number go up
                        <Users2 className="h-8 w-8 text-moon-yellow" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Partner cards grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {partners.map((partner, index) => (
                            <a
                                key={index}
                                href={partner.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group"
                            >
                                <div className="bg-white/50 p-6 rounded-lg border-2 border-moon-yellow/20 hover:border-moon-yellow transition-all duration-300 flex flex-col items-center text-center group-hover:scale-105 transform">
                                    {/* Profile image */}
                                    <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-moon-yellow">
                                        <Image
                                            src={partner.imageUrl}
                                            alt={partner.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Partner info */}
                                    <h3 className="text-xl font-bold font-comic mb-2 flex items-center gap-2">
                                        {partner.name}
                                        <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </h3>
                                    <p className="text-gray-600">
                                        {partner.description}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Bottom message */}
                    <div className="text-center mt-8 text-gray-600 italic font-comic">
                        together we make number more bigger 🤝✨
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};

export default PartnershipsSection;
