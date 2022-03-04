<script setup lang="ts">
import { computed } from "vue";
import { useTitle } from "@vueuse/core";
import { useStore } from "vuex";

import NavigationBar from "../components/NavigationBar.vue";
import MainLayout from "../components/MainLayout.vue";
import PageHeader from "../components/PageHeader.vue";
import NoteCard from "../components/NoteCard.vue";
import Loading from "../components/Loading.vue";

useTitle("Notes | H. Kamran");

const store = useStore();
const notes = computed(() => store.state.notes);
</script>

<template>
    <navigation-bar />

    <main-layout>
        <page-header header="Notes" />

        <div
            v-if="notes !== null"
            class="mt-7 grid sm:grid-cols-2 grid-cols-1 gap-8 items-center"
        >
            <note-card
                v-for="note in notes"
                :key="note.slug"
                class="h-full"
                :slug="note.slug"
                :title="note.title"
                :description="note.metadata.description"
                :publish-date="note.metadata.published"
            />
        </div>
        <div v-else class="mt-7">
            <loading />
        </div>
    </main-layout>
</template>
