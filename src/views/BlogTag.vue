<script setup lang="ts">
import MainLayout from "../components/MainLayout.vue";
import BlogCard from "../components/BlogCard.vue";
import { useRoute } from "vue-router";

import blogPosts from "../data/blogPosts.json";
import _blogTags from "../data/blogTags.json";
import { Tags } from "../interfaces/Blog";

const route = useRoute();
const tagId = route.params.id as string;
const blogTags = _blogTags as any as Tags;
const posts = {} as { [id: string]: any };

blogTags[tagId].posts.forEach(
    (id: string) =>
        (posts[id] =
            Object.values(blogPosts)[Object.keys(blogPosts).indexOf(id)])
);
</script>

<template>
    <main-layout :title="`The ${blogTags[tagId].name} Tag`">
        <blog-card
            v-for="(details, id) in posts"
            :key="id"
            :post-id="id"
            :featured-image-url="details.featured"
            :title="details.title"
            :excerpt="details.excerpt"
            :publish-date="details.publishDate"
            :reading-time="details.readingTime"
            :tags="details.tags"
        />
    </main-layout>
</template>
