/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: { domains: ["i.ibb.co"] },
    webpack: (config) => {
        config.experiments = { topLevelAwait: true };
        return config;
    },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
