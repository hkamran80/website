<script setup lang="ts">
const props = defineProps<{ path: string }>();
</script>

<template>
    <svg viewBox="0 0 24 24">
        <path :d="props.path" />
    </svg>
</template>
