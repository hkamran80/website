<script setup lang="ts">
const props = defineProps<{ viewBox?: string; path: string }>();
</script>

<template>
    <svg :viewBox="props.viewBox ? props.viewBox : '0 0 24 24'">
        <path :d="props.path" />
    </svg>
</template>
