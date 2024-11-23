import React, { useState } from 'react';
import { Wallet, Menu, X } from 'lucide-react';

const NABHeader = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const scrollToSection = (sectionId: string) => {
        setIsMobileMenuOpen(false);
        const element = document.getElementById(sectionId);
        if (element) {
            const headerHeight = 64;
            const elementPosition = element.offsetTop - headerHeight;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth',
            });
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-meme-blue/80 backdrop-blur-sm border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-sour-gummy text-yellow-300 font-bold -rotate-3">
                            Number Always Bigger
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <button
                            onClick={() => scrollToSection('how-it-works')}
                            className="text-white font-sour-gummy text-lg hover:text-yellow-300 transition-colors"
                        >
                            how it works
                        </button>
                        <button
                            onClick={() => scrollToSection('stake')}
                            className="text-white font-sour-gummy text-lg hover:text-yellow-300 transition-colors"
                        >
                            get NAB
                        </button>
                        <button
                            onClick={() => scrollToSection('paper')}
                            className="text-white font-sour-gummy text-lg hover:text-yellow-300 transition-colors"
                        >
                            whitepaper
                        </button>

                        <button className="bg-green-400 hover:bg-green-500 text-black font-sour-gummy py-2 px-6 rounded-full text-lg transition-all">
                            <span className="flex items-center gap-2">
                                <Wallet className="h-5 w-5" />
                                connect wallet
                            </span>
                        </button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6 text-white" />
                        ) : (
                            <Menu className="h-6 w-6 text-white" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-meme-blue/95 backdrop-blur-sm border-t border-white/10">
                    <div className="px-4 py-4 space-y-4">
                        {['how it works', 'get NAB', 'whitepaper'].map(
                            (item, index) => (
                                <button
                                    key={index}
                                    onClick={() =>
                                        scrollToSection(item.replace(' ', '-'))
                                    }
                                    className="block w-full text-left text-white font-sour-gummy text-xl py-4 hover:text-yellow-300 transition-colors"
                                >
                                    {item}
                                </button>
                            )
                        )}
                        <button className="w-full bg-green-400 hover:bg-green-500 text-black font-sour-gummy py-4 px-6 rounded-full text-xl transition-all">
                            <span className="flex items-center justify-center gap-2">
                                <Wallet className="h-5 w-5" />
                                connect wallet
                            </span>
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default NABHeader;
