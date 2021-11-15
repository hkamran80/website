<script setup lang="ts">
import { useStore } from "vuex";
import Cosmic from "cosmicjs";

import { datePostsSortAscending } from "./utils/sort";
import { CREATIONS_URL, JSONBIN_HEADERS } from "./data/constants";

const store = useStore();
const api = Cosmic();
const bucket = api.bucket({
    slug: import.meta.env.VITE_APP_COSMIC_BUCKET_SLUG as string,
    read_key: import.meta.env.VITE_APP_COSMIC_BUCKET_READ_KEY as string,
});

bucket
    .getObjects({
        query: { type: "posts" },
        props: "slug,title,metadata,thumbnail,content",
    })
    .then((data: any) =>
        store.commit("SAVE_POSTS", data.objects.sort(datePostsSortAscending))
    );

bucket
    .getObjects({ query: { type: "tags" }, props: "slug,title,metadata" })
    .then((data: any) => store.commit("SAVE_TAGS", data.objects));

fetch(CREATIONS_URL, { headers: JSONBIN_HEADERS })
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
                class="
                    max-w-7xl
                    mx-auto
                    py-12
                    px-4
                    overflow-hidden
                    sm:px-6
                    lg:px-8
                "
            >
                <nav
                    class="-mx-5 -my-2 flex flex-wrap justify-center space-x-5"
                    aria-label="Footer"
                >
                    <div class="py-2">
                        <router-link
                            to="/creations"
                            class="
                                text-base text-gray-500
                                hover:text-gray-900
                                dark:text-gray-400 dark:hover:text-gray-300
                            "
                        >
                            Creations
                        </router-link>
                    </div>

                    <div class="py-2">
                        <router-link
                            to="/blog"
                            class="
                                text-base text-gray-500
                                hover:text-gray-900
                                dark:text-gray-400 dark:hover:text-gray-300
                            "
                        >
                            Blog
                        </router-link>
                    </div>

                    <div class="py-2">
                        <router-link
                            to="/programs"
                            class="
                                text-base text-gray-500
                                hover:text-gray-900
                                dark:text-gray-400 dark:hover:text-gray-300
                            "
                        >
                            Programs
                        </router-link>
                    </div>
                </nav>
                <div class="mt-8 flex justify-center space-x-6">
                    <a
                        v-for="social in store.state.socials"
                        :key="social.name"
                        :href="social.url"
                        :aria-label="social.name"
                        target="_blank"
                        class="
                            text-gray-500
                            hover:text-gray-900
                            dark:text-gray-400 dark:hover:text-gray-300
                        "
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
                    class="
                        mt-8
                        text-center text-base text-gray-400
                        max-w-3xl
                        mx-auto
                    "
                >
                    Copyright © 2020-2021 H. Kamran. The materials on this on
                    this website may be freely copied and distributed so long as
                    the copyright notice and website are included.
                </p>
            </div>
        </footer>
    </div>
</template>
