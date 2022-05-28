import MarkdownIt from "markdown-it";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Breadcrumbs from "../../components/Breadcrumbs";
import Layout from "../../components/Layout";
import WritingTags from "../../components/WritingTags";
import { BASE_WRITINGS_URL, WRITINGS_URL } from "../../data/constants";
import type { Writing } from "../../types/writings";

type Props = {
    note: Writing;
    content: string;
};

const Note: NextPage<Props> = ({ note, content }) => {
    return (
        <Layout>
            <Head>
                <title>{note.title} | H. Kamran</title>

                <meta
                    name="description"
                    content={note.description}
                    key="description"
                />

                {/* Open Graph */}
                <meta property="og:type" content="note" key="og:type" />
                <meta property="og:title" content={note.title} key="og:title" />
                <meta
                    property="og:url"
                    content={`${
                        typeof window !== "undefined" && window.location.origin
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
                    <meta key={index} property="article:tag" content={tag} />
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
                            <WritingTags basePath="notes" tags={note.tags} />
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
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const note = (
        (await (await fetch(WRITINGS_URL)).json()).notes as Writing[]
    ).find((note) => note.id === query.slug);

    if (note) {
        const markdown = await (
            await fetch(`${BASE_WRITINGS_URL}/notes/${note.filename}.md`)
        ).text();

        const content = new MarkdownIt({})
            .render(markdown)
            .replace(
                /<a([^>]+)>(.+?)<\/a>/gim,
                `<a$1 target="_blank" rel="noopener noreferrer" title="$2" aria-label="$2">$2</a>`,
            );

        return { props: { note, content } };
    } else {
        return {
            redirect: {
                destination: "/notes",
                permanent: false,
            },
        };
    }
};

export default Note;
