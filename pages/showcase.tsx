import type { NextPage } from "next";
import Head from "next/head";
import CreationCard from "../components/CreationCardLinked";
import Layout from "../components/Layout";
import { StateContext } from "./_app";

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
        <StateContext.Consumer>
            {(state) => (
                <>
                    <Layout>
                        <Head>
                            <title>Showcase | H. Kamran</title>
                        </Head>

                        <h1 className="text-3xl font-semibold">Showcase</h1>
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                            {state.showcase
                                .filter(({ featured }) => featured)
                                .sort(alphabeticalSort)
                                .map((creation, index) => (
                                    <CreationCard
                                        key={index}
                                        creation={creation}
                                    />
                                ))}

                            {state.showcase
                                .filter(
                                    ({ featured, status }) =>
                                        !featured && status === "Completed",
                                )
                                .sort(alphabeticalSort)
                                .map((creation, index) => (
                                    <CreationCard
                                        key={index}
                                        creation={creation}
                                    />
                                ))}

                            {state.showcase
                                .filter(
                                    ({ featured, status }) =>
                                        !featured && status === "In Progress",
                                )
                                .sort(alphabeticalSort)
                                .map((creation, index) => (
                                    <CreationCard
                                        key={index}
                                        creation={creation}
                                    />
                                ))}
                        </div>
                    </Layout>
                </>
            )}
        </StateContext.Consumer>
    );
};

export default Showcase;
