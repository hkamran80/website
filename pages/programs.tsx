import Head from 'next/head';
import Layout from '../components/Layout';
import NavLink from '../components/NavLink';
import ProgramCard from '../components/ProgramCard';
import { programs } from '../data/pages';
import { WebPageJsonLd } from 'next-seo';
import type { NextPage } from "next";

const Programs: NextPage = () => {
    return (
        <Layout>
            <Head>
                <title>Programs | H. Kamran</title>
            </Head>

            <WebPageJsonLd
                id={`${
                    typeof window !== "undefined" && window.location.origin
                        ? window.location.origin
                        : ""
                }/programs`}
            />

            <h1 className="text-3xl font-semibold">Programs</h1>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                {programs.map((program, index) => (
                    <NavLink key={index} href={`/program/${program.id}`}>
                        <ProgramCard program={program} />
                    </NavLink>
                ))}
            </div>
        </Layout>
    );
};

export default Programs;
