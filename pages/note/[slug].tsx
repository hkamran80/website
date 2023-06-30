import Head from "next/head";

import Layout from "@/components/Layout";
import WritingHeader from "@/components/writings/WritingHeader";
import { BASE_WRITINGS_URL, WRITINGS_URL } from "@/data/constants";
import { renderMarkdown } from "@/lib/markdown";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { Writing } from "@/types/writings";

type Props = {
    note: Writing;
    content: string;
};

const Note: NextPage<Props> = ({ note, content }) => (
    <Layout>
        <Head>
            <title>{note.title} | H. Kamran</title>
        </Head>

        <WritingHeader
            id={note.id}
            title={note.title}
            description={note.description}
            publishDate={note.published}
            tags={note.tags}
            type="note"
        />

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

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch(WRITINGS_URL);
    const writings = await res.json();

    const paths = (writings.notes as Writing[]).map((note) => ({
        params: { slug: note.id },
    }));

    return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const res = await fetch(WRITINGS_URL);
    const writings = await res.json();

    const note = (writings.notes as Writing[]).find(
        (note) => note.id === params?.slug
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
