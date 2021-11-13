<script setup lang="ts">
import { computed, ref } from "vue";
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
            class="mt-7 grid sm:grid-cols-3 grid-cols-1 gap-8 items-center"
            v-if="posts !== null"
        >
            <blog-card
                class="h-full"
                v-for="post in posts"
                :key="post.slug"
                :slug="post.slug"
                :featured-image-url="post.thumbnail"
                :title="post.title"
                :description="post.metadata.description"
                :publish-date="post.metadata.published"
            />
        </div>
        <div class="mt-7" v-else>
            <loading />
        </div>
    </main-layout>
</template>
