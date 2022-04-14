import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Layout from "../../components/Layout";
import { StateContext } from "../_app";
import MarkdownIt from "markdown-it";
import { BASE_WRITINGS_URL } from "../../data/constants";
import WritingTags from "../../components/WritingTags";
import type { Article as ArticleType } from "../../types/writings";

const Article: NextPage = () => {
    const router = useRouter();
    const { slug } = router.query;

    const state = useContext(StateContext);
    const [content, setContent] = useState<string>("");

    const md = useMemo(() => new MarkdownIt({}), []);

    useEffect(() => {
        if (
            slug !== undefined &&
            state.articles.length > 0 &&
            state.articles.map(({ id }) => id).indexOf(slug as string) === -1
        ) {
            router.push("/articles");
        }
    });

    const article = state.articles.find(
        ({ id: articleId }) => slug === articleId,
    ) as ArticleType;

    useEffect(() => {
        const loadContent = async () => {
            if (article) {
                const url = `${BASE_WRITINGS_URL}/articles/${article.filename}.md`;
                const markdown = await (await fetch(url)).text();

                setContent(
                    md
                        .render(markdown)
                        .replace(
                            /<a([^>]+)>(.+?)<\/a>/gi,
                            `<a$1 target="_blank" rel="noopener noreferrer" title="$2" aria-label="$2">$2</a>`,
                        ),
                );
            }
        };

        loadContent();
    }, [article, md]);

    return (
        <Layout>
            {article && (
                <>
                    <Head>
                        <title>{article.title} | H. Kamran</title>
                    </Head>

                    <Breadcrumbs
                        baseLabel="Articles"
                        basePath="/articles"
                        currentLabel={article.title}
                    />

                    <div className="space-y-2">
                        <h1 className="text-4xl font-semibold text-center mx-auto md:text-left">
                            {article.title}
                        </h1>
                        <h2 className="font-light text-xl sm:text-2xl text-center sm:text-left leading-snug text-gray-300">
                            {article.description}
                        </h2>
                        <h3 className="font-light sm:text-xl text-center sm:text-left leading-snug text-gray-400">
                            <time dateTime={article.published}>
                                {new Date(
                                    `${article.published}T12:00:00-07:00`,
                                ).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>

                            <span className="ml-1 mr-2">•</span>

                            <WritingTags
                                basePath="articles"
                                tags={article.tags}
                            />
                        </h3>
                    </div>

                    <div className="mt-6 max-w-5xl mx-auto">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={article.heroImage}
                            className="rounded-lg mb-7"
                            alt={`Featured image for ${article.title}`}
                        />
                        <article
                            className="max-w-none prose prose-invert prose-a:text-pink-400"
                            dangerouslySetInnerHTML={{
                                __html: content,
                            }}
                        />
                    </div>
                </>
            )}
        </Layout>
    );
};

export default Article;
