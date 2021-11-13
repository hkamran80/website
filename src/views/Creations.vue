<script setup lang="ts">
import { useTitle } from "@vueuse/core";
import { computed } from "vue";
import { useStore } from "vuex";

import { creationAlphabeticalSort } from "../utils/sort";
import { Creation } from "../models/creations";

import NavigationBar from "../components/NavigationBar.vue";
import MainLayout from "../components/MainLayout.vue";
import CreationCard from "../components/CreationCard.vue";
import Loading from "../components/Loading.vue";
import PageHeader from "../components/PageHeader.vue";

useTitle("Creations | H. Kamran");

const store = useStore();
const creations = computed(() => store.state.creations);

const featuredCreations = computed(() =>
    creations.value
        .filter((creation: Creation) => creation.featured)
        .sort(creationAlphabeticalSort)
);
const completedCreations = computed(() =>
    creations.value
        .filter(
            (creation: Creation) =>
                !creation.featured && creation.status !== "In Progress"
        )
        .sort(creationAlphabeticalSort)
);
const inProgressCreations = computed(() =>
    creations.value
        .filter(
            (creation: Creation) =>
                !creation.featured && creation.status !== "Completed"
        )
        .sort(creationAlphabeticalSort)
);
</script>

<template>
    <navigation-bar />

    <main-layout>
        <page-header header="Creations" />

        <div class="pt-5 space-y-8 divide-y" v-if="creations">
            <div>
                <h3 class="text-xl font-bold mb-3">Featured</h3>
                <div class="grid sm:grid-cols-3 grid-cols-1 gap-8 items-center">
                    <creation-card
                        class="h-full"
                        v-for="creation in featuredCreations"
                        :key="creation.name"
                        :name="creation.name"
                        :state="creation.status"
                        :description="creation.description"
                        :url="creation.site"
                        :repository="creation.repository"
                        :contributors="creation.contributors"
                    />
                </div>
            </div>

            <div class="pt-4">
                <h3 class="text-xl font-bold mb-3">Completed</h3>
                <div class="grid sm:grid-cols-3 grid-cols-1 gap-8 items-center">
                    <creation-card
                        class="h-full"
                        v-for="creation in completedCreations"
                        :key="creation.name"
                        :name="creation.name"
                        :state="creation.status"
                        :description="creation.description"
                        :url="creation.site"
                        :repository="creation.repository"
                        :contributors="creation.contributors"
                    />
                </div>
            </div>

            <div class="pt-4">
                <h3 class="text-xl font-bold mb-3">In Progress</h3>
                <div class="grid sm:grid-cols-3 grid-cols-1 gap-8 items-center">
                    <creation-card
                        class="h-full"
                        v-for="creation in inProgressCreations"
                        :key="creation.name"
                        :name="creation.name"
                        :state="creation.status"
                        :description="creation.description"
                        :url="creation.site"
                        :repository="creation.repository"
                        :contributors="creation.contributors"
                    />
                </div>
            </div>
        </div>
        <div class="mt-3" v-else>
            <loading />
        </div>
    </main-layout>
</template>
