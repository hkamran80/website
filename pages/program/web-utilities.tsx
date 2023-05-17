import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import Head from "next/head";
import InputField from "@/components/InputField";
import Layout from "@/components/Layout";
import DynamicHeader from "@/components/DynamicHeader";
import { programs } from "@/data/programs";
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import type { Page } from "@/types/pages";

const metadata = programs.find(
    ({ id }) => id === "overall-grade-after-final-calculator",
) as Page;

const WebUtilitiesProgram: NextPage = () => {
    const [userAgent, setUserAgent] = useState<string>("");

    useEffect(() => {
        if (navigator) {
            setUserAgent(navigator.userAgent);
        }
    }, []);

    return (
        <>
            <Head>
                <title>{metadata.name} | H. Kamran</title>
            </Head>

            <Layout>
                <div className="mx-auto max-w-2xl">
                    <DynamicHeader
                        id={metadata.id}
                        name={metadata.name}
                        description={metadata.description}
                    />

                    <div className="mt-6">
                        <div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <InputField
                                    type="text"
                                    placeholder="User Agent"
                                    label="User Agent"
                                    value={userAgent}
                                    valueUpdate={(value) => {}}
                                    readonly
                                    copyAll
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default WebUtilitiesProgram;
