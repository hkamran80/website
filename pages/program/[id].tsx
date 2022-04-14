import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ChevronRight, Home } from "react-feather";
import Layout from "../../components/Layout";
import { programs } from "../../data/pages";
import type { Page } from "../../types/pages";
import { classNames } from "../../util/classNames";

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

                                        <Link href="/programs" passHref>
                                            <span className="ml-4 text-sm font-medium text-gray-400 hover:text-gray-300 hover:cursor-pointer">
                                                Programs
                                            </span>
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <ChevronRight />

                                        <span className="ml-4 text-sm font-medium text-gray-400 hover:text-gray-300 hover:cursor-pointer">
                                            {program.name}
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </nav>

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
