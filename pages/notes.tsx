import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import NoteCard from "../components/NoteCard";
import { StateContext } from "./_app";

const Notes: NextPage = () => {
    return (
        <StateContext.Consumer>
            {(state) => (
                <Layout>
                    <Head>
                        <title>Notes | H. Kamran</title>
                    </Head>

                    <h1 className="text-3xl font-semibold">Notes</h1>
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
