<script setup lang="ts">
import { ref, watch } from "vue";
import { useTitle } from "@vueuse/core";
import { useRoute, useRouter } from "vue-router";

import NavigationBar from "../components/NavigationBar.vue";
import MainLayout from "../components/MainLayout.vue";
import PageHeader from "../components/PageHeader.vue";
import Loading from "../components/Loading.vue";
import { useStore } from "vuex";
import { CosmicTag, BasePost, Tag, CosmicNoteTag } from "../models/blog";

useTitle("Notes | H. Kamran");

const { back } = useRouter();
const { params } = useRoute();

if (!params.slug) {
    back();
}

const pageTitle = ref<string>("Blog Post");
const pageSubtitle = ref<string>("");

const store = useStore();
const note = ref<BasePost | null>(null);
const tags = ref<Tag[] | null>(null);

if (!store.state.notes) {
    watch(
        () => store.state.notes,
        () => {
            note.value = store.state.notes.find(
                (post: any) => post.slug === params.slug,
            );

            if (note.value) {
                pageTitle.value = note.value.title;
                pageSubtitle.value = note.value.metadata.description;

                useTitle(`${note.value.title} | Notes | H. Kamran`);
            }
        },
    );
} else {
    note.value = store.state.notes.find(
        (post: BasePost) => post.slug === params.slug,
    );

    if (note.value) {
        pageTitle.value = note.value.title;
        pageSubtitle.value = note.value.metadata.description;

        useTitle(`${note.value.title} | Notes | H. Kamran`);
    }
}

if (!store.state.noteTags) {
    watch(
        () => store.state.noteTags,
        () =>
            (tags.value = store.state.noteTags
                .map((tag: CosmicNoteTag) => {
                    return {
                        slug: tag.slug,
                        title: tag.title,
                        slugs: tag.metadata.notes.map(
                            (post: BasePost) => post.slug,
                        ),
                    };
                })
                .filter(
                    (tag: Tag) =>
                        tag.slugs.indexOf(params.slug as string) !== -1,
                )),
    );
} else {
    tags.value = store.state.noteTags
        .map((tag: CosmicNoteTag) => {
            return {
                slug: tag.slug,
                title: tag.title,
                slugs: tag.metadata.notes.map((post: BasePost) => post.slug),
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
                :datetime="note?.metadata.published"
                v-text="
                    new Date(
                        `${note?.metadata.published}T12:00:00-07:00`,
                    ).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })
                "
            />
            <span v-if="tags" class="ml-1 mr-2">•</span>
            <div v-if="tags" class="contents">
                <span v-for="tag of tags" :key="tag.slug">
                    <router-link
                        :to="`/notes/tag/${tag.slug}`"
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
            </div>
        </h3>

        <div class="mt-7">
            <div class="max-w-5xl mx-auto">
                <div
                    class="max-w-5xl mx-auto prose prose-pink dark:prose-light"
                    v-html="note?.content"
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
