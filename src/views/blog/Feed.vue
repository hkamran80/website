<template>
    <center-layout>
        <cds-header title="Blog" />

        <div v-for="(post, id) in $options.posts" :key="id">
            <post-card
                :id="id"
                :featured-image-src="post.featured"
                :title="post.title"
                :publishDate="post.publish_date"
                :updateDate="post.update_date"
                :readingTime="post.reading_time"
                :excerpt="post.excerpt"
                :categories="post.categories"
            />

            <v-divider
                class="my-5"
                v-if="keys.indexOf(id) !== keys.length - 1"
            />
        </div>
    </center-layout>
</template>

<script>
import PostCard from "@/components/blog/PostCard.vue";
import CenterLayout from "@/components/CenterLayout.vue";
import CdsHeader from "@/components/cds/CdsHeader.vue";

import posts_json from "@/blog/posts.json";

export default {
    name: "BlogFeed",
    posts: posts_json,
    components: { PostCard, CenterLayout, CdsHeader },
    data: function() {
        return {
            keys: null
        };
    },
    created() {
        this.keys = Object.keys(this.$options.posts);
    }
};
</script>
