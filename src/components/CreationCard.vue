<script setup lang="ts">
import featherIcons from "feather-icons";
import { CreationContributor, CreationStatus } from "../models/creations";
import AnyLink from "./AnyLink.vue";

const props = defineProps<{
    name: string;
    description: string;
    url?: string;
    state: CreationStatus;
    repository?: string;
    contributors?: CreationContributor[];
}>();

const feather = featherIcons;
</script>

<template>
    <any-link
        :href="props.url || null"
        class="w-full bg-white dark:bg-gray-900 rounded-lg shadow divide-y divide-gray-200"
        :aria-label="props.name"
        :target="props.url && props.url.startsWith('/') ? '_self' : '_blank'"
        rel="noopener noreferrer"
    >
        <div class="w-full flex items-center justify-between p-6 space-x-6">
            <div class="flex-1">
                <div class="flex items-center space-x-3">
                    <h3
                        class="text-gray-900 dark:text-white text-md font-medium truncate"
                        v-text="props.name"
                    />
                    <span
                        class="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 dark:text-green-200 text-xs font-medium bg-green-100 dark:bg-green-900 rounded-full"
                        v-text="props.state"
                    />
                </div>
                <p
                    class="mt-2 text-gray-500 dark:text-gray-400 text-sm"
                    v-text="props.description"
                />

                <div
                    class="mt-4 flex items-center justify-center space-x-8 text-gray-500 dark:text-gray-400 text-sm"
                >
                    <a
                        v-if="props.repository"
                        :href="props.repository"
                        class="flex space-x-2 hover:text-gray-600 dark:hover:text-gray-300"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span
                            class="feather-icon"
                            v-html="feather.icons.github.toSvg()"
                        />
                        <span> View on GitHub </span>
                    </a>

                    <div
                        v-if="
                            props.contributors &&
                            Object.keys(props.contributors).length !== 0
                        "
                    >
                        <VDropdown :offset="[0, 16]">
                            <div
                                class="flex space-x-2 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                <span
                                    class="feather-icon"
                                    v-html="feather.icons.users.toSvg()"
                                />
                                <span> Contributors </span>
                            </div>

                            <template #popper>
                                <p
                                    v-for="contributor in props.contributors"
                                    :key="contributor.name"
                                >
                                    <a
                                        :href="contributor.link.url"
                                        :aria-label="contributor.link.title"
                                        target="_blank"
                                        rel="noopener noreferrer nofollow"
                                        class="underline"
                                        v-text="contributor.name"
                                    />
                                    - {{ contributor.role }}
                                </p>
                            </template>
                        </VDropdown>
                    </div>
                </div>
            </div>
        </div>
    </any-link>
</template>

<style scoped lang="postcss">
.feather-icon :deep(.feather) {
    @apply w-4;
}
</style>
