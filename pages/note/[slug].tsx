import MarkdownIt from "markdown-it";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Layout from "../../components/Layout";
import WritingTags from "../../components/WritingTags";
import { BASE_WRITINGS_URL } from "../../data/constants";
import type { Writing } from "../../types/writings";
import { StateContext } from "../_app";

const Article: NextPage = () => {
    const router = useRouter();
    const { slug } = router.query;

    const state = useContext(StateContext);
    const [content, setContent] = useState<string>("");

    const md = useMemo(() => new MarkdownIt({}), []);

    useEffect(() => {
        if (
            slug !== undefined &&
            state.notes.length > 0 &&
            state.notes.map(({ id }) => id).indexOf(slug as string) === -1
        ) {
            router.push("/notes");
        }
    });

    const note = state.notes.find(
        ({ id: noteId }) => slug === noteId,
    ) as Writing;

    useEffect(() => {
        const loadContent = async () => {
            if (note) {
                const url = `${BASE_WRITINGS_URL}/notes/${note.filename}.md`;
                const markdown = await (await fetch(url)).text();

                setContent(
                    md
                        .render(markdown)
                        .replace(
                            /<a([^>]+)>(.+?)<\/a>/gi,
                            `<a$1 target="_blank" rel="noopener noreferrer" title="$2" aria-label="$2">$2</a>`,
                        ),
                );
            }
        };

        loadContent();
    }, [note, md]);

    return (
        <Layout>
            {note && (
                <>
                    <Head>
                        <title>{note.title} | H. Kamran</title>

                        <meta
                            name="description"
                            content={note.description}
                            key="description"
                        />

                        {/* Open Graph */}
                        <meta property="og:type" content="note" key="og:type" />
                        <meta
                            property="og:title"
                            content={note.title}
                            key="og:title"
                        />
                        <meta
                            property="og:url"
                            content={`${
                                typeof window !== "undefined" &&
                                window.location.origin
                                    ? window.location.origin
                                    : ""
                            }/note/${note.id}`}
                            key="og:url"
                        />
                        <meta
                            property="og:description"
                            content={note.description}
                            key="og:description"
                        />
                        <meta
                            property="article:author"
                            content="H. Kamran"
                            key="article:author"
                        />
                        <meta
                            property="article:published_time"
                            content={`${note.published}T07:00:00.000-08:00`}
                            key="article:published_time"
                        />

                        {note.tags.map((tag, index) => (
                            <meta
                                key={index}
                                property="article:tag"
                                content={tag}
                            />
                        ))}

                        {/* Twitter */}
                        <meta
                            name="twitter:card"
                            content="summary_large_image"
                            key="twitter:card"
                        />
                        <meta
                            name="twitter:title"
                            content={note.title}
                            key="twitter:title"
                        />
                        <meta
                            name="twitter:site"
                            content="@hkamran80"
                            key="twitter:site"
                        />
                        <meta
                            name="twitter:creator"
                            content="@hkamran80"
                            key="twitter:creator"
                        />
                        <meta
                            name="twitter:description"
                            content={note.description}
                            key="twitter:description"
                        />
                    </Head>

                    <Breadcrumbs
                        baseLabel="Notes"
                        basePath="/notes"
                        currentLabel={note.title}
                    />

                    <div className="space-y-2">
                        <h1 className="text-4xl font-semibold text-center mx-auto md:text-left">
                            {note.title}
                        </h1>
                        <h2 className="font-light text-xl sm:text-2xl text-center sm:text-left leading-snug text-gray-300">
                            {note.description}
                        </h2>
                        <h3 className="font-light sm:text-xl text-center sm:text-left leading-snug text-gray-400">
                            <time dateTime={note.published}>
                                {new Date(
                                    `${note.published}T12:00:00-07:00`,
                                ).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>

                            {note.tags && (
                                <>
                                    <span className="ml-1 mr-2">•</span>
                                    <WritingTags
                                        basePath="notes"
                                        tags={note.tags}
                                    />
                                </>
                            )}
                        </h3>
                    </div>

                    <div className="mt-6 max-w-5xl mx-auto">
                        <article
                            className="max-w-none prose prose-invert prose-a:text-pink-400 prose-pre:bg-hk-grey"
                            dangerouslySetInnerHTML={{
                                __html: content,
                            }}
                        />
                    </div>
                </>
            )}
        </Layout>
    );
};

export default Article;
