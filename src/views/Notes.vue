<script setup lang="ts">
import { computed, ref } from "vue";
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
            class="mt-7 grid sm:grid-cols-2 grid-cols-1 gap-8 items-center"
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
