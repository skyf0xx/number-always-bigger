import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { useState } from 'react';

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: 'what happens if number tries to go down?',
            answer: 'If the price drops below its highest low, NAB reduces the global supply (everywhere) to bring the price back up. number always wins!',
        },
        {
            question: 'Are all tokens reduced from circulation?',
            answer: "Yes, during a rebase, the supply reduction is applied equally across all wallets. This ensures fairness, as everyone’s share of the total market remains unchanged while helping stabilize and grow NAB's value.",
        },
        {
            question: 'wen buy dip?',
            answer: 'When the supply is reduced, NAB becomes rarer, but a time gap exists between reduction and price adjustment. so frens buy it before the price adjusts. faster fingers = bigger gains!',
        },
        {
            question: 'does making supply smol hurt my NAB?',
            answer: 'No fren! Even when the supply changes, your percentage ownership of the global supply stays exactly the same. (Think of it as owning a % of the total supply or market-cap) ur NAB is safe!',
        },
        {
            question: 'how does floor thing work?',
            answer: "NAB's price floor is the highest low it has ever reached, and this floor keeps going up over time.",
        },
        {
            question: 'why NAB different from other numba?',
            answer: 'NAB uses supply reduction to stabilize its price and gradually raise its floor, creating long-term growth and stability. we built different',
        },
        {
            question: 'how often number check go up?',
            answer: 'NAB checks and adjusts its price every 24 hours if needed. we never sleep on gains!',
        },
        {
            question: 'can bad frens make number go down?',
            answer: 'If someone tries to lower the price, fast buyers can scoop up tokens, and the system restores the price with a rebase. down machine broke!',
        },

        {
            question: "what's a rebase? sounds scary",
            answer: 'A rebase is when NAB adjusts its total supply to fix the price, making it stable and fair for everyone. think of it as number doing yoga!',
        },
        {
            question: 'how NAB get its value?',
            answer: "NAB is created through staking to ensure it has value from the start. Frens must lock up valuable assets like stETH or LP tokens to mint NAB. This process ties NAB's value to real, productive assets, creating a stronger price floor and rewarding users for contributing to its stability.",
        },
        {
            question: 'sounds too good to be true! Where is the catch?',
            answer: "Like all tokens, NAB still depends on market perception and demand. NAB's algorithms are designed to incentivize and support market growth, and a steady price floor but is still reliant on market drivers.",
        },
    ];

    return (
        <section className="max-w-4xl mx-auto my-16">
            <Card className="bg-white/95 backdrop-blur-sm transform hover:scale-[1.01] transition-all duration-500 border-4 border-meme-blue">
                <CardHeader>
                    <CardTitle className="text-4xl font-comic text-center text-tech-purple flex items-center justify-center gap-2">
                        <HelpCircle className="h-8 w-8 text-moon-yellow" />
                        frequently asked Questions
                        <Sparkles className="h-8 w-8 text-moon-yellow" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`
                border-2 rounded-lg overflow-hidden
                ${
                    openIndex === index
                        ? 'border-crypto-green'
                        : 'border-gray-200'
                }
                hover:border-crypto-green transition-all duration-300
              `}
                        >
                            <button
                                onClick={() =>
                                    setOpenIndex(
                                        openIndex === index ? null : index
                                    )
                                }
                                className="w-full text-left p-4 flex items-center justify-between font-comic"
                            >
                                <span className="text-lg font-bold">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`
                    h-6 w-6 transform transition-transform duration-300
                    ${openIndex === index ? 'rotate-180' : ''}
                  `}
                                />
                            </button>
                            <div
                                className={`
                  grid transition-all duration-300
                  ${openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
                `}
                            >
                                <div className="overflow-hidden">
                                    <div
                                        className={`
                    p-4 pt-0 text-gray-600
                    bg-gradient-to-r from-crypto-green/10 via-moon-yellow/10 to-floor-pink/10
                  `}
                                    >
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>

                {/* Fun footer note */}
                <div className="text-center p-4 text-gray-500 italic font-comic">
                    still confused? that&apos;s ok! number still go up anyway 🚀
                </div>
            </Card>
        </section>
    );
};

export default FAQSection;
