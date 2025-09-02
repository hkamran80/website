import { WebPageJsonLd } from "next-seo";
import Head from "next/head";

import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import NavLink from "@/components/navigation/NavLink";
import PageHeader from "@/components/pages/PageHeader";
import { UNSPLASH_URL } from "@/data/constants";
import { getBaseUrl } from "@/lib/urls";
import type { NextPage } from "next";

const License: NextPage = () => (
    <Layout>
        <Head>
            <title>License | H. Kamran</title>
        </Head>

        <WebPageJsonLd id={`${getBaseUrl()}/legal/license`} />

        <div className="mx-auto max-w-2xl">
            <Breadcrumbs
                basePath="/"
                baseLabel="Legal"
                currentLabel="License"
            />

            <PageHeader
                name="License"
                description="Last Updated: September 2, 2025"
            />

            <div className="prose prose-invert mt-6 max-w-none prose-a:text-pink-700">
                <p>
                    Unless otherwise noted, the copyright of all content on this
                    site (and its redirects) belongs to H. Kamran. This
                    includes, but is not limited to, text and images, visual
                    design, source code, articles, notes, programs, showcase
                    items, photos, and any other content on this site.
                </p>

                <p>Copyright &copy; 2025 H. Kamran. All rights reserved.</p>

                <hr />

                <ul>
                    <li>
                        <strong>Attribution Required</strong>
                        <p>
                            You may use my content, provided you place my name
                            and a link to my website in a noticeable area, such
                            as under the title or in a sidebar.
                        </p>
                    </li>
                    <li>
                        <strong>No Advertising</strong>
                        <p>You cannot place ads alongside any of my content.</p>
                    </li>
                    <li>
                        <strong>Editing</strong>
                        <p>
                            If you edit, revise, or modify any of my content, my
                            name should be listed first in the list of authors.
                        </p>
                    </li>

                    <li>
                        <strong>
                            Commercial and Noncommercial Usage Allowed
                        </strong>
                        <p>
                            You may use the content on this site for both
                            commercial and noncommerical purposes, provided you
                            comply with the attribution requirement.
                        </p>
                    </li>
                    <li>
                        <strong>No Paywalls or Monetary Requirement</strong>
                        <p>
                            You <strong>may not</strong> redistribute my content
                            behind a paywall or any kind of monetary
                            requirement, sell my content, or place it behind a
                            paywall, without permission in writing from me.
                        </p>
                    </li>
                    <li>
                        <strong>No Misleading Association</strong>
                        <p>
                            You <strong>may not</strong> use any of my content
                            to create misleading associations or false
                            endorsements with products and services.
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
                    I reserve the right to change the above terms at any time
                    without prior notification.
                </p>

                <p className="text-xs">
                    Photos distributed on{" "}
                    <NavLink href={UNSPLASH_URL}>Unsplash</NavLink> are subject
                    to the{" "}
                    <NavLink href="https://unsplash.com/license">
                        Unsplash License
                    </NavLink>
                    . Attribution is strongly recommended.
                </p>

                <hr />

                <h3 id="ai-license">&quot;AI&quot; License</h3>
                <p>
                    Content may be licensed for &quot;AI&quot;-related use. A
                    license is required on a per-project basis for purposes
                    including, but not limited to, &quot;artificial
                    intelligence&quot;, vibe coding, data mining, data indexing,
                    data hoarding, deep learning, machine learning, large
                    language models, small language models, neural networks, and
                    development and training of any &quot;AI&quot;-related
                    software.
                </p>

                <h4 id="ai-license-fees">License Fees</h4>
                <p>There are two license fee options available.</p>
                <ul>
                    <li>
                        Single license fee of $100,000.00 (one hundred thousand
                        USD) for all content
                    </li>
                    <li>
                        $1.00 (one USD) per Unicode character of content (UTF-8)
                    </li>
                </ul>

                <p>United States Dollars (USD) only. No cryptocurrency.</p>

                <p className="text-xs">
                    For the purposes of this section only, &quot;content&quot;
                    refers to any content published on or before the date of
                    purchase.
                </p>

                <h4 id="ai-license-terms-and-conditions">
                    Terms and Conditions
                </h4>
                <p>
                    You accept and agree to these license terms by downloading,
                    cloning, extracting, mirroring, ripping, photographing,
                    scraping, syndicating, or by otherwise copying content from
                    this website for &quot;AI&quot; related use as defined
                    above.
                </p>

                <p>
                    Content is provided &quot;as is&quot; without warranty. You
                    are responsible for obtaining any content you want to
                    license. I will not provide assistance or support. I do not
                    guarantee the accuracy or quality of content. I do not
                    guarantee that any content will remain accessible. This
                    license does not include any new or edited content after the
                    date of purchase. I will not be liable for any damages
                    arising from use of the content. All license fees are
                    non-refundable. I reserve the right to refuse or revoke this
                    license at any time.
                </p>

                <p>
                    You must email hkamran@hkamran.com within 30 days of
                    accepting these terms. Please include your project and
                    business details, content usage, and the license fee you
                    want to pay. I will reply to your email with a PDF invoice
                    attached. The invoice must be paid within 30 days.
                </p>

                <p>
                    By accessing this website and obtaining content for
                    &quot;AI&quot;-related purposes, you automatically opt-in
                    and agree to these terms.
                </p>
            </div>
        </div>
    </Layout>
);

export default License;
