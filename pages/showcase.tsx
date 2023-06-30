import { WebPageJsonLd } from "next-seo";
import Head from "next/head";

import Layout from "@/components/Layout";
import CreationCard from "@/components/showcase/CreationCardLinked";
import { SHOWCASE_URL } from "@/data/constants";
import { alphabeticalSort } from "@/lib/sort";
import { getBaseUrl } from "@/lib/urls";
import { Creation } from "@/types/creations";
import type { GetStaticProps, NextPage } from "next";

type Props = { showcase: Creation[] };

const Showcase: NextPage<Props> = ({ showcase }) => (
    <Layout>
        <Head>
            <title>Showcase | H. Kamran</title>
        </Head>

        <WebPageJsonLd id={`${getBaseUrl()}/showcase`} />

        <h1 className="text-3xl font-semibold">Showcase</h1>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {showcase
                .filter(({ featured }) => featured)
                .sort((a, b) => alphabeticalSort(a.name, b.name))
                .map((creation, index) => (
                    <CreationCard key={index} creation={creation} />
                ))}

            {showcase
                .filter(({ featured }) => !featured)
                .sort((a, b) => alphabeticalSort(a.name, b.name))
                .map((creation, index) => (
                    <CreationCard key={index} creation={creation} />
                ))}
        </div>
    </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch(SHOWCASE_URL);
    const showcase = (await res.json()) as Creation[];

    return { props: { showcase } };
};

export default Showcase;
