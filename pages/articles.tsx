import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import BlogCard from "../components/BlogCard";
import { StateContext } from "./_app";
import feather from "feather-icons";

const Articles: NextPage = () => {
    return (
        <StateContext.Consumer>
            {(state) => (
                <Layout>
                    <Head>
                        <title>Articles | H. Kamran</title>
                    </Head>

                    <h1 className="text-3xl font-semibold flex items-center">
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
                        {state.articles
                            .filter(({ published }) => published !== "")
                            .map((article, index) => (
                                <Link
                                    key={index}
                                    href={`/article/${article.id}`}
                                    passHref
                                >
                                    <a>
                                        <BlogCard article={article} />
                                    </a>
                                </Link>
                            ))}
                    </div>
                </Layout>
            )}
        </StateContext.Consumer>
    );
};

export default Articles;
