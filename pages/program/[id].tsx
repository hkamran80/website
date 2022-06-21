import { classNames } from "@hkamran/utility-web";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { type ComponentType } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Layout from "../../components/Layout";
import { programs } from "../../data/pages";
import type { Page } from "../../types/pages";

type ProgramProps = {
    program: Page;
};

const Program: NextPage<ProgramProps> = ({ program }: ProgramProps) => {
    const ProgramComponent = dynamic(
        () => import(`../../components/${program.componentFilename}.tsx`),
    );

    return (
        <Layout>
            <Head>
                <title>{program.name} | H. Kamran</title>
            </Head>

            <div
                className={classNames(
                    "mx-auto",
                    program.centerContent ? "max-w-2xl" : "max-w-5xl",
                )}
            >
                <Breadcrumbs
                    basePath="/programs"
                    baseLabel="Programs"
                    currentLabel={program.name}
                />

                <div className="space-y-2">
                    <h1 className="text-4xl font-semibold text-center mx-auto md:text-left">
                        {program.name}
                    </h1>
                    <h2 className="font-light text-xl sm:text-2xl text-center sm:text-left leading-snug text-gray-300">
                        {program.description}
                    </h2>
                </div>

                <div className="mt-6">
                    <ProgramComponent />
                </div>
            </div>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = programs.map(({ id }) => ({
        params: { id },
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const program = programs.find(
        (program) => program.id === (params as { id: string }).id,
    );

    return { props: { program } };
};

export default Program;
