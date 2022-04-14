import type { NextPage } from "next";
import Head from "next/head";
import Breadcrumbs from "../../components/Breadcrumbs";
import Layout from "../../components/Layout";

const License: NextPage = () => {
    return (
        <Layout>
            <Head>
                <title>License | H. Kamran</title>
            </Head>

            <div className="mx-auto max-w-2xl">
                <Breadcrumbs
                    basePath="/"
                    baseLabel="Legal"
                    currentLabel="Privacy Policy"
                />

                <div className="space-y-2">
                    <h1 className="text-4xl font-semibold text-center mx-auto md:text-left">
                        License
                    </h1>
                    <h2 className="font-light text-xl sm:text-2xl text-center sm:text-left leading-snug text-gray-300">
                        Last Updated: April 7, 2022
                    </h2>
                </div>

                <div className="mt-6 max-w-none prose prose-invert">
                    <ul>
                        <li>
                            You may copy and distribute the content on this
                            site, so long as you credit me and I give you
                            permission in writing
                        </li>
                        <li>
                            You may use the content on this site for both
                            commercial and noncommerical purposes, provided you
                            credit me and I give you permission in writing
                        </li>
                        <li>
                            You <strong>may not</strong> redistribute or sell
                            the content on this site, without permission in
                            writing from me
                        </li>
                        <li>
                            You <strong>may not</strong> use any of the content
                            on this site to create misleading associations with
                            products and services, without permission in writing
                            from me
                        </li>
                    </ul>

                    <p>
                        I reserve the right to change the above terms at any
                        time without prior notification.
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default License;
