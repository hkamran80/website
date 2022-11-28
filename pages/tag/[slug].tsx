import ArticleCard from '@/components/ArticleCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import Head from 'next/head';
import Layout from '@/components/Layout';
import NavLink from '@/components/NavLink';
import NoteCard from '@/components/NoteCard';
import { arrayUnique, getTags, sortByPublishDate } from '@/lib/writings';
import { Article, Writing } from '@/types/writings';
import { WebPageJsonLd } from 'next-seo';
import { WRITINGS_URL } from '../../data/constants';
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

type Props = { tag: string; articles: Article[]; notes: Writing[] };

const Tag: NextPage<Props> = ({ tag, articles, notes }) => {
    return (
        <Layout>
            <Head>
                <title>{tag} | H. Kamran</title>
            </Head>

            <WebPageJsonLd
                id={
                    typeof window !== "undefined" &&
                    window.location.origin &&
                    window.location.pathname
                        ? window.location.origin + window.location.pathname
                        : ""
                }
            />

            <Breadcrumbs baseLabel="Tags" currentLabel={tag} />

            <div className="space-y-2">
                <h1 className="mx-auto text-center text-4xl font-semibold md:text-left">
                    {tag}
                </h1>
            </div>

            {articles.length > 0 ? (
                <>
                    <h2 className="mx-auto mt-4 text-center text-2xl font-semibold md:text-left">
                        Articles
                    </h2>

                    <div className="flex flex-col">
                        {articles
                            .filter(({ published }) => published !== "")
                            .map((article, index) => (
                                <NavLink
                                    key={index}
                                    href={`/article/${article.id}`}
                                >
                                    <ArticleCard article={article} />
                                </NavLink>
                            ))}
                    </div>
                </>
            ) : (
                ""
            )}

            {notes.length > 0 ? (
                <>
                    <h2 className="mx-auto mt-4 text-center text-2xl font-semibold md:text-left">
                        Notes
                    </h2>

                    <div className="flex flex-col">
                        {notes
                            .filter(({ published }) => published !== "")
                            .map((article, index) => (
                                <NavLink
                                    key={index}
                                    href={`/note/${article.id}`}
                                >
                                    <NoteCard note={article} />
                                </NavLink>
                            ))}
                    </div>
                </>
            ) : (
                ""
            )}
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch(WRITINGS_URL);
    const writings = await res.json();

    const articleTags = Object.keys(
        getTags(writings.articles as Article[], true),
    );
    const noteTags = Object.keys(getTags(writings.notes as Writing[], true));

    const paths = arrayUnique([...articleTags, ...noteTags]).map((tag) => ({
        params: { slug: tag },
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const res = await fetch(WRITINGS_URL);
    const writings = await res.json();

    const tag = params?.slug as string;

    const articleRawTags = getTags(writings.articles as Article[]);
    const noteRawTags = getTags(writings.notes as Writing[]);

    const articleTags = getTags(writings.articles as Article[], true);
    const noteTags = getTags(writings.notes as Writing[], true);

    const articles: Article[] =
        Object.keys(articleTags).indexOf(tag) !== -1
            ? articleTags[tag]
                  .map(
                      (slug) =>
                          (writings.articles as Article[]).find(
                              (article) => article.id === slug,
                          ) as Article,
                  )
                  .sort(sortByPublishDate)
            : [];

    const notes: Writing[] =
        Object.keys(noteTags).indexOf(tag) !== -1
            ? noteTags[tag]
                  .map(
                      (slug) =>
                          (writings.notes as Writing[]).find(
                              (note) => note.id === slug,
                          ) as Writing,
                  )
                  .sort(sortByPublishDate)
            : [];

    const rawTags = arrayUnique([
        ...Object.keys(articleRawTags),
        ...Object.keys(noteRawTags),
    ]);
    const slugTags = arrayUnique([
        ...Object.keys(articleTags),
        ...Object.keys(noteTags),
    ]);

    return { props: { tag: rawTags[slugTags.indexOf(tag)], articles, notes } };
};

export default Tag;
