import Breadcrumbs from "./Breadcrumbs";
import Head from "next/head";
import { classNames } from "@hkamran/utility-web";
import { Layout } from "react-feather";
import type { Page } from "../types/pages";

const ShowcasePageLayout = ({
    showcaseItem,
    children,
}: {
    showcaseItem: Page;
    children: React.ReactNode;
}) => {
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

                    <div className="mt-6">{children}</div>
                </div>
            </Layout>
        </>
    );
};

export default ShowcasePageLayout;
