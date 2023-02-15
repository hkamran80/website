import MarkdownIt from "markdown-it";
import markdownItLinkAttributes from "markdown-it-link-attributes";
import markdownItPrism from "markdown-it-prism";
import markdownItImageFigures from "markdown-it-image-figures";

export const renderMarkdown = (
    content: string,
    code: boolean = false,
    images: boolean = false,
): string => {
    let md = new MarkdownIt({}).use(markdownItLinkAttributes, {
        matcher: (href: string) => !href.startsWith("https://hkamran.com"),
        attrs: {
            target: "_blank",
            rel: "noopener noreferrer",
        },
    });
    
    if (code) {
        md = md.use(markdownItPrism, { plugins: ["toolbar", "autoloader"] });
    }

    if (images) {
        md = md.use(markdownItImageFigures, {
            figcaption: "alt",
            lazy: true,
            async: true,
            classes: "rounded-lg",
        });
    }

    let rendered = md.render(content);
    if (images) {
        rendered = rendered.replace(
            /(?<!figure>)<img (.*) alt=\"(.*)\"\>/gim,
            `<img $1 alt="$2" class="rounded-lg" />`,
        );
    }

    return rendered;
};
