import ArticleCard from '../components/ArticleCard';
import CreationCard from '../components/CreationCardLinked';
import Head from 'next/head';
import Image from 'next/future/image';
import Layout from '../components/Layout';
import profileImage from '../public/profile.png';
import TextLink from '../components/TextLink';
import { ChevronDown } from 'react-feather';
import { Creation } from '../types/creations';
import { KNOWN_LANGUAGES, SHOWCASE_URL, WRITINGS_URL } from '../data/constants';
import { socialIcons } from '../data/navigation';
import type { GetStaticProps, NextPage } from "next";
import type { Article } from "../types/writings";

type Props = {
    latestArticle: Article;
    featuredShowcase: Creation[];
};

// Source: https://stackoverflow.com/a/12043228/7313822
const luminance = (c: string) => {
    var c = c.substring(1); // strip #
    var rgb = parseInt(c, 16); // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff; // extract red
    var g = (rgb >> 8) & 0xff; // extract green
    var b = (rgb >> 0) & 0xff; // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    return luma < 40;
};

const Home: NextPage<Props> = ({ latestArticle, featuredShowcase }) => {
    return (
        <>
            <Head>
                <title>H. Kamran</title>
            </Head>

            <main>
                <section id="overview" className="flex h-screen flex-col">
                    <div className="relative top-14 mx-auto flex w-full max-w-7xl items-center">
                        <h1 className="flex-1 text-4xl tracking-wide text-pink-700">
                            H. Kamran
                        </h1>

                        <div className="flex flex-1 flex-row justify-end space-x-4">
                            {KNOWN_LANGUAGES.map(({ name, icon }, index) => (
                                <svg
                                    key={index}
                                    role="img"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 transition-colors duration-300 hover:fill-white"
                                    style={{
                                        fill:
                                            name !== "SwiftUI"
                                                ? !luminance(icon.hex)
                                                    ? `#${icon.hex}`
                                                    : "#FFFFFF"
                                                : "#117AFF",
                                    }}
                                >
                                    <title>{icon.title}</title>
                                    <path d={icon.path} />
                                </svg>
                            ))}
                        </div>
                    </div>

                    <div className="mx-auto flex max-w-5xl grow flex-col items-center justify-center space-y-8 px-12 md:px-0">
                      
                        <Image
                            src={profileImage}
                            width={750}
                            height={750}
                            className="h-80 w-80 rounded-full border-2 border-pink-700"
                            alt="H. Kamran's profile picture"
                        />

                        <h2 className="text-4xl tracking-wide text-pink-700">
                            Developer and Amateur Photographer
                        </h2>
                    </div>

                    <div className="relative bottom-10 mx-auto flex w-full max-w-7xl items-center">
                        <h2 className="flex-1 text-2xl tracking-wide text-pink-700"></h2>

                        <button type="button">
                            <ChevronDown
                                size={48}
                                className="transition duration-300 hover:scale-125 hover:stroke-pink-700"
                                onClick={() =>
                                    document
                                        .getElementById("creations")
                                        ?.scrollIntoView({
                                            behavior: "smooth",
                                        })
                                }
                            />
                        </button>

                        <div className="flex flex-1 flex-row justify-end space-x-7">
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
                                        className="h-6 w-6 fill-pink-700 transition-colors duration-300 hover:fill-white"
                                    >
                                        <title>{icon.title}</title>
                                        <path d={icon.path} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                <section
                    id="creations"
                    className="mx-auto flex h-screen max-w-5xl flex-col text-white"
                >
                    <Layout childrenClasses="space-y-12" footerClasses="py-10">
                        <section>
                            <div className="flex w-full items-center">
                                <span className="flex-1 text-xl">
                                    Latest Article
                                </span>

                                <TextLink
                                    href="/articles"
                                    className="text-gray-500 transition-colors duration-200 ease-in-out hover:text-gray-300"
                                >
                                    See All
                                </TextLink>
                            </div>

                            <div className="mt-4">
                                <TextLink href={`/article/${latestArticle.id}`}>
                                    <ArticleCard
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
                                    className="text-gray-500 transition-colors duration-200 ease-in-out hover:text-gray-300"
                                >
                                    See All
                                </TextLink>
                            </div>

                            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
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
