<script setup lang="ts">
import { useTitle } from "@vueuse/core";

import NavigationBar from "../components/NavigationBar.vue";
import MainLayout from "../components/MainLayout.vue";
import PageHeader from "../components/PageHeader.vue";

useTitle("Legal | H. Kamran");
</script>

<template>
    <navigation-bar />

    <main-layout centered>
        <page-header header="Legal" class="mb-7" />

        <div
            class="flex flex-col space-y-3 text-xl font-semibold text-gray-800 dark:text-gray-200 select-none"
        >
            <router-link
                to="/legal/license"
                class="hover:cursor-pointer dark:hover:cursor-pointer hover:text-pink-800 dark:hover:text-pink-600"
            >
                License
            </router-link>
            <router-link
                to="/legal/privacy"
                class="hover:cursor-pointer dark:hover:cursor-pointer hover:text-pink-800 dark:hover:text-pink-600"
            >
                Privacy Policy
            </router-link>
        </div>
    </main-layout>
</template>
