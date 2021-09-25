<script setup lang="ts">
import MainLayout from "../components/MainLayout.vue";
import ProgramCard from "../components/ProgramCard.vue";
import programs from "../data/programs.json";

// console.debug(programs);
</script>

<template>
    <main-layout title="Programs" two-grid v-slot>
        <program-card
            v-for="program in programs"
            :key="program.id"
            :id="program.id"
            :name="program.name"
            :description="program.description"
        />
    </main-layout>
</template>
