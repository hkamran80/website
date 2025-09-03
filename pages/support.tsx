import { WebPageJsonLd } from "next-seo";
import Head from "next/head";

import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import NavLink from "@/components/navigation/NavLink";
import PageHeader from "@/components/pages/PageHeader";
import { getBaseUrl } from "@/lib/urls";
import type { NextPage } from "next";

const Support: NextPage = () => (
    <Layout>
        <Head>
            <title>Support | H. Kamran</title>
        </Head>

        <WebPageJsonLd id={`${getBaseUrl()}/support`} />

        <div className="mx-auto max-w-2xl">
            <Breadcrumbs baseLabel="Support" />

            <PageHeader name="Support" />

            <div className="prose prose-invert mt-6 max-w-none prose-a:text-pink-700">
                <p>
                    Thank you for thinking of supporting me! I create and
                    maintain open-source projects, like{" "}
                    <NavLink href="https://2fa.directory">
                        2fa.directory
                    </NavLink>
                    , and my own apps{" "}
                    <NavLink href="https://schedules.unisontech.org/?utm_source=hksupport">
                        Schedules
                    </NavLink>{" "}
                    and{" "}
                    <NavLink href="https://13willow.com/project/ramadan-taskminder?utm_source=hksupport">
                        Ramadan Taskminder
                    </NavLink>
                    . Supporting me allows me to invest more time into
                    maintaining and creating projects.
                </p>

                <p>
                    You can do so through{" "}
                    <NavLink href="https://github.com/supports/hkamran80">
                        GitHub Supports
                    </NavLink>
                    , <NavLink href="https://ko-fi.com/hkamran">Ko-fi</NavLink>,{" "}
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

export default Support;
