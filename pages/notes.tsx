import Head from "next/head";
import Layout from "@/components/Layout";
import NavLink from "@/components/NavLink";
import NoteCard from "@/components/NoteCard";
import { getBaseUrl } from "@/lib/urls";
import { Rss } from "lucide-react";
import { sortByDate } from "@/lib/sort";
import { WebPageJsonLd } from "next-seo";
import { Writing } from "@/types/writings";
import { WRITINGS_URL } from "../data/constants";
import type { GetStaticProps, NextPage } from "next";

type Props = { notes: Writing[] };

const Notes: NextPage<Props> = ({ notes }) => {
    return (
        <Layout>
            <Head>
                <title>Notes | H. Kamran</title>
            </Head>

            <WebPageJsonLd id={`${getBaseUrl()}/notes`} />

            <h1 className="flex items-center text-3xl font-semibold">
                <span className="flex-1">Notes</span>
                <NavLink
                    href="/feed/atom"
                    target="_blank"
                    rel="nofollow noreferrer"
                    title="Atom feed"
                    className="text-gray-400"
                >
                    <Rss />
                </NavLink>
            </h1>
            <div className="h-feed hfeed mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <span className="p-name site-title hidden">
                    Notes | H. Kamran
                </span>
                {notes.map((note, index) => (
                    <div key={index} className="h-entry hentry">
                        <NavLink
                            href={`/note/${note.id}`}
                            className="u-url"
                            rel="bookmark"
                        >
                            <NoteCard note={note} />
                        </NavLink>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch(WRITINGS_URL);
    const writings = await res.json();
    const notes = (writings.notes as Writing[]).sort((a, b) =>
        sortByDate(new Date(a.published), new Date(b.published)),
    );

    return { props: { notes } };
};

export default Notes;
