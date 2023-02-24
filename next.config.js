/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["i.imgur.com", "images.unsplash.com", "assets.hkamran.com"],
    },
    webpack: (config) => {
        config.experiments = { topLevelAwait: true, layers: true };
        return config;
    },
    async rewrites() {
        return [
            {
                source: "/feed",
                destination: "/feed.rss",
            },
            {
                source: "/feed/:slug",
                destination: "/feed.:slug",
            },
        ];
    },
    async redirects() {
        return [
            {
                source: "/blog/post/:slug",
                destination: "/article/:slug",
                permanent: true,
            },
            { source: "/creations", destination: "/showcase", permanent: true },
            {
                source: "/creations/:slug",
                destination: "/showcase/:slug",
                permanent: true,
            },
            {
                source: "/articles/:slug",
                destination: "/tag/:slug",
                permanent: true,
            },
            {
                source: "/notes/:slug",
                destination: "/tag/:slug",
                permanent: true,
            },
            { source: "/article", destination: "/articles", permanent: true },
            { source: "/note", destination: "/notes", permanent: true },
            { source: "/tag", destination: "/articles", permanent: true },
        ];
    },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
