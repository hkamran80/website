import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ChevronRight, Home } from "react-feather";
import Layout from "../../components/Layout";
import { showcasePages } from "../../data/pages";
import type { Page } from "../../types/pages";
import { classNames } from "../../util/classNames";

const ShowcasePage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    let ShowcasePageComponent = dynamic(
        () => import("../../components/Loading"),
    );

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (
            id !== undefined &&
            showcasePages.map(({ id }) => id).indexOf(id as string) === -1
        ) {
            router.push("/showcase");
        }
    });

    const showcasePage = showcasePages.find(
        ({ id: showcasePageId }) => id === showcasePageId,
    ) as Page;

    if (showcasePage && showcasePage.componentFilename) {
        ShowcasePageComponent = dynamic(
            () =>
                import(
                    `../../components/${showcasePage.componentFilename}.tsx`
                ),
        );
    }

    return (
        <Layout>
            {showcasePage && (
                <>
                    <Head>
                        <title>{showcasePage.name} | H. Kamran</title>
                    </Head>

                    <div
                        className={classNames(
                            "mx-auto",
                            showcasePage.centerContent
                                ? "max-w-2xl"
                                : "max-w-5xl",
                        )}
                    >
                        <nav className="flex mb-6" aria-label="Breadcrumb">
                            <ol className="flex items-center space-x-4">
                                <li>
                                    <Link href="/" passHref>
                                        <span className="text-gray-500 hover:text-gray-400 hover:cursor-pointer">
                                            <span className="sr-only">
                                                Home
                                            </span>
                                            <Home />
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <ChevronRight />

                                        <Link href="/showcase" passHref>
                                            <span className="ml-4 text-sm font-medium text-gray-400 hover:text-gray-300 hover:cursor-pointer">
                                                Showcase
                                            </span>
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <ChevronRight />

                                        <span className="ml-4 text-sm font-medium text-gray-400 hover:text-gray-300 hover:cursor-pointer">
                                            {showcasePage.name}
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        <div className="space-y-2">
                            <h1 className="text-4xl font-semibold text-center mx-auto md:text-left">
                                {showcasePage.name}
                            </h1>
                            <h2 className="font-light text-xl sm:text-2xl text-center sm:text-left leading-snug text-gray-300">
                                {showcasePage.description}
                            </h2>
                        </div>

                        <div className="mt-6">
                            <ShowcasePageComponent />
                        </div>
                    </div>
                </>
            )}
        </Layout>
    );
};

export default ShowcasePage;
