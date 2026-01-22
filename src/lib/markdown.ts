import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { remarkAlert } from "remark-github-blockquote-alert";
import remarkRemoveComments from "remark-remove-comments";
import remarkRehype from "remark-rehype";
import rehypeFigure from "rehype-figure";
import rehypeSlug from "rehype-slug";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeRewrite from "rehype-rewrite";
import rehypeStringify from "rehype-stringify";
import rehypePresetMinify from "rehype-preset-minify";

const isLocalLink = (link: string) =>
    link.startsWith("/") ||
    link.startsWith("#") ||
    link.startsWith("https://hkamran.com");

type Options = {};
const defaultOptions: Options = {};

export const renderMarkdown = async (
    content: string,
    userOptions: Partial<Options> = defaultOptions,
): Promise<string> => {
    const options = { ...defaultOptions, ...userOptions };

    const md = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkAlert)
        .use(remarkRemoveComments)
        .use(remarkRehype)
        .use(rehypeFigure, { className: "image" })
        .use(rehypeSlug)
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
                "hr",
            ],
        })
        .use(rehypeRewrite, {
            selector: ".markdown-alert-title, a",
            rewrite: (node) => {
                if (node.type !== "element") return node;

                // Remove the alert title text
                if (
                    node.tagName === "p" &&
                    "className" in node.properties &&
                    (node.properties.className as string).includes(
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

                        if (!href.includes("#"))
                            node.properties.href = `${href}${href.includes("?") ? "&" : "?"}ref=hkamran.com`;
                        else {
                            const [url, selector] = href.split("#");
                            node.properties.href = `${url}${url.includes("?") ? "&" : "?"}ref=hkamran.com#${selector}`;
                        }
                    } else if (href.startsWith("/")) {
                        node.properties.href = `https://hkamran.com${href}`;
                    }
                }
            },
        })
        .use(rehypePresetMinify)
        .use(rehypeStringify)
        .process(content);

    return String(md);
};
