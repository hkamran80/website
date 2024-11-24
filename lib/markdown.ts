/* eslint-disable import/no-unassigned-import */

import MarkdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import markdownItImageFigures from "markdown-it-image-figures";
import markdownItLinkAttributes from "markdown-it-link-attributes";
import markdownItPrism from "markdown-it-prism";
import markdownItReplaceLink from "markdown-it-replace-link";
import markdownItGitHubAlerts from "markdown-it-github-alerts";
import markdownItAnchor from "markdown-it-anchor"
import markdownItTocDoneRight from "markdown-it-toc-done-right";
import { slugify } from "@hkamran/utility-strings";
import "prismjs/plugins/autoloader/prism-autoloader";
import "prismjs/plugins/toolbar/prism-toolbar";
import { EVENT_NAMES } from "@/data/constants";

const checkIfLocalLink = (link: string) =>
    link.startsWith("/") || link.startsWith("https://hkamran.com");

type Options = Partial<Record<"code" | "images" | "footnotes" | "toc", boolean>>;

const defaultOptions: Options = {
    code: false,
    images: false,
    footnotes: false,
    toc: false,
};

const slugifySection = (s: string) => `section-${slugify(s)}`;

export const renderMarkdown = (
    content: string,
    userOptions: Options = defaultOptions,
): string => {
    const options = { ...defaultOptions, ...userOptions };

    let md = new MarkdownIt({})
        .use(markdownItLinkAttributes, {
            matcher: (href: string) => !checkIfLocalLink(href),
            attrs: {
                target: "_blank",
                rel: "noopener noreferrer",
            },
        })
        .use(markdownItReplaceLink, {
            processHtml: true,
            replaceLink: (link: string) => {
                if (checkIfLocalLink(link)) {
                    return link;
                } else {
                    if (!link.includes("#"))
                        return `${link}${link.includes("?") ? "&" : "?"
                            }ref=hkamran.com`;
                    else {
                        const [url, selector] = link.split("#");
                        return `${url}${url.includes("?") ? "&" : "?"
                            }ref=hkamran.com#${selector}`;
                    }
                }
            },
        })
        .use(markdownItGitHubAlerts, {
            titles: {
                note: "",
                tip: "",
                important: "",
                warning: "",
                caution: "",
            },
        })
        .use(markdownItAnchor, { slugify: slugifySection })
        .use((md) => {
            const defaultRender =
                md.renderer.rules.link_open ||
                ((tokens, idx, options, _, self) => self.renderToken(tokens, idx, options));

            md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
                const token = tokens[idx];
                const href = token.attrGet("href");

                if (href && !checkIfLocalLink(href)) {
                    token.attrSet("data-umami-event", EVENT_NAMES.OUTBOUND);
                    token.attrSet("data-umami-event-url", href.replace("&ref=hkamran.com", "").replace("?ref=hkamran.com", ""));
                }

                return defaultRender(tokens, idx, options, env, self);
            };
        });

    if (options.code) {
        md = md.use(markdownItPrism, { plugins: ["toolbar", "autoloader"] });
    }

    if (options.images) {
        md = md.use(markdownItImageFigures, {
            figcaption: "alt",
            lazy: true,
            async: true,
            classes: "rounded-lg",
        });
    }

    if (options.footnotes) {
        md = md.use(markdownItFootnote);
    }

    if (options.toc)
        md = md.use(markdownItTocDoneRight, { level: 2, listType: "ul", listClass: "space-y-1 list-inside list-disc", slugify: slugifySection, linkClass: "text-gray-400 hover:text-white transition-colors duration-150" });

    let rendered = md.render(!options.toc ? content : `[toc]\n${content}`);
    if (options.images) {
        rendered = rendered.replace(
            /(?<!figure>)<img (.*) alt=\"(.*)\"\>/gim,
            `<img $1 alt="$2" class="rounded-lg" />`,
        );
    }

    return rendered;
};
