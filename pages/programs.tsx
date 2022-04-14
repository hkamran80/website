import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import ProgramCard from "../components/ProgramCard";
import { programs } from "../data/pages";

const Programs: NextPage = () => {
    return (
        <Layout>
            <Head>
                <title>Programs | H. Kamran</title>
            </Head>

            <h1 className="text-3xl font-semibold">Programs</h1>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {programs.map((program, index) => (
                    <Link key={index} href={`/program/${program.id}`} passHref>
                        <a>
                            <ProgramCard program={program} />
                        </a>
                    </Link>
                ))}
            </div>
        </Layout>
    );
};

export default Programs;
