import Breadcrumbs from "@/components/Breadcrumbs";
import Head from "next/head";
import Layout from "@/components/Layout";
import MarkdownIt from "markdown-it";
import markdownItPrism from "markdown-it-prism";
import WritingTags from "@/components/WritingTags";
import { ArticleJsonLd, NextSeo } from "next-seo";
import { BASE_WRITINGS_URL, WRITINGS_URL } from "../../data/constants";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { Writing } from "@/types/writings";
import { renderMarkdown } from "@/lib/markdown";
import { getBaseUrl } from "@/lib/urls";

type Props = {
    note: Writing;
    content: string;
};

const Note: NextPage<Props> = ({ note, content }) => {
    return (
        <Layout>
            <Head>
                <title>{note.title} | H. Kamran</title>
            </Head>

            <NextSeo
                title={note.title}
                description={note.description}
                canonical={`${getBaseUrl()}/note/${note.id}`}
                openGraph={{
                    title: note.title,
                    description: note.description,
                    url: `${
                        typeof window !== "undefined" && window.location.origin
                            ? window.location.origin
                            : ""
                    }/note/${note.id}`,
                    type: "article",
                    article: {
                        publishedTime: `${note.published}T07:00:00.000-08:00`,
                        tags: note.tags,
                    },
                }}
                twitter={{
                    cardType: "summary_large_image",
                }}
            />

            <ArticleJsonLd
                url={`${getBaseUrl()}/note/${note.id}`}
                title={note.title}
                description={note.description}
                images={[]}
                datePublished={`${note.published}T12:00:00-07:00`}
                authorName={[{ name: "H. Kamran", url: "https://hkamran.com" }]}
                publisherName="H. Kamran"
                publisherLogo="https://hkamran.com/profile.png"
                isAccessibleForFree={true}
            />

            <Breadcrumbs
                baseLabel="Notes"
                basePath="/notes"
                currentLabel={note.title}
            />

            <div className="space-y-2">
                <h1 className="mx-auto text-center text-4xl font-semibold md:text-left">
                    {note.title}
                </h1>
                <h2 className="text-center text-xl font-light leading-snug text-gray-300 sm:text-left sm:text-2xl">
                    {note.description}
                </h2>
                <h3 className="text-center font-light leading-snug text-gray-400 sm:text-left sm:text-xl">
                    {note.published !== "" ? (
                        <time dateTime={note.published}>
                            {new Date(
                                `${note.published}T12:00:00-07:00`,
                            ).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </time>
                    ) : (
                        "Unpublished"
                    )}

                    {note.tags && (
                        <>
                            <span className="ml-1 mr-2">•</span>
                            <WritingTags basePath="notes" tags={note.tags} />
                        </>
                    )}
                </h3>
            </div>

            <div className="mx-auto mt-6 max-w-3xl">
                <article
                    className="prose prose-invert max-w-none prose-a:text-pink-700 prose-pre:bg-hk-grey"
                    dangerouslySetInnerHTML={{
                        __html: content,
                    }}
                />
            </div>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch(WRITINGS_URL);
    const writings = await res.json();
    console.debug(writings);

    const paths = (writings.notes as Writing[]).map((note) => ({
        params: { slug: note.id },
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const res = await fetch(WRITINGS_URL);
    const writings = await res.json();

    const note = (writings.notes as Writing[]).find(
        (note) => note.id === params?.slug,
    );

    if (note) {
        const markdown = await (
            await fetch(`${BASE_WRITINGS_URL}/notes/${note.filename}.md`)
        ).text();

        return { props: { note, content: renderMarkdown(markdown, true) } };
    } else {
        return {
            redirect: {
                destination: "/articles",
                permanent: false,
            },
        };
    }
};

export default Note;
