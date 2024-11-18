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

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="Number Always Bigger (NAB)"
                />
                <meta
                    name="twitter:description"
                    content="A token where number literally just gets bigger"
                />

                {/* Favicon */}
                <link rel="icon" href="./favicon.ico" />
            </Head>
            <body className={`antialiased`}>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
