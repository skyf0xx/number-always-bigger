import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { HandshakeIcon, Users2, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="max-w-6xl mx-auto text-center py-8">
            <p className="mb-4 text-2xl">
                come watch number get bigger with us:
            </p>
            <div className="flex justify-center gap-8 mb-8">
                <a
                    target="_blank"
                    href="https://x.com/AlwaysBigger"
                    className="bg-white px-6 py-3 rounded-full font-bold transform hover:scale-110 transition-transform hover:-rotate-2 border-2 border-black"
                >
                    Twitter: @AlwaysBigger
                </a>
                <a
                    target="_blank"
                    href="https://warpcast.com/alwaysbigger"
                    className="bg-white px-6 py-3 rounded-full font-bold transform hover:scale-110 transition-transform hover:-rotate-2 border-2 border-black"
                >
                    Warpcast: @alwaysbigger
                </a>
                <a
                    target="_blank"
                    href="https://t.me/+kbiXF8FXhI9hZTUx"
                    className="bg-white px-6 py-3 rounded-full font-bold transform hover:scale-110 transition-transform hover:-rotate-2 border-2 border-black"
                >
                    Telegram: @NumberAlwaysBigger
                </a>
                <a
                    target="_blank"
                    href="https://discord.gg/RSXg24mCrJ"
                    className="bg-white px-6 py-3 rounded-full font-bold transform hover:scale-110 transition-transform hover:-rotate-2 border-2 border-black"
                >
                    Discord: NAB Fren Zone
                </a>
            </div>
            <p className="mt-8 text-sm bg-white inline-block px-4 py-2 rounded-full transform rotate-1">
                powered by <span className="font-bold">mithril.</span> (the
                serious stuff is hiding here:{' '}
                <a
                    href="./Mithril_Whitepaper.pdf"
                    target="_blank"
                    className="text-meme-blue hover:underline decoration-dotted hover:decoration-solid transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-1"
                >
                    whitepaper
                </a>
                )
            </p>
            <div className="text-lg mt-4 text-gray-800 mb-56">
                🌈 remember: number cannot go down. it&apos;s not just a meme,
                it&apos;s mathematic certainty
                <br />
                (but also yes, it&apos;s a meme) - and nothing is certain
            </div>
        </footer>
    );
};

export default Footer;
