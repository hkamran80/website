<script setup lang="ts">
import { useTitle } from "@vueuse/core";
import { useRouter, useRoute } from "vue-router";
import { computed, defineAsyncComponent, ref } from "vue";
import { useStore } from "vuex";

import NavigationBar from "../components/NavigationBar.vue";
import MainLayout from "../components/MainLayout.vue";
import PageHeader from "../components/PageHeader.vue";
import type { Page } from "../models/pages";

useTitle("Page | H. Kamran");

const { params } = useRoute();
const { back } = useRouter();

if (!params.id) {
    back();
}
const store = useStore();
const program = ref<Page | undefined>(
    (store.state.programs as Page[]).find(
        (program: Page) => program.id === params.id,
    ),
);
const pageHeader = ref<string>("Program");

if (!program.value) {
    back();
} else {
    pageHeader.value = program.value.name;
    useTitle(`${pageHeader.value} | H. Kamran`);
}

const programComponent = computed(() =>
    program.value
        ? defineAsyncComponent(
              () =>
                  import(
                      `../components/${program.value!.componentFilename}.vue`
                  ),
          )
        : null,
);
</script>

<template>
    <navigation-bar />

    <main-layout :centered="program?.centerContent">
        <page-header
            :header="pageHeader"
            :subheader="program?.description"
            class="mb-7"
        />

        <component :is="programComponent" />
    </main-layout>
</template>
