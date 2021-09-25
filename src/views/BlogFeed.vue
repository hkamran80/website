<script setup lang="ts">
import MainLayout from "../components/MainLayout.vue";
import BlogCard from "../components/BlogCard.vue";
import blogPosts from "../data/blogPosts.json";
</script>

<template>
    <main-layout title="Blog">
        <blog-card
            v-for="(details, id) in blogPosts"
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
