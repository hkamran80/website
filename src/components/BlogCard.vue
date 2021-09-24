<script setup lang="ts">
import blogTags from "../data/blogTags.json";
import { Tags } from "../interfaces/Blog";

const tags = blogTags as any as Tags;

const props = defineProps<{
    postId: string;
    featuredImageUrl: string;
    title: string;
    excerpt: string;
    publishDate: string;
    readingTime: string;
    tags: Array<string>;
}>();
</script>

<template>
    <router-link to="/blog" class="flex flex-col rounded-lg shadow-lg overflow-hidden">
        <div class="flex-shrink-0">
            <img
                class="h-48 w-full object-cover"
                :src="props.featuredImageUrl"
                :alt="`Featured image for ${props.title}`"
            />
        </div>
        <div class="flex-1 bg-white p-6 flex flex-col justify-between">
            <div class="flex-1">
                <p
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
                </p>
                <div class="block mt-2">
                    <p
                        class="text-xl font-semibold text-gray-900"
                        v-text="props.title"
                    />
                    <p
                        class="mt-3 text-base text-gray-500"
                        v-text="props.excerpt"
                    />
                </div>
            </div>
            <div class="mt-6 flex items-center">
                <div class="flex-shrink-0">
                    <a href="#">
                        <span class="sr-only">
                            H. Kamran's profile picture
                        </span>
                        <img
                            class="h-10 w-10 rounded-full"
                            src="/img/profile.png"
                            alt="H. Kamran's profile photo"
                        />
                    </a>
                </div>
                <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">
                        <a href="#" class="hover:underline"> H. Kamran </a>
                    </p>
                    <div class="flex space-x-1 text-sm text-gray-500">
                        <time
                            :datetime="props.publishDate"
                            v-text="
                                new Date(props.publishDate + 'T12:00:00').toLocaleDateString(
                                    undefined,
                                    {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    }
                                )
                            "
                        />
                        <span aria-hidden="true"> · </span>
                        <span v-text="`${props.readingTime} read`" />
                    </div>
                </div>
            </div>
        </div>
    </router-link>
</template>
