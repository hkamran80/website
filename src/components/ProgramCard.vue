<script setup lang="ts">
const props = defineProps<{
    programId: string;
    name: string;
    description: string;
}>();
</script>

<template>
    <router-link
        :to="`/programs/${props.programId}`"
        class="w-full bg-white dark:bg-gray-900 rounded-lg shadow divide-y divide-gray-200"
        :aria-label="props.name"
    >
        <div class="w-full flex items-center justify-between p-6 space-x-6">
            <div class="flex-1">
                <div class="flex items-center space-x-3">
                    <h3
                        class="text-gray-900 dark:text-white text-md font-medium truncate"
                        v-text="props.name"
                    />
                </div>
                <p
                    class="mt-2 text-gray-500 dark:text-gray-400 text-sm"
                    v-text="props.description"
                />
            </div>
        </div>
    </router-link>
</template>
