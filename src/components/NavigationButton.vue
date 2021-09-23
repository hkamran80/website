<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { initialize } from "../composables/darkTheme";
const { darkMode } = initialize();
const props = defineProps<{ to: string; content: string; active?: boolean }>();

const themeClasses = {
    light: ["inline-flex", "items-center", "px-1", "pt-1", "border-b-2"],
    dark: ["px-3", "py-2", "rounded-md"],
};

const state = {
    active: {
        light: ["border-pink-700", "dark:border-pink:500", "text-gray-900"],
        dark: ["bg-gray-900", "text-white"],
    },
    inactive: {
        light: [
            "border-transparent",
            "hover:border-gray-300",
            "text-gray-500",
            "hover:text-gray-700",
        ],
        dark: ["text-gray-300", "hover:bg-gray-700", "hover:text-white"],
    },
};

const themeClass = computed((): string =>
    darkMode.value ? themeClasses.dark.join(" ") : themeClasses.light.join(" ")
);
const stateClass = computed((): string => {
    if (darkMode.value) {
        if (props.active) {
            return state.active.dark.join(" ");
        } else {
            return state.inactive.dark.join(" ");
        }
    } else {
        if (props.active) {
            return state.active.light.join(" ");
        } else {
            return state.inactive.light.join(" ");
        }
    }
});
</script>

<template>
    <router-link
        :to="props.to"
        class="text-sm font-medium"
        :class="[themeClass, stateClass]"
        v-text="props.content"
    />
</template>
