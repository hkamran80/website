import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useEffect, useState } from "react";
import { WRITINGS_URL } from "../data/constants";
import type { SiteState, Writing, Article } from "../types/writings";

export const StateContext = createContext<SiteState>({
    articles: [],
    notes: [],
    articleTags: [],
    noteTags: [],
});

function Website({ Component, pageProps }: AppProps) {
    const [state, setState] = useState<SiteState>({
        articles: [],
        notes: [],
        articleTags: [],
        noteTags: [],
    });

    useEffect(() => {
        const loadState = async () => {
            const newState = await (await fetch(WRITINGS_URL)).json();

            setState({
                ...newState,
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
