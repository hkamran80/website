export type CommonLink = {
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
