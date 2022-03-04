<script setup lang="ts">
const props = defineProps<{
    slug: string;
    title: string;
    description: string;
    publishDate: string;
}>();
</script>

<template>
    <div class="mt-1 pt-5">
        <div class="items-center">
            <div class="col-span-2">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                    <time
                        :datetime="props.publishDate"
                        v-text="
                            new Date(
                                `${props.publishDate}T12:00:00-07:00`,
                            ).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })
                        "
                    />
                </p>

                <router-link
                    :to="`/notes/note/${props.slug}`"
                    class="mt-2 block"
                >
                    <p
                        class="text-xl font-semibold text-gray-800 dark:text-gray-200"
                        v-text="props.title"
                    />
                    <p
                        class="mt-2 text-base text-gray-500 dark:text-gray-400"
                        v-text="props.description"
                    />
                </router-link>

                <div class="mt-3">
                    <router-link
                        :to="`/notes/note/${props.slug}`"
                        class="text-base font-semibold text-pink-700 dark:text-pink-500 hover:text-pink-800 dark:hover:text-pink-600"
                    >
                        Read the note
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
