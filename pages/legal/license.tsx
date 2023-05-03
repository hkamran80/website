import Breadcrumbs from "@/components/Breadcrumbs";
import Head from "next/head";
import Layout from "@/components/Layout";
import NavLink from "@/components/NavLink";
import { getBaseUrl } from "@/lib/urls";
import { UNSPLASH_URL } from "data/constants";
import { WebPageJsonLd } from "next-seo";
import type { NextPage } from "next";

const License: NextPage = () => {
    return (
        <Layout>
            <Head>
                <title>License | H. Kamran</title>
            </Head>

            <WebPageJsonLd id={`${getBaseUrl()}/legal/license`} />

            <div className="mx-auto max-w-2xl">
                <Breadcrumbs
                    basePath="/"
                    baseLabel="Legal"
                    currentLabel="Privacy Policy"
                />

                <div className="space-y-2">
                    <h1 className="mx-auto text-center text-4xl font-semibold md:text-left">
                        License
                    </h1>
                    <h2 className="text-center text-xl font-light leading-snug text-gray-300 sm:text-left sm:text-2xl">
                        Last Updated: January 31, 2023
                    </h2>
                </div>

                <div className="prose prose-invert mt-6 max-w-none prose-a:text-pink-700">
                    <ul>
                        <li>
                            <strong>Attribution Required</strong>
                            <p>
                                You may use my content, provided you place my
                                name and a link to my website in a noticeable
                                area, such as under the title or in a sidebar.
                            </p>
                        </li>
                        <li>
                            <strong>No Advertising</strong>
                            <p>
                                You cannot place ads alongside any of my
                                content.
                            </p>
                        </li>
                        <li>
                            <strong>Editing</strong>
                            <p>
                                If you edit, revise, or modify any of my
                                content, my name should be listed first in the
                                list of authors.
                            </p>
                        </li>

                        <li>
                            <strong>
                                Commercial and Noncommercial Usage Allowed
                            </strong>
                            <p>
                                You may use the content on this site for both
                                commercial and noncommerical purposes, provided
                                you comply with the attribution requirement.
                            </p>
                        </li>
                        <li>
                            <strong>No Paywalls or Monetary Requirement</strong>
                            <p>
                                You <strong>may not</strong> redistribute my
                                content behind a paywall or any kind of monetary
                                requirement, sell my content, or place it behind
                                a paywall, without permission in writing from
                                me.
                            </p>
                        </li>
                        <li>
                            <strong>No Misleading Association</strong>
                            <p>
                                You <strong>may not</strong> use any of my
                                content to create misleading associations or
                                false endorsements with products and services.
                            </p>
                            <p>
                                Contact me at{" "}
                                <NavLink href="mailto:hkamran@hkamran.com?subject=Potential%20Sponsorship%2FEndorsement&body=Dear%20H.%20Kamran%2C%0D%0A%0D%0AI'd%20like%20to%20discuss%20a%20potential%20sponsorship%2Fendorsement%20of%20This%20Product.%0D%0A%0D%0ASincerely%2C%0D%0AYour%20Name%20Here">
                                    hkamran@hkamran.com
                                </NavLink>{" "}
                                if you want to consider a sponsored/promoted
                                feature.
                            </p>
                        </li>
                    </ul>

                    <p>
                        For the purposes of the this license, the term
                        &quot;content&quot; refers to any of my articles, notes,
                        programs, showcase items, photos<sup>1</sup>, or any
                        other content on this site.
                    </p>

                    <p>
                        I reserve the right to change the above terms at any
                        time without prior notification.
                    </p>

                    <p className="text-xs">
                        <sup>1</sup>: Photos distributed on{" "}
                        <NavLink href={UNSPLASH_URL}>Unsplash</NavLink> are
                        subject to the{" "}
                        <NavLink href="https://unsplash.com/license">
                            Unsplash License
                        </NavLink>
                        . Please provide attribution, even though it is not
                        required by the Unsplash License.
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default License;
