import { Html, Head, Main, NextScript } from 'next/document';

import { geistSans, geistMono } from '@/lib/fonts';

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
