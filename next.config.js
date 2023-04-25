// Switch to hashes/nonce
const ContentSecurityPolicy = `
  default-src 'self' vitals.vercel-insights.com giscus.app assets.hkamran.com data:;
  script-src 'self' umami.unisontech.org vercel.live;
  style-src 'self' 'unsafe-inline' data:;
  font-src 'self';
  report-to https://hkamran.report-uri.com/r/d/csp/wizard
`;

const securityHeaders = [
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
    },
    {
        key: "X-XSS-Protection",
        value: "1; mode=block",
    },
    {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
    },
    {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
    },
    {
        key: "Permissions-Policy",
        value: "accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), cross-origin-isolated=(), display-capture=(), document-domain=(), encrypted-media=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), fullscreen=(), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), navigation-override=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(self), xr-spatial-tracking=(), clipboard-read=(), clipboard-write=(), gamepad=(), speaker-selection=(), conversion-measurement=(), focus-without-user-activation=(), hid=(), idle-detection=(), interest-cohort=(), serial=(), sync-script=(), trust-token-redemption=(), unload=(), window-placement=(), vertical-scroll=()",
    },
    {
        key: "X-DNS-Prefetch-Control",
        value: "on",
    },
    {
        key: "Content-Security-Policy",
        value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
    },
];

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
    async headers() {
        return [
            {
                source: "/:path*",
                headers: securityHeaders,
            },
        ];
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
