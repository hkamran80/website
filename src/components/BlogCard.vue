<script setup lang="ts">
const props = defineProps<{
    slug: string;
    featuredImageUrl: string;
    title: string;
    description: string;
    publishDate: string;
}>();
</script>

<template>
    <router-link
        :to="`/blog/post/${props.slug}`"
        class="flex flex-col rounded-lg shadow-lg overflow-hidden"
    >
        <div class="flex-shrink-0">
            <img
                class="h-48 w-full object-cover"
                :src="props.featuredImageUrl"
                :alt="`Featured image for ${props.title}`"
            />
        </div>
        <div
            class="flex-1 bg-white dark:bg-gray-900 p-6 flex flex-col justify-between"
        >
            <div class="flex-1">
                <!-- <p
                    class="
                        text-sm
                        font-medium
                        text-pink-700
                        dark:text-pink-500
                        space-x-3
                    "
                >
                    <router-link
                        :to="`/blog/tag/${tag}`"
                        class="hover:underline"
                        v-for="tag in props.tags"
                        :key="tag"
                        v-text="tags[tag].name"
                    />
                </p> mt-2-->
                <div class="block">
                    <p
                        class="text-xl font-semibold text-gray-900 dark:text-white"
                        v-text="props.title"
                    />
                    <p
                        class="mt-3 text-base text-gray-500 dark:text-gray-400"
                        v-text="props.description"
                    />
                </div>
            </div>
            <div class="mt-6 flex items-center">
                <div class="flex-shrink-0">
                    <span class="sr-only"> H. Kamran's profile picture </span>
                    <img
                        class="h-10 w-10 rounded-full"
                        src="/assets/images/profile.png"
                        alt="H. Kamran's profile picture"
                    />
                </div>
                <div class="ml-3">
                    <p
                        class="text-sm font-medium text-gray-900 dark:text-white"
                    >
                        H. Kamran
                    </p>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
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
                    </div>
                </div>
            </div>
        </div>
    </router-link>
</template>
