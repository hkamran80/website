<script setup lang="ts">
import { useTitle } from "@vueuse/core";
import { useStore } from "vuex";
import { computed, ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

import { creationAlphabeticalSort } from "../utils/sort";

import NavigationBar from "../components/NavigationBar.vue";
import MainLayout from "../components/MainLayout.vue";
import LatestPost from "../components/LatestPost.vue";
import CreationCard from "../components/CreationCard.vue";
import Loading from "../components/Loading.vue";
import PageHeader from "../components/PageHeader.vue";

useTitle("Home | H. Kamran");

const store = useStore();
const creations = computed(() => store.state.creations);

const latestPostAvailable = ref<boolean>(false);
watch(
    () => store.state.posts,
    () =>
        (latestPostAvailable.value =
            store.state.posts.length > 0 ? true : false),
);
if (store.state.posts && store.state.posts.length > 0) {
    latestPostAvailable.value = true;
}
</script>

<template>
    <navigation-bar />

    <main-layout>
        <page-header
            header="Hello world! I'm H. Kamran!"
            subheader="I'm a developer, experienced in Python, JavaScript, TypeScript,
            Vue.js, Java, Kotlin, Swift, and SwiftUI. I also enjoy taking photos and writing articles on topics that interest me or seem useful."
            main-header
        />

        <div class="mt-12">
            <h3 class="text-xl font-bold">Latest Post</h3>
            <latest-post v-if="latestPostAvailable" />
            <loading v-else />
        </div>

        <div class="mt-12">
            <h3 class="text-xl font-bold">Featured Creations</h3>
            <div v-if="creations" class="mt-1 pt-5">
                <div class="grid sm:grid-cols-3 grid-cols-1 gap-8 items-center">
                    <creation-card
                        v-for="creation in creations
                            .filter((creation: any) => creation.featured)
                            .sort(creationAlphabeticalSort)"
                        :key="creation.name"
                        class="h-full"
                        :name="creation.name"
                        :state="creation.status"
                        :description="creation.description"
                        :url="creation.site"
                        :repository="creation.repository"
                        :contributors="creation.contributors"
                    />
                </div>
            </div>
            <div v-else class="mt-3">
                <loading />
            </div>
        </div>
    </main-layout>
</template>
