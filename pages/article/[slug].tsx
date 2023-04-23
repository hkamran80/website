import Breadcrumbs from "@/components/Breadcrumbs";
import Giscus from "@giscus/react";
import Head from "next/head";
import Layout from "@/components/Layout";
import WritingTags from "@/components/WritingTags";
import { ArticleJsonLd, NextSeo } from "next-seo";
import { BASE_WRITINGS_URL, WRITINGS_URL } from "../../data/constants";
import { FileEdit } from "lucide-react";
import { renderMarkdown } from "@/lib/markdown";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { Writing } from "@/types/writings";

type Props = {
    article: Writing;
    content: string;
};

const Writing: NextPage<Props> = ({ article, content }) => {
    const articleImage =
        article.published !== ""
            ? `https://assets.hkamran.com/graphics/article/${article.id}`
            : "https://assets.hkamran.com/graphics/article/unpublished";

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
                                    url: articleImage,
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
                        images={[articleImage]}
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

                            <WritingTags basePath="tag" tags={article.tags} />
                        </h3>
                    </div>

                    <div className="mx-auto mt-6 max-w-5xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={articleImage}
                            className="rounded-lg"
                            alt={`Featured image for ${article.title}`}
                            loading="eager"
                        />

                        <article
                            className="prose prose-invert my-7 mx-auto max-w-3xl prose-a:text-pink-700 prose-blockquote:mx-6 prose-pre:bg-hk-grey"
                            dangerouslySetInnerHTML={{
                                __html: content,
                            }}
                        />

                        {article.published !== "" ? (
                            <Giscus
                                id="comments"
                                repo="hkamran80/articles"
                                repoId="MDEwOlJlcG9zaXRvcnkyNjY1MDgxMjU="
                                category="Comments"
                                categoryId="DIC_kwDOD-KXXc4CTfE-"
                                mapping="pathname"
                                strict="0"
                                reactionsEnabled="1"
                                emitMetadata="0"
                                inputPosition="top"
                                theme="dark"
                                lang="en"
                                loading="lazy"
                            />
                        ) : (
                            <div className="flex justify-center text-sm uppercase tracking-wide text-gray-300">
                                <a
                                    href={`https://github.com/hkamran80/articles/blob/main/markdown/articles/${article.filename}.md`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-colors duration-300 hover:text-pink-700"
                                >
                                    <FileEdit />
                                </a>
                            </div>
                        )}
                    </div>
                </>
            )}
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch(WRITINGS_URL);
    const writings = await res.json();

    const paths = (writings.articles as Writing[]).map((article) => ({
        params: { slug: article.id },
    }));

    return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const res = await fetch(WRITINGS_URL);
    const writings = await res.json();

    const article = (writings.articles as Writing[]).find(
        (article) => article.id === params?.slug,
    );

    if (article) {
        const markdown = await (
            await fetch(
                `${
                    article.published === "" && article.branchName
                        ? BASE_WRITINGS_URL.replace(
                              "/main/",
                              `/${article.branchName}/`,
                          )
                        : BASE_WRITINGS_URL
                }/articles/${article.filename}.md`,
            )
        ).text();

        return {
            props: {
                article,
                content: renderMarkdown(markdown, true, true, true),
            },
        };
    } else {
        return {
            redirect: {
                destination: "/articles",
                permanent: false,
            },
        };
    }
};

export default Writing;
