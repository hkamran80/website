import Breadcrumbs from "../../components/Breadcrumbs";
import Head from "next/head";
import InputField from "../../components/InputField";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import type { NextPage } from "next";

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
                <title>Web Utilities | H. Kamran</title>
            </Head>

            <Layout>
                <div className="mx-auto max-w-2xl">
                    <Breadcrumbs
                        basePath="/programs"
                        baseLabel="Programs"
                        currentLabel="Web Utilities"
                    />

                    <div className="space-y-2">
                        <h1 className="text-4xl font-semibold text-center mx-auto md:text-left">
                            Web Utilities
                        </h1>
                        <h2 className="font-light text-xl sm:text-2xl text-center sm:text-left leading-snug text-gray-300">
                            Some helpful web utilities
                        </h2>
                    </div>

                    <div className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
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
