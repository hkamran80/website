import Breadcrumbs from "../../components/Breadcrumbs";
import Head from "next/head";
import Layout from "../../components/Layout";
import MarkdownIt from "markdown-it";
import markdownItPrism from "markdown-it-prism";
import WritingTags from "../../components/WritingTags";
import { BASE_WRITINGS_URL, WRITINGS_URL } from "../../data/constants";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { Article } from "../../types/writings";

type Props = {
    article: Article;
    content: string;
};

const Article: NextPage<Props> = ({ article, content }) => {
    return (
        <Layout>
            {article && (
                <>
                    <Head>
                        <title>{article.title} | H. Kamran</title>

                        <meta
                            name="description"
                            content={article.description}
                            key="description"
                        />

                        {/* Open Graph */}
                        <meta
                            property="og:type"
                            content="article"
                            key="og:type"
                        />
                        <meta
                            property="og:title"
                            content={article.title}
                            key="og:title"
                        />
                        <meta
                            property="og:url"
                            content={`${
                                typeof window !== "undefined" &&
                                window.location.origin
                                    ? window.location.origin
                                    : ""
                            }/article/${article.id}`}
                            key="og:url"
                        />
                        <meta
                            property="og:image"
                            content={article.heroImage}
                            key="og:image"
                        />
                        <meta
                            property="og:image:alt"
                            content={`Featured image for ${article.title}`}
                            key="og:image:alt"
                        />
                        <meta
                            property="og:description"
                            content={article.description}
                            key="og:description"
                        />
                        <meta
                            property="article:author"
                            content="H. Kamran"
                            key="article:author"
                        />
                        <meta
                            property="article:published_time"
                            content={`${article.published}T07:00:00.000-08:00`}
                            key="article:published_time"
                        />

                        {article.tags.map((tag, index) => (
                            <meta
                                key={index}
                                property="article:tag"
                                content={tag}
                            />
                        ))}

                        {/* Twitter */}
                        <meta
                            name="twitter:card"
                            content="summary_large_image"
                            key="twitter:card"
                        />
                        <meta
                            name="twitter:title"
                            content={article.title}
                            key="twitter:title"
                        />
                        <meta
                            name="twitter:site"
                            content="@hkamran80"
                            key="twitter:site"
                        />
                        <meta
                            name="twitter:creator"
                            content="@hkamran80"
                            key="twitter:creator"
                        />
                        <meta
                            name="twitter:description"
                            content={article.description}
                            key="twitter:description"
                        />
                        <meta
                            name="twitter:image"
                            content={article.heroImage}
                            key="twitter:image"
                        />
                        <meta
                            name="twitter:image:alt"
                            content={`Featured image for ${article.title}`}
                            key="twitter:image:alt"
                        />
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
                            {article.published !== "" ? (
                                <time dateTime={article.published}>
                                    {new Date(
                                        `${article.published}T12:00:00-07:00`,
                                    ).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </time>
                            ) : (
                                "Unpublished"
                            )}

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
                            loading="eager"
                        />
                        
                        <article
                            className="max-w-none prose prose-invert prose-a:text-pink-400 prose-pre:bg-hk-grey prose-blockquote:mx-6"
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

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch(WRITINGS_URL);
    const writings = await res.json();

    const paths = (writings.articles as Article[]).map((article) => ({
        params: { slug: article.id },
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const res = await fetch(WRITINGS_URL);
    const writings = await res.json();

    const article = (writings.articles as Article[]).find(
        (article) => article.id === params?.slug,
    );

    if (article) {
        const markdown = await (
            await fetch(`${BASE_WRITINGS_URL}/articles/${article.filename}.md`)
        ).text();

        const content = new MarkdownIt({})
            .use(markdownItPrism)
            .render(markdown)
            .replace(
                /<a([^>]+)>(.+?)<\/a>/gim,
                `<a$1 target="_blank" rel="noopener noreferrer" title="$2" aria-label="$2">$2</a>`,
            )
            .replace(/<img([^>]+)>/gim, `<img$1 class="rounded-lg" />`);

        return { props: { article, content } };
    } else {
        return {
            redirect: {
                destination: "/articles",
                permanent: false,
            },
        };
    }
};

export default Article;
