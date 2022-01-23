<script setup lang="ts">
import { useTitle } from "@vueuse/core";
import { useRouter, useRoute } from "vue-router";
import { computed, defineAsyncComponent, ref } from "vue";
import { useStore } from "vuex";

import NavigationBar from "../components/NavigationBar.vue";
import MainLayout from "../components/MainLayout.vue";
import PageHeader from "../components/PageHeader.vue";
import { CreationPage } from "../models/creations";

useTitle("Creation | H. Kamran");

const { back } = useRouter();
const { params } = useRoute();

if (!params.id) {
    back();
}
const store = useStore();
const creation = ref<CreationPage | undefined>(
    (store.state.creationPages as CreationPage[]).find(
        (creation: CreationPage) => creation.id === params.id
    )
);
const pageHeader = ref<string>("Program");

if (!creation) {
    back();
}

pageHeader.value = creation.value!.name;
useTitle(`${pageHeader.value} | H. Kamran`);

const creationComponent = computed(() =>
    defineAsyncComponent(
        () => import(`../components/${creation.value!.componentFilename}.vue`)
    )
);
</script>

<template>
    <navigation-bar />

    <main-layout>
        <div :class="{ 'max-w-2xl mx-auto': creation?.centerContent }">
            <page-header :header="pageHeader" :subheader="creation?.description" class="mb-7" />
            <component :is="creationComponent" />
        </div>
    </main-layout>
</template>
