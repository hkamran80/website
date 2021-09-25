<script setup lang="ts">
import NavigationBar from "../components/NavigationBar.vue";
import PageHeader from "../components/PageHeader.vue";

import { initialize } from "../composables/theming";
const { switchTheme, background, headerTextColor } = initialize();

const props = defineProps<{
    title: string;
    twoGrid?: boolean
    noGrid?: boolean
}>();
</script>

<template>
    <div :class="[background]">
        <navigation-bar @update-theme="switchTheme" />

        <div class="pt-10 px-8 max-w-7xl mx-auto">
            <page-header
                :title="props.title"
                :header-text-color="headerTextColor"
                class="mb-4"
            />

            <div
                class="
                    mt-12
                    max-w-lg
                    mx-auto
                    grid
                    gap-5
                    lg:max-w-none
                "
                :class="[!props.twoGrid ? 'lg:grid-cols-3' : `lg:grid-cols-2`]"
                v-if="!props.noGrid"
            >
                <slot />
            </div>

            <div v-else>
                <slot />
            </div>
        </div>
    </div>
</template>
