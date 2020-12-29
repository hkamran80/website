<template>
    <center-layout>
        <div id="error" v-if="error">
            <v-alert type="error" v-if="error.indexOf('not exist') == -1">
                An error occurred. Check below for the error. If the problem
                persists after five minutes, contact H. Kamran.
            </v-alert>
            <v-alert type="error" v-text="error"></v-alert>
        </div>
        <div id="content" v-else>
            <header class="pb-7">
                <div id="metadata" class="pb-4">
                    <v-row no-gutters>
                        <v-col md="11" cols="12">
                            <span v-text="post.publish_date" />
                            <span
                                v-text="` / ${post.update_date} (Updated)`"
                                v-if="post.update_date !== ''"
                            />
                        </v-col>
                        <v-col
                            md="1"
                            cols="12"
                            :class="{
                                'text-right': !$vuetify.breakpoint.mobile
                            }"
                        >
                            <span v-text="post.reading_time" />
                        </v-col>
                    </v-row>
                    <h1 v-text="post.title" class="pb-1" />
                    <span v-text="post.excerpt" class="pb-2" />
                </div>
                <div class="categories pb-4">
                    <v-chip
                        v-for="category of post.categories"
                        :key="category"
                        class="mr-2"
                        :href="`/blog/category/${category}`"
                        v-text="$options.categories[category].name"
                        label
                    />
                </div>
                <img :src="post.featured" width="100%" />
            </header>
            <article>
                <vue-markdown
                    v-if="markdown != '' && !error"
                    :source="markdown"
                    id="markdown-content"
                />

                <v-progress-circular
                    v-if="markdown == '' && !error"
                    indeterminate
                    color="primary"
                />
            </article>
        </div>
    </center-layout>
</template>

<script>
import posts from "@/blog/posts.json";
import categories from "@/blog/categories.json";
import VueMarkdown from "vue-markdown";
import CenterLayout from "@/components/CenterLayout.vue";

export default {
    name: "PostView",
    categories: categories,
    components: { VueMarkdown, CenterLayout },
    data: function() {
        return {
            post: {
                featured: null,
                title: null,
                publish_date: null,
                update_date: null,
                reading_time: null,
                excerpt: null,
                categories: null
            },
            markdown: null,
            error: false
        };
    },
    mounted() {
        if (posts[this.$route.params.post] !== undefined) {
            this.post = posts[this.$route.params.post];
            import(`raw-loader!@/blog/files/${this.$route.params.post}.md`)
                .then(data => {
                    this.markdown = data.default;
                })
                .catch(error => {
                    this.error = error;
                });
        } else {
            this.error = `The post you are trying to access, ${this.$route.params.post}, does not exist.`;
            this.$router.push({
                name: "NotFound",
                query: { path: window.location.origin + this.$route.path }
            });
        }
    }
};
</script>

<style scoped>
div#post {
    text-align: left;
}
</style>

<style>
pre {
    white-space: pre-wrap;
    overflow-x: auto;
    padding: 8px;
    border-radius: 8px;
    margin: 5px 0;
    tab-size: 4;
}
</style>
