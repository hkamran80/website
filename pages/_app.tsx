import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useEffect, useState } from "react";
import { SHOWCASE_URL, WRITINGS_URL } from "../data/constants";
import type { Writing, Article } from "../types/writings";
import { SiteState } from "../types/state";

export const StateContext = createContext<SiteState>({
    articles: [],
    notes: [],
    articleTags: {},
    noteTags: {},
    showcase: [],
});

function Website({ Component, pageProps }: AppProps) {
    const [state, setState] = useState<SiteState>({
        articles: [],
        notes: [],
        articleTags: {},
        noteTags: {},
        showcase: [],
    });

    useEffect(() => {
        const loadState = async () => {
            const newState = await (await fetch(WRITINGS_URL)).json();
            const showcase = await (await fetch(SHOWCASE_URL)).json();

            setState({
                articles: (newState.articles as Article[]).sort(
                    ({ published: publishedA }, { published: publishedB }) => {
                        if (publishedA < publishedB) {
                            return 1;
                        } else if (publishedA > publishedB) {
                            return -1;
                        }
                        return 0;
                    },
                ),
                notes: (newState.notes as Writing[]).sort(
                    ({ published: publishedA }, { published: publishedB }) => {
                        if (publishedA < publishedB) {
                            return 1;
                        } else if (publishedA > publishedB) {
                            return -1;
                        }
                        return 0;
                    },
                ),
                articleTags: Object.fromEntries(
                    Array.from(
                        new Set(
                            (newState.articles as Article[]).flatMap(
                                (article: Article) => article.tags,
                            ),
                        ),
                    ).map((tag) => [
                        tag,
                        (newState.articles as Article[])
                            .filter(({ tags }) => tags.indexOf(tag) !== -1)
                            .map(({ id }) => id),
                    ]),
                ),
                noteTags: Object.fromEntries(
                    Array.from(
                        new Set(
                            (newState.notes as Writing[]).flatMap(
                                (note: Writing) => note.tags,
                            ),
                        ),
                    ).map((tag) => [
                        tag,
                        (newState.notes as Writing[])
                            .filter(({ tags }) => tags.indexOf(tag) !== -1)
                            .map(({ id }) => id),
                    ]),
                ),
                showcase,
            });
        };

        loadState();
    }, []);

    return (
        <StateContext.Provider value={state}>
            <Component {...pageProps} />
        </StateContext.Provider>
    );
}

export default Website;
