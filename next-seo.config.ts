import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
    themeColor: "#BE154D",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://hkamran.com/",
        siteName: "H. Kamran",
    },
    twitter: {
        handle: "@hkamran80",
        site: "https://hkamran.com",
        cardType: "summary",
    },
};

export default config;
