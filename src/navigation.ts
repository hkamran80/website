type CommonLink = {
    name: string;
    href: string;
    aliases?: string[];
};

export const links: CommonLink[] = [
    { href: "/projects", name: "Projects" },
    { href: "/posts", name: "Posts" },
    { href: "/utilities", name: "Utilities" },
    { href: "/photos", name: "Photos" },
];

export const extraPages: CommonLink[] = [
    { href: "/ai", name: "LLM Policy" },
    { href: "/sitemap", name: "Sitemap" },
    { href: "/colophon", name: "Colophon" },
    { href: "/license", name: "License" },
    { href: "/privacy", name: "Privacy Policy" },
];

export enum EventNames {
    /**
     * The outbound link event
     *
     * There are three properties associated with it:
     * - `url` (required)
     * - `location`: the relative location of the link
     * - `group`: the group name
     */
    Outbound = "outbound-link",

    /**
     * The local link event
     *
     * There are three properties associated with it:
     * - `url` (required)
     * - `location`: the relative location of the link
     * - `group`: the group name
     */
    Local = "local-link",

    /**
     * The social link event
     *
     * There are two properties:
     * - `platform` (required)
     * - `location` (required): the relative location of the link
     */
    Social = "social-link",
}

type SitemapItem = {
    href: string;
    name: string;
    description: string;
};

export const sitemap: SitemapItem[] = [
    {
        href: "/bill-analysis",
        name: "Bill Analysis",
        description: "Analyses of legislative bills I have compiled",
    },
    {
        href: "/colophon",
        name: "Colophon",
        description: "How this site is made",
    },
    {
        href: "/defaults",
        name: "Defaults",
        description: "A list of apps I use",
    },
    { href: "/feeds", name: "Feeds", description: "My web feeds" },
    { href: "/", name: "Homepage", description: "Press start to begin" },
    {
        href: "/license",
        name: "License",
        description: "The license for this site",
    },
    {
        href: "/ai",
        name: "LLM Policy",
        description: "Policy on the use of large language models (LLMs)",
    },
    { href: "/uses", name: "My Setup", description: "My current setup" },
    {
        href: "/photos",
        name: "Photos",
        description: "A collection of photos I have shared",
    },
    { href: "/posts", name: "Posts", description: "All my posts" },
    {
        href: "/privacy",
        name: "Privacy Policy",
        description: "My privacy policy",
    },
    {
        href: "/projects",
        name: "Projects",
        description: "A subset of my projects",
    },
    { href: "/sitemap", name: "Sitemap", description: "You are here!" },
    {
        href: "/slashes",
        name: "Slash Pages",
        description: "The slash pages I have",
    },
    { href: "/style", name: "Style Guide", description: "My style guide" },
    {
        href: "/tags",
        name: "Tags",
        description: "A list of tags assigned to posts",
    },
    { href: "/tip", name: "Tip", description: "Ways to tip me" },
    {
        href: "/utilities",
        name: "Utilities",
        description: "Various utilities I have made",
    },
    {
        href: "/verify",
        name: "Verify",
        description: "Verify my public identities",
    },
];
