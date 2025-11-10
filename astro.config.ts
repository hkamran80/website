// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";

import { remarkAlert } from "remark-github-blockquote-alert";
import remarkRemoveComments from "remark-remove-comments";
import rehypeFigure from "rehype-figure";
import rehypeSlug from "rehype-slug";
import rehypeToc from "@jsdevtools/rehype-toc";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeRewrite from "rehype-rewrite";
import { EventNames } from "./src/navigation";

import netlify from "@astrojs/netlify";

const isLocalLink = (link: string) =>
    link.startsWith("/") ||
    link.startsWith("#") ||
    link.startsWith("https://hkamran.com");

// https://astro.build/config
export default defineConfig({
    site: "https://beta.hkamran.com",

    image: {
        domains: ["hkamran.com"],
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
            [
                rehypeToc,
                {
                    headings: ["h2", "h3", "h4", "h5", "h6"],
                    cssClasses: { list: "", listItem: "", link: "" },
                    // customizeTOC: (toc) => (options.toc ? toc : false),
                },
            ],
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
        svelte(),
        robotsTxt({
            host: true,
            policy: [{ userAgent: "*", disallow: "/_astro/" }],
        }),
        sitemap({ xslURL: "/sitemap.xslt" }),
    ],

    experimental: {
        fonts: [
            {
                provider: fontProviders.google(),
                name: "Nunito Sans",
                cssVariable: "--font-nunito-sans",
                weights: ["400 700"],
                subsets: ["latin", "latin-ext"],
            },
        ],
    },

    adapter: netlify(),

    redirects: {
        "/article/[...slug]": "/articles/[...slug]",
    },
});
