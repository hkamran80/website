<template>
    <v-row align="center" justify="center">
        <v-col v-for="(post, id) in $options.posts" :key="id" cols="12" md="5">
            <feed-card
                :id="id"
                :featured-image-src="post.featured"
                :title="post.title"
                :publishDate="post.publish_date"
                :updateDate="post.update_date"
                :readingTime="post.reading_time"
                :excerpt="post.excerpt"
                :categories="post.categories"
            />
        </v-col>
    </v-row>
</template>

<script>
import posts_json from "@/blog/posts.json";
import FeedCard from "@/components/blog/FeedCard.vue";

export default {
    name: "BlogFeed",
    posts: posts_json,
    components: { FeedCard }
};
</script>
