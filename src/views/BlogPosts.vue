<script setup lang="ts">
import { computed } from "vue";
import { useTitle } from "@vueuse/core";
import { useStore } from "vuex";

import NavigationBar from "../components/NavigationBar.vue";
import MainLayout from "../components/MainLayout.vue";
import PageHeader from "../components/PageHeader.vue";
import BlogCard from "../components/BlogCard.vue";
import Loading from "../components/Loading.vue";

useTitle("Blog | H. Kamran");

const store = useStore();
const posts = computed(() => store.state.posts);
</script>

<template>
    <navigation-bar />

    <main-layout>
        <page-header header="Blog" />

        <div
            v-if="posts !== null"
            class="mt-7 grid sm:grid-cols-3 grid-cols-1 gap-8 items-center"
        >
            <blog-card
                v-for="post in posts"
                :key="post.slug"
                class="h-full"
                :slug="post.slug"
                :featured-image-url="post.thumbnail"
                :title="post.title"
                :description="post.metadata.description"
                :publish-date="post.metadata.published"
            />
        </div>
        <div v-else class="mt-7">
            <loading />
        </div>
    </main-layout>
</template>
