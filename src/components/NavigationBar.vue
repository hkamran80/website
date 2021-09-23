<script setup lang="ts">
import { shallowRef } from "vue";
import DarkNavigationBar from "./DarkNavigationBar.vue";
import LightNavigationBar from "./LightNavigationBar.vue";
import { darkCheck } from "../composables/darkTheme";

const navigationBar = shallowRef(
    darkCheck() ? DarkNavigationBar : LightNavigationBar
);

const emit = defineEmits<{
    (e: "updateTheme", state: boolean): void;
}>();

const flipNavigationBar = () => {
    navigationBar.value = darkCheck() ? DarkNavigationBar : LightNavigationBar;
    emit("updateTheme", darkCheck());
};
</script>

<template>
    <component :is="navigationBar" @update-theme="flipNavigationBar" />
</template>
