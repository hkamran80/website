import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
    defaultTitle: "H. Kamran",
    description:
        "I'm a developer, experienced in Python, JavaScript, TypeScript, Vue.js, Java, Kotlin, Swift, and SwiftUI. I also enjoy taking photos and writing articles on topics that interest me or seem useful.",
    themeColor: "#BE154D",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://hkamran.com/",
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
