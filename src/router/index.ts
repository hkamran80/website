import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../views/Home.vue"),
    },
    {
        path: "/creations",
        name: "Creations",
        component: () => import("../views/Creations.vue"),
    },
    {
        path: "/blog",
        name: "BlogPosts",
        component: () => import("../views/BlogPosts.vue"),
    },
    {
        path: "/blog/tag/:slug",
        name: "BlogTag",
        component: () => import("../views/BlogTag.vue"),
    },
    {
        path: "/blog/post/:slug",
        name: "BlogPost",
        component: () => import("../views/BlogPost.vue"),
    },
    {
        path: "/programs",
        name: "Programs",
        component: () => import("../views/Programs.vue"),
    },
    {
        path: "/programs/:id",
        name: "Program",
        component: () => import("../views/Program.vue"),
    },
    {
        path: "/license",
        name: "License",
        component: () => import("../views/License.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
