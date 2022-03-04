<script setup lang="ts">
import { useTitle } from "@vueuse/core";
import { useRouter, useRoute } from "vue-router";
import { computed, defineAsyncComponent, ref } from "vue";
import { useStore } from "vuex";

import NavigationBar from "../components/NavigationBar.vue";
import MainLayout from "../components/MainLayout.vue";
import PageHeader from "../components/PageHeader.vue";
import type { Page } from "../models/pages";

useTitle("Creation | H. Kamran");

const { back } = useRouter();
const { params } = useRoute();

if (!params.id) {
    back();
}
const store = useStore();
const creation = ref<Page | undefined>(
    (store.state.creationPages as Page[]).find(
        (creation: Page) => creation.id === params.id,
    ),
);
const pageHeader = ref<string>("Program");

if (!creation.value) {
    back();
}

if (creation.value) {
    pageHeader.value = creation.value.name;
    useTitle(`${pageHeader.value} | H. Kamran`);
}

const creationComponent = computed(() =>
    creation.value
        ? defineAsyncComponent(
              () =>
                  import(
                      `../components/${creation.value!.componentFilename}.vue`
                  ),
          )
        : null,
);
</script>

<template>
    <navigation-bar />

    <main-layout :centered="creation?.centerContent">
        <page-header
            :header="pageHeader"
            :subheader="creation?.description"
            class="mb-7"
        />

        <component :is="creationComponent" />
    </main-layout>
</template>
