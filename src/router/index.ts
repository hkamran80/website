import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Creations from "../views/Creations.vue";
import BlogPosts from "../views/BlogPosts.vue";
import BlogTag from "../views/BlogTag.vue";
import BlogPost from "../views/BlogPost.vue";
import Programs from "../views/Programs.vue";
import Program from "../views/Program.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/creations",
        name: "Creations",
        component: Creations,
    },
    {
        path: "/blog",
        name: "BlogPosts",
        component: BlogPosts,
    },
    {
        path: "/blog/tag/:slug",
        name: "BlogTag",
        component: BlogTag,
    },
    {
        path: "/blog/post/:slug",
        name: "BlogPost",
        component: BlogPost,
    },
    {
        path: "/programs",
        name: "Programs",
        component: Programs,
    },
    { path: "/programs/:id", name: "Program", component: Program },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
