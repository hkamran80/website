/* eslint-disable import/no-unassigned-import */

import MarkdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import markdownItImageFigures from "markdown-it-image-figures";
import markdownItLinkAttributes from "markdown-it-link-attributes";
import markdownItPrism from "markdown-it-prism";
import markdownItReplaceLink from "markdown-it-replace-link";
import markdownItGitHubAlerts from "markdown-it-github-alerts";
import markdownItAnchor from "markdown-it-anchor";
import markdownItTocDoneRight from "markdown-it-toc-done-right";
import markdownItAttrs from "markdown-it-attrs";
import { slugify } from "@hkamran/utility-strings";
import "prismjs/plugins/autoloader/prism-autoloader";
import "prismjs/plugins/toolbar/prism-toolbar";

import { unified } from "unified";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import { remarkAlert } from "remark-github-blockquote-alert";
import rehypeRewrite from "rehype-rewrite";
import remarkRemoveComments from "remark-remove-comments";
import rehypeShiki from "@shikijs/rehype";
import rehypeFigure from "rehype-figure";
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import { EVENT_NAMES } from "@/data/constants";

const checkIfLocalLink = (link: string) =>
    link.startsWith("/") ||
    link.startsWith("#") ||
    link.startsWith("https://hkamran.com");

type Options = Partial<
    Record<"code" | "images" | "footnotes" | "toc", boolean>
>;

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
    source: string | undefined = undefined,
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
                        return `${link}${
                            link.includes("?") ? "&" : "?"
                        }ref=hkamran.com`;
                    else {
                        const [url, selector] = link.split("#");
                        return `${url}${
                            url.includes("?") ? "&" : "?"
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
        .use(markdownItAttrs, { allowedAttributes: ["id", "class"] })
        .use(markdownItAnchor, { slugify: slugifySection })
        .use((md) => {
            const defaultRender =
                md.renderer.rules.link_open ||
                ((tokens, idx, options, _, self) =>
                    self.renderToken(tokens, idx, options));

            md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
                const token = tokens[idx];
                const href = token.attrGet("href");

                if (href) {
                    if (!checkIfLocalLink(href)) {
                        token.attrSet("data-umami-event", EVENT_NAMES.OUTBOUND);
                        token.attrSet(
                            "data-umami-event-url",
                            href
                                .replace("&ref=hkamran.com", "")
                                .replace("?ref=hkamran.com", ""),
                        );
                    } else {
                        if (!href.startsWith("#")) {
                            token.attrSet(
                                "data-umami-event",
                                EVENT_NAMES.LOCAL,
                            );
                            token.attrSet("data-umami-event-url", href);
                        }
                    }

                    if (source)
                        token.attrSet("data-umami-event-location", source);
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
        md = md.use(markdownItTocDoneRight, {
            level: 2,
            listType: "ul",
            listClass: "space-y-1 list-inside list-disc",
            slugify: slugifySection,
            linkClass:
                "text-gray-400 hover:text-white transition-colors duration-150",
        });

    let rendered = md.render(!options.toc ? content : `[toc]\n${content}`);
    if (options.images) {
        rendered = rendered.replace(
            /(?<!figure>)<img (.*) alt=\"(.*)\"\>/gim,
            `<img $1 alt="$2" class="rounded-lg" />`,
        );
    }

    return rendered;
};

export const renderMarkdownRemark = async (
    content: string,
    userOptions: Options = defaultOptions,
    source: string | undefined = undefined,
): Promise<string> => {
    const options = { ...defaultOptions, ...userOptions };

    const md = await unified()
        .use(remarkParse)
        .use(remarkDirective)
        .use(remarkDirectiveRehype)
        .use(remarkGfm)
        .use(remarkAlert)
        .use(remarkRemoveComments)
        .use(remarkRehype)
        .use(rehypeShiki, { theme: "vitesse-black" })
        .use(rehypeFigure, { className: "image" })
        .use(rehypeSanitize, {
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
                div: [...(defaultSchema.attributes?.div ?? []), "className"],
                p: [...(defaultSchema.attributes?.p ?? []), "className"],
                pre: ["className", "style", "tabindex"],
                span: ["className", "style"],
                svg: ["className", "viewBox", "version", "ariaHidden"],
                path: ["d"],
            },
            tagNames: [
                ...(defaultSchema.tagNames ?? []),
                "svg",
                "path",
                "figure",
                "figcaption",
            ],
        })
        .use(rehypeRewrite, {
            selector: "p.markdown-alert-title",
            // Remove the alert title text
            rewrite: (node) => {
                if (node.type === "element") {
                    node.children = [node.children[0]];
                }
            },
        })
        .use(rehypeRewrite, {
            selector: "a",
            // Umami events, outbound links
            rewrite: (node) => {
                if (node.type === "element" && "href" in node.properties) {
                    const href = node.properties.href as string

                    if (!checkIfLocalLink(href)) {
                        node.properties.target = "_blank"
                        node.properties.rel = "noopener noreferrer"

                        node.properties["data-umami-event"] = EVENT_NAMES.OUTBOUND
                        node.properties["data-umami-event-url"] = href

                        if (!href.includes("#")) node.properties.href = `${href}${href.includes("?") ? "&" : "?"}ref=hkamran.com`
                        else {
                            const [url, selector] = href.split("#")
                            node.properties.href = `${url}${url.includes("?") ? "&" : "?"}ref=hkamran.com#${selector}`
                        }
                    } else if (!href.startsWith("#")) {
                        node.properties["data-umami-event"] = EVENT_NAMES.LOCAL
                        node.properties["data-umami-event-url"] = href
                    }

                    if (source) node.properties["data-umami-event-location"] = source
                }
            },
        })
        .use(rehypeStringify)
        .process(content);

    return String(md);
};
