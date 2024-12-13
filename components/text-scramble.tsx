import { useState, useEffect } from 'react';

const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

const TextScramble = ({ text = '', duration = 1500 }) => {
    const [displayText, setDisplayText] = useState('');
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        let startTime: number;
        let frame = 0;
        const finalLength = text.length;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percent = Math.min(progress / duration, 1);

            // Generate scrambled text
            let result = '';
            const scrambleLength = Math.floor(
                finalLength * Math.min(1, percent * 1.5)
            );

            for (let i = 0; i < scrambleLength; i++) {
                if (i < finalLength * percent) {
                    result += text[i];
                } else {
                    result +=
                        characters[
                            Math.floor(Math.random() * characters.length)
                        ];
                }
            }

            setDisplayText(result);

            if (progress < duration) {
                frame = requestAnimationFrame(animate);
            } else {
                setDisplayText(text);
                setIsAnimating(false);
            }
        };

        frame = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(frame);
            if (interval) clearInterval(interval);
        };
    }, [text, duration]);

    return (
        <span className={`inline-block ${isAnimating ? 'font-mono' : ''}`}>
            {displayText || text}
        </span>
    );
};

export default TextScramble;
