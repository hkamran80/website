<script setup lang="ts">
import feather from "feather-icons";
import { useToggle } from "@vueuse/core";
import { isDark } from "../composables/dark";

const toggleDark = useToggle(isDark);
</script>

<template>
    <button @click="toggleDark">
        <span v-html="feather.icons[isDark ? 'moon' : 'sun'].toSvg()" />
    </button>
</template>
