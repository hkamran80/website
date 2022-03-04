<script setup lang="ts">
import { useTitle } from "@vueuse/core";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";

import NavigationBar from "../components/NavigationBar.vue";
import MainLayout from "../components/MainLayout.vue";
import PageHeader from "../components/PageHeader.vue";
import ProgramCard from "../components/ProgramCard.vue";
import { Program } from "../models/programs";

useTitle("Programs | H. Kamran");
const store = useStore();
const programs = computed(() => store.state.programs as Program[]);
</script>

<template>
    <navigation-bar />

    <main-layout>
        <page-header header="Programs" />

        <div class="mt-7 grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
            <program-card
                v-for="program of programs"
                :key="program.id"
                :program-id="program.id"
                :name="program.name"
                :description="program.description"
            />
        </div>
    </main-layout>
</template>
