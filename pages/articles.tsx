import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import BlogCard from "../components/BlogCard";
import { StateContext } from "./_app";
import { useContext, useEffect } from "react";

const Articles: NextPage = () => {
    const context = useContext(StateContext);
    useEffect(() => {
        console.debug(context.articleTags);
    });

    return (
        <StateContext.Consumer>
            {(state) => (
                <Layout>
                    <Head>
                        <title>Articles | H. Kamran</title>
                    </Head>

                    <h1 className="text-3xl font-semibold">Articles</h1>
                    <div className="flex flex-col">
                        {state.articles.map((article, index) => (
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
