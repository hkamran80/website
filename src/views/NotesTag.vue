<script setup lang="ts">
import { ref, watch } from "vue";
import { useTitle } from "@vueuse/core";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import NavigationBar from "../components/NavigationBar.vue";
import MainLayout from "../components/MainLayout.vue";
import PageHeader from "../components/PageHeader.vue";
import NoteCard from "../components/NoteCard.vue";
import Loading from "../components/Loading.vue";
import { BasePost, CosmicNoteTag, Tag } from "../models/blog";

useTitle("Notes | H. Kamran");

const { back } = useRouter();
const { params } = useRoute();

if (!params.slug) {
    back();
}

const pageHeader = ref<string>("Note Tag");
const tag = ref<Tag | null>(null);
const notes = ref<BasePost[] | null>(null);

const store = useStore();
const loadPosts = () => {
    if (!store.state.notes) {
        watch(
            () => store.state.notes,
            () =>
                (notes.value = store.state.notes.filter(
                    (post: BasePost) =>
                        tag.value!.slugs.indexOf(post.slug) !== -1
                ))
        );
    } else {
        notes.value = store.state.notes.filter(
            (post: BasePost) => tag.value!.slugs.indexOf(post.slug) !== -1
        );
    }
};

if (!store.state.tags) {
    watch(
        () => store.state.noteTags,
        () => {
            tag.value = store.state.noteTags
                .map((tag: CosmicNoteTag) => {
                    return {
                        slug: tag.slug,
                        title: tag.title,
                        slugs: tag.metadata.notes.map(
                            (post: BasePost) => post.slug
                        ),
                    };
                })
                .find((tag: Tag) => tag.slug === params.slug);

            pageHeader.value = tag.value!.title;
            useTitle(`${tag.value!.title} | Notes | H. Kamran`);
            loadPosts();
        }
    );
} else {
    tag.value = store.state.tags
        .map((tag: CosmicNoteTag) => {
            return {
                slug: tag.slug,
                title: tag.title,
                slugs: tag.metadata.notes.map((post: BasePost) => post.slug),
            };
        })
        .find((tag: Tag) => tag.slug === params.slug);

    pageHeader.value = tag.value!.title;
    useTitle(`${tag.value!.title} | Notes | H. Kamran`);
    loadPosts();
}
</script>

<template>
    <navigation-bar />

    <main-layout>
        <page-header :header="pageHeader" />

        <div
            class="mt-7 grid sm:grid-cols-3 grid-cols-1 gap-8 items-center"
            v-if="notes !== null"
        >
            <note-card
                class="h-full"
                v-for="note in notes"
                :key="note.slug"
                :slug="note.slug"
                :title="note.title"
                :description="note.metadata.description"
                :publish-date="note.metadata.published"
            />
        </div>
        <div class="mt-7" v-else>
            <loading />
        </div>
    </main-layout>
</template>
