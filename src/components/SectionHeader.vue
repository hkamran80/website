<script setup lang="ts">
const props = defineProps<{ title: string; headerTextColor: any }>();
</script>

<template>
    <div class="pb-2 border-b border-gray-200">
        <h3
            class="text-lg leading-6 font-medium"
            :class="[headerTextColor]"
            v-text="props.title"
        />
    </div>
</template>
