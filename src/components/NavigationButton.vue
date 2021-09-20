<script setup lang="ts">
const props = defineProps<{ content: string; active?: boolean }>();
</script>

<template>
    <li
        :class="{
            'hover:border-b-2 border-blue-500': !active,
            'border-b-2 border-green-500': active,
        }"
        class="mr-5 text-xl font-semibold rounded-b-md"
        v-text="props.content"
    />
</template>
