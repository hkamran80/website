import {
    siGithub,
    siTwitter,
    siStackoverflow,
    siMedium,
    siUnsplash,
} from "simple-icons/icons";

export const socialIcons = [
    { url: "https://github.com/hkamran80", icon: siGithub, color: null },
    { url: "https://twitter.com/hkamran80", icon: siTwitter, color: "#1DA1F2" },
    {
        url: "https://stackoverflow.com/users/7313822/h-kamran",
        icon: siStackoverflow,
        color: "#F58025",
    },
    { url: "https://hkamran.medium.com", icon: siMedium, color: null },
    { url: "https://unsplash.com/@hkamran", icon: siUnsplash, color: null },
];

export const links = [
    { href: "/showcase", name: "Showcase", aliases: [] },
    { href: "/articles", name: "Articles", aliases: ["/article","/tag"] },
    { href: "/notes", name: "Notes", aliases: ["/note","/tag"] },
    { href: "/programs", name: "Programs", aliases: ["/program"] },
];
