import {
    siGithub,
    siTwitter,
    siStackoverflow,
    siMedium,
    siUnsplash,
    siMastodon,
} from "simple-icons/icons";
import { UNSPLASH_URL } from "./constants";
import { SimpleIcon } from "simple-icons";

type Social = {
    url: string;
    icon: SimpleIcon;
    color: string | null;
    rels?: string[];
};
export const socialIcons: Social[] = [
    {
        url: "https://github.com/hkamran80",
        icon: siGithub,
        color: null,
        rels: ["authn"],
    },
    { url: "https://twitter.com/hkamran80", icon: siTwitter, color: "#1DA1F2" },
    { url: "https://vmst.io/@hkamran", icon: siMastodon, color: null },
    {
        url: "https://stackoverflow.com/users/7313822/h-kamran",
        icon: siStackoverflow,
        color: "#F58025",
    },
    { url: "https://hkamran.medium.com", icon: siMedium, color: null },
    { url: UNSPLASH_URL, icon: siUnsplash, color: null },
];

export const links = [
    { href: "/showcase", name: "Showcase", aliases: [] },
    { href: "/articles", name: "Articles", aliases: ["/article", "/tag"] },
    { href: "/notes", name: "Notes", aliases: ["/note", "/tag"] },
    { href: "/programs", name: "Programs", aliases: ["/program"] },
    { href: "https://unsplash.com/@hkamran", name: "Photos", aliases: [] },
];
