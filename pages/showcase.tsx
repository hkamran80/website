import CreationCard from "@/components/CreationCardLinked";
import Head from "next/head";
import Layout from "@/components/Layout";
import { Creation } from "@/types/creations";
import { SHOWCASE_URL } from "../data/constants";
import { WebPageJsonLd } from "next-seo";
import type { GetStaticProps, NextPage } from "next";
import { getBaseUrl } from "@/lib/urls";

const alphabeticalSort = (
    { name: rawNameA }: { name: string },
    { name: rawNameB }: { name: string },
) => {
    const nameA = rawNameA.toLowerCase(),
        nameB = rawNameB.toLowerCase();

    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
};

type Props = { showcase: Creation[] };

const Showcase: NextPage<Props> = ({ showcase }) => {
    return (
        <Layout>
            <Head>
                <title>Showcase | H. Kamran</title>
            </Head>

            <WebPageJsonLd id={`${getBaseUrl()}/showcase`} />

            <h1 className="text-3xl font-semibold">Showcase</h1>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                {showcase
                    .filter(({ featured }) => featured)
                    .sort(alphabeticalSort)
                    .map((creation, index) => (
                        <CreationCard key={index} creation={creation} />
                    ))}

                {showcase
                    .filter(({ featured }) => !featured)
                    .sort(alphabeticalSort)
                    .map((creation, index) => (
                        <CreationCard key={index} creation={creation} />
                    ))}
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch(SHOWCASE_URL);
    const showcase = (await res.json()) as Creation[];

    return { props: { showcase } };
};

export default Showcase;
