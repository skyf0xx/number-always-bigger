import React, { useState } from 'react';
import { Sparkles, Wallet, Menu, X } from 'lucide-react';

const NABHeader = () => {
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b-4 border-floor-pink font-comic">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <div
                                className={`
                        w-12 h-12  rounded-full
                        bg-white border-4 border-moon-yellow
                        shadow-xl overflow-hidden
                    `}
                            >
                                <img
                                    src="nab.jpg"
                                    alt="NAB Mascot"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <span className="text-2xl font-bold text-tech-purple transform -rotate-1 hover:rotate-0 transition-transform">
                            Number Always Bigger
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <a
                            href="#how-it-works"
                            className="text-lg hover:text-crypto-green transition-colors"
                        >
                            how it works
                        </a>
                        <a
                            href="#stake"
                            className="text-lg hover:text-crypto-green transition-colors"
                        >
                            stake frens
                        </a>
                        <a
                            href="#community"
                            className="text-lg hover:text-crypto-green transition-colors"
                        >
                            fren zone
                        </a>
                        <button
                            onClick={() =>
                                setIsWalletConnected(!isWalletConnected)
                            }
                            className="bg-moon-yellow hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-full text-lg transform hover:scale-105 transition-all hover:-rotate-2 border-2 border-black"
                        >
                            <span className="flex items-center gap-2">
                                <Wallet className="h-4 w-4" />
                                {isWalletConnected
                                    ? 'gm fren!'
                                    : 'connect wallet'}
                            </span>
                        </button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6 text-tech-purple" />
                        ) : (
                            <Menu className="h-6 w-6 text-tech-purple" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t-2 border-floor-pink">
                    <div className="px-4 py-2 space-y-4">
                        <a
                            href="#how-it-works"
                            className="block text-lg py-2 hover:text-crypto-green transition-colors"
                        >
                            how it works
                        </a>
                        <a
                            href="#stake"
                            className="block text-lg py-2 hover:text-crypto-green transition-colors"
                        >
                            stake frens
                        </a>
                        <a
                            href="#community"
                            className="block text-lg py-2 hover:text-crypto-green transition-colors"
                        >
                            fren zone
                        </a>
                        <button
                            onClick={() =>
                                setIsWalletConnected(!isWalletConnected)
                            }
                            className="w-full bg-moon-yellow hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-full text-lg transform hover:scale-105 transition-all hover:-rotate-2 border-2 border-black"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <Wallet className="h-4 w-4" />
                                {isWalletConnected
                                    ? 'gm fren!'
                                    : 'connect wallet'}
                            </span>
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default NABHeader;
