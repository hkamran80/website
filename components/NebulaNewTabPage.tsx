import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import Image from "next/image";
import {
    ChevronDown,
    Clock,
    Globe,
    Image as FeatherImage,
} from "react-feather";
import type { Release, ReleaseDetails } from "../types/releaseNotes";
import { classNames } from "../util/classNames";

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

const changelog = Object.entries<ReleaseDetails>(
    await (
        await fetch("https://raw.hkamran.com/changelog/nebula-new-tab")
    ).json(),
)
    .reverse()
    .map((release) => {
        return {
            version: release[0],
            date: new Date(
                `${release[1].releaseDate}T20:00:00`,
            ).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
            changelog: release[1].changelog,
        };
    });

// Screenshot
const browserPrefix = Object.values(
    window.getComputedStyle(document.documentElement),
)
    .join("")
    .match(/-(moz|webkit|ms)/);

const NebulaNewTabPage = () => {
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

        if (browserPrefix && browserPrefix[1] === "moz") {
            setScreenshotElementValues({
                src: "nebula-new-tab-screenshot-firefox",
                alt: "Nebula Screenshot (Firefox)",
            });
        }
    }, []);

    return (
        <div>
            <div className="max-w-3xl mx-auto">
                <div
                    id="download-buttons"
                    className="mt-8 mx-auto grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                    {Object.entries(downloadLinks).map(
                        ([browser, link], index) => (
                            <a
                                key={index}
                                href={link}
                                target="_blank"
                                className="text-center bg-hk-grey text-white hover:text-purple-400 transition-colors duration-200 ease-in-out font-medium p-4 rounded-full shadow-lg"
                                rel="noopener noreferrer"
                            >
                                Install in {browser}
                            </a>
                        ),
                    )}
                </div>

                <div className="my-5 mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(jumpLinks).map(([label, link], index) => (
                        // eslint-disable-next-line react/jsx-no-target-blank
                        <a
                            key={index}
                            href={link}
                            target={link.startsWith("http") ? "_blank" : ""}
                            rel={
                                link.startsWith("http")
                                    ? "noopener noreferrer"
                                    : ""
                            }
                            className="text-center bg-purple-900 hover:bg-purple-800 transition-colors duration-200 ease-in-out p-2 rounded-lg text-white"
                        >
                            {label}
                        </a>
                    ))}
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
                <div className="max-w-7xl mx-auto pb-6 px-4 sm:pb-12 sm:px-6 lg:px-8 lg:flex lg:justify-between">
                    <div className="max-w-xl">
                        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-5xl sm:tracking-tight lg:text-4xl">
                            Features
                        </h2>
                    </div>
                </div>

                <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-8">
                        <div>
                            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-900 text-white">
                                <Clock />
                            </div>
                            <div className="mt-5">
                                <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                                    Time and Date
                                </dt>
                                <dd className="mt-2 text-base text-gray-500">
                                    A key feature of Nebula
                                </dd>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-900 text-white">
                                <FeatherImage />
                            </div>
                            <div className="mt-5">
                                <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
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
                                    are clean and simple, just like Nebula
                                    <p className="text-sm mt-1">
                                        Backgrounds refresh every twelve hours
                                        or manually in settings
                                    </p>
                                </dd>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-900 text-white">
                                <Globe />
                            </div>
                            <div className="mt-5">
                                <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                                    Top Sites
                                </dt>
                                <dd className="mt-2 text-base text-gray-500">
                                    View your top visited sites in Nebula
                                    <p className="text-sm mt-1">
                                        This feature can be turned on from the
                                        settings menu
                                    </p>
                                </dd>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-900 text-white">
                                <Clock />
                            </div>
                            <div className="mt-5">
                                <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                                    24-Hour Time
                                </dt>
                                <dd className="mt-2 text-base text-gray-500">
                                    An essential feature in many people&quot;s
                                    eyes
                                    <p className="text-sm mt-1">
                                        This feature can be turned on from the
                                        settings menu
                                    </p>
                                </dd>
                            </div>
                        </div>
                    </dl>
                </div>
            </div>

            <div id="changelog" className="py-12">
                <div className="max-w-7xl mx-auto pb-6 px-4 sm:pb-8 sm:px-6 lg:px-8 lg:flex lg:justify-between">
                    <div className="max-w-xl">
                        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-5xl sm:tracking-tight lg:text-4xl">
                            Changelog
                        </h2>

                        {currentVersion && (
                            <p className="mt-3 mb-6 sm:mb-0 text-xl text-gray-600 dark:text-gray-400">
                                {currentVersion.date}
                            </p>
                        )}
                    </div>

                    <div className="md:mt-5 w-full max-w-xs">
                        <div className="w-xs">
                            <Listbox
                                value={currentVersion}
                                onChange={setCurrentVersion}
                            >
                                <div className="relative mt-1">
                                    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-hk-grey rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-indigo-500 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                        <span className="block truncate">
                                            Version {currentVersion?.version}
                                        </span>
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-400">
                                            <ChevronDown className="w-5 h-5" />
                                        </span>
                                    </Listbox.Button>

                                    <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-hk-grey rounded-lg shadow-lg max-h-60 ring-1 ring-white ring-opacity-5 focus:outline-none sm:text-sm">
                                        {changelog.map((version, index) => (
                                            <Listbox.Option
                                                key={index}
                                                className={({ active }) =>
                                                    classNames(
                                                        "cursor-default select-none relative py-2 px-4 transition-colors duration-200 text-gray-100",
                                                        active
                                                            ? "bg-purple-900"
                                                            : "",
                                                    )
                                                }
                                                value={version}
                                            >
                                                {({ selected }) => (
                                                    <span
                                                        className={classNames(
                                                            "block truncate",
                                                            selected
                                                                ? "font-medium"
                                                                : "font-normal",
                                                        )}
                                                    >
                                                        Version{" "}
                                                        {version.version}
                                                    </span>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </div>
                            </Listbox>
                        </div>
                    </div>
                </div>

                <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 prose prose-invert">
                    <ul>
                        {currentVersion &&
                            currentVersion.changelog.map((change, index) => (
                                <li key={index}>{change}</li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NebulaNewTabPage;
