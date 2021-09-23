<script setup lang="ts">
import NavigationBar from "../components/NavigationBar.vue";
import PageHeader from "../components/PageHeader.vue";
import BlogCard from "../components/BlogCard.vue";

import { useRoute } from "vue-router";
import blogPosts from "../data/blogPosts.json";
import _blogTags from "../data/blogTags.json";
import { Tags } from "../interfaces/Blog";

import { initialize } from "../composables/theming";
const { switchTheme, background, headerTextColor } = initialize();

const blogTags = _blogTags as any as Tags;
const route = useRoute();
</script>

<template>
    <div :class="[background]">
        <navigation-bar @update-theme="switchTheme" />

        <div class="pt-12 px-8 max-w-7xl mx-auto">
            <page-header
                :title="`The Tag Page`"
                :header-text-color="headerTextColor"
                class="mb-4"
            />

            <div
                class="
                    mt-12
                    max-w-lg
                    mx-auto
                    grid
                    gap-5
                    lg:grid-cols-3 lg:max-w-none
                "
            >
                <blog-card
                    v-for="(details, id) in blogPosts"
                    :key="id"
                    :featured-image-url="details.featured"
                    :title="details.title"
                    :excerpt="details.excerpt"
                    :publish-date="details.publishDate"
                    :reading-time="details.readingTime"
                    :tags="details.categories"
                />
            </div>
        </div>
    </div>
</template>
