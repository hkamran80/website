<template>
    <a :href="`/blog/posts/${id}`" class="post">
        <v-row align="center">
            <v-col md="5" cols="12">
                <v-img
                    class="align-end"
                    width="100%"
                    max-height="250px"
                    :src="featuredImageSrc"
                />
            </v-col>
            <v-col>
                <strong class="primary--text" v-text="title" />
                <br />
                <span v-text="excerpt" />
                <br />
                <br />
                <span v-text="publishDate" />
                <span
                    v-if="
                        updateDate !== 'null' &&
                            updateDate !== undefined &&
                            typeof updateDate === 'string' &&
                            updateDate !== ''
                    "
                    v-text="` / ${updateDate} (Updated)`"
                />
                <br />
                <span v-text="readingTime" />
                <br />
                <br />
                <v-chip
                    v-for="category of categories"
                    :key="category"
                    class="mr-2"
                    :href="`/blog/category/${category}`"
                    v-text="$options.categories[category].name"
                    label
                />
            </v-col>
        </v-row>
    </a>
</template>

<script>
import categories_json from "@/blog/categories.json";
export default {
    name: "PostCard",
    categories: categories_json,
    props: {
        id: String,
        featuredImageSrc: String,
        title: String,
        publishDate: String,
        updateDate: String,
        readingTime: String,
        excerpt: String,
        categories: Array
    }
};
</script>

<style scoped>
a.post {
    text-decoration: none;
    color: currentColor;
    margin-bottom: 30px;
}
</style>
