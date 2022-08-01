import BlogCard from "../../components/BlogCard";
import Breadcrumbs from "../../components/Breadcrumbs";
import Head from "next/head";
import Layout from "../../components/Layout";
import Link from "next/link";
import { cleanString } from "../../util/string";
import { StateContext } from "../_app";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";

const ArticleTag: NextPage = () => {
    const router = useRouter();
    const { slug } = router.query;

    const state = useContext(StateContext);

    useEffect(() => {
        if (
            slug !== undefined &&
            Object.keys(state.articleTags).length > 0 &&
            Object.keys(state.articleTags)
                .map((tag) => cleanString(tag))
                .indexOf(cleanString(slug as string)) === -1
        ) {
            router.push("/articles");
        }
    }, [slug, state.articleTags, router]);

    const [tag, entries] =
        Object.entries(state.articleTags).find(
            ([tag]) => cleanString(tag) === cleanString(slug as string),
        ) || [];

    return (
        <Layout>
            {tag && (
                <>
                    <Head>
                        <title>{tag} | H. Kamran</title>
                    </Head>

                    <Breadcrumbs
                        baseLabel="Articles"
                        basePath="/articles"
                        currentLabel={tag}
                    />

                    <div className="space-y-2">
                        <h1 className="text-4xl font-semibold text-center mx-auto md:text-left">
                            {tag}
                        </h1>
                    </div>

                    <div className="flex flex-col">
                        {state.articles
                            .filter(({ id }) => entries?.indexOf(id) !== -1)
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
                </>
            )}
        </Layout>
    );
};

export default ArticleTag;
