<script setup lang="ts">
import { Contributors } from "../interfaces/Contributor";
import SimpleSvgButton from "./SimpleSvgButton.vue";

const props = defineProps<{
    name: string;
    description: string;
    url?: string;
    state: string;
    github?: string;
    contributors?: object;
}>();
const emit = defineEmits<{
    (e: "openContributors", creation: string, contributors: Contributors): void;
}>();

const githubPath =
    "M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z";
const contributorsPath =
    "M12,5A3.5,3.5 0 0,0 8.5,8.5A3.5,3.5 0 0,0 12,12A3.5,3.5 0 0,0 15.5,8.5A3.5,3.5 0 0,0 12,5M12,7A1.5,1.5 0 0,1 13.5,8.5A1.5,1.5 0 0,1 12,10A1.5,1.5 0 0,1 10.5,8.5A1.5,1.5 0 0,1 12,7M5.5,8A2.5,2.5 0 0,0 3,10.5C3,11.44 3.53,12.25 4.29,12.68C4.65,12.88 5.06,13 5.5,13C5.94,13 6.35,12.88 6.71,12.68C7.08,12.47 7.39,12.17 7.62,11.81C6.89,10.86 6.5,9.7 6.5,8.5C6.5,8.41 6.5,8.31 6.5,8.22C6.2,8.08 5.86,8 5.5,8M18.5,8C18.14,8 17.8,8.08 17.5,8.22C17.5,8.31 17.5,8.41 17.5,8.5C17.5,9.7 17.11,10.86 16.38,11.81C16.5,12 16.63,12.15 16.78,12.3C16.94,12.45 17.1,12.58 17.29,12.68C17.65,12.88 18.06,13 18.5,13C18.94,13 19.35,12.88 19.71,12.68C20.47,12.25 21,11.44 21,10.5A2.5,2.5 0 0,0 18.5,8M12,14C9.66,14 5,15.17 5,17.5V19H19V17.5C19,15.17 14.34,14 12,14M4.71,14.55C2.78,14.78 0,15.76 0,17.5V19H3V17.07C3,16.06 3.69,15.22 4.71,14.55M19.29,14.55C20.31,15.22 21,16.06 21,17.07V19H24V17.5C24,15.76 21.22,14.78 19.29,14.55M12,16C13.53,16 15.24,16.5 16.23,17H7.77C8.76,16.5 10.47,16 12,16Z";

const openUrl = (url: string) => window.open(url, "_blank");

const contributors = {} as Contributors;
const openContributors = () =>
    emit("openContributors", props.name, contributors);
if (props.contributors) {
    Object.entries(props.contributors).forEach(([contributor, details]) => {
        contributors[contributor] = {
            role: details.role,
            link: {
                title: details.link.title,
                url: details.link.url,
                iconPath: details.link.icon,
            },
        };
    });
}
</script>

<template>
    <div
        class="
            w-full
            bg-white
            dark:bg-gray-700
            rounded-lg
            shadow
            divide-y divide-gray-200 dark:divide-gray-800
        "
        :class="[props.url ? 'cursor-pointer' : '']"
        :title="props.name"
        @click="props.url ? openUrl(props.url) : null"
    >
        <div class="w-full flex items-center justify-between p-6 space-x-6">
            <div class="flex-1">
                <div class="flex items-center space-x-3">
                    <h3
                        class="
                            text-gray-900
                            dark:text-white
                            text-md
                            font-medium
                            truncate
                        "
                        v-text="props.name"
                    />
                    <span
                        class="
                            flex-shrink-0
                            inline-block
                            px-2
                            py-0.5
                            text-green-800
                            dark:text-green-200
                            text-xs
                            font-medium
                            bg-green-100
                            dark:bg-green-900
                            rounded-full
                        "
                        v-text="props.state"
                    />
                </div>
                <p
                    class="mt-1 text-gray-500 dark:text-gray-400 text-sm"
                    v-text="props.description"
                />
            </div>
        </div>
        <div v-if="props.github || props.contributors">
            <div class="-mt-px flex divide-x divide-gray-200">
                <div class="w-0 flex-1 flex" v-if="props.github">
                    <a
                        :href="props.github"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="
                            relative
                            -mr-px
                            w-0
                            flex-1
                            inline-flex
                            items-center
                            justify-center
                            py-4
                            text-sm text-gray-700
                            dark:text-gray-300
                            font-medium
                            border border-transparent
                            rounded-bl-lg
                            hover:text-gray-500
                            dark:hover:text-gray-200
                        "
                    >
                        <simple-svg-button
                            class="w-5 h-5 text-gray-400 dark:text-gray-600"
                            :path="githubPath"
                        />

                        <span class="ml-2"> View on GitHub </span>
                    </a>
                </div>
                <div
                    class="-ml-px w-0 flex-1 flex"
                    v-if="props.contributors"
                    @click="openContributors"
                >
                    <span
                        class="
                            relative
                            -mr-px
                            w-0
                            flex-1
                            inline-flex
                            items-center
                            justify-center
                            py-4
                            text-sm text-gray-700
                            dark:text-gray-300
                            font-medium
                            border border-transparent
                            rounded-bl-lg
                            hover:text-gray-500
                            dark:hover:text-gray-200
                        "
                    >
                        <simple-svg-button
                            class="w-5 h-5 text-gray-400 dark:text-gray-600"
                            :path="contributorsPath"
                        />
                        <span class="ml-2"> Contributors </span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
