import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { HandshakeIcon, Users2, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="max-w-6xl mx-auto text-center py-8 px-4">
            <p className="mb-4 text-xl md:text-2xl">
                come watch number get bigger with us:
            </p>
            {/* Social links stack on mobile, flex row on tablet+ */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-8">
                <a
                    target="_blank"
                    href="https://x.com/AlwaysBigger"
                    className="bg-white px-4 sm:px-6 py-3 rounded-full font-bold transform hover:scale-110 transition-transform hover:-rotate-2 border-2 border-black text-sm sm:text-base"
                >
                    Twitter: @AlwaysBigger
                </a>
                <a
                    target="_blank"
                    href="https://warpcast.com/alwaysbigger"
                    className="bg-white px-4 sm:px-6 py-3 rounded-full font-bold transform hover:scale-110 transition-transform hover:-rotate-2 border-2 border-black text-sm sm:text-base"
                >
                    Warpcast: @alwaysbigger
                </a>
                <a
                    target="_blank"
                    href="https://t.me/+kbiXF8FXhI9hZTUx"
                    className="bg-white px-4 sm:px-6 py-3 rounded-full font-bold transform hover:scale-110 transition-transform hover:-rotate-2 border-2 border-black text-sm sm:text-base"
                >
                    Telegram: @NumberAlwaysBigger
                </a>
                <a
                    target="_blank"
                    href="https://discord.gg/RSXg24mCrJ"
                    className="bg-white px-4 sm:px-6 py-3 rounded-full font-bold transform hover:scale-110 transition-transform hover:-rotate-2 border-2 border-black text-sm sm:text-base"
                >
                    Discord: NAB Fren Zone
                </a>
            </div>

            {/* Whitepaper section with responsive padding */}
            <div className="mt-8 text-sm bg-white inline-block px-3 sm:px-4 py-2 rounded-full transform rotate-1 mx-auto max-w-[90%] sm:max-w-full">
                <span className="block sm:inline">
                    powered by <span className="font-bold">mithril.</span>
                </span>
                <span className="block sm:inline mt-1 sm:mt-0">
                    (the serious stuff is hiding here:{' '}
                    <a
                        href="./Mithril_Whitepaper.pdf"
                        target="_blank"
                        className="text-meme-blue hover:underline decoration-dotted hover:decoration-solid transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-1"
                    >
                        whitepaper
                    </a>
                    )
                </span>
            </div>

            {/* Bottom message with responsive text size and margins */}
            <div className="text-base sm:text-lg mt-4 text-gray-800 mb-32 sm:mb-56 px-4">
                <p className="mb-2">
                    🌈 remember: number cannot go down. it&apos;s not just a
                    meme, it&apos;s mathematic certainty
                </p>
                <p>(but also yes, it&apos;s a meme) - and nothing is certain</p>
            </div>
        </footer>
    );
};

export default Footer;
