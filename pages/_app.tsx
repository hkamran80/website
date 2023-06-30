import ProgressBar from "@badrap/bar-of-progress";
import { DefaultSeo, SocialProfileJsonLd } from "next-seo";
import { Router } from "next/router";
import Script from "next/script";
import React from "react";
import SEO from "next-seo.config";
import type { AppProps } from "next/app";

import "@/styles/globals.css";
import "@/styles/prism-theme.css";

const isServerSideRendered = () => typeof window === "undefined";

if (process.env.NODE_ENV !== "production" && !isServerSideRendered()) {
    // We import react-dom and @axe-core/react dynamically
    // so that we'll receive warning in our console about
    // inaccessible code.

    import("react-dom").then((ReactDOM) => {
        import("@axe-core/react").then((axe) => {
            axe.default(React, ReactDOM, 1000, {});
        });
    });
}

const progress = new ProgressBar({
    size: 2,
    color: "#F472B6",
    className: "bar-of-progress",
    delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

const Website = ({ Component, pageProps }: AppProps) => (
    <>
        <DefaultSeo {...SEO} />
        <SocialProfileJsonLd
            type="Person"
            name="H. Kamran"
            url="https://hkamran.com"
            sameAs={[
                "https://twitter.com/hkamran80",
                "https://instagram.com/hkamran80",
            ]}
        />

        {process.env.NODE_ENV === "development" ||
        typeof window === "undefined" ? (
            ""
        ) : (
            <Script
                async
                defer
                data-website-id="550f7666-3836-423b-8a19-f2e6746eeda5"
                src="https://umami.unisontech.org/script.js"
            />
        )}

        <Component {...pageProps} />
    </>
);

export default Website;
