<script setup lang="ts">
import { useTitle } from "@vueuse/core";
import { useRouter, useRoute } from "vue-router";
import { computed, defineAsyncComponent, ref } from "vue";
import { useStore } from "vuex";

import NavigationBar from "../components/NavigationBar.vue";
import MainLayout from "../components/MainLayout.vue";
import PageHeader from "../components/PageHeader.vue";
import { Program } from "../models/programs";

useTitle("Program | H. Kamran");

const { back } = useRouter();
const { params } = useRoute();

if (!params.id) {
    back();
}
const store = useStore();
const program = ref<Program | undefined>(
    (store.state.programs as Program[]).find(
        (program: Program) => program.id === params.id
    )
);
const pageHeader = ref<string>("Program");

if (!program) {
    back();
}

pageHeader.value = program.value!.name;
useTitle(`${pageHeader.value} | H. Kamran`);

const programComponent = computed(() =>
    defineAsyncComponent(
        () => import(`../components/${program.value!.componentFilename}.vue`)
    )
);
</script>

<template>
    <navigation-bar />

    <main-layout>
        <page-header :header="pageHeader" />

        <component :is="programComponent" />
    </main-layout>
</template>
