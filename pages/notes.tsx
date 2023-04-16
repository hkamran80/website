import feather from "feather-icons";
import Head from "next/head";
import Layout from "@/components/Layout";
import NavLink from "@/components/NavLink";
import NoteCard from "@/components/NoteCard";
import { sortByPublishDate } from "@/lib/writings";
import { WebPageJsonLd } from "next-seo";
import { Writing } from "@/types/writings";
import { WRITINGS_URL } from "../data/constants";
import type { GetStaticProps, NextPage } from "next";
import { getBaseUrl } from "@/lib/urls";

type Props = { notes: Writing[] };

const Notes: NextPage<Props> = ({ notes }) => {
    return (
        <Layout>
            <Head>
                <title>Notes | H. Kamran</title>
            </Head>

            <WebPageJsonLd
                id={`${getBaseUrl()}/notes`}
            />

            <h1 className="flex items-center text-3xl font-semibold">
                <span className="flex-1">Notes</span>
                <a
                    href="/feed/atom"
                    target="_blank"
                    rel="nofollow noreferrer"
                    title="Atom feed"
                    className="text-gray-400"
                    dangerouslySetInnerHTML={{
                        __html: feather.icons.rss.toSvg(),
                    }}
                />
            </h1>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                {notes.map((note, index) => (
                    <NavLink key={index} href={`/note/${note.id}`}>
                        <NoteCard note={note} />
                    </NavLink>
                ))}
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch(WRITINGS_URL);
    const writings = await res.json();
    const notes = (writings.notes as Writing[]).sort(sortByPublishDate);

    return { props: { notes } };
};

export default Notes;
