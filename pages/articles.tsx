import ArticleCard from "@/components/ArticleCard";
import Head from "next/head";
import Layout from "@/components/Layout";
import NavLink from "@/components/NavLink";
import { getBaseUrl } from "@/lib/urls";
import { Rss } from "lucide-react";
import { sortByDate } from "@/lib/sort";
import { WebPageJsonLd } from "next-seo";
import { Writing } from "@/types/writings";
import { WRITINGS_URL } from "../data/constants";
import type { GetStaticProps, NextPage } from "next";

type Props = {
    articles: Writing[];
};

const Articles: NextPage<Props> = ({ articles }) => {
    return (
        <Layout>
            <Head>
                <title>Articles | H. Kamran</title>
            </Head>

            <WebPageJsonLd id={`${getBaseUrl()}/articles`} />

            <h1 className="flex items-center text-3xl font-semibold">
                <span className="flex-1">Articles</span>
                <NavLink
                    href="/feed/atom"
                    target="_blank"
                    rel="nofollow noreferrer"
                    title="Atom feed"
                    className="text-gray-400"
                >
                    <Rss />
                </NavLink>
            </h1>
            <div className="h-feed hfeed flex flex-col">
                <span className="p-name site-title hidden">
                    Articles | H. Kamran
                </span>
                {articles
                    .filter(({ published }) => published !== "")
                    .map((article, index) => (
                        <div key={index} className="h-entry hentry">
                            <NavLink
                                href={`/article/${article.id}`}
                                className="u-url"
                                rel="bookmark"
                            >
                                <ArticleCard article={article} />
                            </NavLink>
                        </div>
                    ))}
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch(WRITINGS_URL);
    const writings = await res.json();
    const articles = (writings.articles as Writing[]).sort((a, b) =>
        sortByDate(new Date(a.published), new Date(b.published)),
    );

    return { props: { articles } };
};

export default Articles;
