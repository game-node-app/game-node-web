/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: "/admin",
                destination: "/admin/moderation",
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
