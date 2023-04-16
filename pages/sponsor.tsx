import Breadcrumbs from "@/components/Breadcrumbs";
import Head from "next/head";
import Layout from "@/components/Layout";
import { UNSPLASH_URL } from "data/constants";
import { WebPageJsonLd } from "next-seo";
import type { NextPage } from "next";

const Sponsor: NextPage = () => {
    return (
        <Layout>
            <Head>
                <title>Sponsor | H. Kamran</title>
            </Head>

            <WebPageJsonLd
                id={`${
                    typeof window !== "undefined" && window.location.origin
                        ? window.location.origin
                        : ""
                }/sponsor`}
            />

            <div className="mx-auto max-w-2xl">
                <Breadcrumbs basePath="/" baseLabel="Sponsor" />

                <div className="space-y-2">
                    <h1 className="mx-auto text-center text-4xl font-semibold md:text-left">
                        Sponsor
                    </h1>
                </div>

                <div className="prose prose-invert mt-6 max-w-none prose-a:text-pink-700">
                    <p>
                        Thank you for thinking of sponsoring me! I create and
                        maintain open-source projects, like{" "}
                        <a
                            href="https://2fa.directory"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            2fa.directory
                        </a>
                        , and my own apps{" "}
                        <a
                            href="https://schedules.unisontech.org/?utm_source=hksponsor"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Schedules
                        </a>{" "}
                        and{" "}
                        <a
                            href="https://13willow.com/project/ramadan-taskminder?utm_source=hksponsor"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Ramadan Taskminder
                        </a>
                        . Sponsoring me allows me to invest more time into
                        maintaining and creating projects.
                    </p>

                    <p>
                        You can do so through{" "}
                        <a
                            href="https://github.com/sponsors/hkamran80"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub Sponsors
                        </a>
                        ,{" "}
                        <a
                            href="https://ko-fi.com/hkamran"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Ko-fi
                        </a>
                        ,{" "}
                        <a
                            href="https://www.buymeacoffee.com/hkamran"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Buy Me a Coffee
                        </a>
                        , or{" "}
                        <a
                            href="https://liberapay.com/hkamran/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Liberapay
                        </a>
                        .
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Sponsor;
