import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ChevronRight, Home } from "react-feather";
import Breadcrumbs from "../../components/Breadcrumbs";
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
                        <Breadcrumbs
                            basePath="/showcase"
                            baseLabel="Showcase"
                            currentLabel={showcasePage.name}
                        />

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
