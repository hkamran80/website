<script setup lang="ts">
import NavigationButton from "./NavigationButton.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
    <navigation-button
        to="/creations"
        content="Creations"
        :active="route.path === '/creations'"
    />
    <navigation-button
        to="/blog"
        content="Blog"
        :active="route.path.startsWith('/blog')"
    />
    <navigation-button
        to="/programs"
        content="Programs"
        :active="route.path.startsWith('/programs')"
    />
</template>
