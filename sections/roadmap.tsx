import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
    Rocket,
    Sparkles,
    Star,
    Check,
    Timer,
    ChevronDown,
    HelpCircle,
    ChevronRight,
    Globe,
} from 'lucide-react';

const RoadmapSection = () => {
    const [expandedDetails, setExpandedDetails] = useState<{
        [key: string]: boolean;
    }>({});

    const phases = [
        {
            title: 'Phase 1: The Big Launch (Q1 2025)',
            status: 'in-progress',
            items: [
                {
                    text: 'Launch $NAB (Always Up token)',
                    completed: true,
                    explainer:
                        'NAB is the core DeFi token of the ecosystem, designed to maintain a stable floor by controlling inflation and incentivizing buying during market dips.',
                },
                {
                    text: 'Secure Initial Launch Partners',
                    completed: true,
                    explainer:
                        "Establish key partnerships to build trust in NAB's ecosystem, fostering collaboration over competition.",
                },
                {
                    text: 'Launch $MINT (Proof of Contribution token)',
                    completed: false,
                    explainer:
                        "MINT rewards all forms of 'work'—whether by smart contracts or human contributions—that enhance NAB’s value and ecosystem growth.",
                },
                {
                    text: "Activate Mithril's Rebasing on $MINT (Create Scarcity)",
                    completed: false,
                    explainer:
                        'MINT’s rebasing mechanism, simpler than NAB’s, will be implemented first as a proof of concept in Q1.',
                },
                {
                    text: "Activate Mithril's Rebasing on $NAB (Incentivize Growth)",
                    completed: false,
                    explainer:
                        'Mithril’s rebasing mechanism for NAB will be activated by the end of Q1, following a thorough smart contract review.',
                },
            ],
            icon: <Rocket className="h-6 w-6 text-crypto-green" />,
        },
        {
            title: 'Phase 2: Expanding the Ecosystem with MINT (Q1 Onwards)',
            status: 'in-progress',
            items: [
                {
                    text: 'Reward Community-Driven Awareness Efforts',
                    completed: false,
                    explainer:
                        'MINT will incentivize users and processes that generate liquidity for NAB while increasing its value and adoption. As a Proof of Contribution token, MINT serves as NAB’s growth catalyst.',
                },
                {
                    text: 'Incentivize dApps and Protocols Implementing NAB',
                    completed: false,
                    explainer:
                        'MINT will drive adoption by rewarding decentralized applications, protocols, and processes that integrate $NAB, reinforcing a sustainable growth cycle.',
                },
                {
                    text: 'Fund and Strengthen Strategic Partnerships',
                    completed: false,
                    explainer:
                        'MINT will support business development efforts to expand NAB’s use, adoption, and overall ecosystem value.',
                },
            ],
            icon: <Star className="h-6 w-6 text-moon-yellow" />,
        },
        {
            title: 'Phase 3: JUMP—Expanding to Solana (Q2 - Q3)',
            status: 'upcoming',
            items: [
                {
                    text: "Introducing Mithril's 'JUMP' technology",
                    completed: false,
                    explainer:
                        'Research is underway to enable MINT and NAB to integrate seamlessly into Solana’s ecosystem and participate in its liquidity pools. Stay tuned for JUMP-compatible tokens.',
                },
            ],
            icon: <Sparkles className="h-6 w-6 text-floor-pink" />,
        },
        {
            title: 'Phase 4: ATOMs—Next-Gen DeFi Products (Q4)',
            status: 'upcoming',
            items: [
                {
                    text: 'Launch ATOM',
                    completed: false,
                    explainer:
                        'Building on the success of Mithril’s rebasing mechanisms, we will introduce a new suite of DeFi products, code-named ATOMs. More details will be shared toward the end of the year.',
                },
            ],
            icon: <Globe className="h-6 w-6 text-deep-blue" />,
        },
    ];

    const toggleDetail = (phaseIndex: number, itemIndex: number) => {
        const key = `${phaseIndex}-${itemIndex}`;
        setExpandedDetails((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <section className="max-w-4xl mx-auto my-16">
            <Card className="bg-white/95 backdrop-blur-sm border-4 border-tech-purple hover:scale-[1.01] transition-all duration-500">
                <CardHeader className="text-center">
                    <CardTitle className="text-4xl font-comic flex items-center justify-center gap-2">
                        <Rocket className="h-8 w-8 text-crypto-green animate-bounce" />
                        roadmap to bigger numbers
                        <Rocket className="h-8 w-8 text-crypto-green animate-bounce" />
                    </CardTitle>
                    <p className="text-xl text-gray-600 font-comic mt-2">
                        (how we make number even bigger over time)
                    </p>
                </CardHeader>
                <CardContent className="space-y-8">
                    {phases.map((phase, phaseIndex) => (
                        <div
                            key={phaseIndex}
                            className={`
                                relative p-6 rounded-xl transition-all duration-300
                                ${
                                    phaseIndex === 1
                                        ? 'bg-gradient-to-r from-crypto-green/10 via-moon-yellow/10 to-floor-pink/10'
                                        : ''
                                }
                                ${phaseIndex === 0 ? 'opacity-75' : ''}
                            `}
                        >
                            <div className="absolute -left-3 top-8">
                                {phase.status === 'completed' ? (
                                    <div className="w-6 h-6 rounded-full bg-crypto-green flex items-center justify-center">
                                        <Check className="h-4 w-4 text-white" />
                                    </div>
                                ) : phase.status === 'in-progress' ? (
                                    <div className="w-6 h-6 rounded-full bg-moon-yellow flex items-center justify-center animate-spin-slow">
                                        <Timer className="h-4 w-4 text-white" />
                                    </div>
                                ) : (
                                    <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                                        <ChevronDown className="h-4 w-4 text-white" />
                                    </div>
                                )}
                            </div>

                            <div className="ml-6">
                                <div className="flex items-center gap-3 mb-4">
                                    {phase.icon}
                                    <h3 className="text-xl font-comic">
                                        {phase.title}
                                    </h3>
                                </div>
                                <ul className="space-y-4">
                                    {phase.items.map((item, itemIndex) => (
                                        <li key={itemIndex}>
                                            <div className="flex items-start gap-2 font-comic group">
                                                {item.completed ? (
                                                    <div className="flex items-center gap-2 text-crypto-green mt-1">
                                                        <Check className="h-4 w-4" />
                                                    </div>
                                                ) : (
                                                    <span className="w-1.5 h-1.5 rounded-full bg-tech-purple mt-3" />
                                                )}
                                                <div className="flex-1">
                                                    <button
                                                        onClick={() =>
                                                            toggleDetail(
                                                                phaseIndex,
                                                                itemIndex
                                                            )
                                                        }
                                                        className="flex items-center gap-2 text-left group w-full"
                                                    >
                                                        <span>{item.text}</span>
                                                        <HelpCircle className="h-4 w-4 text-tech-purple opacity-50 group-hover:opacity-100 transition-opacity" />
                                                        <ChevronRight
                                                            className={`h-4 w-4 transition-transform ${
                                                                expandedDetails[
                                                                    `${phaseIndex}-${itemIndex}`
                                                                ]
                                                                    ? 'rotate-90'
                                                                    : ''
                                                            }`}
                                                        />
                                                    </button>
                                                    {expandedDetails[
                                                        `${phaseIndex}-${itemIndex}`
                                                    ] && (
                                                        <div className="mt-2 pl-4 pr-8 py-3 bg-tech-purple/5 rounded-lg text-gray-600 text-sm border-l-2 border-tech-purple">
                                                            {item.explainer}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </CardContent>

                <div className="text-center p-4 text-gray-500 italic font-comic">
                    trust the process fren, number only goes up! 🚀
                </div>
            </Card>
        </section>
    );
};

export default RoadmapSection;
