/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: { domains: ["i.imgur.com"] },
    webpack: (config) => {
        // this will override the experiments
        config.experiments = { topLevelAwait: true };
        // this will just update topLevelAwait property of config.experiments
        // config.experiments.topLevelAwait = true
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
