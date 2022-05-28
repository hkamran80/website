import { classNames } from "@hkamran/utility-web";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Layout from "../../components/Layout";
import { programs } from "../../data/pages";
import type { Page } from "../../types/pages";

const Program: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    let ProgramComponent = dynamic(() => import("../../components/Loading"));

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (
            id !== undefined &&
            programs.map(({ id }) => id).indexOf(id as string) === -1
        ) {
            router.push("/programs");
        }
    });

    const program = programs.find(
        ({ id: programId }) => id === programId,
    ) as Page;

    if (program && program.componentFilename) {
        ProgramComponent = dynamic(
            () => import(`../../components/${program.componentFilename}.tsx`),
        );
    }

    return (
        <Layout>
            {program && (
                <>
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
                </>
            )}
        </Layout>
    );
};

export default Program;
