<script setup lang="ts">
const props = defineProps<{ content: string }>();
</script>

<template>
    <div
        class="
            w-full
            flex
            justify-center
            bg-pink-700
            dark:bg-pink-500
            text-gray-100
            dark:text-black
            py-4
            px-2
            rounded-2xl
            tracking-wide
            font-semibold
            focus:outline-none
            ring-pink-700
            dark:ring-pink-500
            focus:ring
            hover:bg-pink-600
            dark:hover:bg-pink-600
            shadow-lg
            cursor-pointer
            transition
            ease-in
            duration-200
        "
        v-text="props.content"
    />
</template>
