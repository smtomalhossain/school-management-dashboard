/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: "images.pexels.com" }, { hostname: "localhost" },
        { hostname: "at-tahfiz-international-madrasha.com" },
        { hostname: "tecdn.b-cdn.net" },
        { hostname: "77.37.44.205" },
        ],
    },
    output: 'standalone', // Add this line to enable standalone mode
};

export default nextConfig;
