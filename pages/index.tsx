import BlogCard from "../components/BlogCard";
import CreationCard from "../components/CreationCardLinked";
import Head from "next/head";
import Layout from "../components/Layout";
import TextLink from "../components/TextLink";
import { ChevronDown } from "react-feather";
import { Creation } from "../types/creations";
import { SHOWCASE_URL, WRITINGS_URL } from "../data/constants";
import { socialIcons } from "../data/navigation";
import type { GetStaticProps, NextPage } from "next";
import type { Article } from "../types/writings";

type Props = {
    latestArticle: Article;
    featuredShowcase: Creation[];
};

const Home: NextPage<Props> = ({ latestArticle, featuredShowcase }) => {
    return (
        <>
            <Head>
                <title>H. Kamran</title>
            </Head>

            <main>
                <section id="overview">
                    <Layout
                        navigationBar={false}
                        containerClasses="mt-6 md:mt-0"
                        childrenClasses="my-auto flex flex-col space-y-8"
                        footerClasses="pb-12 text-gray-500"
                        footer={
                            <button type="button">
                                <ChevronDown
                                    size={48}
                                    onClick={() =>
                                        document
                                            .getElementById("creations")
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                            })
                                    }
                                />
                            </button>
                        }
                    >
                        <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0">
                            <div className="flex-1 flex flex-col space-y-1 md:space-y-4">
                                <span className="text-4xl md:text-7xl text-left text-pink-400 font-bold">
                                    H. Kamran
                                </span>
                                <span className="text-xl md:text-4xl font-semibold">
                                    Developer and Amateur Photographer
                                </span>
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
                        </div>

                        <div className="max-w-3xl text-2xl font-light leading-snug space-y-2">
                            <p>Hello world!</p>
                            <p>
                                I’m a developer, experienced in Python,
                                JavaScript, TypeScript, Vue.js, React, Next.js,
                                Java, Kotlin, Swift, and SwiftUI. I&apos;m
                                currently learning Go.
                            </p>

                            <p>
                                I also{" "}
                                <TextLink
                                    href="/articles"
                                    className="text-pink-400 underline"
                                >
                                    write articles
                                </TextLink>{" "}
                                on topics that interest me and that seem useful,
                                as well as{" "}
                                <TextLink
                                    href="https://unsplash.com/@hkamran"
                                    className="text-pink-400 underline"
                                >
                                    occasionally taking photos
                                </TextLink>
                                .
                            </p>
                        </div>
                    </Layout>
                </section>

                <section
                    id="creations"
                    className="h-screen max-w-5xl mx-auto flex flex-col text-white"
                >
                    <Layout childrenClasses="space-y-12" footerClasses="py-10">
                        <section>
                            <div className="flex w-full items-center">
                                <span className="flex-1 text-xl">
                                    Latest Article
                                </span>

                                <TextLink
                                    href="/articles"
                                    className="text-gray-500 hover:text-gray-300 transition-colors duration-200 ease-in-out"
                                >
                                    See All
                                </TextLink>
                            </div>

                            <div className="mt-4">
                                <TextLink href={`/article/${latestArticle.id}`}>
                                    <BlogCard
                                        article={latestArticle}
                                        topPadding={false}
                                    />
                                </TextLink>
                            </div>
                        </section>

                        <section>
                            <div className="flex w-full items-center">
                                <span className="flex-1 text-xl">
                                    Featured Showcase
                                </span>

                                <TextLink
                                    href="/showcase"
                                    className="text-gray-500 hover:text-gray-300 transition-colors duration-200 ease-in-out"
                                >
                                    See All
                                </TextLink>
                            </div>

                            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                {featuredShowcase
                                    .sort(
                                        (
                                            { name: rawNameA },
                                            { name: rawNameB },
                                        ) => {
                                            const nameA =
                                                    rawNameA.toLowerCase(),
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
                            </div>
                        </section>
                    </Layout>
                </section>
            </main>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
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
