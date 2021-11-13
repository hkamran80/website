<script setup lang="ts">
import { useStore } from "vuex";

const store = useStore();
const post = store.state.posts[0];
</script>

<template>
    <div class="mt-1 pt-5">
        <div class="grid sm:grid-cols-3 grid-cols-1 gap-8 items-center">
            <img :src="post.thumbnail" class="rounded-lg" 
                :alt="`Featured image for ${post.title}`" />
            <div class="col-span-2">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                    <time
                        :datetime="post.metadata.published"
                        v-text="
                            new Date(
                                `${post.metadata.published}T12:00:00-07:00`
                            ).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })
                        "
                    />
                </p>

                <router-link :to="`/blog/post/${post.slug}`" class="mt-2 block">
                    <p
                        class="
                            text-xl
                            font-semibold
                            text-gray-800
                            dark:text-gray-200
                        "
                        v-text="post.title"
                    />
                    <p
                        class="mt-2 text-base text-gray-500 dark:text-gray-400"
                        v-text="post.metadata.description"
                    />
                </router-link>

                <div class="mt-3">
                    <router-link
                        :to="`/blog/post/${post.slug}`"
                        class="
                            text-base
                            font-semibold
                            text-pink-700
                            dark:text-pink-500
                            hover:text-pink-800
                            dark:hover:text-pink-600
                        "
                    >
                        Read full article
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
