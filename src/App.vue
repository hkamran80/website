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
    </div>
</template>
