import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Layout from "../../components/Layout";
import NoteCard from "../../components/NoteCard";
import { cleanString } from "../../util/string";
import { StateContext } from "../_app";

const NoteTag: NextPage = () => {
    const router = useRouter();
    const { slug } = router.query;

    const state = useContext(StateContext);

    useEffect(() => {
        if (
            slug !== undefined &&
            Object.keys(state.noteTags).length > 0 &&
            Object.keys(state.noteTags)
                .map((tag) => cleanString(tag))
                .indexOf(cleanString(slug as string)) === -1
        ) {
            router.push("/notes");
        }
    }, [slug, state.noteTags, router]);

    const [tag, entries] =
        Object.entries(state.noteTags).find(
            ([tag]) => cleanString(tag) === cleanString(slug as string),
        ) || [];

    return (
        <Layout>
            {tag && entries && (
                <>
                    <Head>
                        <title>{tag} | H. Kamran</title>
                    </Head>

                    <Breadcrumbs
                        baseLabel="Notes"
                        basePath="/notes"
                        currentLabel={tag}
                    />

                    <div className="space-y-2">
                        <h1 className="text-4xl font-semibold text-center mx-auto md:text-left">
                            {tag}
                        </h1>
                    </div>

                    <div className="flex flex-col">
                        {state.notes
                            .filter(({ id }) => entries.indexOf(id) !== -1)
                            .map((article, index) => (
                                <Link
                                    key={index}
                                    href={`/note/${article.id}`}
                                    passHref
                                >
                                    <a>
                                        <NoteCard note={article} />
                                    </a>
                                </Link>
                            ))}
                    </div>
                </>
            )}
        </Layout>
    );
};

export default NoteTag;
