/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{hostname: "images.pexels.com"}]
    },
    output: 'standalone', // Add this line to enable standalone mode
};

export default nextConfig;
