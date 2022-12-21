import Breadcrumbs from "@/components/Breadcrumbs";
import Head from "next/head";
import Layout from "@/components/Layout";
import { classNames } from "@hkamran/utility-web";
import { Listbox } from "@headlessui/react";
import { useEffect, useState } from "react";
import { WebPageJsonLd } from "next-seo";
import type { GetStaticProps, NextPage } from "next";
import {
    ChevronDown,
    Clock,
    Globe,
    Image as FeatherImage,
} from "react-feather";
import type { Release, ReleaseDetails } from "@/types/releaseNotes";

const downloadLinks = {
    Chrome: "https://github.com/hkamran80/nebula-new-tab#chromium-based-browsers-chrome-brave-etc",
    Firefox: "https://addons.mozilla.org/firefox/addon/nebula-new-tab/",
    Edge: "https://microsoftedge.microsoft.com/addons/detail/iagkoeigpdjjchjinnjjjgkanpcmknhj",
};
const jumpLinks = {
    "View on GitHub": "https://github.com/hkamran80/nebula-new-tab",
    "View Features": "#features",
    "View Changelog": "#changelog",
};

type Props = { changelog: Release[] };

const NebulaNewTab: NextPage<Props> = ({ changelog }) => {
    const [currentVersion, setCurrentVersion] = useState<Release | null>(null);
    const [screenshotElementValues, setScreenshotElementValues] = useState<{
        src: string;
        alt: string;
    }>({
        src: "nebula-new-tab-screenshot-chrome",
        alt: "Nebula Screenshot (Chrome)",
    });

    useEffect(() => {
        if (changelog) {
            setCurrentVersion(changelog[0]);
        }

        if (typeof window !== "undefined" && typeof document !== "undefined") {
            const browserPrefix = Object.values(
                window.getComputedStyle(document.documentElement),
            )
                .join("")
                .match(/-(moz|webkit|ms)/);

            if (browserPrefix && browserPrefix[1] === "moz") {
                setScreenshotElementValues({
                    src: "nebula-new-tab-screenshot-firefox",
                    alt: "Nebula Screenshot (Firefox)",
                });
            }
        }
    }, [changelog]);

    return (
        <>
            <Head>
                <title>Nebula New Tab | H. Kamran</title>
            </Head>

            <WebPageJsonLd
                id={`${
                    typeof window !== "undefined" && window.location.origin
                        ? window.location.origin
                        : ""
                }/showcase/nebula-new-tab`}
            />

            <Layout>
                <div className="mx-auto max-w-5xl">
                    <Breadcrumbs
                        basePath="/showcase"
                        baseLabel="Showcase"
                        currentLabel="Nebula New Tab"
                    />

                    <div className="space-y-2">
                        <h1 className="mx-auto text-center text-4xl font-semibold md:text-left">
                            Nebula New Tab
                        </h1>
                        <h2 className="text-center text-xl font-light leading-snug text-gray-300 sm:text-left sm:text-2xl">
                            A clean and simple new tab page
                        </h2>
                    </div>

                    <div className="mt-6">
                        <div>
                            <div className="mx-auto max-w-3xl">
                                <div
                                    id="download-buttons"
                                    className="mx-auto mt-8 grid grid-cols-1 gap-4 md:grid-cols-3"
                                >
                                    {Object.entries(downloadLinks).map(
                                        ([browser, link], index) => (
                                            <a
                                                key={index}
                                                href={link}
                                                target="_blank"
                                                className="rounded-full bg-hk-grey p-4 text-center font-medium text-white shadow-lg transition-colors duration-200 ease-in-out hover:text-purple-400"
                                                rel="noopener noreferrer"
                                            >
                                                Install in {browser}
                                            </a>
                                        ),
                                    )}
                                </div>

                                <div className="my-5 mx-auto grid grid-cols-1 gap-4 md:grid-cols-3">
                                    {Object.entries(jumpLinks).map(
                                        ([label, link], index) => (
                                            // eslint-disable-next-line react/jsx-no-target-blank
                                            <a
                                                key={index}
                                                href={link}
                                                target={
                                                    link.startsWith("http")
                                                        ? "_blank"
                                                        : ""
                                                }
                                                rel={
                                                    link.startsWith("http")
                                                        ? "noopener noreferrer"
                                                        : ""
                                                }
                                                className="rounded-lg bg-purple-900 p-2 text-center text-white transition-colors duration-200 ease-in-out hover:bg-purple-800"
                                            >
                                                {label}
                                            </a>
                                        ),
                                    )}
                                </div>
                            </div>

                            <picture className="inline-block">
                                <source
                                    srcSet={`/nebula-new-tab/${screenshotElementValues.src}.avif`}
                                    type="image/avif"
                                    width="1920"
                                    height="1080"
                                />
                                <source
                                    srcSet={`/nebula-new-tab/${screenshotElementValues.src}.webp`}
                                    type="image/webp"
                                    width="1920"
                                    height="1080"
                                />
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={`/nebula-new-tab/${screenshotElementValues.src}.png`}
                                    alt={screenshotElementValues.alt}
                                    loading="lazy"
                                    decoding="async"
                                    width="1920"
                                    height="1080"
                                />
                            </picture>

                            <div id="features" className="py-12">
                                <div className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 sm:pb-12 lg:flex lg:justify-between lg:px-8">
                                    <div className="max-w-xl">
                                        <h2 className="text-2xl font-bold text-gray-100 sm:text-5xl sm:tracking-tight lg:text-4xl">
                                            Features
                                        </h2>
                                    </div>
                                </div>

                                <div className="mx-auto max-w-xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                                    <dl className="space-y-10 lg:grid lg:grid-cols-4 lg:gap-8 lg:space-y-0">
                                        <div>
                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-900 text-white">
                                                <Clock />
                                            </div>
                                            <div className="mt-5">
                                                <dt className="text-lg font-medium leading-6 text-gray-100">
                                                    Time and Date
                                                </dt>
                                                <dd className="mt-2 text-base text-gray-500">
                                                    A key feature of Nebula
                                                </dd>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-900 text-white">
                                                <FeatherImage />
                                            </div>
                                            <div className="mt-5">
                                                <dt className="text-lg font-medium leading-6 text-gray-100">
                                                    Background Images
                                                </dt>
                                                <dd className="mt-2 text-base text-gray-500">
                                                    Powered by{" "}
                                                    <a
                                                        href="https://unsplash.com/?utm_source=nebula-new-tab&utm_medium=referral"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="underline"
                                                    >
                                                        Unsplash
                                                    </a>
                                                    ,{" "}
                                                    <a
                                                        href="https://unsplash.com/collections/935518/night-sky?utm_source=nebula-new-tab&utm_medium=referral"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="underline"
                                                    >
                                                        these background images
                                                    </a>{" "}
                                                    are clean and simple, just
                                                    like Nebula
                                                    <p className="mt-1 text-sm">
                                                        Backgrounds refresh
                                                        every twelve hours or
                                                        manually in settings
                                                    </p>
                                                </dd>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-900 text-white">
                                                <Globe />
                                            </div>
                                            <div className="mt-5">
                                                <dt className="text-lg font-medium leading-6 text-gray-100">
                                                    Top Sites
                                                </dt>
                                                <dd className="mt-2 text-base text-gray-500">
                                                    View your top visited sites
                                                    in Nebula
                                                    <p className="mt-1 text-sm">
                                                        This feature can be
                                                        turned on from the
                                                        settings menu
                                                    </p>
                                                </dd>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-900 text-white">
                                                <Clock />
                                            </div>
                                            <div className="mt-5">
                                                <dt className="text-lg font-medium leading-6 text-gray-100">
                                                    24-Hour Time
                                                </dt>
                                                <dd className="mt-2 text-base text-gray-500">
                                                    An essential feature in many
                                                    people&quot;s eyes
                                                    <p className="mt-1 text-sm">
                                                        This feature can be
                                                        turned on from the
                                                        settings menu
                                                    </p>
                                                </dd>
                                            </div>
                                        </div>
                                    </dl>
                                </div>
                            </div>

                            <div id="changelog" className="py-12">
                                <div className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 sm:pb-8 lg:flex lg:justify-between lg:px-8">
                                    <div className="max-w-xl">
                                        <h2 className="text-2xl font-bold text-gray-100 sm:text-5xl sm:tracking-tight lg:text-4xl">
                                            Changelog
                                        </h2>

                                        {currentVersion && (
                                            <p className="mt-3 mb-6 text-xl text-gray-400 sm:mb-0">
                                                {currentVersion.date}
                                            </p>
                                        )}
                                    </div>

                                    <div className="w-full max-w-xs md:mt-5">
                                        <div className="w-xs">
                                            <Listbox
                                                value={currentVersion}
                                                onChange={setCurrentVersion}
                                            >
                                                <div className="relative mt-1">
                                                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-hk-grey py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-500 sm:text-sm">
                                                        <span className="block truncate">
                                                            Version{" "}
                                                            {
                                                                currentVersion?.version
                                                            }
                                                        </span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400">
                                                            <ChevronDown className="h-5 w-5" />
                                                        </span>
                                                    </Listbox.Button>

                                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-hk-grey py-1 text-base shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none sm:text-sm">
                                                        {changelog.map(
                                                            (
                                                                version,
                                                                index,
                                                            ) => (
                                                                <Listbox.Option
                                                                    key={index}
                                                                    className={({
                                                                        active,
                                                                    }) =>
                                                                        classNames(
                                                                            "relative cursor-default select-none py-2 px-4 text-gray-100 transition-colors duration-200",
                                                                            active
                                                                                ? "bg-purple-900"
                                                                                : "",
                                                                        )
                                                                    }
                                                                    value={
                                                                        version
                                                                    }
                                                                >
                                                                    {({
                                                                        selected,
                                                                    }) => (
                                                                        <span
                                                                            className={classNames(
                                                                                "block truncate",
                                                                                selected
                                                                                    ? "font-medium"
                                                                                    : "font-normal",
                                                                            )}
                                                                        >
                                                                            Version{" "}
                                                                            {
                                                                                version.version
                                                                            }
                                                                        </span>
                                                                    )}
                                                                </Listbox.Option>
                                                            ),
                                                        )}
                                                    </Listbox.Options>
                                                </div>
                                            </Listbox>
                                        </div>
                                    </div>
                                </div>

                                <div className="prose prose-invert mx-auto max-w-xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                                    <ul>
                                        {currentVersion &&
                                            currentVersion.changelog.map(
                                                (change, index) => (
                                                    <li key={index}>
                                                        {change}
                                                    </li>
                                                ),
                                            )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

// TODO: Convert to Incremental Static Regeneration
export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch("https://raw.hkamran.com/changelog/nebula-new-tab");
    const rawChangelog = (await res.json()) as ReleaseDetails[];

    const changelog = Object.entries(rawChangelog)
        .reverse()
        .map(([version, release]) => {
            return {
                version,
                date: new Date(
                    `${release.releaseDate}T20:00:00`,
                ).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
                changelog: release.changelog,
            };
        });

    return { props: { changelog } };
};

export default NebulaNewTab;
