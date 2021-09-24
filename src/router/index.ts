import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Creations from "../views/Creations.vue";
import BlogFeed from "../views/BlogFeed.vue";
import BlogTag from "../views/BlogTag.vue";
// import BlogPost from "../views/BlogPost.vue";
import Programs from "../views/Programs.vue";

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
        name: "BlogFeed",
        component: BlogFeed,
    },
    {
        path: "/blog/tag/:id",
        name: "BlogTag",
        component: BlogTag,
    },
    // {
    //     path: "/blog/post/:id",
    //     name: "BlogPost",
    //     component: BlogPost,
    // },
    {
        path: "/programs",
        name: "Programs",
        component: Programs,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
