<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useStore } from "vuex";
import Cosmic from "cosmicjs";

import { datePostsSortAscending } from "./utils/sort";
import { CREATIONS_URL } from "./data/constants";

const store = useStore();
const api = Cosmic();
const blogBucket = api.bucket({
    slug: import.meta.env.VITE_APP_COSMIC_BLOG_BUCKET_SLUG as string,
    read_key: import.meta.env.VITE_APP_COSMIC_BLOG_BUCKET_READ_KEY as string,
});
const notesBucket = api.bucket({
    slug: import.meta.env.VITE_APP_COSMIC_NOTES_BUCKET_SLUG as string,
    read_key: import.meta.env.VITE_APP_COSMIC_NOTES_BUCKET_READ_KEY as string,
});

blogBucket
    .getObjects({
        query: { type: "posts" },
        props: "slug,title,metadata,thumbnail,content",
    })
    .then((data: any) =>
        store.commit("SAVE_POSTS", data.objects.sort(datePostsSortAscending)),
    )
    .catch((error: any) => {
        throw new Error(`CosmicJS Error: ${error}`);
    });

blogBucket
    .getObjects({ query: { type: "tags" }, props: "slug,title,metadata" })
    .then((data: any) => store.commit("SAVE_TAGS", data.objects))
    .catch((error: any) => {
        throw new Error(`CosmicJS Error: ${error}`);
    });

notesBucket
    .getObjects({
        query: { type: "notes" },
        props: "slug,title,metadata,content",
    })
    .then((data: any) =>
        store.commit("SAVE_NOTES", data.objects.sort(datePostsSortAscending)),
    )
    .catch((error: any) => {
        throw new Error(`CosmicJS Error: ${error}`);
    });

notesBucket
    .getObjects({ query: { type: "tags" }, props: "slug,title,metadata" })
    .then((data: any) => store.commit("SAVE_NOTES_TAGS", data.objects))
    .catch((error: any) => {
        throw new Error(`CosmicJS Error: ${error}`);
    });

fetch(CREATIONS_URL)
    .then((response) => response.json())
    .then((json) => store.commit("SAVE_CREATIONS", json))
    .catch((error) => {
        throw new Error(`API Error: ${error}`);
    });
</script>

<template>
    <div class="bg-white dark:bg-black min-h-screen">
        <router-view />

        <footer>
            <div
                class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8"
            >
                <nav
                    class="-mx-5 -my-2 flex flex-wrap justify-center space-x-5"
                    aria-label="Footer"
                >
                    <div class="py-2">
                        <router-link
                            to="/creations"
                            class="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                            Creations
                        </router-link>
                    </div>

                    <div class="py-2">
                        <router-link
                            to="/blog"
                            class="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                            Blog
                        </router-link>
                    </div>

                    <div class="py-2">
                        <router-link
                            to="/notes"
                            class="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                            Notes
                        </router-link>
                    </div>

                    <div class="py-2">
                        <router-link
                            to="/programs"
                            class="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                            Programs
                        </router-link>
                    </div>
                </nav>

                <div class="mt-8 flex justify-center space-x-8">
                    <a
                        v-for="social in store.state.socials"
                        :key="social.name"
                        :href="social.url"
                        :aria-label="social.name"
                        target="_blank"
                        class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                        <span class="sr-only" v-text="social.name" />
                        <svg
                            class="h-6 w-6 fill-current"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path :d="social.svgPath"></path>
                        </svg>
                    </a>
                </div>

                <p
                    class="mt-8 text-center text-base text-gray-400 max-w-3xl mx-auto"
                >
                    Copyright © {{ new Date().getFullYear() }} H. Kamran. All
                    rights reserved.
                </p>

                <p
                    class="mt-2 text-center text-base underline text-gray-400 space-x-3"
                >
                    <router-link
                        to="/legal/license"
                        class="hover:text-gray-500 dark:hover:text-gray-300"
                    >
                        License
                    </router-link>

                    <router-link
                        to="/legal/privacy"
                        class="hover:text-gray-500 dark:hover:text-gray-300"
                    >
                        Privacy Policy
                    </router-link>
                </p>
            </div>
        </footer>
    </div>
</template>
