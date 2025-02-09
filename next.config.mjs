/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: "images.pexels.com" }, { hostname: "localhost" }],
    },
    output: 'standalone', // Add this line to enable standalone mode
};

export default nextConfig;
