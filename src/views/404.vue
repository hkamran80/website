<script setup lang="ts">
import { useTitle } from "@vueuse/core";

import NavigationBar from "../components/NavigationBar.vue";
import MainLayout from "../components/MainLayout.vue";

useTitle("Page Not Found | H. Kamran");
</script>

<template>
    <navigation-bar />

    <MainLayout centered>
        <div class="text-black dark:text-white">
            <h2 class="text-6xl font-bold">Page Not Found</h2>

            <div class="my-8 space-y-4 text-xl sm:text-2xl">
                <h3>Following's not really your style.</h3>
                <h3>
                    So, you found a page that doesn't exist. The question is,
                    what are you going to do next?
                </h3>
                <h3>
                    You shouldn't be here...unless it was for a reason. You're
                    not crazy. You just finally know what what you have to do.
                    And you know in your heart that it’s right.
                </h3>
            </div>

            <div
                class="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center text-xl"
            >
                <router-link
                    to="/"
                    class="bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 py-4 rounded-lg"
                >
                    Home
                </router-link>
                <router-link
                    to="/creations"
                    class="bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 py-4 rounded-lg"
                >
                    Creations
                </router-link>
                <router-link
                    to="/blog"
                    class="bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 py-4 rounded-lg"
                >
                    Blog
                </router-link>
                <router-link
                    to="/notes"
                    class="bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 py-4 rounded-lg"
                >
                    Notes
                </router-link>
                <router-link
                    to="/programs"
                    class="bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 py-4 rounded-lg"
                >
                    Programs
                </router-link>
                <router-link
                    to="/legal"
                    class="bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 py-4 rounded-lg"
                >
                    Legal
                </router-link>
            </div>

            <p class="mt-8 text-lg">
                Sometimes you gotta run before you can walk. So just pick an
                option.
            </p>
        </div>
    </MainLayout>
</template>
