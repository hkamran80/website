// import type { NextPage } from "next";
// import Head from "next/head";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import { ChevronRight, Home } from "react-feather";
// import Layout from "../../components/Layout";
// import NoteCard from "../../components/NoteCard";
// import { tags } from "../../data/notes";
// import type { CosmicNoteTag } from "../../types/blog";

// const NotesTag: NextPage = () => {
//     const router = useRouter();
//     const { slug } = router.query;

//     useEffect(() => {
//         if (
//             slug !== undefined &&
//             tags.map(({ slug }) => slug).indexOf(slug as string) === -1
//         ) {
//             router.push("/notes");
//         }
//     });

//     const tag = tags.find(
//         ({ slug: tagSlug }) => slug === tagSlug,
//     ) as CosmicNoteTag;

//     return (
//         <Layout>
//             {tag && (
//                 <>
//                     <Head>
//                         <title>{tag.title} | H. Kamran</title>
//                     </Head>

//                     <nav className="flex mb-6" aria-label="Breadcrumb">
//                         <ol className="flex items-center space-x-4">
//                             <li>
//                                 <Link href="/" passHref>
//                                     <span className="text-gray-500 hover:text-gray-400 hover:cursor-pointer">
//                                         <span className="sr-only">Home</span>
//                                         <Home />
//                                     </span>
//                                 </Link>
//                             </li>
//                             <li>
//                                 <div className="flex items-center">
//                                     <ChevronRight />

//                                     <Link href="/notes" passHref>
//                                         <span className="ml-4 text-sm font-medium text-gray-400 hover:text-gray-300 hover:cursor-pointer">
//                                             Notes
//                                         </span>
//                                     </Link>
//                                 </div>
//                             </li>
//                             <li>
//                                 <div className="flex items-center">
//                                     <ChevronRight />

//                                     <span className="ml-4 text-sm font-medium text-gray-400 hover:text-gray-300 hover:cursor-pointer">
//                                         {tag.title}
//                                     </span>
//                                 </div>
//                             </li>
//                         </ol>
//                     </nav>

//                     <div className="space-y-2">
//                         <h1 className="text-4xl font-semibold text-center mx-auto md:text-left">
//                             {tag.title}
//                         </h1>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {tag.metadata.notes.map((note, index) => (
//                             <Link
//                                 key={index}
//                                 href={`/note/${note.slug}`}
//                                 passHref
//                             >
//                                 <a>
//                                     <NoteCard note={note} />
//                                 </a>
//                             </Link>
//                         ))}
//                     </div>
//                 </>
//             )}
//         </Layout>
//     );
// };

// export default NotesTag;

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
