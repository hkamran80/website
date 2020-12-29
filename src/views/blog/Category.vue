<template>
    <center-layout>
        <div v-if="error">
            <div id="error">
                <v-alert type="error" v-text="error"></v-alert>
            </div>
        </div>
        <div v-else>
            <h1>
                Category:
                {{ $options.categories[this.$route.params.category].name }}
            </h1>
            <h2
                class="pb-7"
                v-text="
                    `${found_posts.length} Post${
                        found_posts.length !== 1 ? 's' : ''
                    }`
                "
            />
            <feed-card
                v-for="post_id in found_posts"
                :key="post_id"
                :id="post_id"
                :featured-image-src="$options.posts[post_id].featured"
                :title="$options.posts[post_id].title"
                :publishDate="$options.posts[post_id].publish_date"
                :updateDate="$options.posts[post_id].update_date"
                :readingTime="$options.posts[post_id].reading_time"
                :excerpt="$options.posts[post_id].excerpt"
                :categories="$options.posts[post_id].categories"
            />
        </div>
    </center-layout>
</template>

<script>
import posts from "@/blog/posts.json";
import categories from "@/blog/categories.json";
import CenterLayout from "@/components/CenterLayout";
import FeedCard from "@/components/blog/FeedCard.vue";

export default {
    name: "BlogFeed",
    posts: posts,
    categories: categories,
    components: { FeedCard, CenterLayout },
    data: function() {
        return {
            found_posts: null,
            error: false
        };
    },
    created() {
        if (
            this.$options.categories[this.$route.params.category] === undefined
        ) {
            this.error = `The category you are trying to access, ${this.$route.params.category}, does not exist.`;
            this.$router.push({
                name: "NotFound",
                query: { path: window.location.origin + this.$route.path }
            });
        }
    },
    mounted() {
        this.found_posts = this.$options.categories[
            this.$route.params.category
        ].posts;
    }
};
</script>

<style scoped>
#feed {
    display: inline;
}
#feed div.blog-post {
    display: inline;
}

a.bp2 {
    padding: 10px;
    margin: 12px;
}
div.v-image {
    margin: 8px;
}
div.categories {
    margin-top: 10px;
}
</style>
