import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import CreationCard from "../components/CreationCardLinked";
import Layout from "../components/Layout";
import type { Creation } from "../types/creations";

const creations: Creation[] = (await (
    await fetch("https://raw.hkamran.com/hkamran/creations")
).json()) as Creation[];

const alphabeticalSort = (
    { name: rawNameA }: { name: string },
    { name: rawNameB }: { name: string },
) => {
    const nameA = rawNameA.toLowerCase(),
        nameB = rawNameB.toLowerCase();

    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
};

const Showcase: NextPage = () => {
    return (
        <Layout>
            <Head>
                <title>Showcase | H. Kamran</title>
            </Head>

            <h1 className="text-3xl font-semibold">Showcase</h1>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {(creations as Creation[])
                    .filter(({ featured }) => featured)
                    .sort(alphabeticalSort)
                    .map((creation, index) => (
                        <CreationCard key={index} creation={creation} />
                    ))}

                {(creations as Creation[])
                    .filter(
                        ({ featured, status }) =>
                            !featured && status === "Completed",
                    )
                    .sort(alphabeticalSort)
                    .map((creation, index) => (
                        <CreationCard key={index} creation={creation} />
                    ))}

                {(creations as Creation[])
                    .filter(
                        ({ featured, status }) =>
                            !featured && status === "In Progress",
                    )
                    .sort(alphabeticalSort)
                    .map((creation, index) => (
                        <CreationCard key={index} creation={creation} />
                    ))}
            </div>
        </Layout>
    );
};

export default Showcase;
