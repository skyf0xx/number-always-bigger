import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'export', // Enables static export
    images: {
        unoptimized: true, // Required for static export
    },
    // Disable server features since we're going fully static
    trailingSlash: true,
};

export default nextConfig;
