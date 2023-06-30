import { WebPageJsonLd } from "next-seo";
import Head from "next/head";

import Layout from "@/components/Layout";
import ProgramCard from "@/components/ProgramCard";
import NavLink from "@/components/navigation/NavLink";
import { programs } from "@/data/programs";
import { getBaseUrl } from "@/lib/urls";
import type { NextPage } from "next";

const Programs: NextPage = () => (
    <Layout>
        <Head>
            <title>Programs | H. Kamran</title>
        </Head>

        <WebPageJsonLd id={`${getBaseUrl()}/programs`} />

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

export default Programs;
