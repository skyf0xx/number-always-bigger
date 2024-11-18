import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta
                    name="description"
                    content="Welcome to NAB - the token that only goes up. No fancy promises, just pure mathematic certainty that number go up."
                />

                {/* Open Graph / Social Media */}
                <meta
                    property="og:title"
                    content="Number Always Bigger (NAB)"
                />
                <meta
                    property="og:description"
                    content="A token where number literally just gets bigger"
                />
                <meta property="og:type" content="website" />

                {/* Favicon */}
                <link rel="icon" href="./favicon.ico" />

                <meta
                    name="description"
                    content="NAB is a token where number go up. That's it. No fancy promises, just pure mathematic certainty that number get bigger."
                />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />

                <meta
                    property="og:title"
                    content="Number Always Bigger (NAB) 📈"
                />

                <meta property="og:image" content="./nab-preview.jpg" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />

                <meta
                    property="twitter:title"
                    content="Number Always Bigger (NAB) 📈"
                />
                <meta
                    property="twitter:description"
                    content="The token where number literally just gets bigger. Up only, that's it!"
                />
                <meta property="twitter:image" content="./nab-preview.jpg" />

                {/* Additional SEO */}
                <meta name="theme-color" content="#4287f5" />
            </Head>
            <body className={`antialiased`}>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
