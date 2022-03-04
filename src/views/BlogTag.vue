<script setup lang="ts">
import { ref, watch } from "vue";
import { useTitle } from "@vueuse/core";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import NavigationBar from "../components/NavigationBar.vue";
import MainLayout from "../components/MainLayout.vue";
import PageHeader from "../components/PageHeader.vue";
import BlogCard from "../components/BlogCard.vue";
import Loading from "../components/Loading.vue";
import { CosmicTag, Post, Tag } from "../models/blog";

useTitle("Blog | H. Kamran");

const { back } = useRouter();
const { params } = useRoute();

if (!params.slug) {
    back();
}

const pageHeader = ref<string>("Blog Tag");
const tag = ref<Tag | null>(null);
const posts = ref<Post[] | null>(null);

const store = useStore();
const loadPosts = () => {
    if (!store.state.posts) {
        watch(
            () => store.state.posts,
            () =>
                (posts.value = store.state.posts.filter(
                    (post: Post) => tag.value!.slugs.indexOf(post.slug) !== -1,
                )),
        );
    } else {
        posts.value = store.state.posts.filter(
            (post: Post) => tag.value!.slugs.indexOf(post.slug) !== -1,
        );
    }
};

if (!store.state.tags) {
    watch(
        () => store.state.tags,
        () => {
            tag.value = store.state.tags
                .map((tag: CosmicTag) => {
                    return {
                        slug: tag.slug,
                        title: tag.title,
                        slugs: tag.metadata.posts.map(
                            (post: Post) => post.slug,
                        ),
                    };
                })
                .find((tag: Tag) => tag.slug === params.slug);

            pageHeader.value = tag.value!.title;
            useTitle(`${tag.value!.title} | Blog | H. Kamran`);
            loadPosts();
        },
    );
} else {
    tag.value = store.state.tags
        .map((tag: CosmicTag) => {
            return {
                slug: tag.slug,
                title: tag.title,
                slugs: tag.metadata.posts.map((post: Post) => post.slug),
            };
        })
        .find((tag: Tag) => tag.slug === params.slug);

    pageHeader.value = tag.value!.title;
    useTitle(`${tag.value!.title} | Blog | H. Kamran`);
    loadPosts();
}
</script>

<template>
    <navigation-bar />

    <main-layout>
        <page-header :header="pageHeader" />

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
