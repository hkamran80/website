// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import robotsTxt, { type PolicyItem } from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";

import { remarkAlert } from "remark-github-blockquote-alert";
import remarkRemoveComments from "remark-remove-comments";
import rehypeFigure from "rehype-figure";
import rehypeSlug from "rehype-slug";
import rehypeSectionize from "@hbsnow/rehype-sectionize";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeRewrite from "rehype-rewrite";
import { EventNames } from "./src/navigation";
import { getPosts } from "./src/lib/posts";
import { loadEnv } from "vite";

import netlify from "@astrojs/netlify";

import react from "@astrojs/react";

const site = "https://hkamran.com";

const isLocalLink = (link: string) =>
    link.startsWith("/") ||
    link.startsWith("#") ||
    link.startsWith("https://hkamran.com");

const getLLMRobots = async () => {
    const robotsTxt = await fetch(
        "https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/main/robots.txt",
    );
    const txt = await robotsTxt.text();

    return txt
        .split("\n")
        .filter(
            (line) =>
                line.startsWith("User-agent:") &&
                line !== "User-agent: Applebot",
        )
        .map(
            (line): PolicyItem => ({
                userAgent: line.split(": ")[1].trim(),
                disallow: "*",
            }),
        );
};

const { GITHUB_API_KEY } = loadEnv(
    process.env.NODE_ENV as string,
    process.cwd(),
    "",
);
const draftPosts = (await getPosts(GITHUB_API_KEY as string))
    .filter((post) => post.status === "draft")
    .map((post) => `${site}/posts/${post.id}`);

// https://astro.build/config
export default defineConfig({
    site,
    trailingSlash: "never",

    image: {
        domains: ["assets.hkamran.com", "images.unsplash.com"],
    },

    vite: {
        plugins: [tailwindcss()],
    },

    markdown: {
        shikiConfig: {
            themes: {
                light: "vitesse-light",
                dark: "vitesse-black",
            },
        },
        smartypants: false,
        remarkPlugins: [remarkAlert, remarkRemoveComments],
        rehypePlugins: [
            [rehypeFigure, { className: "image" }],
            rehypeSlug,
            rehypeSectionize,
            [
                rehypeSanitize,
                {
                    ...defaultSchema,
                    clobberPrefix: null,
                    ancestors: {
                        ...defaultSchema.ancestors,
                        path: ["svg"],
                        figcaption: ["figure"],
                    },
                    attributes: {
                        ...defaultSchema.attributes,
                        figure: ["className"],
                        div: [
                            ...(defaultSchema.attributes?.div ?? []),
                            "className",
                        ],
                        nav: ["className"],
                        p: [
                            ...(defaultSchema.attributes?.p ?? []),
                            "className",
                        ],
                        pre: ["className", "style", "tabindex"],
                        span: ["className", "style"],
                        svg: ["className", "viewBox", "version", "ariaHidden"],
                        path: ["d"],
                    },
                    tagNames: [
                        ...(defaultSchema.tagNames ?? []),
                        "nav",
                        "svg",
                        "path",
                        "figure",
                        "figcaption",
                    ],
                },
            ],
            [
                rehypeRewrite,
                {
                    selector: ".markdown-alert-title, a",
                    rewrite: (node) => {
                        if (node.type !== "element") return node;

                        // Remove the alert title text
                        if (
                            node.tagName === "p" &&
                            "className" in node.properties &&
                            node.properties.className.includes(
                                "markdown-alert-title",
                            )
                        ) {
                            node.children = [node.children[0]];
                        }

                        // Umami events, outbound links
                        if (node.tagName === "a" && "href" in node.properties) {
                            const href = node.properties.href as string;
                            if (href.startsWith("#")) return node;

                            if (!isLocalLink(href)) {
                                node.properties.target = "_blank";
                                node.properties.rel = "noopener noreferrer";

                                node.properties["data-umami-event"] =
                                    EventNames.Outbound;
                                node.properties["data-umami-event-url"] = href;

                                if (!href.includes("#"))
                                    node.properties.href = `${href}${href.includes("?") ? "&" : "?"}ref=hkamran.com`;
                                else {
                                    const [url, selector] = href.split("#");
                                    node.properties.href = `${url}${url.includes("?") ? "&" : "?"}ref=hkamran.com#${selector}`;
                                }
                            } else {
                                node.properties["data-umami-event"] =
                                    EventNames.Local;
                                node.properties["data-umami-event-url"] = href;
                            }

                            // if (source)
                            //     node.properties["data-umami-event-location"] = source;
                        }
                    },
                },
            ],
        ],
    },

    integrations: [
        robotsTxt({
            host: true,
            policy: [
                { userAgent: "*", disallow: "/_astro/" },
                ...(await getLLMRobots()),
            ],
        }),
        sitemap({
            xslURL: "/sitemap.xslt",
            filter: (page) => !draftPosts.includes(page),
        }),
        react(),
    ],

    fonts: [
        {
            provider: fontProviders.google(),
            name: "Fustat",
            cssVariable: "--font-hk-sans",
            weights: ["400 700"],
            subsets: ["latin", "latin-ext"],
        },
    ],

    security: {
        csp: {
            directives: [
                "default-src 'self' assets.hkamran.com u.13willow.com",
                "img-src 'self' assets.hkamran.com i.ibb.co https://external-content.duckduckgo.com/iu/",
                "font-src 'self'",
                "frame-src 'self' giscus.app",
                "report-to https://hkamran.report-uri.com/r/d/csp/wizard",
                "report-uri https://hkamran.report-uri.com/r/d/csp/wizard",
            ],
            scriptDirective: {
                resources: ["'self'", "u.13willow.com", "giscus.app"],
                hashes: [
                    "sha384-scriptHash",
                    "sha512-scriptHash",
                    "sha256-scriptHash",
                ],
            },
            styleDirective: {
                resources: [
                    "'self'",
                    "'unsafe-inline'",
                    // "sha384-j2+gI8m21l/f2qVy2CoqSSNPCE/cQE+L7yoSPcfjG8arf8V/KnHRLY47WrFaHCj0",
                    "giscus.app",
                ],
                // hashes: [
                //     "sha384-styleHash",
                //     "sha512-styleHash",
                //     "sha256-styleHash",
                // ],
            },
        },
    },

    adapter:
        (process.env.NODE_ENV as string) !== "development"
            ? netlify()
            : undefined,

    // NOTE: Only static redirects should be listed here. Dynamic redirects should be listed in `public/_redirects`.
    redirects: {
        // Legacy
        "/creations": "/projects",
        "/legal/license": "/license",

        // Existing
        "/llm-policy": "/ai",
        "/showcase": "/projects",
        "/programs": "/utilities",
        "/support": "/tip",

        // Social
        "/git": "https://github.com/hkamran80",
        "/mastodon": "https://infosec.exchange/@hkamran",
        "/twitter": "https://twitter.com/hkamran80",
        "/bluesky": "https://bsky.app/profile/hkamran.com",
    },
});
