import Breadcrumbs from '@/components/Breadcrumbs';
import Head from 'next/head';
import Layout from '@/components/Layout';
import MarkdownIt from 'markdown-it';
import markdownItPrism from 'markdown-it-prism';
import WritingTags from '@/components/WritingTags';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import { BASE_WRITINGS_URL, WRITINGS_URL } from '../../data/constants';
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { Article } from "@/types/writings";

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
                    </Head>

                    <NextSeo
                        title={article.title}
                        description={article.description}
                        canonical={`${
                            typeof window !== "undefined" &&
                            window.location.origin
                                ? window.location.origin
                                : ""
                        }/article/${article.id}`}
                        openGraph={{
                            title: article.title,
                            description: article.description,
                            url: `${
                                typeof window !== "undefined" &&
                                window.location.origin
                                    ? window.location.origin
                                    : ""
                            }/article/${article.id}`,
                            type: "article",
                            article: {
                                publishedTime: `${article.published}T07:00:00.000-08:00`,
                                tags: article.tags,
                            },
                            images: [
                                {
                                    url: article.heroImage,
                                    width: 1000,
                                    height: 500,
                                    alt: `Featured image for ${article.title}`,
                                },
                            ],
                        }}
                        twitter={{
                            cardType: "summary_large_image",
                        }}
                    />

                    <ArticleJsonLd
                        url={`${
                            typeof window !== "undefined" &&
                            window.location.origin
                                ? window.location.origin
                                : ""
                        }/article/${article.id}`}
                        title={article.title}
                        description={article.description}
                        images={[article.heroImage]}
                        datePublished={`${article.published}T07:00:00.000-08:00`}
                        authorName={[
                            { name: "H. Kamran", url: "https://hkamran.com" },
                        ]}
                        publisherName="H. Kamran"
                        publisherLogo="https://hkamran.com/profile.png"
                        isAccessibleForFree={true}
                    />

                    <Breadcrumbs
                        baseLabel="Articles"
                        basePath="/articles"
                        currentLabel={article.title}
                    />

                    <div className="space-y-2">
                        <h1 className="mx-auto text-center text-4xl font-semibold md:text-left">
                            {article.title}
                        </h1>
                        <h2 className="text-center text-xl font-light leading-snug text-gray-300 sm:text-left sm:text-2xl">
                            {article.description}
                        </h2>
                        <h3 className="text-center font-light leading-snug text-gray-400 sm:text-left sm:text-xl">
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

                    <div className="mx-auto mt-6 max-w-5xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={article.heroImage}
                            className="mb-7 rounded-lg"
                            alt={`Featured image for ${article.title}`}
                            loading="eager"
                        />

                        <article
                            className="prose prose-invert mx-auto max-w-3xl prose-a:text-pink-400 prose-blockquote:mx-6 prose-pre:bg-hk-grey"
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
