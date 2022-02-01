<script setup lang="ts">
import { ref } from "vue";
import _feather from "feather-icons";
import { useStore } from "vuex";
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from "@headlessui/vue";
import { Release, ReleaseDetails } from "../models/releaseNotes";

const feather = _feather;
const store = useStore();

const downloadLinks = {
    Chrome: "https://github.com/hkamran80/nebula-new-tab#chromium-based-browsers-chrome-brave-etc",
    Firefox: "https://addons.mozilla.org/firefox/addon/nebula-new-tab/",
    "Microsoft Edge":
        "https://microsoftedge.microsoft.com/addons/detail/iagkoeigpdjjchjinnjjjgkanpcmknhj",
};

// Changelog
const months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const humanizeDate = (isoDateString: string): string => {
    const [year, month, day] = isoDateString.split("-");
    return months[Number(month) - 1] + " " + Number(day) + ", " + year;
};

const currentVersion = ref<Release | null>(null);
if (
    Object.keys(store.state.creationChangelogs).indexOf("nebula-new-tab") === -1
) {
    fetch("https://raw.hkamran.com/changelog/nebula-new-tab")
        .then((response) => response.json())
        .then((json) => {
            let releases: Release[] = Object.entries<ReleaseDetails>(json)
                .reverse()
                .map((release) => {
                    return {
                        version: release[0],
                        date: humanizeDate(release[1].releaseDate),
                        changelog: release[1].changelog,
                    };
                });

            currentVersion.value = releases[0];

            store.commit("SAVE_CREATION_CHANGELOG", [
                "nebula-new-tab",
                releases,
            ]);
        })
        .catch((error) => {
            throw new Error(`API Error: ${error}`);
        });
} else {
    currentVersion.value = store.state.creationChangelogs["nebula-new-tab"][0];
}

// Screenshot
const screenshotElementValues = ref<{ src: string; alt: string }>({
    src: "https://hkamran80.github.io/nebula-new-tab/nebula-new-tab-screenshot-chrome.png",
    alt: "Nebula Screenshot (Chrome)",
});

const browserPrefix = Object.values(
    window.getComputedStyle(document.documentElement)
)
    .join("")
    .match(/-(moz|webkit|ms)/);

if (browserPrefix && browserPrefix[1] === "moz") {
    screenshotElementValues.value.src =
        "https://hkamran80.github.io/nebula-new-tab/nebula-new-tab-screenshot-firefox.png";
    screenshotElementValues.value.alt = "Nebula Screenshot (Firefox)";
}
</script>

