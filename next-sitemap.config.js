/** @type {import('next-sitemap').IConfig} */

// Source: https://www.foundationwebdev.com/2023/11/which-web-crawlers-are-associated-with-ai-crawlers
const llmUserAgents = [
    // Anthrophic
    "anthropic-ai",
    "Claude-Web",

    // Apple
    "Applebot-Extended",

    // ByteDance
    "Bytespider",

    // Common Crawl
    "CCBot",

    // OpenAI
    "ChatGPT-User",
    "GPTBot",

    // Cohere AI
    "cohere-ai",

    // Diffbot
    "Diffbot",

    // Meta
    "FacebookBot",

    // Google
    "GoogleOther",
    "Google-Extended",

    // The Hive
    "ImagesiftBot",

    // Webz.io
    "OmigiliBot",
    "Omigili",
];

// Source: https://darkvisitors.com/agents
const otherUserAgents = [
    // Adbeat
    "adbeat_bot",

    // Google
    "Adsbot-Google",
    "Adsbot-Google-Mobile",

    // aiHit
    "aiHitBot",

    // Anders Pink
    "AndersPinkBot",

    // Awario
    "AwarioBot",
    "AwarioSmartBot",

    // Bitsight
    "BitSightBot",
];

const fullyBlockedUserAgents = [...llmUserAgents, ...otherUserAgents];

module.exports = {
    siteUrl: "https://hkamran.com",
    changefreq: "daily",
    priority: 0.7,
    sitemapSize: 5000,
    generateRobotsTxt: true,
    exclude: ["/_next/", "/api/", "/*.png"],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/_next/", "/api/", "/*.png"],
            },

            ...fullyBlockedUserAgents.map((userAgent) => ({
                userAgent,
                disallow: "/",
            })),

            //{
            //    userAgent: "GPTBot",
            //    disallow: "/",
            //},
            //{
            //    userAgent: "Applebot-Extended",
            //    disallow: "/",
            //},
        ],
    },
};
