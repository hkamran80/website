import ProgressBar from '@badrap/bar-of-progress';
import React from 'react';
import Script from 'next/script';
import SEO from 'next-seo.config';
import { DefaultSeo, SocialProfileJsonLd } from 'next-seo';
import { Router } from 'next/router';
import '../styles/globals.css';
import '../styles/prism-theme.css';
import type { AppProps } from "next/app";

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

const Website = ({ Component, pageProps }: AppProps) => {
    return (
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
                    src="https://umami.unisontech.org/umami.js"
                />
            )}

            <Component {...pageProps} />
        </>
    );
};

export default Website;
