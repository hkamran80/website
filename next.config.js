/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: { domains: ["i.imgur.com"] },
    webpack: (config) => {
        config.experiments = { topLevelAwait: true, layers: true };
        return config;
    },
    async rewrites() {
        return [
            {
                source: "/feed",
                destination: "/api/feed/rss",
            },
            {
                source: "/feed/:slug",
                destination: "/api/feed/:slug",
            },
        ];
    },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