<template>
    <div class="max-w-3xl mx-auto">
        <div
            id="download-buttons"
            class="mt-8 md:space-x-4 max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
        >
            <a
                v-for="(link, browser) in downloadLinks"
                :key="browser"
                :href="link"
                rel="noopener noreferrer"
                target="_blank"
                v-text="`Install in ${browser}`"
                class="mt-3 text-center flex items-center bg-white dark:bg-gray-900 text-black dark:text-white rounded-full font-medium group p-4 px-6 shadow-lg hover:text-purple-600 dark:hover:text-purple-400"
            />
        </div>

        <div
            class="my-5 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4"
        >
            <a
                href="https://github.com/hkamran80/nebula-new-tab"
                target="_blank"
                class="text-center bg-purple-900 p-2 px-4 rounded-md text-white"
            >
                View on GitHub
            </a>

            <a
                href="#features"
                class="text-center bg-purple-900 p-2 px-4 rounded-md text-white"
            >
                View Features
            </a>

            <a
                href="#changelog"
                class="text-center bg-purple-900 p-2 px-4 rounded-md text-white"
            >
                View Changelog
            </a>
        </div>
    </div>

    <img
        id="nebula-screenshot"
        class="mx-auto"
        :src="screenshotElementValues.src"
        :alt="screenshotElementValues.alt"
        width="1920"
        height="1080"
    />

    <div id="features" class="py-12">
        <div
            class="max-w-7xl mx-auto pb-6 px-4 sm:pb-12 sm:px-6 lg:px-8 lg:flex lg:justify-between"
        >
            <div class="max-w-xl">
                <h2
                    class="text-2xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-5xl sm:tracking-tight lg:text-4xl"
                >
                    Features
                </h2>
            </div>
        </div>

        <div class="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <dl class="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-8">
                <div>
                    <div
                        class="flex items-center justify-center h-12 w-12 rounded-md bg-purple-900 text-white"
                        v-html="feather.icons.clock.toSvg()"
                    />
                    <div class="mt-5">
                        <dt
                            class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100"
                        >
                            Time and Date
                        </dt>
                        <dd class="mt-2 text-base text-gray-500">
                            A key feature of Nebula
                        </dd>
                    </div>
                </div>

                <div>
                    <div
                        class="flex items-center justify-center h-12 w-12 rounded-md bg-purple-900 text-white"
                        v-html="feather.icons.image.toSvg()"
                    />
                    <div class="mt-5">
                        <dt
                            class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100"
                        >
                            Background Images
                        </dt>
                        <dd class="mt-2 text-base text-gray-500">
                            Powered by
                            <a
                                href="https://unsplash.com/?utm_source=nebula-new-tab&utm_medium=referral"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="underline"
                            >
                                Unsplash </a
                            >,
                            <a
                                href="https://unsplash.com/collections/935518/night-sky?utm_source=nebula-new-tab&utm_medium=referral"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="underline"
                            >
                                these background images
                            </a>
                            are clean and simple, just like Nebula

                            <p class="text-sm mt-1">
                                Backgrounds refresh every 12 hours or manually
                                in settings
                            </p>
                        </dd>
                    </div>
                </div>

                <div>
                    <div
                        class="flex items-center justify-center h-12 w-12 rounded-md bg-purple-900 text-white"
                        v-html="feather.icons.globe.toSvg()"
                    />
                    <div class="mt-5">
                        <dt
                            class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100"
                        >
                            Top Sites
                        </dt>
                        <dd class="mt-2 text-base text-gray-500">
                            View your top visited sites in Nebula

                            <p class="text-sm mt-1">
                                This feature can be turned on from the settings
                                menu
                            </p>
                        </dd>
                    </div>
                </div>

                <div>
                    <div
                        class="flex items-center justify-center h-12 w-12 rounded-md bg-purple-900 text-white"
                        v-html="feather.icons.clock.toSvg()"
                    />
                    <div class="mt-5">
                        <dt
                            class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100"
                        >
                            24-Hour Time
                        </dt>
                        <dd class="mt-2 text-base text-gray-500">
                            An essential feature in many people's eyes

                            <p class="text-sm mt-1">
                                This feature can be turned on from the settings
                                menu
                            </p>
                        </dd>
                    </div>
                </div>
            </dl>
        </div>
    </div>

    <div
        id="changelog"
        class="py-12"
        v-if="
            Object.keys(store.state.creationChangelogs).indexOf(
                'nebula-new-tab'
            ) !== -1 && currentVersion
        "
    >
        <div
            class="max-w-7xl mx-auto pb-6 px-4 sm:pb-8 sm:px-6 lg:px-8 lg:flex lg:justify-between"
        >
            <div class="max-w-xl">
                <h2
                    class="text-2xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-5xl sm:tracking-tight lg:text-4xl"
                >
                    Changelog
                </h2>

                <p
                    class="mt-3 mb-6 sm:mb-0 text-xl text-gray-600 dark:text-gray-400"
                    v-if="currentVersion"
                    v-text="currentVersion.date"
                />
            </div>
            <div class="md:mt-5 w-full max-w-xs">
                <div class="w-xs">
                    <Listbox v-model="currentVersion"
                        ><div class="relative mt-1">
                            <ListboxButton
                                class="relative w-full py-2 pl-3 pr-10 text-left bg-white dark:bg-gray-900 rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
                            >
                                <span class="block truncate">
                                    Version {{ currentVersion.version }}
                                </span>
                                <span
                                    class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none w-8 h-8 text-gray-400"
                                    v-html="
                                        feather.icons['chevron-down'].toSvg()
                                    "
                                />
                            </ListboxButton>

                            <transition
                                leave-active-class="transition duration-100 ease-in"
                                leave-from-class="opacity-100"
                                leave-to-class="opacity-0"
                            >
                                <ListboxOptions
                                    class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white dark:bg-gray-900 rounded-md shadow-lg max-h-60 ring-1 ring-black dark:ring-white ring-opacity-5 focus:outline-none sm:text-sm"
                                >
                                    <ListboxOption
                                        v-slot="{ active, selected }"
                                        v-for="version in store.state
                                            .creationChangelogs[
                                            'nebula-new-tab'
                                        ]"
                                        :key="version.version"
                                        :value="version"
                                        as="template"
                                    >
                                        <li
                                            :class="[
                                                active
                                                    ? 'text-purple-900 dark:text-gray-100 bg-purple-100 dark:bg-purple-900'
                                                    : 'text-gray-900 dark:text-gray-100',
                                                'cursor-default select-none relative py-2 px-4',
                                            ]"
                                        >
                                            <span
                                                :class="[
                                                    selected
                                                        ? 'font-medium'
                                                        : 'font-normal',
                                                    'block truncate',
                                                ]"
                                            >
                                                Version
                                                {{ version.version }}
                                            </span>
                                        </li>
                                    </ListboxOption>
                                </ListboxOptions>
                            </transition>
                        </div>
                    </Listbox>
                </div>
            </div>
        </div>

        <div class="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <ul class="list-disc list-inside">
                <li
                    v-for="change in currentVersion.changelog"
                    :key="change"
                    v-text="change"
                />
            </ul>
        </div>
    </div>
</template>
