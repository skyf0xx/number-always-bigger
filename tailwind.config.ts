import type { Config } from 'tailwindcss';

export default {
    darkMode: ['class'],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Original theme colors
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))',
                },
                // NAB Custom colors
                'meme-blue': '#4287f5',
                'moon-yellow': '#f7d794',
                'crypto-green': '#00ff98',
                'floor-pink': '#ff69b4',
                'tech-purple': '#8b008b',
                'stability-gray': '#cccccc',
            },
            fontFamily: {
                comic: [
                    'Comic Sans MS',
                    'Comic Sans',
                    'Chalkboard SE', // Good fallback for iOS
                    'Comic Neue', // Open source alternative
                    'sans-serif', // Last resort - better than cursive
                ],
                impact: [
                    'Impact',
                    'Haettenschweiler',
                    'Arial Narrow Bold',
                    'sans-serif',
                ],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            animation: {
                float: 'float 6s ease-in-out infinite',
                'bounce-slow': 'bounce 100s infinite',
                'mascot-launch': 'launch 2s ease-in forwards',
                'mascot-spin': 'spin 0.5s linear infinite',
                'glow-pulse': 'glowPulse 2s ease-in-out infinite',
                'glow-intensify': 'glowIntensify 0.5s ease-in-out infinite',
                flame: 'flame 0.2s ease-in-out infinite',
            },
            keyframes: {
                bounce: {
                    '0%, 100%': {
                        transform: 'translateY(-10%)',
                        animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
                    },
                    '50%': {
                        transform: 'translateY(0)',
                        animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
                    },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                launch: {
                    '0%': { transform: 'translateY(0) scale(1) rotate(0deg)' },
                    '50%': {
                        transform:
                            'translateY(-50vh) scale(0.8) rotate(180deg)',
                    },
                    '100%': {
                        transform: 'translateY(-100vh) scale(0) rotate(360deg)',
                    },
                },
                glowPulse: {
                    '0%, 100%': { opacity: '0.5' },
                    '50%': { opacity: '0.7' },
                },
                glowIntensify: {
                    '0%, 100%': { opacity: '0.7' },
                    '50%': { opacity: '1' },
                },
                flame: {
                    '0%, 100%': { transform: 'scaleY(1)' },
                    '50%': { transform: 'scaleY(1.2)' },
                },
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
} satisfies Config;
