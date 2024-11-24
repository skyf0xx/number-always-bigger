import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ArweaveWalletButton } from '@/components/ArweaveWalletButton';

const NABHeader = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { label: 'how it works', id: 'how-it-works' },
        { label: 'get NAB', id: 'stake' },
        { label: 'whitepaper', id: 'paper' },
    ];

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
                        {navItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToSection(item.id)}
                                className="text-white font-sour-gummy text-lg hover:text-yellow-300 transition-colors"
                            >
                                {item.label}
                            </button>
                        ))}

                        <ArweaveWalletButton />
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
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
                        {navItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToSection(item.id)}
                                className="block w-full text-left text-white font-sour-gummy text-xl py-4 hover:text-yellow-300 transition-colors"
                            >
                                {item.label}
                            </button>
                        ))}
                        <div className="flex justify-center">
                            <ArweaveWalletButton />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default NABHeader;
