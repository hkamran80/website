import Giscus from "@giscus/react";
import { FileEdit } from "lucide-react";
import Head from "next/head";

import Layout from "@/components/Layout";
import NavLink from "@/components/navigation/NavLink";
import WritingHeader from "@/components/writings/WritingHeader";
import { BASE_WRITINGS_URL, WRITINGS_URL } from "@/data/constants";
import { renderMarkdown } from "@/lib/markdown";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { Writing } from "@/types/writings";

type Props = {
    article: Writing;
    tableOfContents: string | null;
    content: string;
};

const Writing: NextPage<Props> = ({ article, tableOfContents, content }) => {
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

                    <WritingHeader
                        id={article.id}
                        title={article.title}
                        description={article.description}
                        publishDate={article.published}
                        updateDate={article.updated}
                        image={articleImage}
                        tags={article.tags}
                        type="article"
                    />

                    <div className="mx-auto mt-6 max-w-5xl">
                        {/* TODO: Convert to `next/image` */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {article.published !== "" && (
                            <img
                                src={articleImage}
                                className="rounded-lg"
                                alt={`Featured image for ${article.title}`}
                                loading="eager"
                            />
                        )}

                        <div className="lg:flex mx-auto lg:flex-row">
                            {tableOfContents && (
                                <div className="lg:w-1/4 lg:sticky my-7 top-10 lg:h-1/5 lg:pr-6">
                                    <div className="lg:px-4 space-y-2">
                                        <h2 className="font-bold text-lg">
                                            Table of Contents
                                        </h2>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: tableOfContents,
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            <article
                                className="prose prose-invert my-7 mx-auto max-w-3xl prose-a:text-pink-700 prose-blockquote:mx-6 prose-pre:bg-hk-grey"
                                dangerouslySetInnerHTML={{
                                    __html: content,
                                }}
                            />
                        </div>

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
                                <NavLink
                                    href={`https://github.com/hkamran80/articles/blob/${
                                        article.published === "" &&
                                        article.branchName
                                            ? article.branchName
                                            : "main"
                                    }/markdown/articles/${article.filename}.md`}
                                    className="transition-colors duration-300 hover:text-pink-700"
                                >
                                    <FileEdit />
                                </NavLink>
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

        const toc = article.toc ?? true;
        let content = renderMarkdown(
            markdown,
            {
                code: true,
                images: true,
                footnotes: true,
                toc,
            },
            `article:${article.id}`,
        );

        let tableOfContents = null;
        const TOC_REGEX = /(\<nav.*<\/nav\>)/m;
        if (toc) {
            const tocRegex = TOC_REGEX.exec(content);
            if (tocRegex && tocRegex.length > 0) {
                tableOfContents = tocRegex[0];
                content = content.replace(TOC_REGEX, "");
            }
        }

        return {
            props: {
                article,
                tableOfContents,
                content,
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
