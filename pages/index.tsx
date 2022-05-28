import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ChevronRight } from "react-feather";
import CreationCard from "../components/CreationCardLinked";
import Layout from "../components/Layout";
import { SHOWCASE_URL, WRITINGS_URL } from "../data/constants";
import { socialIcons } from "../data/navigation";
import { Creation } from "../types/creations";
import type { Article } from "../types/writings";
import { classNames } from "../util/classNames";
import { StateContext } from "./_app";

type Props = {
    latestArticle: Article;
    featuredShowcase: Creation[];
};

const Home: NextPage<Props> = ({ latestArticle, featuredShowcase }) => {
    return (
        <Layout>
            <Head>
                <title>H. Kamran</title>
            </Head>

            <div className="px-12 md:px-40 items-center justify-center space-y-8 max-w-7xl mx-auto">
                <section className="space-y-7">
                    <div className="space-y-3">
                        <h1 className="text-5xl sm:text-6xl font-bold text-pink-400">
                            H. Kamran
                        </h1>
                        <h2 className="text-3xl sm:text-4xl font-semibold">
                            Developer
                        </h2>
                    </div>

                    <div className="flex flex-row space-x-7">
                        {socialIcons.map(({ url, icon }, index) => (
                            <a
                                key={index}
                                href={url}
                                aria-label={icon.title}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg
                                    role="img"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="fill-white hover:fill-pink-700 transition-colors duration-300 w-6 h-6"
                                >
                                    <title>{icon.title}</title>
                                    <path d={icon.path} />
                                </svg>
                            </a>
                        ))}
                    </div>

                    <div className="text-2xl font-light leading-normal space-y-1">
                        <p>Hello world!</p>
                        <p>
                            I’m experienced with Python, JavaScript, TypeScript,
                            Vue.js, Java, Kotlin, Swift, and SwiftUI.
                        </p>

                        <p>
                            I also write articles on topics that interest me and
                            that seem useful, as well as occasionally taking
                            photos.
                        </p>
                    </div>
                </section>

                <section className="space-y-5">
                    <div className="space-y-3">
                        <Link href="/articles" passHref>
                            <span className="text-2xl font-semibold hover:cursor-pointer flex items-center group">
                                <span className="flex-1">Articles</span>
                                <ChevronRight className="group-hover:animate-bounce-side" />
                            </span>
                        </Link>

                        <Link href={`/article/${latestArticle.id}`}>
                            <a className="p-6 bg-hk-grey hover:bg-hk-grey-hover transition-colors duration-300 rounded-lg flex flex-col space-y-1">
                                <span className="text-lg">
                                    {latestArticle.title}
                                </span>
                                <span className="font-light">
                                    {latestArticle.description}
                                </span>
                                <time
                                    className="font-extralight"
                                    dateTime={latestArticle.published}
                                >
                                    {new Date(
                                        `${latestArticle.published}T12:00:00-07:00`,
                                    ).toLocaleDateString(undefined, {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </time>
                            </a>
                        </Link>

                        <Link href="/articles" passHref>
                            <div className="ring-2 ring-hk-grey hover:ring-pink-700 rounded-lg flex items-center justify-center py-2 transition duration-300">
                                <span className="text-[#b0b0b0]">More</span>
                            </div>
                        </Link>
                    </div>

                    <div className="space-y-3">
                        <Link href="/showcase" passHref>
                            <span className="text-2xl font-semibold hover:cursor-pointer flex items-center group">
                                <span className="flex-1">Showcase</span>
                                <ChevronRight className="group-hover:animate-bounce-side" />
                            </span>
                        </Link>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                            {featuredShowcase
                                .sort(
                                    (
                                        { name: rawNameA },
                                        { name: rawNameB },
                                    ) => {
                                        const nameA = rawNameA.toLowerCase(),
                                            nameB = rawNameB.toLowerCase();

                                        return nameA < nameB
                                            ? -1
                                            : nameA > nameB
                                            ? 1
                                            : 0;
                                    },
                                )
                                .map((creation, index) => (
                                    <CreationCard
                                        key={index}
                                        creation={creation}
                                    />
                                ))}

                            <Link href="/showcase" passHref>
                                <div
                                    className={classNames(
                                        "ring-2 ring-hk-grey hover:ring-pink-700 rounded-lg flex items-center justify-center transition duration-300",
                                        featuredShowcase.length < 4
                                            ? "py-6"
                                            : "py-2",
                                        featuredShowcase.length >= 4
                                            ? "col-span-2"
                                            : "",
                                    )}
                                >
                                    <span className="text-[#b0b0b0] text-lg">
                                        More
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const featuredShowcase = (
        (await (await fetch(SHOWCASE_URL)).json()) as Creation[]
    ).filter(({ featured }) => featured === true);

    const latestArticle = (
        (await (await fetch(WRITINGS_URL)).json()).articles as Article[]
    )
        .filter(({ published }) => published !== "")
        .sort(({ published: publishedA }, { published: publishedB }) => {
            if (publishedA < publishedB) {
                return 1;
            } else if (publishedA > publishedB) {
                return -1;
            }
            return 0;
        })[0];

    return { props: { latestArticle, featuredShowcase } };
};

export default Home;
