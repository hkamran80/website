<script setup lang="ts">
const props = defineProps<{ path: string }>();
</script>

<template>
    <svg
        class="
            inline-flex
            ml-3
            text-pink-700
            dark:text-pink-500
            fill-current
            w-6
        "
        viewBox="0 0 24 24"
    >
        <path :d="props.path" />
    </svg>
</template>
