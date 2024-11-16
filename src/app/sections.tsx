import React, { useCallback, useEffect, useState } from 'react';
import { Sparkles, ArrowUp, Rocket, TrendingUp, Stars } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 border-2 border-dashed border-meme-blue rounded-lg">
                <p className="font-comic">up, up, up </p>
            </div>
        );
    }
    return null;
};

// Price ticker component with enhanced animations
export const PriceTicker = ({ currentPrice, nextPrice }) => {
    return (
        <Card className="bg-white/95 backdrop-blur-sm border-4 border-floor-pink shadow-xl transform hover:scale-[1.02] transition-all duration-300">
            <CardContent className="p-8">
                <div className="flex flex-col gap-6">
                    {/* Current Floor */}
                    <div className="relative group">
                        <div className="flex items-center justify-center gap-4">
                            <span className="text-xl text-tech-purple font-comic">
                                current floor:
                            </span>
                            <div className="relative">
                                <span className="text-6xl font-bold text-crypto-green font-comic animate-pulse">
                                    ${currentPrice}
                                </span>
                                <ArrowUp className="absolute -right-10 top-1/2 transform -translate-y-1/2 h-8 w-8 text-crypto-green animate-bounce" />
                            </div>
                        </div>
                        {/* Tooltip on hover */}
                        <div className="invisible group-hover:visible absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap">
                            only goes up
                        </div>
                    </div>

                    {/* Next Floor */}
                    <div className="flex items-center justify-center gap-4">
                        <span className="text-xl text-tech-purple font-comic">
                            next floor:
                        </span>
                        <span className="text-4xl font-bold text-meme-blue font-comic">
                            ${nextPrice}
                        </span>
                        <Rocket className="h-6 w-6 text-meme-blue animate-bounce" />
                    </div>

                    {/* Trust indicator */}
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 italic mt-2">
                        <Stars className="h-4 w-4" />
                        <span>(source: big number math)</span>
                        <Stars className="h-4 w-4" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export const HowItWorks = () => {
    const steps = [
        {
            icon: <Sparkles className="h-8 w-8" />,
            title: 'number exists',
            description: 'very important first step',
            color: 'meme-blue',
        },
        {
            icon: <TrendingUp className="h-8 w-8" />,
            title: 'smart contract do a check',
            description: 'very technical here',
            color: 'crypto-green',
        },
        {
            icon: <ArrowUp className="h-8 w-8" />,
            title: 'if number trying to go down...',
            description: 'we make supply smol',
            color: 'floor-pink',
        },
        {
            icon: <Rocket className="h-8 w-8" />,
            title: "that's it!",
            description: 'number has no choice but to go up!',
            color: 'moon-yellow',
        },
    ];

    return (
        <section className="max-w-5xl mx-auto py-16 px-4" id="how-it-works">
            <Card className="bg-white/95 backdrop-blur-sm transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <CardHeader>
                    <CardTitle className="text-4xl font-comic text-center text-tech-purple">
                        how does number get bigger?
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
                        {steps.map((step, index) => (
                            <div key={index} className="group relative">
                                <div
                                    className={`bg-${step.color} rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:rotate-2 border-4 border-black shadow-lg`}
                                >
                                    <div className="flex flex-col items-center text-center space-y-4">
                                        <div className="bg-white rounded-full p-4">
                                            {step.icon}
                                        </div>
                                        <h3 className="text-xl font-bold">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                                {/* Connection line */}
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t-4 border-dashed border-black" />
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </section>
    );
};

export const PriceChart = () => {
    const [data, setData] = useState([]);
    const [hoverPoint, setHoverPoint] = useState(null);

    // Generate initial data points
    const generateDataPoint = useCallback((index, lastValue = 100) => {
        const upwardTrend = Math.random() * 8 + 2;
        const wave = Math.sin(index * 0.5) * 5;
        const newValue = lastValue + upwardTrend;

        return {
            time: `${index + 1}h`,
            price: newValue + wave,
            smoothPrice: newValue,
            tooltipValue: `$${(newValue + wave).toFixed(2)}`,
        };
    }, []);

    // Initialize data
    useEffect(() => {
        const initialData = Array.from({ length: 12 }, (_, i) => {
            const lastValue = i > 0 ? data[i - 1]?.smoothPrice || 100 : 100;
            return generateDataPoint(i, lastValue);
        });
        setData(initialData);
    }, []);

    // Animate data updates
    useEffect(() => {
        const interval = setInterval(() => {
            setData((prevData) => {
                const newData = [...prevData.slice(1)];
                const lastValue = prevData[prevData.length - 1].smoothPrice;
                newData.push(generateDataPoint(prevData.length, lastValue));
                return newData;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [generateDataPoint]);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border-4 border-dashed border-floor-pink rounded-lg shadow-lg transform -rotate-2 transition-all duration-300">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-moon-yellow" />
                        <p className="font-comic text-xl text-tech-purple">
                            {payload[0].payload.tooltipValue}
                        </p>
                        <Sparkles className="h-4 w-4 text-moon-yellow" />
                    </div>
                    <p className="text-sm text-gray-500 mt-1 font-comic">
                        number got bigger!
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="bg-white/95 backdrop-blur-sm transform hover:scale-[1.01] transition-all duration-500 border-4 border-floor-pink">
            <CardHeader>
                <CardTitle className="text-4xl font-comic text-center text-tech-purple flex items-center justify-center gap-2">
                    <Sparkles className="h-8 w-8 text-moon-yellow" />
                    looks like this...
                    <Sparkles className="h-8 w-8 text-moon-yellow" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative h-[400px] bg-white/90 backdrop-blur-sm rounded-lg p-6 border-4 border-meme-blue">
                    {/* Floating emojis */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {hoverPoint && (
                            <div
                                className="absolute transition-all duration-300"
                                style={{
                                    left: `${
                                        (hoverPoint.index / (data.length - 1)) *
                                        100
                                    }%`,
                                    top: `${100 - hoverPoint.value / 2}%`,
                                    transform: 'translate(-50%, -50%)',
                                }}
                            >
                                <span className="text-2xl animate-bounce">
                                    🚀
                                </span>
                            </div>
                        )}
                    </div>

                    <ResponsiveContainer>
                        <LineChart
                            data={data}
                            onMouseMove={(props) => {
                                if (props.activeTooltipIndex !== undefined) {
                                    setHoverPoint({
                                        index: props.activeTooltipIndex,
                                        value: data[props.activeTooltipIndex]
                                            .price,
                                    });
                                }
                            }}
                            onMouseLeave={() => setHoverPoint(null)}
                        >
                            <defs>
                                <linearGradient
                                    id="colorPrice"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#00ff98"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#00ff98"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                                <linearGradient
                                    id="colorSmooth"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#ff69b4"
                                        stopOpacity={0.3}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#ff69b4"
                                        stopOpacity={0.05}
                                    />
                                </linearGradient>
                            </defs>

                            <XAxis
                                dataKey="time"
                                stroke="#8b008b"
                                tick={{
                                    fontSize: 14,
                                    fontFamily: 'Comic Sans MS',
                                }}
                            />
                            <YAxis
                                stroke="#8b008b"
                                tick={{
                                    fontSize: 14,
                                    fontFamily: 'Comic Sans MS',
                                }}
                                tickFormatter={(value) =>
                                    `$${value.toFixed(0)}`
                                }
                            />
                            <Tooltip
                                content={CustomTooltip}
                                cursor={{
                                    stroke: '#ff69b4',
                                    strokeWidth: 2,
                                    strokeDasharray: '5 5',
                                }}
                            />

                            {/* Smooth trend line */}
                            <Line
                                type="monotone"
                                dataKey="smoothPrice"
                                stroke="#ff69b4"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                dot={false}
                                fillOpacity={1}
                                fill="url(#colorSmooth)"
                            />

                            {/* Main animated line */}
                            <Line
                                type="natural"
                                dataKey="price"
                                stroke="#00ff98"
                                strokeWidth={4}
                                dot={{
                                    fill: '#ff69b4',
                                    strokeWidth: 2,
                                    r: 6,
                                    strokeDasharray: '',
                                }}
                                activeDot={{
                                    r: 8,
                                    fill: '#00ff98',
                                    stroke: '#ff69b4',
                                    strokeWidth: 2,
                                    className: 'animate-ping',
                                }}
                                fillOpacity={1}
                                fill="url(#colorPrice)"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};
