<script setup lang="ts">
const props = defineProps<{
    name: string;
    description: string;
}>();
</script>

<template>
    <div class="w-full bg-white rounded-lg shadow">
        <div class="w-full flex items-center justify-between p-6 space-x-6">
            <div class="flex-1">
                <div class="flex items-center space-x-3">
                    <h3
                        class="text-gray-900 text-md font-medium truncate"
                        v-text="props.name"
                    />
                </div>
                <p
                    class="mt-1 text-gray-500 text-sm"
                    v-text="props.description"
                />
            </div>
        </div>
    </div>
</template>
