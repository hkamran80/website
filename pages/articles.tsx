import ArticleCard from "@/components/ArticleCard";
import feather from "feather-icons";
import Head from "next/head";
import Layout from "@/components/Layout";
import NavLink from "@/components/NavLink";
import { Article } from "@/types/writings";
import { sortByPublishDate } from "@/lib/writings";
import { WebPageJsonLd } from "next-seo";
import { WRITINGS_URL } from "../data/constants";
import type { GetStaticProps, NextPage } from "next";

type Props = {
    articles: Article[];
};

const Articles: NextPage<Props> = ({ articles }) => {
    return (
        <Layout>
            <Head>
                <title>Articles | H. Kamran</title>
            </Head>

            <WebPageJsonLd
                id={`${
                    typeof window !== "undefined" && window.location.origin
                        ? window.location.origin
                        : ""
                }/articles`}
            />

            <h1 className="flex items-center text-3xl font-semibold">
                <span className="flex-1">Articles</span>
                <a
                    href="/feed/atom"
                    target="_blank"
                    rel="nofollow noreferrer"
                    title="Atom feed"
                    className="text-gray-400"
                    dangerouslySetInnerHTML={{
                        __html: feather.icons.rss.toSvg(),
                    }}
                />
            </h1>
            <div className="flex flex-col">
                {articles
                    .filter(({ published }) => published !== "")
                    .map((article, index) => (
                        <NavLink key={index} href={`/article/${article.id}`}>
                            <ArticleCard article={article} />
                        </NavLink>
                    ))}
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch(WRITINGS_URL);
    const writings = await res.json();
    const articles = (writings.articles as Article[]).sort(sortByPublishDate);

    return { props: { articles } };
};

export default Articles;
