import ArticleCard from '@/components/ArticleCard';
import CreationCard from '@/components/CreationCardLinked';
import Head from 'next/head';
import Layout from '@/components/Layout';
import NavLink from '@/components/NavLink';
import { alphabeticalSort } from '@/lib/sort';
import { ChevronDown } from 'react-feather';
import { Creation } from '@/types/creations';
import { getBaseUrl } from '@/lib/urls';
import { SHOWCASE_URL, WRITINGS_URL } from '../data/constants';
import { slugify } from '@hkamran/utility-strings';
import { socialIcons } from '../data/navigation';
import { WebPageJsonLd } from 'next-seo';
import type { GetStaticProps, NextPage } from "next";
import type { Writing } from "@/types/writings";

type Props = {
    latestArticle: Writing;
    featuredShowcase: Creation[];
};

const Home: NextPage<Props> = ({ latestArticle, featuredShowcase }) => {
    return (
        <>
            <Head>
                <title>H. Kamran</title>
            </Head>

            <WebPageJsonLd id={`${getBaseUrl()}/`} />

            <main>
                <section
                    id="overview"
                    className="mx-auto flex h-screen max-w-5xl flex-col"
                >
                    <Layout
                        navigationBar={true}
                        containerClasses="mt-6 md:mt-0"
                        childrenClasses="my-auto flex flex-col space-y-8"
                        footerClasses="pb-12 text-gray-500 justify-center flex flex-col space-y-4 justify-center"
                        footer={
                            <>
                                <NavLink
                                    href="/sponsor"
                                    className="text-center uppercase tracking-widest transition duration-300 hover:scale-125 hover:text-pink-700"
                                >
                                    Sponsor
                                </NavLink>

                                <div className="flex flex-row justify-center space-x-7">
                                    {socialIcons.map(({ url, icon }, index) => (
                                        <a
                                            key={index}
                                            href={url}
                                            aria-label={icon.title}
                                            target="_blank"
                                            rel="noopener noreferrer me"
                                            className={`umami--click--${slugify(
                                                icon.title,
                                            )}-link-social`}
                                        >
                                            <svg
                                                role="img"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 fill-gray-500 transition duration-300 hover:scale-125 hover:fill-pink-700"
                                            >
                                                <title>{icon.title}</title>
                                                <path d={icon.path} />
                                            </svg>
                                        </a>
                                    ))}
                                </div>

                                <button type="button" className="mx-auto">
                                    <ChevronDown
                                        size={48}
                                        onClick={() =>
                                            document
                                                .getElementById("creations")
                                                ?.scrollIntoView({
                                                    behavior: "smooth",
                                                })
                                        }
                                        className="stroke-gray-500 transition duration-300 hover:scale-125 hover:stroke-pink-700"
                                    />
                                </button>
                            </>
                        }
                    >
                        <div className="mx-auto flex max-w-3xl grow flex-col items-center justify-center space-y-2 px-0 text-center uppercase">
                            <span className="text-sm tracking-wider md:text-2xl">
                                H. Kamran
                            </span>
                            <span className="text-3xl font-extrabold leading-tight tracking-wide text-pink-700 md:text-7xl md:leading-tight">
                                Developer and
                                <br />
                                Amateur Photographer
                            </span>
                        </div>
                    </Layout>
                </section>

                <section
                    id="creations"
                    className="mx-auto flex h-screen max-w-5xl flex-col text-white"
                >
                    <Layout childrenClasses="space-y-12" footerClasses="py-14">
                        <section>
                            <div className="flex w-full items-center">
                                <span className="flex-1 uppercase tracking-wide text-gray-300">
                                    Latest Article
                                </span>

                                <NavLink
                                    href="/articles"
                                    className="text-sm uppercase text-gray-500 transition-colors duration-200 ease-in hover:text-pink-700"
                                >
                                    See All
                                </NavLink>
                            </div>

                            <div className="mt-4">
                                <NavLink href={`/article/${latestArticle.id}`}>
                                    <ArticleCard
                                        article={latestArticle}
                                        topPadding={false}
                                    />
                                </NavLink>
                            </div>
                        </section>

                        <section>
                            <div className="flex w-full items-center">
                                <span className="flex-1 uppercase tracking-wide text-gray-300">
                                    Featured Showcase
                                </span>

                                <NavLink
                                    href="/showcase"
                                    className="text-sm uppercase text-gray-500 transition-colors duration-200 ease-in hover:text-pink-700"
                                >
                                    See All
                                </NavLink>
                            </div>

                            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                                {featuredShowcase
                                    .sort((a, b) =>
                                        alphabeticalSort(a.name, b.name),
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
        (await (await fetch(WRITINGS_URL)).json()).articles as Writing[]
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
