import Breadcrumbs from "@/components/Breadcrumbs";
import Head from "next/head";
import Layout from "@/components/Layout";
import NavLink from "@/components/NavLink";
import { getBaseUrl } from "@/lib/urls";
import { WebPageJsonLd } from "next-seo";
import type { NextPage } from "next";

const Sponsor: NextPage = () => {
    return (
        <Layout>
            <Head>
                <title>Sponsor | H. Kamran</title>
            </Head>

            <WebPageJsonLd id={`${getBaseUrl()}/sponsor`} />

            <div className="mx-auto max-w-2xl">
                <Breadcrumbs baseLabel="Sponsor" />

                <div className="space-y-2">
                    <h1 className="mx-auto text-center text-4xl font-semibold md:text-left">
                        Sponsor
                    </h1>
                </div>

                <div className="prose prose-invert mt-6 max-w-none prose-a:text-pink-700">
                    <p>
                        Thank you for thinking of sponsoring me! I create and
                        maintain open-source projects, like{" "}
                        <NavLink href="https://2fa.directory">
                            2fa.directory
                        </NavLink>
                        , and my own apps{" "}
                        <NavLink href="https://schedules.unisontech.org/?utm_source=hksponsor">
                            Schedules
                        </NavLink>{" "}
                        and{" "}
                        <NavLink href="https://13willow.com/project/ramadan-taskminder?utm_source=hksponsor">
                            Ramadan Taskminder
                        </NavLink>
                        . Sponsoring me allows me to invest more time into
                        maintaining and creating projects.
                    </p>

                    <p>
                        You can do so through{" "}
                        <NavLink href="https://github.com/sponsors/hkamran80">
                            GitHub Sponsors
                        </NavLink>
                        ,{" "}
                        <NavLink href="https://ko-fi.com/hkamran">
                            Ko-fi
                        </NavLink>
                        ,{" "}
                        <NavLink href="https://www.buymeacoffee.com/hkamran">
                            Buy Me a Coffee
                        </NavLink>
                        , or{" "}
                        <NavLink href="https://liberapay.com/hkamran/">
                            Liberapay
                        </NavLink>
                        .
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Sponsor;
