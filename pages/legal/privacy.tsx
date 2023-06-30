import { WebPageJsonLd } from "next-seo";
import Head from "next/head";

import Layout from "@/components/Layout";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import NavLink from "@/components/navigation/NavLink";
import PageHeader from "@/components/pages/PageHeader";
import { getBaseUrl } from "@/lib/urls";
import type { NextPage } from "next";

const PrivacyPolicy: NextPage = () => (
    <Layout>
        <Head>
            <title>Privacy Policy | H. Kamran</title>
        </Head>

        <WebPageJsonLd id={`${getBaseUrl()}/legal/privacy`} />

        <div className="mx-auto max-w-2xl">
            <Breadcrumbs
                basePath="/"
                baseLabel="Legal"
                currentLabel="Privacy Policy"
            />

            <PageHeader
                name="Privacy Policy"
                description="Last Updated: March 3, 2022"
            />

            <div className="prose prose-invert mt-6 max-w-none prose-a:text-pink-700">
                <p>
                    Your privacy is important to me. It is my policy to respect
                    your privacy and comply with any applicable law and
                    regulation regarding any personal information I may collect
                    about you, including across my website,{" "}
                    <NavLink href="/">https://hkamran.com</NavLink>, and other
                    sites I own and operate.
                </p>

                <h3>Information I Collect</h3>
                <p>
                    Information I collect includes both information you
                    knowingly and actively provide me when using or
                    participating in any of my services and promotions, and any
                    information automatically sent by your devices in the course
                    of accessing my products and services.
                </p>

                <h4>Log Data</h4>
                <p>
                    When you visit my website, my servers may automatically log
                    the standard data provided by your web browser. It may
                    include your device&quot;s Internet Protocol (IP) address,
                    your browser type and version, the pages you visit, the time
                    and date of your visit, the time spent on each page, other
                    details about your visit, and technical details that occur
                    in conjunction with any errors you may encounter.
                </p>
                <p>
                    Please be aware that while this information may not be
                    personally identifying by itself, it may be possible to
                    combine it with other data to personally identify individual
                    persons.
                </p>

                <h4>Collection and Use of Information</h4>
                <p>
                    I may collect personal information from you when you do any
                    of the following on my website:
                </p>
                <ul>
                    <li>
                        Use a mobile device or web browser to access my content
                    </li>
                    <li>
                        Contact me via email, social media, or on any similar
                        technologies
                    </li>
                    <li>When you mention me on social media</li>
                </ul>
                <p>
                    I may collect, hold, use, and disclose information for the
                    following purposes, and personal information will not be
                    further processed in a manner that is incompatible with
                    these purposes:
                </p>

                <h4>Security of Your Personal Information</h4>
                <p>
                    When I collect and process personal information, and while I
                    retain this information, I will protect it within
                    commercially acceptable means to prevent loss and theft, as
                    well as unauthorized access, disclosure, copying, use, or
                    modification.
                </p>
                <p>
                    Although I will do my best to protect the personal
                    information you provide to me, I advise that no method of
                    electronic transmission or storage is 100% secure, and no
                    one can guarantee absolute data security. I will comply with
                    laws applicable to me in respect of any data breach.
                </p>
                <p>
                    You are responsible for selecting any password and its
                    overall security strength, ensuring the security of your own
                    information within the bounds of my services.
                </p>

                <h4>How Long I Keep Your Personal Information</h4>
                <p>
                    I keep your personal information only for as long as I need
                    to. This time period may depend on what I are using your
                    information for, in accordance with this privacy policy. If
                    your personal information is no longer required, I will
                    delete it or make it anonymous by removing all details that
                    identify you.
                </p>
                <p>
                    However, if necessary, I may retain your personal
                    information for my compliance with a reporting obligation or
                    for archiving purposes in the public interest, scientific,
                    or historical research purposes or statistical purposes.
                </p>

                <h3>Children&quot;s Privacy</h3>
                <p>
                    I do not aim any of my products or services directly at
                    children under the age of 13, and I do not knowingly collect
                    personal information about children under 13.
                </p>
                <h3>International Transfers of Personal Information</h3>
                <p>
                    The personal information I collect is stored and/or
                    processed where I or my partners, affiliates, and
                    third-party providers maintain facilities. Please be aware
                    that the locations to which I store, process, or transfer
                    your personal information may not have the same data
                    protection laws as the country in which you initially
                    provided the information. If I transfer your personal
                    information to third parties in other countries: (i) I will
                    perform those transfers in accordance with the requirements
                    of applicable law; and (ii) I will protect the transferred
                    personal information in accordance with this privacy policy.
                </p>

                <h3>Your Rights and Controlling Your Personal Information</h3>
                <p>
                    You always retain the right to withhold personal information
                    from me, with the understanding that your experience of my
                    website may be affected. I will not discriminate against you
                    for exercising any of your rights over your personal
                    information. If you do provide me with personal information
                    you understand that I will collect, hold, use and disclose
                    it in accordance with this privacy policy. You retain the
                    right to request details of any personal information I hold
                    about you.
                </p>
                <p>
                    If I receive personal information about you from a third
                    party, I will protect it as set out in this privacy policy.
                    If you are a third party providing personal information
                    about somebody else, you represent and warrant that you have
                    such person&quot;s consent to provide the personal
                    information to me.
                </p>
                <p>
                    If you have previously agreed to me using your personal
                    information for direct marketing purposes, you may change
                    your mind at any time. I will provide you with the ability
                    to unsubscribe from my email-database or opt out of
                    communications. Please be aware I may need to request
                    specific information from you to help me confirm your
                    identity.
                </p>
                <p>
                    If you believe that any information I hold about you is
                    inaccurate, out of date, incomplete, irrelevant, or
                    misleading, please contact me using the details provided in
                    this privacy policy. I will take reasonable steps to correct
                    any information found to be inaccurate, incomplete,
                    misleading, or out of date.
                </p>
                <p>
                    If you believe that I have breached a relevant data
                    protection law and wish to make a complaint, please contact
                    me using the details below and provide me with full details
                    of the alleged breach. I will promptly investigate your
                    complaint and respond to you, in writing, setting out the
                    outcome of my investigation and the steps I will take to
                    deal with your complaint. You also have the right to contact
                    a regulatory body or data protection authority in relation
                    to your complaint.
                </p>

                <h3>Limits of my Policy</h3>
                <p>
                    My websites may link to external sites that are not operated
                    by me. Please be aware that I have no control over the
                    content and policies of those sites, and cannot accept
                    responsibility or liability for their respective privacy
                    practices.
                </p>

                <h3>Changes to This Policy</h3>
                <p>
                    At my discretion, I may change my privacy policy to reflect
                    updates to my processes, current acceptable practices, or
                    legislative or regulatory changes. If I decide to change
                    this privacy policy, I will post the changes here at the
                    same link by which you are accessing this privacy policy.
                </p>
                <p>
                    If required by law, I will get your permission or give you
                    the opportunity to opt in to or opt out of, as applicable,
                    any new uses of your personal information.
                </p>

                <h3>Contact Me</h3>
                <p>
                    For any questions or concerns regarding your privacy, you
                    may contact me using the following details:
                </p>
                <p>
                    H. Kamran
                    <br />
                    <NavLink href=" mailto:hkamran@hkamran.com?subject=Question%20about%20the%20Privacy%20Policy&body=Dear%20H.%20Kamran%2C%0D%0A%0D%0AYour%20question%20here...%0D%0A%0D%0ASincerely%2C%0D%0AYour%20name%20here%0D%0AYour%20contact%20information">
                        hkamran@hkamran.com
                    </NavLink>
                </p>
            </div>
        </div>
    </Layout>
);

export default PrivacyPolicy;
