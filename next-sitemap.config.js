/** @type {import('next-sitemap').IConfig} */

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
        ],
    },
};
