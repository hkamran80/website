import { SimpleIcon } from "simple-icons";
import {
    siGithub,
    siMastodon,
    siMedium,
    siStackoverflow,
    siTwitter,
    siUnsplash,
} from "simple-icons/icons";

import { UNSPLASH_URL } from "./constants";

type Social = {
    url: string;
    icon: SimpleIcon;
    color: string | null;
};
export const socialIcons: Social[] = [
    {
        url: "https://github.com/hkamran80",
        icon: siGithub,
        color: null,
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
