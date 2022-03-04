<script setup lang="ts">
const props = defineProps<{
    header: string;
    subheader?: string;
    mainHeader?: boolean;
}>();
</script>

<template>
    <div :class="[!props.mainHeader ? 'mb-1' : '']">
        <h1
            :class="[
                props.mainHeader
                    ? 'text-pink-700 dark:text-pink-500'
                    : 'text-black dark:text-white',
            ]"
            class="text-3xl sm:text-5xl text-center sm:text-left"
            v-text="props.header"
        />
        <h2
            v-if="props.subheader"
            class="font-light mt-4 text-xl sm:text-2xl text-center sm:text-left leading-snug text-gray-700 dark:text-gray-300"
            v-text="props.subheader"
        />
    </div>
</template>
