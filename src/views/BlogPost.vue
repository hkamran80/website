<script setup lang="ts">
import { ref, watch } from "vue";
import { useTitle } from "@vueuse/core";
import { useRoute, useRouter } from "vue-router";

import NavigationBar from "../components/NavigationBar.vue";
import MainLayout from "../components/MainLayout.vue";
import PageHeader from "../components/PageHeader.vue";
import Loading from "../components/Loading.vue";
import { useStore } from "vuex";
import { CosmicTag, Post, Tag } from "../models/blog";

useTitle("Blog | H. Kamran");

const { back } = useRouter();
const { params } = useRoute();

if (!params.slug) {
    back();
}

const pageTitle = ref<string>("Blog Post");
const pageSubtitle = ref<string>("");

const store = useStore();
const post = ref<Post | null>(null);
const tags = ref<Tag[] | null>(null);

if (!store.state.posts) {
    watch(
        () => store.state.posts,
        () => {
            post.value = store.state.posts.find(
                (post: any) => post.slug === params.slug,
            );

            if (post.value) {
                pageTitle.value = post.value.title;
                pageSubtitle.value = post.value.metadata.description;

                useTitle(`${post.value.title} | Blog | H. Kamran`);
            }
        },
    );
} else {
    post.value = store.state.posts.find(
        (post: Post) => post.slug === params.slug,
    );

    if (post.value) {
        pageTitle.value = post.value.title;
        pageSubtitle.value = post.value.metadata.description;

        useTitle(`${post.value.title} | Blog | H. Kamran`);
    }
}

if (!store.state.tags) {
    watch(
        () => store.state.tags,
        () =>
            (tags.value = store.state.tags
                .map((tag: CosmicTag) => {
                    return {
                        slug: tag.slug,
                        title: tag.title,
                        slugs: tag.metadata.posts.map(
                            (post: Post) => post.slug,
                        ),
                    };
                })
                .filter(
                    (tag: Tag) =>
                        tag.slugs.indexOf(params.slug as string) !== -1,
                )),
    );
} else {
    tags.value = store.state.tags
        .map((tag: CosmicTag) => {
            return {
                slug: tag.slug,
                title: tag.title,
                slugs: tag.metadata.posts.map((post: Post) => post.slug),
            };
        })
        .filter((tag: Tag) => tag.slugs.indexOf(params.slug as string) !== -1);
}
</script>

<template>
    <navigation-bar />

    <main-layout>
        <page-header :header="pageTitle" :subheader="pageSubtitle" />
        <h3
            class="font-light mt-2 text-base sm:text-xl text-center sm:text-left leading-snug text-gray-600 dark:text-gray-400"
        >
            <time
                :datetime="post?.metadata.published"
                v-text="
                    new Date(
                        `${post?.metadata.published}T12:00:00-07:00`,
                    ).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })
                "
            />
            <span class="ml-1 mr-2" v-if="tags">•</span>
            <span v-for="tag of tags" :key="tag.slug" v-if="tags">
                <router-link
                    :to="`/blog/tag/${tag.slug}`"
                    class="text-pink-700 dark:text-pink-500 hover:text-pink-800 dark:hover:text-pink-600 underline"
                >
                    {{ tag.title }}
                </router-link>
                <span
                    v-if="
                        tags.map((tag) => tag.slug).indexOf(tag.slug) !==
                        tags.length - 1
                    "
                >
                    ·
                </span>
            </span>
        </h3>

        <div class="mt-7">
            <div class="max-w-5xl mx-auto">
                <img
                    :src="post?.thumbnail"
                    class="rounded-lg mb-7"
                    :alt="`Featured image for ${post?.title}`"
                />

                <div
                    class="max-w-5xl mx-auto prose prose-pink dark:prose-light"
                    v-html="post?.content"
                />
            </div>
        </div>
    </main-layout>
</template>

<style scoped>
pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    text-align: justify;
}
</style>
