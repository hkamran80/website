import feather from "feather-icons";
import Head from "next/head";
import Layout from "../components/Layout";
import Link from "next/link";
import NoteCard from "../components/NoteCard";
import { StateContext } from "./_app";
import type { NextPage } from "next";

const Notes: NextPage = () => {
    return (
        <StateContext.Consumer>
            {(state) => (
                <Layout>
                    <Head>
                        <title>Notes | H. Kamran</title>
                    </Head>

                    <h1 className="text-3xl font-semibold flex items-center">
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
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {state.notes.map((note, index) => (
                            <Link
                                key={index}
                                href={`/note/${note.id}`}
                                passHref
                            >
                                <a>
                                    <NoteCard note={note} />
                                </a>
                            </Link>
                        ))}
                    </div>
                </Layout>
            )}
        </StateContext.Consumer>
    );
};

export default Notes;
