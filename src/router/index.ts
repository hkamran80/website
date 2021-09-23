import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Creations from "../views/Creations.vue";
import BlogFeed from "../views/BlogFeed.vue";
// import BlogTag from "../views/BlogTag.vue";

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
    // {
    //     path: "/blog/tag/:id",
    //     name: "BlogTag",
    //     component: BlogTag,
    // },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
