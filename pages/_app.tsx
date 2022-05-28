import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useEffect, useState } from "react";
import { SHOWCASE_URL } from "../data/constants";
import { SiteState } from "../types/state";
import React from "react";
import Script from "next/script";
import { Router } from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import { loadWritings } from "../lib/writings";

export const StateContext = createContext<SiteState>({
    articles: [],
    notes: [],
    articleTags: {},
    noteTags: {},
    showcase: [],
});

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
    const [state, setState] = useState<SiteState>({
        articles: [],
        notes: [],
        articleTags: {},
        noteTags: {},
        showcase: [],
    });

    useEffect(() => {
        const loadState = async () => {
            const writings = await loadWritings();
            const showcase = await (await fetch(SHOWCASE_URL)).json();

            setState({
                ...writings,
                showcase,
            });
        };

        loadState();
    }, []);

    return (
        <>
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

            <StateContext.Provider value={state}>
                <Component {...pageProps} />
            </StateContext.Provider>
        </>
    );
};

export default Website;
