import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Sparkles, LineChart } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';
import { ResponsiveContainer, XAxis, YAxis, Tooltip, Line } from 'recharts';

interface ChartDataPoint {
    time: string;
    price: number;
    smoothPrice: number;
    tooltipValue: string;
}

const PriceChart: React.FC = () => {
    const [data, setData] = useState<ChartDataPoint[]>([]);

    // Generate initial data points
    const generateDataPoint = useCallback(
        (index: number, lastValue: number = 100): ChartDataPoint => {
            const upwardTrend = Math.random() * 8 + 2;
            const wave = Math.sin(index * 0.5) * 5;
            const newValue = lastValue + upwardTrend;

            return {
                time: `${index + 1}d`,
                price: newValue + wave,
                smoothPrice: newValue,
                tooltipValue: 'up!',
            };
        },
        []
    );

    // Initialize data
    useEffect(() => {
        const initialData = Array.from({ length: 50 }, (_, i) => {
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

    return (
        <Card className="bg-white/95 backdrop-blur-sm transform hover:scale-[1.01] transition-all duration-500 border-4 border-meme-blue">
            <CardHeader>
                <CardTitle className="text-4xl font-comic text-center text-tech-purple flex items-center justify-center gap-2">
                    <Sparkles className="h-8 w-8 text-moon-yellow" />
                    looks like this...
                    <Sparkles className="h-8 w-8 text-moon-yellow" />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative h-[400px] bg-white/90 backdrop-blur-sm rounded-lg p-6">
                    <ResponsiveContainer>
                        <LineChart data={data}>
                            <defs>
                                <linearGradient
                                    id="colorPrice"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                ></linearGradient>
                                <linearGradient
                                    id="colorSmooth"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                ></linearGradient>
                            </defs>

                            <XAxis
                                dataKey="time"
                                stroke="#8b008b"
                                tick={false}
                            />
                            <YAxis
                                stroke="#8b008b"
                                tick={false}
                                tickFormatter={(value: number) =>
                                    `$${value.toFixed(0)}`
                                }
                            />
                            <Tooltip
                                cursor={{
                                    stroke: '#ff69b4',
                                    strokeWidth: 2,
                                    strokeDasharray: '5 5',
                                }}
                                content={({ active }) => {
                                    if (active) {
                                        return (
                                            <div className="bg-black/80 text-white px-4 py-2 rounded-full font-comic">
                                                Up!
                                            </div>
                                        );
                                    }
                                    return null;
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
                                    fill: '#00ff98',
                                    strokeWidth: 0,
                                    r: 4,
                                    strokeDasharray: '',
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

export default PriceChart;
