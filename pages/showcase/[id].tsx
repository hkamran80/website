import { classNames } from "@hkamran/utility-web";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Breadcrumbs from "../../components/Breadcrumbs";
import Layout from "../../components/Layout";
import { showcasePages } from "../../data/pages";
import type { Page } from "../../types/pages";

type Props = {
    showcaseItem: Page;
};
const ShowcasePage: NextPage<Props> = ({ showcaseItem }: Props) => {
    console.debug(showcaseItem);
    const ShowcasePageComponent = dynamic(
        () => import(`../../components/${showcaseItem.componentFilename}.tsx`),
    );

    return (
        <>
            <Head>
                <title>{showcaseItem.name} | H. Kamran</title>
            </Head>

            <Layout>
                <div
                    className={classNames(
                        "mx-auto",
                        showcaseItem.centerContent ? "max-w-2xl" : "max-w-5xl",
                    )}
                >
                    <Breadcrumbs
                        basePath="/showcase"
                        baseLabel="Showcase"
                        currentLabel={showcaseItem.name}
                    />

                    <div className="space-y-2">
                        <h1 className="text-4xl font-semibold text-center mx-auto md:text-left">
                            {showcaseItem.name}
                        </h1>
                        <h2 className="font-light text-xl sm:text-2xl text-center sm:text-left leading-snug text-gray-300">
                            {showcaseItem.description}
                        </h2>
                    </div>

                    <div className="mt-6">
                        <ShowcasePageComponent />
                    </div>
                </div>
            </Layout>
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = showcasePages.map(({ id }) => ({
        params: { id },
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const showcaseItem = showcasePages.find(
        (showcaseItem) => showcaseItem.id === (params as { id: string }).id,
    );

    return { props: { showcaseItem } };
};

export default ShowcasePage;
