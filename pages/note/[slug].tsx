import MarkdownIt from "markdown-it";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Layout from "../../components/Layout";
import WritingTags from "../../components/WritingTags";
import { BASE_WRITINGS_URL } from "../../data/constants";
import type{ Writing } from "../../types/writings";
import { StateContext } from "../_app";

const Note: NextPage = () => {
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
                            className="max-w-none prose prose-invert prose-a:text-pink-400"
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

export default Note;
