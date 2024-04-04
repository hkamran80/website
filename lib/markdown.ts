/* eslint-disable import/no-unassigned-import */

import MarkdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import markdownItImageFigures from "markdown-it-image-figures";
import markdownItLinkAttributes from "markdown-it-link-attributes";
import markdownItPrism from "markdown-it-prism";
import markdownItReplaceLink from "markdown-it-replace-link";
import markdownItGitHubAlerts from "markdown-it-github-alerts";
import "prismjs/plugins/autoloader/prism-autoloader";
import "prismjs/plugins/toolbar/prism-toolbar";

const checkIfLocalLink = (link: string) =>
    link.startsWith("/") || link.startsWith("https://hkamran.com");

type Options = Partial<Record<"code" | "images" | "footnotes", boolean>>;

const defaultOptions: Options = {
    code: false,
    images: false,
    footnotes: false,
};

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

    let rendered = md.render(content);
    if (options.images) {
        rendered = rendered.replace(
            /(?<!figure>)<img (.*) alt=\"(.*)\"\>/gim,
            `<img $1 alt="$2" class="rounded-lg" />`,
        );
    }

    return rendered;
};
