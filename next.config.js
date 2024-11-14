/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: "/admin",
                destination: "https://admin.gamenode.app",
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
