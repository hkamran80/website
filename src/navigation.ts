export type CommonLink = {
    name: string;
    href: string;
    aliases?: string[];
};

export const links: CommonLink[] = [
    { href: "/projects", name: "Projects" },
    { href: "/articles", name: "Articles", aliases: ["/article", "/tag"] },
    { href: "/notes", name: "Notes", aliases: ["/note", "/tag"] },
    { href: "/programs", name: "Programs", aliases: ["/program"] },
    { href: "https://unsplash.com/@hkamran", name: "Photos" },
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
