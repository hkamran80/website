import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
    defaultTitle: "H. Kamran",
    description:
        "Hello world! I'm a developer who writes articles on things that interest me or I find useful, and takes photos!",
    themeColor: "#BE154D",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://hkamran.com",
        siteName: "H. Kamran",
        profile: { firstName: "H.", lastName: "Kamran" },
        images: [
            {
                url: "https://hkamran.com/profile.png",
                width: 1500,
                height: 1500,
                alt: "The profile picture for H. Kamran",
            },
        ],
    },
    twitter: {
        handle: "@hkamran80",
        site: "https://hkamran.com",
        cardType: "summary",
    },
};

export default config;
