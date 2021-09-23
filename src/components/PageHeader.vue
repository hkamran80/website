<script setup lang="ts">
const props = defineProps<{ title: string; headerTextColor: any }>();
</script>

<template>
    <div class="text-center">
        <h2
            class="text-3xl tracking-tight font-extrabold sm:text-4xl"
            :class="[headerTextColor]"
            v-text="props.title"
        />
    </div>
</template>
